
import { useForm } from 'react-hook-form';
import { Button, ButtonVariants } from '../Button';
import { IForm } from './types';

export const CustomForm = (props: IForm) => {
  const { onSubmit, children, submitButtonText, isDisabled } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      {children && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isDisabled}>
            {children}
            <Button
              text={submitButtonText}
              variant={ButtonVariants.PRIMARY}
              isDisabled={isDisabled}
              type="submit"
            />
          </fieldset>
        </form>
      )}
    </>
  );
};
