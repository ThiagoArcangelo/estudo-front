// import { Suspense, lazy, useContext } from "react";
import { Suspense, lazy, useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CadMotDesligamento from "../pages/cadastroMotivo/cadastro-motivo";
import { AnimatePresence } from "motion/react";
import Layout from "../pages/pagina-inicial/layout";
import CadDetMotDesligamento from "../pages/cadastroDetalhamentoMotivo/cadastro-det-motivo";
import CadastroFatores from "../pages/cadastroFatores/cadastro-fatores";
import CadastroPerguntaAvaliacao from "../pages/cadastroPerguntaAvaliacao/cadastro-perguntas-avaliacao";
import CadastroResposta from "../pages/cadastroRespostas/cadastro-resposta";
import { AuthContext } from "../shared/context/AuthContext";
// import { AuthContext } from "../shared/context/AuthContext";

const Login = lazy(() => import("../pages/login/login"));
const CadastroUsuario = lazy(
  () => import("../pages/cadastroUsuario/cadastro-usuario")
);

export const AppRoutes = () => {
  const { isLogged } = useContext(AuthContext);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div>Carregando ...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* LOGIN */}
          <Route path="login" element={<Login />} />

          {/* PAGINA INICIAL - LAYOUT  VERIFICA A AUTENTICAÇÃO DE USUÁRIO */}
          <Route
            path="entrevista-desligamento"
            element={
              isLogged || localStorage.getItem("token") ? (
                <Layout />
              ) : (
                <Navigate to="login" />
              )
            }
          >
            <Route index element={<div></div>} />
            <Route
              path="cad-motivo-desligamento"
              element={<CadMotDesligamento />}
            />
            <Route
              path="cad-det-motivo-desligamento"
              element={<CadDetMotDesligamento />}
            />
            <Route path="cadastro-fatores" element={<CadastroFatores />} />
            <Route
              path="cad-pergunta-avaliacao"
              element={<CadastroPerguntaAvaliacao />}
            />
            <Route path="cadastro-resposta" element={<CadastroResposta />} />
            <Route path="cadastro-usuario" element={<CadastroUsuario />} />
          </Route>

            {/** RETORNA PARA A ROTA LOGIN QUANDO QUALQUER ROTA NÃO EXISTI */}
          <Route path="*" element={<Navigate to="login" />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};
