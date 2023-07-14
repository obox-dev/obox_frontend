import { useTranslation } from '@libs/react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <>
      
      <h1>{t('common:adminTitle')}</h1>
    </>
  );
}

export default App;
