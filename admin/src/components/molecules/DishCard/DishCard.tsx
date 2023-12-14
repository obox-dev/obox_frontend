import { useTranslation } from '@libs/react-i18next';
import { Switcher } from '@shared/components/atoms/Switcher';
import { mapDishContent } from '@shared/mappers/DishMapper';
import { DishInStock } from '@shared/services/DishService';
import { DndIcon, ImagePlaceholder } from '@admin/assets/icons';
import { DishActionTypes } from '@admin/pages/Menu/components/MenuDish/types';
import { IDishCard } from './types';
import './DishCard.scss';

export const DishCard = (props: IDishCard) => {
  const { dishItem, actions, language, isDragable = false } = props;
  const { t } = useTranslation();

  const dish = mapDishContent(dishItem, language);

  const updateInStockAction = actions[DishActionTypes.CHANGE_IN_STOCK];
  const editDishAction = actions[DishActionTypes.EDIT];

  const dishImage = dish.image;
  const inStock = dish.in_stock === DishInStock.ENABLED;
  const hasSpecialPrice = dish.special_price;

  return (
    <div
      className={[
        'dish-card d-flex gap-3',
        inStock ? '' : 'dish-card--out-of-stock',
      ].join(' ')}
      onClick={() => editDishAction(dishItem)}
    >
      <div className="dish-card__img">
        {dishImage ? <img src={dishImage} alt="" /> : <ImagePlaceholder />}
      </div>
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
          <div
            className={[
              hasSpecialPrice ? 'dish-item__price-discount' : '',
            ].join('')}
          >
            {dishItem.price}
          </div>
          <div>{dishItem.special_price}</div>
        </div>
      </div>
      {isDragable ? (
        <div className="dish-card__drag-handle">
          <DndIcon />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
