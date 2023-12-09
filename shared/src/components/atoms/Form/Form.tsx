import { AxiosError } from 'axios';
import { Ref, useImperativeHandle, forwardRef, useEffect } from 'react';
import {
  useForm,
  FormProvider,
  FieldValues,
  DefaultValues,
  Path,
  PathValue,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormRef } from './types';
import { useTranslation } from '@libs/react-i18next';

interface FormProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>;
  validationSchema: yup.ObjectSchema<T>;
  onSubmit: (data: T) => void;
  children: JSX.Element;
}

const FormInner = <T extends FieldValues>(
  props: FormProps<T>,
  ref: Ref<FormRef<T>>
) => {
  const { t } = useTranslation();
  const { defaultValues, validationSchema, onSubmit, children } = props;
  const methods = useForm<T>({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(validationSchema, { abortEarly: false }),
  });

  const setTypedErrors = (errors: Partial<T>) => {
    for (const key in errors) {
      if (key in errors) {
        const message = errors[key as keyof typeof errors];
        methods.setError(key as unknown as Path<T>, {
          type: 'response',
          message: message as string,
        });
      }
    }
  };

  const formatValues = (data: T): T => {
    const resultingData = {} as T;
    for (const [key, value] of Object.entries(data)) {
      const accessor = key as keyof T;
      
      if (value?.value) {
        resultingData[accessor] = value.value;
      } else if (Array.isArray(value)) {
        resultingData[accessor] = value.map((item) => item.value ?? item) as T[keyof T];
      } else {
        resultingData[accessor] = value;
      }
    }
    return resultingData;
  };

  const internalSubmit = async (data: T) => {
    try {
      methods.clearErrors();
      await onSubmit(formatValues(data));
    } catch (e) {
      const error = e as AxiosError<T>;
      const errors =
        error &&
        error.response &&
        error.response.data &&
        error.response.data.fields;

      if (errors && Object.keys(errors).length) {
        setTypedErrors(errors);
      }
    }
  };

  useEffect(() => {
    methods.clearErrors();
  }, [t]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      return methods.handleSubmit(internalSubmit)();
    },
    setValue: (key: Path<T>, value: PathValue<T, Path<T>>) => {
      methods.setValue(key, value);
    },
    reset: () => {
      methods.reset();
    },
    clearFieldErrors: (key: Path<T>) => {
      methods.clearErrors(key);
    }
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(internalSubmit)}>{children}</form>
    </FormProvider>
  );
};

export const Form = forwardRef(FormInner);
