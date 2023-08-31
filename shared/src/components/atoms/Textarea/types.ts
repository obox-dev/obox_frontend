import { ChangeEvent } from "react";

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  name: string;
  placeholder?: string;
  value?: string;
  isDisabled?: boolean;
  className?: string;
}
