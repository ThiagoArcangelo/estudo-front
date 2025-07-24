import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes/routes";
import { AuthContextProvider } from "./shared/context/AuthContext";
import { ConfirmDialogProvider } from "./shared/context/ConfirmDialogContext";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ConfirmDialogProvider>
        <AuthContextProvider>
          <AppRoutes />
        </AuthContextProvider>
      </ConfirmDialogProvider>
    </>
  );
}

export default App;
