import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "@shared/components/atoms/Button";

import { ButtonVariants } from "@shared/components/atoms/Button";
import { DialogPropTypes } from "./types";

export const Dialog: React.FC<DialogPropTypes> = (props: DialogPropTypes) => {
  const {
    title,
    size,
    okCallback,
    cancelCallback,
    okText,
    cancelText,
    children
  } = props;
  return (
    <Modal show size={size} onHide={cancelCallback}>
      {title && <Modal.Header closeButton>{title}</Modal.Header>}
      {children && <Modal.Body>{children}</Modal.Body>}
      <Modal.Footer>
        <Button text={cancelText} variant={ButtonVariants.SECONDARY} onClick={cancelCallback} />
        <Button text={okText} variant={ButtonVariants.PRIMARY} onClick={okCallback} />
      </Modal.Footer>
    </Modal>
  );
};
