import { AxiosRequestConfig, AxiosResponse } from "axios";

type RequestMethod = "get" | "delete" | "head" | "post" | "put" | "patch";
type RequestConfig = Omit<AxiosRequestConfig, "data">;
type RequestResponse<
  T extends object,
  K extends "promise" | undefined = "promise"
> = K extends "promise"
  ? Promise<AxiosResponse<T, any>["data"] | undefined>
  : AxiosResponse<T, any>["data"];

type Call<T extends object> = (
  payload?: AxiosRequestConfig["data"],
  successfulCB?: (response: AxiosResponse<T, any>["data"]) => void,
  config?: RequestConfig & { additionalUrl?: string }
) => RequestResponse<T>;

type UseAxiosRequestUtilities = {
  error: object | undefined;
  loading: boolean;
  cancel: () => void;
  isSuccessfulRequest: boolean;
};

type UseAxiosRequestReturn<T extends object = any> = [
  Call<T>,
  UseAxiosRequestUtilities
];

export type { Call, RequestMethod, UseAxiosRequestReturn };
