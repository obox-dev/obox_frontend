import Dropdown from 'react-bootstrap/Dropdown';
import { IActionMenu } from "./types";

export const ActionMenu = <T, >(props: IActionMenu<T>) => {
  const { actions, category } = props;

    return (
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {actions.map(({ label, callback }) => <Dropdown.Item key={label} onClick={() => callback(category) }>{label}</Dropdown.Item>)}
      </Dropdown.Menu>
    </Dropdown>
  );
};
