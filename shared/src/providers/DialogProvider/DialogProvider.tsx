import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import dialogContext from "./dialogContext";

import {
  DialogWidthType,
  DialogPropTypes,
  OpenDialogType,
  EmptyFunctionType,
} from "./types";

interface PropTypes {
  children: React.ReactNode;
}

export const DialogProvider: React.FC<PropTypes> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [okText, setOkText] = useState("OK");
  const [cancelText, setCancelText] = useState("Cancel");
  const [width, setWidth] = useState<DialogWidthType>("md");
  const [component, setComponent] = useState<React.ReactNode>(null);
  const [okCallback, setOkCallback] = useState<EmptyFunctionType>(() => {
    console.log("Not implemented!");
  });
  const [cancelCallback, setCancelCallback] = useState<EmptyFunctionType>(
    () => {
      console.log("Not implemented!");
    }
  );

  const value: DialogPropTypes = {
    openDialog: ({
      component,
      title,
      okCallback,
      cancelCallback,
      width,
      okText,
      cancelText,
    }) => {
      setComponent(component);
      setTitle(title);
      setOkCallback(okCallback);
      setCancelCallback(cancelCallback);
      setWidth(width);
      setOkText(okText);
      setCancelText(cancelText);
      setIsOpen(true);
    },
    closeDialog: () => {
      setIsOpen(false);
    },
  };

  const handleCloseClick = () => {
    if (cancelCallback) {
      cancelCallback();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <dialogContext.Provider value={value}>
      <Modal show={isOpen} onHide={handleCloseClick} width={width}>
        {title && <Modal.Header closeButton>{title}</Modal.Header>}
        <Modal.Body>{component}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClick}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={okCallback}>
            {okText}
          </Button>
        </Modal.Footer>
      </Modal>
      {children}
    </dialogContext.Provider>
  );
};
