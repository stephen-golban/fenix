import React from 'react';

import { inRange } from 'lodash';

import type { AxiosError, AxiosResponse } from 'axios';
import type { RequestMethod, Call, UseAxiosRequestReturn } from '../types';
import { notification } from 'antd';
import api from '../base';

const useAxiosRequest = <T extends object = any>(url: string, method: RequestMethod = 'get', shoutError = true, overwrite = false) => {
  const [toast] = notification.useNotification();

  const [error, setError] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const controllerRef = React.useRef(new AbortController());

  const cancel = React.useCallback(() => controllerRef.current.abort(), [controllerRef]);

  const handleSuccess = React.useCallback((response: AxiosResponse<T, any>, successCallback?: (response: T) => void) => {
    if (inRange(response.status, 200, 210) || response.data) {
      successCallback && successCallback(response.data);
      return response.data;
    }
  }, []);

  const handleError = React.useCallback(
    (err: AxiosError<any>) => {
      if (!err.response || !err.response.data) {
        toast.error({
          message: 'Sorry, but the service is experiencing a problem. Please try again in a few moments.',
        });
      } else {
        const status = err.response.data.status;
        const detail = err.response.data.detail || err.response.data[0]?.msg || err?.response?.data?.msg;

        if (detail) {
          setError(detail);

          if (shoutError && status !== 402) {
            toast.error({ message: detail });
          }
        }
      }

      console.log(err);
      console.log(err.response?.data);
    },
    [shoutError, toast],
  );

  const call = React.useCallback<Call<T>>(
    async (...args) => {
      try {
        setLoading(true);
        const response = await api.request<T>({
          baseURL: overwrite ? url : api.defaults.baseURL,
          url: args[2]?.additionalUrl ? url + args[2].additionalUrl : url,
          method,
          data: args[0],
          signal: controllerRef.current.signal,
          ...args[2],
        });

        return handleSuccess(response, args[1]);
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [handleError, handleSuccess, method, overwrite, url],
  );

  const memoized = React.useMemo<UseAxiosRequestReturn<T>>(() => {
    return [call, { cancel, loading, error, isSuccessfulRequest: !loading && !error }];
  }, [error, loading, cancel, call]);

  return memoized;
};

export default useAxiosRequest;
