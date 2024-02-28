import { IColorsMarksWrapeer } from './types';
import './ColorsMarksWrapper.scss';

export const ColorsMarksWrapper  = (props: IColorsMarksWrapeer) => {
  const { title, children} = props;
  return (
    <>
      <p className='colors-main-title'>{title}</p>
      <div className='colors-wrapper'>
        {children}
      </div>
    </>
  );
};