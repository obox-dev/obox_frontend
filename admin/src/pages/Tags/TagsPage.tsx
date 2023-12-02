import { useTranslation } from '@libs/react-i18next';
import { NavLink, Outlet } from   'react-router-dom';
import { LayoutWithSearch } from '@admin/layout/LayoutWithSearch/LayoutWithSearch';
import './Tags.scss';


export const TagsPage = () => {

  const { t } = useTranslation();

  return (
    <div className="marks-and-allergenes-page container--fluid">
      <LayoutWithSearch>
        <>
          <ul  className="nav">
            <li className="nav-item">
              <NavLink to="/tags/marks">{t('tags:marks')}</NavLink>
              <NavLink to="/tags/allergens">{t('tags:allergen')}</NavLink>
            </li>
          </ul>
          <Outlet />
        </>
      </LayoutWithSearch>
    </div>
  );
};

