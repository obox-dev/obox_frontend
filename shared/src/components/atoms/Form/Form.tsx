import React, { createRef, useState, forwardRef, useImperativeHandle } from 'react';
import { IForm } from './types';
import * as yup from 'yup';

const FormInner = <T, >(props: IForm<T>, ref: React.ForwardedRef<T>) => {
  const { onSubmit, children, isDisabled, validationSchema } = props;

  const formRef = createRef<HTMLFormElement>();
  const [errors, setErrors] = useState({});

  const validate = async (data: T): Promise<boolean> => {
    if (validationSchema) {
      try {
        await validationSchema.validate(data, { abortEarly: false });
        setErrors({});
        return true;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errorMessages: Record<string, string[]> = {};
          error.inner.forEach((err) => {
            if (err.path) {
              if (errorMessages[err.path]) {
                errorMessages[err.path].push(err.message);
              } else {
                errorMessages[err.path] = [err.message];
              }
            }
          });
          setErrors(errorMessages);
        }
        return false;
      }
    }
    return true;  // If no schema is provided, assume valid by default.
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as any);
    const data = Object.fromEntries([...formData.entries()]) as unknown as T;

    if (await validate(data)) {
      onSubmit(data);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    },
  }) as unknown as T);

  // Pass errors as a context or directly as a prop to children
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <fieldset disabled={isDisabled}>
        {children}
      </fieldset>
      <span>{JSON.stringify(errors)}</span>
    </form>
  );
};

export const Form = forwardRef(FormInner) as <T>(
  props: IForm<T> & {
    ref?: React.ForwardedRef<T>,
  },
) => ReturnType<typeof FormInner>;
