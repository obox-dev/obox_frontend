import 'yup';

declare module 'yup' {
  interface MixedSchema<T = string | number | undefined> {
    nullableNumber(message?: string): NumberSchema<T>;
  }
}
