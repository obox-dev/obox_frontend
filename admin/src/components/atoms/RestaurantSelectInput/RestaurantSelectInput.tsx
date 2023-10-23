import { SelectInput } from '@shared/components/atoms/SelectInput';
import "./RestaurantSelectInput.scss";


export const RestaurantSelectInput = () => {

    const restaurantOptions = [{ value: 'mimosa', label: 'Mimosa' }];
  
    return (
      <SelectInput
        className="restaurant-select"
        defaultValue={restaurantOptions[0]}
        name="restaurantName"
        options={restaurantOptions}
        isDisabled
      />
    );
  };