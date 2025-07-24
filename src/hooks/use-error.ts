import { AxiosError, type AxiosResponse } from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { ApiError } from "../shared/utils/api-error";

const useErrorHandler =() => {
  const handleError = useCallback((response: AxiosResponse) => {
    if (response instanceof AxiosError) {
      if (response.code === "ERR_NETWORK") {
        toast.error(
          "Não foi possível conectar ao servidor. Tente novamente mais tarde."
        );
      } else if (response.response) {
        switch (response.response.status) {
          case 400:            
            // toast.warning(response.data.Mensagem);
            ApiError(response.data.Mensagem);
            break;
          case 401:
            // toast.warning(response.data.Mensagem);
            ApiError(response.data.Mensagem);
            break;
          case 404:
            // toast.warning(response.data.Mensagem);
            ApiError(response.data.Mensagem);
            break;
          case 409:
            // toast.warning(response.data.Mensagem);
            ApiError(response.data.Mensagem);
            break;
          case 500:
            // toast.error(response.data.Mensagem);
            ApiError(response.data.Mensagem);
            break;
          default:
            toast.error(
              "statusCode: " +
                response?.data.status +
                " Erro: " +
                response?.data.title
            );
            break;
        }
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    } else {
      toast.error("Ocorreu um erro inesperado.");
    }
  }, []);

  return handleError;
};

export default useErrorHandler;
