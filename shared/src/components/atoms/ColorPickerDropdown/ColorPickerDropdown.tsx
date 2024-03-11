import { useState } from 'react';
import { IColorPickerDropdown } from './types';
import { CustomDropdown } from '../CustomDropdown';
import { ColorPicker } from '../ColorsPicker';
import './ColorPickerDropdown.scss';

export const ColorPickerDropdown = (props: IColorPickerDropdown) => {
  const { onChange, initialColor } = props;
  const [isOpenColorPicker, setIsOpenColorPicker] = useState(false);
  const [buttonColor, setButtonColor] = useState(initialColor);
  const [buttonText, setButtonText] = useState(initialColor);
  const [tempColor, setTempColor] = useState(initialColor);

  const handlerOpenColorPicker = () => {
    if (isOpenColorPicker) {
      setButtonColor(tempColor);
      setButtonText(tempColor);
    }
    setIsOpenColorPicker(!isOpenColorPicker);
  };

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    setTempColor(newColor);
  };
  
  return (
    <CustomDropdown
      initialColor= {buttonColor}
      onClick={handlerOpenColorPicker}
      buttonText={buttonText}
      isOpenColorPicker  = {isOpenColorPicker} 
      body={
        <ColorPicker
          onChange={handleColorChange}
          initialColor={initialColor}
          colorPickerOpen = {isOpenColorPicker}
        />
      }
    />
  );
};