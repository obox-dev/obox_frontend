import React, { forwardRef, useImperativeHandle } from 'react';
import { IForm } from './types';


const FormInner = <T, >(props: IForm<T>, ref: React.ForwardedRef<T>) => {
  const { onSubmit, children, isDisabled } = props;

  const formRef = React.createRef<HTMLFormElement>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as any);
    const data = Object.fromEntries([...formData.entries()]) as unknown as T;
    onSubmit(data);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    },
  }) as unknown as T);

  return (
    <>
    {children && <form ref={formRef} onSubmit={handleSubmit}>
      <fieldset disabled={isDisabled}>
        { children }
      </fieldset>
      </form>
    }
    </>
  );
};


export const Form = forwardRef(FormInner) as <T>(
  props: IForm<T> & {
    ref?: React.ForwardedRef<T>,
  },
) => ReturnType<typeof FormInner>;
