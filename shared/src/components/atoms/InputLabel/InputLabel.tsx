import { IInputLabel } from "./types";

export const InputLabel = (props: IInputLabel) => {
  const {
    text,
    forInput,
    children,
    className,
    wrapperClassName
  } = props;

  return (
    <label className={[wrapperClassName, "input-label"].join(" ")} htmlFor={forInput}>
      <span className={[className, "input-label__text"].join(" ")}>{text}</span>
      {children}
    </label>
  )
}
