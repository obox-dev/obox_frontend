import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useTranslation } from '@libs/react-i18next';
import { CreateMenuIcon } from '@admin/assets/icons';
import './Navigation.scss';
import { t } from 'i18next';

interface NavLinkItem {
  to: string;
  text: ReturnType<typeof t>;
  icon: JSX.Element;
}

type NoIconNavLinkItem = Omit<NavLinkItem, 'icon'>;

interface NavAccordionItem {
  to: null;
  text: ReturnType<typeof t>;
  icon: JSX.Element;
  children: Array<NoIconNavLinkItem>;
}

const Navigation = () => {
  const { t } = useTranslation();

  const links: Array<NavLinkItem | NavAccordionItem> = [
    {
      to: null,
      text: t('common:createmenu'),
      icon: <CreateMenuIcon />,
      children: [
        {
          to: '/menu',
          text: t('common:menu'),
        },
        {
          to: '/tags',
          text: t('common:tagsAllergens'),
        },
      ],
    },
  ];

  const renderNavItem = (
    item: NavLinkItem | NavAccordionItem | NoIconNavLinkItem, 
    index: number
  ) => {
    const { to, text } = item;
    const { children } = item as NavAccordionItem;
    const { icon } = item as NavLinkItem;

    if (to) {
      return (
        <Nav.Item key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `nav-link ${
                isActive ? 'text-light' : 'text-secondary text-hover'
              }`
            }
          >
            {icon ?? ""} 
            {text}
          </NavLink>
        </Nav.Item>
      );
    }

    if (children.length) {
      return (
        <>
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>
              {icon}
              {text}
            </Accordion.Header>
            <Accordion.Body>
              {children.map((child: NoIconNavLinkItem, innerIndex: number) =>
                renderNavItem(child, index * innerIndex)
              )}
            </Accordion.Body>
          </Accordion.Item>
          {/* 
            {
              const { to: childTo, text: childText, icon: childIcon } = child;
              return (
                <Nav.Item key={childTo}>
                  <NavLink
                    to={childTo}
                    className={({ isActive }) =>
                      `nav-link ${
                        isActive ? 'text-light' : 'text-secondary text-hover'
                      }`
                    }
                  >
                    {childIcon}
                    {childText}
                  </NavLink>
                </Nav.Item>
              );
            }
             */}
        </>
      );
    }
  };

  return (
    <Nav className="nav-container me-auto d-flex flex-column">
      <Accordion defaultActiveKey="0">
        {links.map((link, index) => renderNavItem(link, index))}
      </Accordion>
    </Nav>
  );
};

export default Navigation;
