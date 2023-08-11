import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useTranslation } from '@libs/react-i18next';
import { menuAPI } from '@shared/services/index';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { Dialog } from '@shared/components/molecules/Dialog/Dialog';

const Menu = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleClose = () => {
    setShowForm(false);
    setName('');
  };

  const handleSubmit = async () => {
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
        restaurant_id: '8d72b09b-7d44-4275-afcd-cb17613c4f05',
        language_code: 'en',
      };

      const response = await menuAPI.createMenu('post', '/menus/', menuCreateRequest);

      if (!response) {
        throw new Error('Failed to create menu.');
      }

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{t('menu:title')}</h1>
        <Button
          text={t('menu:add')}
          variant={ButtonVariants.SUCCESS}
          onClick={() => setShowForm(true)}
        />
      </div>
      <p>{t('menu:description')}</p>

      <Dialog
        title={t('menu:add')}
        okCallback={() => {
          handleSubmit();
          setShowForm(false);
        }}
        cancelCallback={handleClose}
        okText={t('menu:create')}
        cancelText={t('menu:cancel')}
        size="lg"
      >
        {/* Form inside the Dialog */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMenuName">
            <Form.Label>{t('menu:name')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('menu:enterName')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Dialog>
    </Container>
  );
};

export default Menu;
