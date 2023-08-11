import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ButtonVariants } from '@shared/components/atoms/Button/index';
import { IForm } from '@shared/components/atoms/Form/types';

export const CustomForm = (props: IForm) => {
  const { onSubmit, children, submitButtonText, isDisabled } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <>
      {children && (
        <form onSubmit={handleFormSubmit}>
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
