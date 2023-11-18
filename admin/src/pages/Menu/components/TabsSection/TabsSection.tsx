import { useState } from 'react';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { Tabs } from '@admin/components/molecules/Tabs';
import { ITabItem } from '@admin/components/molecules/Tabs';
import { TabsSectionProps } from './types';
import './TabsSection.scss';
import { PlusIcon } from '@admin/assets/icons';
import { EntityState } from '@shared/utils/types';

export const TabsSection = <
  K extends { name: string },
  T extends { id: string; state: EntityState; content: Record<string, K> },
>(props: TabsSectionProps<T>) => {
  const {
    items,
    title,
    buttonText,
    currentLanguage,
    actions,
    mainAction,
    onTabChange,
  } = props;

  const [selectedTab, setSelectedTab] = useState('');

  const mapContent = (item: T): ITabItem<T> => {
    return {
      id: item.id,
      label: item.content[currentLanguage].name,
      entity: item,
      isSelected: selectedTab === item.id,
      onClick: (id: string) => {
        setSelectedTab(id);
        onTabChange(id);
      },
    };
  };

  return (
    <div className="tabs-section">
      <h2 className="tabs-section__title">{title}</h2>
      <div className="tabs-section__body d-flex align-items-center flex-wrap">
        <Tabs
          items={items.map((item) => {
            return mapContent(item);
          })}
          actions={actions}
          addToList={
            <Button
              className="tabs-section__action d-flex align-items-center gap-2"
              onClick={mainAction}
              innerContent={
                <>
                  <PlusIcon />
                  {buttonText}
                </>
              }
              variant={ButtonVariants.PRIMARY}
            />
          }
        />
      </div>
    </div>
  );
};
