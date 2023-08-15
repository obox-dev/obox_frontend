import { Button, ButtonVariants } from "@shared/components/atoms/Button";
import { Dialog } from "@shared/components/molecules/Dialog/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";

import { Menu } from "./Menu";

export const MenuPage = () => {

const { openDialog } = useDialog();

const openMenuDialog = () => openDialog(({ closeDialog }) => (
  <Dialog
    okCallback={() => {
      console.log('OK pressed');
      closeDialog();
    }}
    cancelCallback={() => {
      console.log('Cancel pressed');
      closeDialog();
    }}
    title="My dialog"
    size="sm"
    okText="OK"
    cancelText="Cancel"
  >
    <span>My dialog body</span>
  </Dialog>
));

  return (
    <div>
      {/* <h1>Menu</h1>
      <p>Menu items go here.</p>
      <Button onClick={openMenuDialog} text="Open menu dialog" variant={ButtonVariants.PRIMARY}/> */}
      <Menu/>
    </div>
  );
};
