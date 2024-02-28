import { forwardRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { ICustomDropdown, IDropdownButton } from './types';
import './CustomDropdown.scss';

const ToggleAsButton = forwardRef<HTMLButtonElement, IDropdownButton>(
  (props: IDropdownButton, ref) => {
    const {onClick,isOpenColorPicker,initialColor,buttonText} = props;
    const color = {
      backgroundColor: `${initialColor}`,
    };
    return <button ref={ref}
      type='button'
      className={`toggle-color-button ${isOpenColorPicker ? 'open' : 'close'}`}
      onClick={onClick}>
      <div className='toggle-color-wrapper'>
        <p style={color} className='toggle-color'></p>
      </div>
      <p className='toggle-color-text'>{buttonText}</p>
    </button>;
  }
);

export const CustomDropdown = (props: ICustomDropdown) => {
  const {onClick,buttonText, body,isOpenColorPicker,initialColor } = props;

  return (
    <div className='dropdown-wrapper'>
      <Dropdown.Toggle
        as={ToggleAsButton}
        onClick={onClick}
        buttonText={buttonText}
        isOpenColorPicker={isOpenColorPicker}
        initialColor = { initialColor}
      />
      <Dropdown.Item>
        {body}
      </Dropdown.Item>
    </div>
  );
};