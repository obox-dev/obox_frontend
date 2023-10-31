import { ExitButton } from '@admin/assets/icons/ExitButton';
import { useTranslation } from '@libs/react-i18next';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';

const UserProfile = () => {
  const { t } = useTranslation();

  return (
    <div className="user-profile d-flex align-items-center gap-2 py-2 mt-4">
      <Button icon={<ExitButton/>} text={t('common:logout')} variant={ButtonVariants.ICON_LINK}></Button>
    </div>
  );
};

export default UserProfile;
