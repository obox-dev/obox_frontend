import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { IActionMenu } from "./types";

export const ActionMenu = <T, >(props: IActionMenu<T>) => {
  const { actions, entity } = props;

    return (
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {actions.map(({ label, callback }) => <Dropdown.Item key={label} onClick={() => callback(entity) }>{label}</Dropdown.Item>)}
      </Dropdown.Menu>
    </Dropdown>
  );
};
