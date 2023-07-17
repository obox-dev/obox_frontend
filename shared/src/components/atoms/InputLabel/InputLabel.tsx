import { IInputLabel } from "./types";

export const InputLabel = (props: IInputLabel) => {
  const { text, forInput, children, className } = props;

  return (
    <label className={[className, "input-label"].join(" ")} htmlFor={forInput}>
      <span className="input-label__text">{text}</span>
      {children}
    </label>
  )
}
