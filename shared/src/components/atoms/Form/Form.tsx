import { useForm } from "react-hook-form"
import { Button, ButtonVariants } from "../Button";
import { IForm } from './types';


export const Form = (props: IForm) => {
  const { onSubmit, children, submitButtonText, buttonDisabled } = props;
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
      { children }
      <Button text={submitButtonText} variant={ButtonVariants.PRIMARY} isDisabled={buttonDisabled} />
      </form>
    }
    </>
  );
};
