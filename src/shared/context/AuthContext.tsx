import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { Login, UsuarioRetorno } from "../../models";
import { getSedApi } from "../../services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useConfirmDialog } from "./ConfirmDialogContext";
import { ShieldQuestion } from "lucide-react";

export type TAuthContext = {
  signIn: (param: Login) => Promise<void | unknown>;
  signOut: () => Promise<void>;
  usuarioRetorno: UsuarioRetorno | null;
  isLogged: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

const { postAutenticacaoLogin } = getSedApi();

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [usuarioRetorno, setUsuarioRetorno] = useState<UsuarioRetorno | null>(
    null
  );
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const navigate = useNavigate();
  const { confirmDialog } = useConfirmDialog();

  const signOut = useCallback(async () => {
    const confirma = await confirmDialog("Deseja sair do programa",< ShieldQuestion color="#52525c" size={26}/>);
    if (confirma) {
      localStorage.clear();
      setIsLogged(false);
      navigate("/login");
    } else {
      return;
    }
  }, [navigate, confirmDialog]);

  const signIn = useCallback(
    async (loginForm: Login) => {
      try {
        const retorno = await postAutenticacaoLogin(loginForm);
        setUsuarioRetorno(retorno.data);
        if (retorno.data.Token)
          localStorage.setItem("token", retorno.data.Token);

        setIsLogged(true);
        navigate("/entrevista-desligamento");
      } catch (error) {
        toast.error(
          error instanceof AxiosError && error.response
            ? error.response.data.Mensagem
            : "Ocorreu um erro inesperado."
        );

        setUsuarioRetorno(null);
        setIsLogged(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if(localStorage.getItem("token"))
      setIsLogged(true);
  },[])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        usuarioRetorno,
        isLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
