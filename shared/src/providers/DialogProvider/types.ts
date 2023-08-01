export type DialogWidthType = "xl" | "lg" | "md" | "sm";

export type OpenDialogType = (args: {
  component: React.ReactNode;
  title: string;
  okCallback: () => void;
  cancelCallback: () => void;
  width: DialogWidthType;
  okText: string;
  cancelText: string;
}) => void;

export interface DialogPropTypes {
  openDialog: OpenDialogType;
  closeDialog: EmptyFunctionType;
}

export type EmptyFunctionType = () => void;
