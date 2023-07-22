import React from 'react';
import { Container } from 'react-bootstrap';
import LogoImage from '@admin/assets/layout/header/Logo.png';

interface FooterProps {
  currentYear: number;
}

const Footer: React.FC<FooterProps> = ({ currentYear }) => {
  return (
    <footer className="fixed-bottom bg-dark text-light">
      <Container className="d-flex justify-content-center align-items-center py-3">
        &copy; {currentYear} Powered by <a href='https://obox.com.ua/' className='ms-2'><img src={LogoImage} alt="Logo" style={{ width: "2rem", height: "2rem" }} /></a>
      </Container>
    </footer>
  );
};

export default Footer;
