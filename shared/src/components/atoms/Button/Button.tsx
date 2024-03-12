import { ForwardedRef, forwardRef } from 'react';
import { IButton } from './types';
import './Button.scss';

export const InnerButton = (
  props: IButton,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const { innerContent, onClick, variant, isDisabled, type, className } = props;

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={['btn', `btn-${variant}`, className].join(' ')}
      disabled={isDisabled}
    >
      {innerContent}
    </button>
  );
};

export const Button = forwardRef(InnerButton);
