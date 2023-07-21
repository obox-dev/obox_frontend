import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import Logo from '@admin/shared/src/components/atoms/Logo';
import Navigation from '@admin/shared/src/components/molecules/Navigation';
import LanguageSwitcher from '@admin/shared/src/components/molecules/LanguageSwitcher';
import AuthButtons from '@admin/shared/src/components/molecules/AuthButtons';
import UserProfile from '@admin/shared/src/components/molecules/UserProfile';

interface HeaderProps {
  userIsAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ userIsAuthenticated }) => {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Navigation />
          </Nav>
          <Nav>
            <LanguageSwitcher />
            {userIsAuthenticated ? <UserProfile /> : <AuthButtons />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
