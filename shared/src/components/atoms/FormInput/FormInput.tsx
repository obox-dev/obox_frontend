import { IInput } from '../Input/types';
import { Input } from '../Input';
import { useFormInput } from '@shared/hooks/useFormInput';

export const FormInput = (props: IInput<HTMLInputElement>) => {
  const { name, placeholder, type, isDisabled, onChange } = props;
  const { ref, registerParams, error } = useFormInput(name, { onChange });

  return (
    <div>
      <Input
        {...registerParams}
        innerRef={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        isDisabled={isDisabled}
      />
      {error && (
        <span className="text-danger">{error.message as string}</span>
      )}
    </div>
  );
};
