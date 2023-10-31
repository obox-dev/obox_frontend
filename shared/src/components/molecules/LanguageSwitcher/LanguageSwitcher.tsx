import i18n from '@libs/i18next';
import { useState } from 'react';
import { RadioInput } from '@shared/components/atoms/RadioInput';
import { useTranslation } from '@libs/react-i18next';
import './LanguageSwitcher.scss';

const DEFAULT_LANGUAGE = 'ua';

export const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);

  const changeLanguage = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  const languages = [
    {
      label: t('common:languages.ua'),
      value: 'ua',
      name: 'language',
    },
    {
      label: t('common:languages.en'),
      value: 'en',
      name: 'language',
    },
  ];

  return (
    <div className="language-switcher py-2">
      {
        languages.map(({
          label,
          value,
          name,
        }) => <RadioInput label={label} value={value} checked={selectedLanguage === value} name={name} id={value} key={value} onChange={(event) => {
          changeLanguage(event.target.value);
        }} />)
      }
    </div>
  );
};
