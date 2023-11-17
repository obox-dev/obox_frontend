import { Tabs } from '@admin/components/molecules/Tabs';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { ITabItem } from '@admin/components/molecules/Tabs';
import { TabsSectionProps } from './types';
import { useState } from 'react';

export const TabsSection = <
  K extends { name: string },
  T extends { id: string, content: Record<string, K> },
>(props: TabsSectionProps<T>) => {
  const { items, title, buttonText, currentLanguage, actions, mainAction, onTabChange } = props;

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
      }
    };
  };

  return (
    <div className="tabs-section">
      <h2 className="tabs-section__title">{title}</h2>
      <Tabs
        items={items.map((item) => {
          return mapContent(item);
        })}
        actions={actions}
      />
      <Button onClick={mainAction} text={buttonText} variant={ButtonVariants.PRIMARY} />
    </div>
  );
};
