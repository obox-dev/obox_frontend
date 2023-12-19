import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  UpdateDishRequest,
  DishesService,
  CreateDishRequest,
  Dish,
  DishResponse,
} from '@shared/services/DishService';
import { useMainProvider } from '@admin/providers/main';
import { DishForm } from './MenuDishForm';
import { useDish } from './useDish';
import { useDishForms } from './hooks/useDishForms';
import { useDishImage } from './hooks/useDishImage';

export const MenuDishPage = () => {
  const { menuLanguage } = useMainProvider();

  const { menuId, categoryId, dishId } = useParams();
  const [loading, setLoading] = useState<boolean>(!!dishId);

  const [dish, setDish] = useState<DishResponse>();

  const { onCreateSubmit, onUpdateSubmit } = useDish({
    menuId: menuId!,
    categoryId: categoryId!,
    language: menuLanguage,
  });

  const {
    createDishSchema,
    weightUnitOptions,
    categoryOptions,
    allergensOptions,
    marksOptions,
    defaultValues,
  } = useDishForms({
    menuId: menuId!,
    categoryId: categoryId!,
    currentLanguage: menuLanguage,
    dish,
  });

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
    setPrimaryImage,
    resetImages,
  } = useDishImage();

  useEffect(() => {
    const loadForUpdate = async (id: string) => {
      setLoading(true);
      const response = await DishesService.getDishById(id);
      setDish(response);
      await getDishAttachments(id);
      setLoading(false);
    };

    if (dishId) {
      loadForUpdate(dishId);
    }
  }, [dishId]);

  const handleOnSubmit = useCallback(
    async (data: Partial<Dish>) => {
      await deleteMarkedAttachments();
      if (dishId) {
        await onUpdateSubmit(dishId, data as UpdateDishRequest);
        await uploadFiles(dishId, filesToUpload);
        await setPrimaryImage(dishId);
      } else {
        const { dish_id } = await onCreateSubmit(data as CreateDishRequest);
        await uploadFiles(dish_id, filesToUpload);
        await getDishAttachments(dish_id);
        await setPrimaryImage(dish_id);
      }
    },
    [dishId, onUpdateSubmit, onCreateSubmit, navigateToCategory]
  );

  const onReset = () => {
    resetImages();
  };

  return loading || !defaultValues ? (
    <div>Loading...</div>
  ) : (
    <DishForm
      dish={dish}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
      validationSchema={createDishSchema}
      onUploadImage={setFilesToUpload}
      imagesToUpload={filesToUpload}
      uploadedImages={attachments}
      onDeleteImage={handleDeleteButtonClick}
      language={menuLanguage}
      categoryOptions={categoryOptions}
      weightUnitOptions={weightUnitOptions}
      allergensOptions={allergensOptions}
      marksOptions={marksOptions}
      onReset={onReset}
    />
  );
};
