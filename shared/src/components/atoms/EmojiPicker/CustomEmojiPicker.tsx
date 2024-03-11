import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import { ICustomEmojiPicker} from './types';
import './CustomEmojiPicker.scss';

export const CustomEmojiPicker = (props: ICustomEmojiPicker) => {
  const { onChange,initialEmoji } = props;
  const [inputStr, setInputStr] = useState(initialEmoji);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    setInputStr(inputValue);
  };
  
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    const inputValue = inputStr + emojiObject.emoji;
    onChange(inputValue);
    setInputStr(inputValue);

  };

  return (
    <div className='emoji-picker'>
      <input
        value={inputStr}
        className='emoji-picker-input'
        onChange={handleInputChange}
      />
      <EmojiPicker onEmojiClick={onEmojiClick}/>
    </div>
  );
};