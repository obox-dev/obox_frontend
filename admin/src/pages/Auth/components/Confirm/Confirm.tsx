// import { useTranslation } from '@libs/react-i18next';
import { useLocation } from 'react-router';
import { useEffect, useMemo } from 'react';
import { useAuthConfirm } from '../../hooks/useAuthConfirm';
import { TokenResponse } from '@shared/services';
import { useDispatch } from 'react-redux';
import { actions as sessionActions } from '@admin/store/session.slice';

const Confirm = () => {
  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);
  const key = useMemo(() => query.get('key'), [query]);
  const dispatch = useDispatch();


  const { confirmAuthentication } = useAuthConfirm({
    onSuccess: async (res: TokenResponse) => {
      dispatch(sessionActions.setTokens({
        accessToken: res.access_token,
        refreshToken: res.refresh_token,
      }));
    },
    onError() {
      // console.log('error');
    },
  });

  useEffect(() => {
    if (key) {
      confirmAuthentication(key);
    }
  }, []);

  return (
    <div className="auth__form">
      <h2>Confirming your account...</h2>
      <p>Loader will be here</p>
    </div>
  );
};

export default Confirm;
