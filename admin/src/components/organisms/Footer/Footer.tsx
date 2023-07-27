import React from 'react';
import { Container } from 'react-bootstrap';
import { IFooter } from './types';
import { useTranslation } from '@libs/react-i18next';
import LogoImage from '@admin/assets/layout/header/Logo.png';

export const Footer: React.FC<IFooter> = ({ currentYear }: IFooter) => {
  const { t } = useTranslation();
  return (
    <footer className="fixed-bottom bg-dark text-light">
      <Container className="d-flex justify-content-center align-items-center py-3">
        &copy; {currentYear} {t("common:poweredby")} <a href='https://obox.com.ua/' className='ms-2'><img src={LogoImage} alt="Logo" style={{ width: "2rem", height: "2rem" }} /></a>
      </Container>
    </footer>
  );
};
