import { IInputLabel } from './types';
import './InputLabel.scss';

export const InputLabel = (props: IInputLabel) => {
  const { text, forInput, children, className, wrapperClassName } = props;

  const labelClassName = wrapperClassName
    ? [wrapperClassName, 'input-label'].join(' ')
    : 'input-label';

  const labelTextClassName = className
    ? [className, 'input-label__text'].join(' ')
    : 'input-label__text';

  return (
    <label className={labelClassName} htmlFor={forInput}>
      <span className={labelTextClassName}>{text}</span>
      {children}
    </label>
  );
};
