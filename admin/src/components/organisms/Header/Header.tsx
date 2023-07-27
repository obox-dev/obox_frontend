import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { IHeader } from "./types";
import Logo from "../../atoms/Logo/Logo";
import Navigation from "../../molecules/Navigation/Navigation";
import { LanguageSwitcher } from "@shared/components/molecules/LanguageSwitcher";
import AuthButtons from "../../molecules/AuthButtons/AuthButtons";
import UserProfile from "../../molecules/UserProfile/UserProfile";

export const Header: React.FC<IHeader> = ({ userIsAuthenticated }: IHeader) => {
  return (
    <header>
      <Navbar className="text-white bg-dark lg">
        <Container fluid>
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Navigation />
            </Nav>
            <Nav className="justify-content-between">
              <div className="me-3">
              <LanguageSwitcher />
                </div>
              {userIsAuthenticated ? <UserProfile /> : <AuthButtons />}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
