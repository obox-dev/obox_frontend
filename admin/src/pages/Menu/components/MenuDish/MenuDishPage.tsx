import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  UpdateDishRequest,
  DishesService,
  CreateDishRequest,
  Dish,
} from '@shared/services/DishService';
import { useMainProvider } from '@admin/providers/main';
import { DishForm } from './MenuDishForm';
import { useDish } from './useDish';
import { useDishForms } from './hooks/useDishForms';
import type { DishDefaultValues } from './hooks/useDishForms';
import { useDishImage } from './hooks/useDishImage';

export const MenuDishPage = () => {
  const [defaultValues, setDefaultValues] = useState<DishDefaultValues | null>(
    null
  );
  const { menuLanguage } = useMainProvider();

  const [loading, setLoading] = useState<boolean>(!!useParams().dishId);
  const { menuId, categoryId, dishId } = useParams();

  const { onCreateSubmit, onUpdateSubmit } = useDish({
    categoryId: categoryId!,
    language: menuLanguage,
  });
  const { createDishSchema, getDefaultValues } = useDishForms(
    categoryId!,
    menuLanguage
  );
  const navigate = useNavigate();

  const navigateToCategory = useCallback(() => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  }, [navigate, menuId, categoryId]);

  const {
    attachments,
    filesToUpload,
    handleDeleteButtonClick,
    uploadFiles,
    deleteMarkedAttachments,
    getDishAttachments,
    setFilesToUpload,
  } = useDishImage();

  useEffect(() => {
    const loadDish = async (id: string) => {
      const response = await DishesService.getDishById(id);
      await getDishAttachments(id);
      setDefaultValues(getDefaultValues(response));
      setLoading(false);
    };

    if (dishId) {
      loadDish(dishId);
    } else {
      setDefaultValues(getDefaultValues());
      setLoading(false);
    }
  }, [dishId]);

  const handleOnSubmit = useCallback(
    async (data: Partial<Dish>) => {
      await deleteMarkedAttachments();
      if (dishId) {
        await onUpdateSubmit(dishId, data as UpdateDishRequest);
        await uploadFiles(dishId, filesToUpload);
        await getDishAttachments(dishId);
      } else {
        const { dish_id } = await onCreateSubmit(data as CreateDishRequest);
        await uploadFiles(dish_id, filesToUpload);
        await getDishAttachments(dish_id);
      }
    },
    [dishId, onUpdateSubmit, onCreateSubmit, navigateToCategory]
  );

  return loading || !defaultValues ? (
    <div>Loading...</div>
  ) : (
    <DishForm
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
      validationSchema={createDishSchema}
      onUploadImage={setFilesToUpload}
      imagesToUpload={filesToUpload}
      uploadedImages={attachments}
      onDeleteImage={handleDeleteButtonClick}
      language={menuLanguage}
    />
  );
};
