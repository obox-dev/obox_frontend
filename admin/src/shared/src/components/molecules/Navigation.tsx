import { useTranslation } from '@libs/react-i18next';
import { Nav } from 'react-bootstrap';

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <Nav className="nav" variant="light">
      <Nav.Item>
        <Nav.Link href="#" className="active link-secondary">
          <i className="bi bi-house-door"></i> {t('Restaurants')}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#" className="text-light">
          <i className="bi bi-list"></i> {t('Menu')}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navigation;
