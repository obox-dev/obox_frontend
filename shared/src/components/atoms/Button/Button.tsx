import { IButton } from "./types";

export const Button = (props: IButton) => {
  const { text, onClick, variant } = props;
  return (
    <button type="button" onClick={onClick} className={["btn", `btn-${variant}`].join(" ")}>
      {text}
    </button>
  );
};
