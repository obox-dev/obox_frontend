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

  const updateInStockAction = actions[DishActionTypes.CHANGE_IN_STOCK];
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
            updateInStockAction(dishItem);
          }}
          value={dish.in_stock}
          name="in_stock"
          textForChecked={t('common:inStock')}
          textForUnchecked={t('common:outStock')}
          stopClickPropagation
        />
        <div className="dish-item__price">
          <div>{dishItem.price}</div>
          <div className="dish-item__price-discount">{dishItem.spesial_price}</div>
        </div>
      </div>
    </div>
  );
};
