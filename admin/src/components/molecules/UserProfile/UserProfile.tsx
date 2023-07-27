import { UserProfileIcon } from "@admin/assets/icons/UserProfileIcon";
import { Button, ButtonVariants } from "@shared/components/atoms/Button";
import { t } from "i18next";

const UserProfile = () => {
  return (
    <div className="user-profile d-flex align-items-center gap-2">
      <UserProfileIcon />
      <span>Username</span>
      <Button text={t("common:logout")} variant={ButtonVariants.DANGER}></Button>
    </div>
  );
};

export default UserProfile;
