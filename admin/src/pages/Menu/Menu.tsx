import { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { useTranslation } from '@libs/react-i18next';

const Menu = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [restaurantId] = useState('8d72b09b-7d44-4275-afcd-cb17613c4f05');
  const [lenguageCode] = useState('en')
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: { name?: string } = {};

    if (name.trim() === '') {
      newErrors.name = 'Name is required.';
    }

    if (name.length > 200) {
      newErrors.name = 'Name cannot exceed 200 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const menuCreateRequest = {
        name: name,
        restaurant_id: restaurantId,
        language_code: lenguageCode,
      };
      
      const response = await fetch('https://api.obox.com.ua/menus/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuCreateRequest),
      });
       
      if (!response.ok) {
        // Handle error responses from the API if needed
        throw new Error('Failed to create menu.');
      }

      // Menu created successfully, reset the form and show success message if needed
      setName('');
      setShowForm(false);
      // Add logic to show success message if required
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{t('menuCreate:title')}</h1>
        {!showForm && (
          <Button
            text={t('menuCreate:add')}
            variant={ButtonVariants.SUCCESS}
            onClick={() => setShowForm(true)}
          />
        )}
      </div>
      <p>{t('menuCreate:description')}</p>

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formMenuName">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Enter menu name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formRestaurantId" style={{ display: 'none' }}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Control type="hidden" value={restaurantId} />
            </Col>
          </Form.Group>
          {/* Add the hidden field for language_code */}
          <Form.Group as={Row} controlId="formLanguageCode" style={{ display: 'none' }}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Control type="hidden" value={lenguageCode} />
            </Col>
          </Form.Group>
          <Button
            text={t('menuCreate:create')}
            variant={ButtonVariants.PRIMARY}
            type="submit"
          />
        </Form>
      )}
    </Container>
  );
};
export default Menu;
