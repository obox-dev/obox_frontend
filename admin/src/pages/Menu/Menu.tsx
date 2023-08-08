import React, { useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useTranslation } from '@libs/react-i18next';
import { menuAPI } from '@shared/services/index'; 
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { CustomForm } from '@shared/components/atoms/Form'; // Import the renamed CustomForm component

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
    // Handle submit logic here
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

      // Menu created successfully, close the form
      handleClose();
      // Add logic to show success message if required
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{t('menu:title')}</h1>
        {!showForm && (
          <Button
            text={t('menu:add')}
            variant={ButtonVariants.SUCCESS}
            onClick={() => setShowForm(true)}
          />
        )}
      </div>
      <p>{t('menu:description')}</p>

      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('menu:add')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomForm
            onSubmit={handleSubmit}
            submitButtonText={t('menu:create')}
            isDisabled={false} // Adjust this based on your logic
          >
            <div>
              <label htmlFor="formMenuName">{t('menu:name')}</label>
              <input
                type="text"
                id="formMenuName"
                placeholder={t('menu:enterName')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? 'is-invalid' : ''}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
          </CustomForm>
        </Modal.Body>
        <Modal.Footer>
          <Button
            text={t('menu:cancel')}
            variant={ButtonVariants.SECONDARY}
            onClick={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Menu;
