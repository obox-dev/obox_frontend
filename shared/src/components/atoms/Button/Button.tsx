import { IButton } from "./types";

export const Button = (props: IButton) => {
  const {
    text,
    onClick,
    variant,
    isDisabled,
  } = props;
  return (
<<<<<<< Updated upstream
    <button type="button" onClick={onClick} className={["btn", `btn-${variant}`].join(" ")}>
=======
    <button onClick={onClick} className={["btn", `btn-${variant}`].join(" ")} disabled={isDisabled}>
>>>>>>> Stashed changes
      {text}
    </button>
  );
};
