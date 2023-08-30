import { useFormContext } from "react-hook-form";
import { IInput, InputVariants } from "../Input/types";

export const FormInput = (props: IInput<HTMLInputElement>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { name, placeholder, type, isDisabled, onChange } = props;

  const getClass = (type: InputVariants): string => {
    const classes: Partial<{ [key in InputVariants]: string }> = {
      [InputVariants.CHECKBOX]: "form-check-input",
      [InputVariants.RADIO]: "form-check-input",
    };
    return classes[type] || "form-control mb-2";
  };

  return (
    <div>
      <input
        {...register(name, {
          onChange
        })}
        name={name}
        type={type}
        className={getClass(type)}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      {errors[name] && (
        <span className="text-danger">{errors[name]?.message as string}</span>
      )}
    </div>
  );
};
