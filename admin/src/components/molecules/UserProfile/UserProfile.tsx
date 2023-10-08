import { useTranslation } from "@libs/react-i18next";
import { Button, ButtonVariants } from "@shared/components/atoms/Button";

const UserProfile = () => {
  const { t } = useTranslation();

  return (
    <div className="user-profile d-flex align-items-center gap-2">
      <Button text={t("common:logout")} variant={ButtonVariants.DANGER}></Button>
    </div>
  );
};

export default UserProfile;
