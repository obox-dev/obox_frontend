export interface IForm {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: Array<JSX.Element> | JSX.Element; // todo: rework to input groups
  isDisabled?: boolean;
}
