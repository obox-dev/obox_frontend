import LoginButton from '../atoms/Button/Button'; // Import the LoginButton component
import SignUpButton from '../atoms/Button/Button';

const AuthButtons = () => {
  return (
    <div className="auth-buttons">
      <LoginButton>Log In</LoginButton>
      <SignUpButton variant='warning'>Sign Up</SignUpButton>
    </div>
  );
};

export default AuthButtons;
