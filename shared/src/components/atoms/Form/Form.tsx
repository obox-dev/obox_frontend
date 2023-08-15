import React, { forwardRef, useImperativeHandle } from 'react';
import { IForm } from './types';

export const Form = forwardRef((props: IForm, ref) => {
  const { onSubmit, children, isDisabled } = props;

  const formRef = React.createRef<HTMLFormElement>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    },
  }));

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
});
