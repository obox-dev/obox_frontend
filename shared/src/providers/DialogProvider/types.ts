export type DialogComponent = (props: { closeDialog: () => void }) => JSX.Element;

export interface DialogProviderInterface {
  openDialog: (Component: DialogComponent) => void;
  closeAll: () => void;
}

export interface IDialog {
  Dialog: DialogComponent;
  key: number;
  closeDialog: () => void;
}
