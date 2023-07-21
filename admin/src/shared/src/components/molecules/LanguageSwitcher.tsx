import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import BritishFlagIcon from '@admin/assets/layout/header/UK_flag.svg';
import UkrainianFlagIcon from '@admin/assets/layout/header/UA_flag.svg';

const LanguageSwitcher = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('UA'); // Default language is UA

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    console.log(`Selected language: ${language}`);
  };

  return (
    <div className="language-switcher">
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="language-dropdown" className='m-3'>
          {selectedLanguage === 'EN' ? (
            <img src={BritishFlagIcon} alt="British Flag" style={{ width: '50px', height: '20px' }} />
          ) : (
            <img src={UkrainianFlagIcon} alt="Ukrainian Flag" style={{ width: '50px', height: '20px' }} />
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          <Dropdown.Item onClick={() => handleLanguageChange('EN')}>
            <img src={BritishFlagIcon} alt="British Flag" style={{ width: '50px', height: '20px', marginRight: '5px' }} />
            EN
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleLanguageChange('UA')}>
            <img src={UkrainianFlagIcon} alt="Ukrainian Flag" style={{ width: '50px', height: '20px', marginRight: '5px' }} />
            UA
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitcher;
