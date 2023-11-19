import { useNavigate } from 'react-router';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { BackButton } from '@admin/assets/icons';
import './LayoutWithBackButton.scss';

interface ILayoutWithBackButton {
  backButtonVariant: ButtonVariants;
  backTo: string;
  title: string;
  description?: string;
  children: JSX.Element;
}

export const LayoutWithBackButton = (props: ILayoutWithBackButton) => {
  const { backButtonVariant, backTo, title, description, children } = props;
  const navigate = useNavigate();
  return (
    <>
      <div className="layout__header">
        <div className="layout__header-top">
          <Button
            className="layout__header-back-button"
            innerContent={
              <>
                <BackButton />
              </>
            }
            variant={backButtonVariant}
            onClick={() => {
              navigate(backTo);
            }}
          />
          <h1 className="layout__header-title">{title}</h1>
        </div>
        {description && (
          <p className="layout__header-description">{description}</p>
        )}
      </div>
      {children}
    </>
  );
};
