import { IEmojiWrapper } from './types';
import './EmojiWrapper.scss';

export const EmojiWrapper  = (props: IEmojiWrapper) => {
  const { title,descriptionAction, children} = props;
  return (
    <>
      <p className='emoji-main-title'>{title}</p>
      <p className='emoji-description-action'>{descriptionAction}</p>
      <div className='emoji-wrapper'>
        {children}
      </div>
    </>
  );
};