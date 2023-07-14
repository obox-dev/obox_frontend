import { useTranslation } from '@libs/react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <>

      <h1>{t('common:appTitle')}</h1>
    </>
  );
}

export default App;
