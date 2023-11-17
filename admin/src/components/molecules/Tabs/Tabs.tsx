import { ITabs } from './types';
import { ActionMenu } from '@shared/components/atoms/ActionMenu';

export const Tabs = <T,>(props: ITabs<T>) => {
  const { items, actions } = props;

  return (
    <>
      <ul className="nav nav-pills">
        {items.map((item) => {
          const { id, label, isSelected, onClick, entity } = item;
          return (
            <li className="nav-item" key={label}>
              <button
                className={['nav-link', isSelected ? 'active' : ''].join(' ')}
                aria-current="page"
                onClick={() => {
                  onClick(id);
                }}
              >
                {label}
              </button>
              <ActionMenu entity={entity} actions={actions} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
