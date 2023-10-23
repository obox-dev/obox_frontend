import { IButton } from "./types";
import "./Button.scss";

export const Button = (props: IButton) => {
  const {
    text,
    onClick,
    variant,
    isDisabled,
    type,
    icon,
  } = props;
  return (
    <button type={type} onClick={onClick} className={["btn", `btn-${variant}`].join(" ")} disabled={isDisabled}>
      {icon}
      {text}
    </button>
  );
};
