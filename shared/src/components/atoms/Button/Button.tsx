import { IButton } from './types';
import './Button.scss';

export const Button = (props: IButton) => {
  const {
    innerContent,
    onClick,
    variant,
    isDisabled,
    type,
    className,
  } = props;
  return (
    <button type={type} onClick={onClick} className={['btn', `btn-${variant}`, className].join(' ')} disabled={isDisabled}>
      {innerContent}
    </button>
  );
};
