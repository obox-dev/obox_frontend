import { useTranslation } from '@libs/react-i18next';
import { SearchIcon } from '@admin/assets/icons/SearchIcon/SeatchIcon';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import './SearchBar.scss';

export const SearchBar = () => {
  const { t } = useTranslation();
  return (
    <div className="input--with-icon">
      <Input
        name="search"
        type={InputVariants.TEXT}
        placeholder={t('common:search')}
        isDisabled
      />
      <SearchIcon />
    </div>
  );
};
