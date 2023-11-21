import { Container } from 'react-bootstrap';
import { useTranslation } from '@libs/react-i18next';

const Customization = () => {
  const { t } = useTranslation();
  return (
    <Container className="text-center py-5">
      <h1>{t('common:pageUnderConstractions')}</h1>
    </Container>
  );
};

export default Customization;
