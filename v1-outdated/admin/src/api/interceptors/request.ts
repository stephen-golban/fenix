import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../../store";

export const onRequestInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig<any>> => {
  const { token } = useAuthStore.getState();
  if (config.headers && !config.headers.Authorization) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
