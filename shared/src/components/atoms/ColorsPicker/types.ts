export interface IColorPicker {
  onChange: (color: string) => void;
  initialColor: string;
  colorPickerOpen: boolean;
}