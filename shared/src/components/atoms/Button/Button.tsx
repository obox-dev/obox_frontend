import { IButton } from "./types";

export const Button = (props: IButton) => {
  const {
    text,
    onClick,
    variant,
    isDisabled,
  } = props;
  return (
    <button onClick={onClick} className={["btn", `btn-${variant}`].join(" ")} disabled={isDisabled}>
      {text}
    </button>
  );
};
