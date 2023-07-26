import { useForm } from "react-hook-form"
import { Button, ButtonVariants } from "../Button";
import { IForm } from './types';


export const Form = (props: IForm) => {
  const { onSubmit, children, submitButtonText, isDisabled } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({

  })
  return (
    <>
    {children && <form onSubmit={onSubmit}>
      <fieldset disabled={isDisabled}>
        { children }
      </fieldset>
      <Button text={submitButtonText} variant={ButtonVariants.PRIMARY} isDisabled={isDisabled} />
      </form>
    }
    </>
  );
};
