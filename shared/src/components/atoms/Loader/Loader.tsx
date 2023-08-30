import React from "react";
import { ColorRing } from "react-loader-spinner";

interface ColorRingLoaderProps {
  visible: boolean;
  height: string;
  width: string;
  ariaLabel: string;
  wrapperStyle?: React.CSSProperties;
  wrapperClass?: string;
  colors: string[];
}

const ColorRingLoader: React.FC<ColorRingLoaderProps> = ({
  visible,
  height,
  width,
  ariaLabel,
  wrapperStyle,
  wrapperClass,
  colors,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <ColorRing
        height={height}
        width={width}
        color={colors[0]}
        ariaLabel={ariaLabel}
        visible={visible}
      />
    </div>
  );
};

export default ColorRingLoader;
