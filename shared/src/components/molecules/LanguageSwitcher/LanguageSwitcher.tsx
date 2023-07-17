import { useState } from 'react';
import { RadioInput } from "@shared/components/atoms/RadioInput";
import i18n from "i18next";
import { useTranslation } from '@libs/react-i18next';

const DEFAULT_LANGUAGE = 'ua';

export const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);

  const changeLanguage = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  }

  const languages = [
    {
      label: t('common:languages.en'),
      value: 'en',
      name: 'language',
    },
    {
      label: t('common:languages.ua'),
      value: 'ua',
      name: 'language',
    },
  ]

  return (
    <div>
      {
        languages.map(({
          label,
          value,
          name,
        }) => <RadioInput label={label} value={value} checked={selectedLanguage === value} name={name} key={value} onChange={(event) => {
          changeLanguage(event.target.value);
        }} />)
      }
    </div>
  )
}
