import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from   'react-router-dom';
import './Tags.scss';

export const TagsPage = () => {

  const { t } = useTranslation();

  return (
    <div className="tags-and-allergenes-page container--fluid">
      <ul  className="nav">
        <li className="nav-item">
          <NavLink to="/tags/marks">{t('tags:linkMarks')}</NavLink>
          <NavLink to="/tags/allergens">{t('tags:linkAllergens')}</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
    
  );
};

