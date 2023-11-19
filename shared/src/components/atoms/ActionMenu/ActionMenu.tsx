import Dropdown from 'react-bootstrap/Dropdown';
import { WithEntityState } from '@shared/utils/types';
import { Button, ButtonVariants } from '../Button';
import { IActionMenu } from './types';
import './ActionMenu.scss';

export const ActionMenu = <T extends WithEntityState>(
  props: IActionMenu<T>
) => {
  const {
    actions,
    entity,
    toggleVariant = ButtonVariants.PRIMARY,
    toggleContent,
  } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={Button}
        innerContent={toggleContent}
        variant={toggleVariant}
        id="dropdown-basic"
      ></Dropdown.Toggle>
      <Dropdown.Menu>
        {actions.map(({ label, callback, renderLabel }, index) => {
          const labelContent =
            renderLabel?.({ state: entity.state }) || label || '-';
          return (
            <Dropdown.Item key={Date.now() + index} onClick={() => callback(entity)}>
              {labelContent}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
