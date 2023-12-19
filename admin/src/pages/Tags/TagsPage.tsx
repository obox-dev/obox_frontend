import { useTranslation } from '@libs/react-i18next';
import { NavLink, Outlet } from   'react-router-dom';
import { LayoutWithSearch } from '@admin/layout/LayoutWithSearch/LayoutWithSearch';
import './Tags.scss';


export const TagsPage = () => {

  const { t } = useTranslation();

  return (
    <div className="marks-allergens-page container--fluid">
      <LayoutWithSearch>
        <>
          <ul className="marks-allergens-nav">
            <li>
              <NavLink className="marks-allergens-link" to="/tags/marks">{t('tags:marks')}</NavLink>
            </li>
            <li>
              <NavLink className="marks-allergens-link" to="/tags/allergens">{t('tags:allergen')}</NavLink>
            </li>
          </ul>
          <Outlet />
        </>
      </LayoutWithSearch>
    </div>
  );
};

