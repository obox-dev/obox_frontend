import { ITabs } from './types';
import { ButtonVariants } from '@shared/components/atoms/Button';
import { WithEntityState } from '@shared/utils/types';
import { ActionButton } from '@admin/components/atoms/ActionButton';
import './Tabs.scss';

export const Tabs = <T extends WithEntityState>(props: ITabs<T>) => {
  const { items, actions, addToList } = props;

  return (
    <>
      <ul className="tabs-section__tabs nav nav-pills">
        {items.map((item) => {
          const { id, label, isSelected, onClick, entity, isDisabled } = item;
          return (
            <li
              className="tabs-section__tabs-item nav-item d-flex align-items-stretch"
              key={label}
            >
              <ActionButton
                entity={entity}
                actions={actions}
                variant={ButtonVariants.SECONDARY}
                id={id}
                label={label}
                onClick={onClick}
                isDisabled={isDisabled}
                isSelected={isSelected}
              />
            </li>
          );
        })}
        <li>{addToList}</li>
      </ul>
    </>
  );
};
