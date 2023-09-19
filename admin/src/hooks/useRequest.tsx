import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

export const useRequest = <T, R extends readonly any[]>({
  onSuccess,
  onStart,
  onError,
  onFinally,
  requestFunction,
  redirect404 = false,
  redirect404Path,
}: {
  requestFunction?: (...args: R) => Promise<T>;
  onSuccess?: (result: T, args: R) => void;
  onError?: (error: AxiosError) => void;
  onFinally?: () => void;
  onStart?: () => void;
  redirect404?: boolean;
  redirect404Path?: string;
}) => {
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate();

  const execute = async (...params: R): Promise<T> => {
    if (onStart) {
      onStart();
    }
    setError(null);
    let result = null;
    try {
      if (requestFunction) {
        result = await requestFunction(...params);
        if (onSuccess) {
          onSuccess(result, params);
        }
      }
    } catch (err) {
      const handledApiError = err as AxiosError;
      const isEnabledRedirectTo404 =
        redirect404 && handledApiError?.response?.status === 404;

      if (onError) {
        onError(handledApiError);
      }
      setError(handledApiError);

      if (isEnabledRedirectTo404) {
        navigate({
          pathname: "/not-found",
          ...(redirect404Path
            ? { search: createSearchParams({ redirect404Path }).toString() }
            : {}),
        });
      }
      throw handledApiError;
    } finally {
      if (onFinally) {
        onFinally();
      }
    }
    return result as T;
  };
  return {
    execute,
    error,
  };
};
