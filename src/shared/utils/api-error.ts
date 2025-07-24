
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export function ApiError(error: unknown) {
  const errorMessage =
    error instanceof AxiosError && error.response?.data?.Mensagem
      ? error.response.data.Mensagem
      : 'Ocorreu um erro inesperado.';

  toast.error(errorMessage);
}