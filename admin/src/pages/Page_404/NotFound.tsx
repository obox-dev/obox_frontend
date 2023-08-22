import React from 'react';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import './NotFound.scss'

const NotFound: React.FC = () => {
  return (
    <div>
      <div className="not-found-404">404</div>
        <div className='message'><h1>Ууупс!</h1>
          <p className='p'>Наш шеф все ще працює над приготуванням цієї сторінки. Пропонуємо поки спробувати інші.</p>
          <div className='button-group'>
            <Button text="Повернутися на попередню сторінку" variant={ButtonVariants.SUCCESS} onClick={() => window.history.back()} />
            <div style={{ width: '20px' }}></div>
            <Button text="На головну" variant={ButtonVariants.PRIMARY} onClick={() => window.location.href = '/'} />
          </div>
        </div>
    </div>
  );
};

export default NotFound;
