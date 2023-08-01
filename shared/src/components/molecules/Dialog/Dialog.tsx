import React, { useState, useCallback } from "react";
import { Button } from "@shared/components/atoms/Button";
import { ButtonVariants } from "@shared/components/atoms/Button";
import { DialogPropTypes } from "@shared/providers/DialogProvider/types";
import WithDialog from "@shared/providers/DialogProvider/WithDialog";
import {DialogProvider} from "@shared/providers/DialogProvider/DialogProvider";

const Dialog: React.FC<DialogPropTypes> = ({ openDialog, closeDialog }) => {
  const handleButtonClick = () => {
    const component = <DialogProvider>
      <p></p>
    </DialogProvider>;
    openDialog({
      component,
      title: "My Dialog Title",
      okCallback: handleDialogOkClick,
      cancelCallback: handleDialogCancelClick,
      width: "lg",
      okText: "OK",
      cancelText: "Cancel"
    });
  };

  const handleDialogOkClick = useCallback(() => {
    console.log("Dialog Ok button clicked!");
  }, []);

  const handleDialogCancelClick = useCallback(() => {
    closeDialog();
  }, [closeDialog]);

  return (
    <div>
      <Button variant={ButtonVariants.PRIMARY} text={"open"} onClick={handleButtonClick}></Button>
    </div>
  );
};

export default WithDialog(Dialog);
