import { Button } from 'react-bootstrap';

const AuthButtons = () => {
  return (
    <div className="auth-buttons">
      <Button variant="dark text-light border-light" className="me-3">Log In</Button>
      <Button variant="warning">Sign Up</Button>
    </div>
  );
};

export default AuthButtons;
