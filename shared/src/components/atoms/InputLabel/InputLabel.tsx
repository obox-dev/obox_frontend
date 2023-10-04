import { IInputLabel } from "./types";

export const InputLabel = (props: IInputLabel) => {
  const {
    text,
    forInput,
    children,
    className
  } = props;

  return (
    <label className="input-label" htmlFor={forInput}>
      <span className={[className, "input-label__text"].join(" ")}>{text}</span>
      {children}
    </label>
  )
}
