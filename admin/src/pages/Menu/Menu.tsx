import { Button, ButtonVariants } from "@shared/components/atoms/Button";
import { Dialog } from "@shared/components/molecules/Dialog/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";

export const Menu = () => {

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

const openOtherDialog = () => openDialog(({ closeDialog }) => (
  <Dialog
    okCallback={() => {
      console.log('another OK pressed');
      closeDialog();
    }}
    cancelCallback={() => {
      console.log('another Cancel pressed');
      closeDialog();
    }}
    title="My another dialog"
    size="lg"
    okText="OK OK"
    cancelText="Cancel Cancel"
  >
    <span>My dialog body</span>
  </Dialog>
));
  return (
    <div>
      <h1>Menu</h1>
      <p>Menu items go here.</p>
      <Button onClick={openMenuDialog} text="Open menu dialog" variant={ButtonVariants.PRIMARY}/>
      <Button onClick={openOtherDialog} text="Open another menu dialog" variant={ButtonVariants.DANGER}/>
    </div>
  );
};
