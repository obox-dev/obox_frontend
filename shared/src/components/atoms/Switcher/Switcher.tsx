import { Input } from '../Input';
import { InputVariants } from '../Input';
import { InputLabel } from '../InputLabel';
import { ISwitcher } from './types';
import "./Switcher.scss";

export const Switcher = (props: ISwitcher) => {
  const { name, text, onChange } = props;
  return (
    <>
    <InputLabel wrapperClassName="switch">
      <Input onChange={onChange} name={name} type={InputVariants.CHECKBOX} />
      <span className="slider round"></span>
    </InputLabel>
    <span>{text}</span>
    </>
  );
};
