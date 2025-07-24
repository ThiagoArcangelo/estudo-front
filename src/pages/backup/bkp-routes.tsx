// import { Suspense, lazy, useContext } from "react";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CadMotDesligamento from "../../pages/cadastroMotivo/cadastro-motivo";
import { AnimatePresence } from "motion/react";
import PaginaInicial from "../pagina-inicial/layout";
import CadDetMotDesligamento from "../../pages/cadastroDetalhamentoMotivo/cadastro-det-motivo";
import CadastroFatores from "../../pages/cadastroFatores/cadastro-fatores";
import CadastroPerguntaAvaliacao from "../../pages/cadastroPerguntaAvaliacao/cadastro-perguntas-avaliacao";
import CadastroResposta from "../../pages/cadastroRespostas/cadastro-resposta";
// import { AuthContext } from "../shared/context/AuthContext";

const Login = lazy(() => import("../../pages/login/login"));
const CadastroUsuario = lazy(
  () => import("../../pages/cadastroUsuario/cadastro-usuario")
);

export const AppRoutes = () => {
  // const { isLogged } = useContext(AuthContext);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div>Carregando ...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path={"/"}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="login">
              <Route index element={<Login />} />
            </Route>

            <Route path="/pagina-inicial">
              <Route
                index
                element={
                  localStorage.getItem("token") ? (
                    <PaginaInicial />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Route>

            <Route path="/cad-motivo-desligamento">
              <Route
                index
                element={
                  localStorage.getItem("token") ? (
                    <CadMotDesligamento />
                  ) : (
                    <Navigate to="/login" />
                  )
                  // <CadMotDesligamento />
                }
              />
            </Route>
            <Route path="/cad-det-motivo-desligamento">
              <Route
                index
                element={
                  localStorage.getItem("token") ? (
                    <CadDetMotDesligamento />
                  ) : (
                    <Navigate to="/login" />
                  )
                  // <CadDetMotDesligamento />
                }
              />
            </Route>
            <Route path="/cadastro-fatores">
              <Route
                index
                element={
                  localStorage.getItem("token") ? (
                    <CadastroFatores />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Route>
            <Route path="cad-pergunta-avaliacao">
              <Route
                index
                element={
                  localStorage.getItem("token") ? (
                    <CadastroPerguntaAvaliacao />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              ></Route>
            </Route>
            <Route path="/cadastro-resposta">
              <Route
                index
                element={
                  localStorage.getItem("token") ? (
                    <CadastroResposta />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Route>
            <Route path="/cadastro-usuario">
              <Route
                index
                element={
                  localStorage.getItem("token") ? (
                    <CadastroUsuario />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              ></Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};
