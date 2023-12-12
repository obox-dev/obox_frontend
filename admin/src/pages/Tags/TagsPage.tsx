import { useTranslation } from '@libs/react-i18next';
import { NavLink, Outlet } from   'react-router-dom';
import { LayoutWithSearch } from '@admin/layout/LayoutWithSearch/LayoutWithSearch';
import { LanguageSwitcher } from '@shared/components/molecules/LanguageSwitcher';
import './Tags.scss';


export const TagsPage = () => {

  const { t } = useTranslation();

  return (
    <div className="marks-and-allergens-page container--fluid">
      <LayoutWithSearch>
        <>
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-item-link" to="/tags/marks">{t('tags:marks')}</NavLink>
              <NavLink className="nav-item-link" to="/tags/allergens">{t('tags:allergen')}</NavLink>
            </li>
          </ul>
          <Outlet />
        </>
      </LayoutWithSearch>
      <LanguageSwitcher />
    </div>
  );
};

