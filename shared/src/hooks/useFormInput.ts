import { RegisterOptions, useFormContext } from 'react-hook-form';

export function useFormInput(name: string, options?: RegisterOptions) {
  const formContext = useFormContext();

  if (!formContext) {
    return {};
  }

  const { register, watch, formState: { errors } } = formContext;

  const { ref, ...registerParams } = register(name, options);

  const error = errors[name];

  return { ref, watch, registerParams, error };
}
