import { RegisterOptions, useFormContext } from 'react-hook-form';

export function useFormInput(name: string, options?: RegisterOptions, ignoreFormContext = false) {
  const formContext = useFormContext();

  if (!formContext || ignoreFormContext) {
    return {};
  }

  const { register, watch, formState: { errors } } = formContext;

  const { ref, ...registerParams } = register(name, options);

  const error = errors[name];

  return { ref, watch, registerParams, error };
}
