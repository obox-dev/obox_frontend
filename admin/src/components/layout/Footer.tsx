import React from 'react';
import { Container } from 'react-bootstrap';

interface FooterProps {
  currentYear: number;
}

const Footer: React.FC<FooterProps> = ({ currentYear }) => {
  return (
    <footer className="fixed-bottom bg-dark text-light">
      <Container className="d-flex justify-content-center py-3">
        &copy; {currentYear} Powered by <a href='https://obox.com.ua/' className='link-secondary ms-2 fw-bold'>OBOX</a>
      </Container>
    </footer>
  );
};

export default Footer;
