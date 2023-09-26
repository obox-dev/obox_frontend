import React from "react";
import Loader from "react-loader-spinner";

interface CustomLoaderProps {
  size: number;
  color: string;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ size, color }) => {
  return (
    <Loader
      type="TailSpin" 
      color={color}
      height={size}
      width={size}
    />
  );
};

export default CustomLoader;
