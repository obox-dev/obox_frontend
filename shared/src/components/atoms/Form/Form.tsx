import * as yup from "yup";
import { Ref, useImperativeHandle, forwardRef } from "react";
import {
  useForm,
  FormProvider,
  FieldValues,
  DefaultValues,
  Path,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormRef } from "./types";
import { AxiosError } from "axios";
import { useEffect } from "react";

interface FormProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>;
  validationSchema: yup.ObjectSchema<T>;
  onSubmit: (data: T) => void;
  children: JSX.Element;
}

const FormInner = <T extends FieldValues>(
  props: FormProps<T>,
  ref: Ref<FormRef>
) => {
  const { defaultValues, validationSchema, onSubmit, children } = props;
  const methods = useForm<T>({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const setTypedErrors = (errors: Partial<T>) => {
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const element = errors[key as keyof typeof errors];
        methods.setError(key as unknown as Path<T>, {
          type: "response",
          message: element as string,
        });
      }
    }
  };

  const internalSubmit = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (e) {
      const error = e as AxiosError<T>;

      const errors =
        error &&
        error.response &&
        error.response.data &&
        error.response.data.fields;

      if (Object.keys(errors).length) {
        setTypedErrors(errors);
      }
    }
  };

  useEffect(() => {
    for (const key in defaultValues) {
      methods.setValue(key as unknown as Path<T>, defaultValues[key]);
    }
  }, [defaultValues])

  useImperativeHandle(ref, () => ({
    submit: () => methods.handleSubmit(internalSubmit)(),
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(internalSubmit)}>{children}</form>
    </FormProvider>
  );
};

export const Form = forwardRef(FormInner);
