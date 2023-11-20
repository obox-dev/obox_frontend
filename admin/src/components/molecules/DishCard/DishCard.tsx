import { useTranslation } from '@libs/react-i18next';
import { Switcher } from '@shared/components/atoms/Switcher';
import { mapDishContent } from '@shared/mappers/DishMapper';
import { DishActionTypes } from '@admin/pages/Menu/components/MenuDish/types';
import { IDishCard } from './types';
import './DishCard.scss';

export const DishCard = (props: IDishCard) => {
  const { dishItem, actions, language } = props;
  const { t } = useTranslation();

  const dish = mapDishContent(dishItem, language);

  const updateStateAction = actions[DishActionTypes.UPDATE_STATE];
  const editDishAction = actions[DishActionTypes.EDIT];

  return (
    <div
      className="dish-card d-flex gap-3"
      onClick={() => editDishAction(dishItem)}
    >
      <div className="dish-card__img"></div>
      <div className="dish-card__content">
        <div className="dish-item__title">{dish.name}</div>
        <Switcher
          onChange={() => {
            updateStateAction(dishItem);
          }}
          value={dish.state}
          name="state"
          textForChecked={t('common:inStock')}
          textForUnchecked={t('common:outStock')}
        />
        <div>{dishItem.state}</div>
        <div className="dish-item__price">
          <div>{dishItem.price}</div>
          <div className="dish-item__price-discount">{dishItem.price}</div>
        </div>
      </div>
    </div>
  );
};
