export interface IForm {
  submitButtonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: Array<JSX.Element> | JSX.Element; // todo: rework to input groups
}
