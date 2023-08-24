import { IButton } from "./types";

export const Button = (props: IButton) => {
  const {
    text,
    onClick,
    variant,
    isDisabled,
    type,
  } = props;
  return (
    <button type={type} onClick={onClick} className={["btn", `btn-${variant}`].join(" ")} disabled={isDisabled}>
      {text}
    </button>
  );
};
