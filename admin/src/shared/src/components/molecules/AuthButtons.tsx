import LoginButton from '../atoms/LoginButton'; // Import the LoginButton component
import SignUpButton from '../atoms/SignUpButton';

const AuthButtons = () => {
  return (
    <div className="auth-buttons">
      <LoginButton />
      <SignUpButton />
    </div>
  );
};

export default AuthButtons;
