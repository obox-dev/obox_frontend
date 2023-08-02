export type DialogSizeOptions = "xl" | "lg" | "sm";
export interface DialogPropTypes {
  title: string;
  okCallback: () => void;
  cancelCallback: () => void;
  size: DialogSizeOptions;
  okText: string;
  cancelText: string;
  children?: JSX.Element | JSX.Element[];
}
