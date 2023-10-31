import React from 'react';
import { useTranslation } from '@libs/react-i18next';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import './NotFound.scss';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="not-found-404">404</div>
      <div className="message">
        <h1>{t('common:notFoundTitle')}</h1>
        <p className="p">{t('common:notFoundMessage')}</p>
        <div className="button-group">
          <Button
            text={t('common:prevPageButton')}
            variant={ButtonVariants.SUCCESS}
            onClick={() => window.history.back()}
          />
          <div style={{ width: '20px' }}></div>
          <Button
            text={t('common:homeButton')}
            variant={ButtonVariants.PRIMARY}
            onClick={() => (window.location.href = '/')}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
