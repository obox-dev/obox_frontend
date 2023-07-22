import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

interface AButtonProps extends ButtonProps {
  className?: string;
}

export const AButton: React.FC<AButtonProps> = ({ variant, className, children, onClick, size }) => {
  return (
    <Button variant={variant} className={className} onClick={onClick} size={size}>
      {children}
    </Button>
  );
};

// Default props in case no props are provided when using the component
AButton.defaultProps = {
  variant: 'dark text-light border-light',
  className: 'm-3',
};

export default AButton;
