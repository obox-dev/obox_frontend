import { ITitleForInput } from './types';
import './TitleForInput.scss';

export const TitleForInput = (props: ITitleForInput) => {
  const { title, text } = props;

  return (
    <div className='container-title-for-input'>
      <h3 className='title-for-input'>{title}</h3>
      <p className='text-for-input'>{text}</p>
    </div>
  );
};