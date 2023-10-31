import { Container } from 'react-bootstrap';
import { useTranslation } from '@libs/react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <Container className="text-center py-5">
      <h1>{t('home:title')}</h1>
      <h2 className="text-secondary">{t('home:discription')}</h2>
    </Container>
  );
};

export default Home;
