import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@shared/components/atoms/Button';

import { ButtonVariants } from '@shared/components/atoms/Button';
import { DialogPropTypes } from './types';
import './Dialog.scss';

export const Dialog: React.FC<DialogPropTypes> = (props: DialogPropTypes) => {
  const {
    title,
    size,
    okCallback,
    cancelCallback,
    okText,
    cancelText,
    children,
    okButtonVariant = ButtonVariants.PRIMARY,
    cancelButtonVariant = ButtonVariants.SECONDARY,
  } = props;
  return (
    <Modal show size={size} onHide={cancelCallback}>
      {title && <Modal.Header closeButton>{title}</Modal.Header>}
      {children && <Modal.Body>{children}</Modal.Body>}
      <Modal.Footer>
        <Button innerContent={okText} variant={okButtonVariant} onClick={okCallback} />
        <Button
          innerContent={cancelText}
          variant={cancelButtonVariant}
          onClick={cancelCallback}
        />
      </Modal.Footer>
    </Modal>
  );
};
