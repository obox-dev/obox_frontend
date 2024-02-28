import { useMemo } from 'react';
import { ToggleDots } from '@admin/assets/icons';
import { ActionMenu } from '@shared/components/atoms/ActionMenu';
import { Button } from '@shared/components/atoms/Button';
import { EntityState, WithEntityState } from '@shared/utils/types';
import { ActionButtonProps } from './types';
import './ActionButton.scss';

export const ActionButton = <T extends WithEntityState>(
  props: ActionButtonProps<T>
) => {
  const { id, label, isSelected, onClick, entity, actions, variant, isDisabled } = props;
  const { color_background: colorBackground, color_text: colorText } = entity;
  const isInavtive = useMemo(() => {
    return entity.state === EntityState.DISABLED;
  }, [entity]);
  return (
    <div
      className={[
        'action-button d-inline-flex',
        isSelected ? 'selected' : '',
        isInavtive ? 'is-inactive' : '',
      ].join(' ')}
    >
      <Button
        innerContent={label}
        variant={variant}
        className="action-button__start"
        onClick={() => {
          onClick(id);
        }}
        isDisabled={isDisabled}
        style={{backgroundColor: colorBackground, color: colorText}}
      />
      <ActionMenu
        toggleContent={<ToggleDots />}
        toggleVariant={variant}
        entity={entity}
        actions={actions}
        isDisabled={isDisabled}
        colorBackground={colorBackground}
        colorText = {colorText}
      />
    </div>
  );
};