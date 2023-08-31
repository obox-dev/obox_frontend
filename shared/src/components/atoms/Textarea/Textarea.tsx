import { useFormContext } from "react-hook-form";
import { ITextareaProps } from "./types";

export const Textarea = (props: ITextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { id, name, placeholder, onChange, value, isDisabled, className } =
    props;

  return (
    <div>
      <textarea
        {...register(name, {
          onChange,
        })}
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      {errors[name] && (
        <span className="text-danger">{errors[name]?.message as string}</span>
      )}
    </div>
  );
};
