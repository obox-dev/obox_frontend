import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useTranslation } from "@libs/react-i18next";
import { MenuIcon } from "@admin/assets/icons";
import "./Navigation.scss"

const Navigation = () => {
  const { t } = useTranslation();

  const links = [
    {
      to: "/menu",
      text: t("common:menu"),
      icon: <MenuIcon />,
    },
  ];

  return (
    <Nav className="me-auto d-flex flex-column">
      {links.map(({ to, text, icon }) => (
        <Nav.Item key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-light" : "text-secondary text-hover"}`
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
