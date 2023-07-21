import LogoImage from '@admin/assets/layout/header/Logo.jpg';

const Logo = () => {
  // Use the imported LogoImage as the src for the <img> element
  return <img src={LogoImage} alt="Logo" style={{ width: "7rem", height: "5rem" }} />;
};

export default Logo;


