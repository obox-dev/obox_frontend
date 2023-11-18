import { useTranslation } from '@libs/react-i18next';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';

const AuthButtons = () => {
  const { t } = useTranslation();
  return (
    <div className="auth-buttons d-flex align-items-center gap-2">
      <Button innerContent={t('common:login')} variant={ButtonVariants.PRIMARY} />
      <Button innerContent={t('common:signin')} variant={ButtonVariants.WARNING} />
    </div>
  );
};

export default AuthButtons;
