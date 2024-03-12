import { AxiosError } from 'axios';
import { useRequest } from '@admin/hooks';
import { AuthService, TokenResponse } from '@shared/services';
import { useCallback } from 'react';


interface AuthConfirmParams {
  onSuccess: (response: TokenResponse) => Promise<void>;
  onError?: (error: AxiosError) => void;
  onFinally?: () => void;
}

export const useAuthConfirm = (args: AuthConfirmParams) => {
  const { onSuccess, onError, onFinally } = args;

  const requestFunction = useCallback(AuthService.confirm, []);

  const { execute: confirmAuthentication } = useRequest({
    requestFunction,
    onSuccess,
    onError,
    onFinally,
  });

  return { confirmAuthentication };
};
