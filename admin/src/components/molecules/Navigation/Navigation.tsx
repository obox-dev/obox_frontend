import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useTranslation } from "@libs/react-i18next";
import { RestaurantIcon, MenuIcon } from "@admin/assets/icons";
import "./Navigation.scss"

const Navigation = () => {
  const { t } = useTranslation();

  const links = [
    {
      to: "/restaurants",
      text: t("common:restaurants"),
      icon: <RestaurantIcon />,
    },
    {
      to: "/menu",
      text: t("common:menu"),
      icon: <MenuIcon />,
    },
  ];

  return (
    <Nav>
      {links.map(({ to, text, icon }) => (
        <Nav.Item>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-light" : "text-secondary"}`
            }
          >
            {icon}
            {text}
          </NavLink>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Navigation;
