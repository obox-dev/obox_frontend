import { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { useTranslation } from '@libs/react-i18next';
import { IColorPicker } from './types';
import './ColorPicker.scss';

export const ColorPicker = (props: IColorPicker) => {
  const { onChange, initialColor, colorPickerOpen } = props;
  const { t } = useTranslation();
  const [currentColor, setCurrentColor] = useState(initialColor);

  const handleColorChange = (newColor: ColorResult) => {
    onChange(newColor.hex);
    setCurrentColor(newColor.hex);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    setCurrentColor(inputValue);
  };

  function addHashPrefixIfNeeded(event: React.FormEvent<HTMLInputElement>) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.value.startsWith('#')) {
      inputElement.value = '#' + inputElement.value;
    }
  }

  const colorInputStyle: React.CSSProperties = {
    backgroundColor: `${currentColor}`,
  };

  return (
    colorPickerOpen ? (
      <div className='color-picker-wrapper'>
        <SketchPicker
          color={currentColor}
          onChange={handleColorChange}
          disableAlpha={true} />
        <div className='color-picker-form-inputs'>
          <p
            style={colorInputStyle}
            className='color-picker-input-color'>
          </p>
          <input
            value={currentColor}
            className='color-picker-input-text'
            placeholder={t('tags:createMarksForm.colorsTextPlaceholder')}
            onChange={handleTextChange}
            maxLength={7}
            onInput={addHashPrefixIfNeeded}
          />
        </div>
      </div>
    ) : null
  );
};