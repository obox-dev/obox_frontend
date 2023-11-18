import { ITabs } from './types';
import { ActionMenu } from '@shared/components/atoms/ActionMenu';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { EntityState } from '@shared/utils/types';
import { ToggleDots } from '@admin/assets/icons';
import './Tabs.scss';

export const Tabs = <T extends { state: EntityState },>(props: ITabs<T>) => {
  const { items, actions, addToList } = props;

  return (
    <>
      <ul className="tabs-section__tabs nav nav-pills">
        {items.map((item) => {
          const { id, label, isSelected, onClick, entity } = item;
          return (
            <li
              className="tabs-section__tabs-item nav-item d-flex align-items-stretch"
              key={label}
            >
              <Button
                innerContent={label}
                variant={ButtonVariants.SECONDARY}
                className={[
                  'tabs-section__tabs-button',
                  isSelected ? 'active' : '',
                ].join(' ')}
                onClick={() => {
                  onClick(id);
                }}
              />
              <ActionMenu
                toggleContent={<ToggleDots />}
                entity={entity}
                actions={actions}
              />
            </li>
          );
        })}
        <li>{addToList}</li>
      </ul>
    </>
  );
};
