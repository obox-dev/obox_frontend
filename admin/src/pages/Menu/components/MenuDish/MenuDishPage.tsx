import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  UpdateDishRequest,
  DishesService,
  CreateDishRequest,
  Dish,
} from '@shared/services/DishService';
import { DishForm } from './MenuDishForm';
import { useDish } from './useDish';
import { useDishForms } from './hooks/useDishForms';
import type { DishDefaultValues } from './hooks/useDishForms';
import {
  AttachmentService,
  AttachmentReferenceType,
  Attachment,
  FileToUpload,
  AttachmentOrFile,
} from '@shared/services/AttachmentsService';

export const MenuDishPage = () => {
  const [defaultValues, setDefaultValues] = useState<DishDefaultValues | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(!!useParams().dishId);
  const { menuId, categoryId, dishId } = useParams();

  const [uploadedImages, setUploadedImages] = useState<Attachment[]>([]);
  const [imagesToUpload, setImagesToUpload] = useState<FileToUpload[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<AttachmentOrFile[]>([]);

  const { onCreateSubmit, onUpdateSubmit } = useDish(categoryId!);
  const { createDishSchema, getDefaultValues } = useDishForms(categoryId!);
  const navigate = useNavigate();

  const navigateToCategory = useCallback(() => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  }, [navigate, menuId, categoryId]);

  useEffect(() => {
    const loadDishImages = async (id: string) => {
      const images = await AttachmentService.getAllAttachments(id);
      setUploadedImages(images);
    };

    const loadDish = async (id: string) => {
      const response = await DishesService.getDishById(id);
      await loadDishImages(response.dish_id);
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

  const handleDeleteImage = (
    type: 'attachment' | 'file',
    attachment: AttachmentOrFile
  ) => {
    setImagesToDelete((prevImagesToDelete) => [
      ...prevImagesToDelete,
      attachment,
    ]);

    if (type === 'attachment') {
      setUploadedImages(
        uploadedImages.filter((att) => {
          return att.attachment_id !== (attachment as Attachment).attachment_id;
        })
      );
    } else {
      setImagesToUpload(
        imagesToUpload.filter((file) => {
          return file.base64image !== (attachment as FileToUpload).base64image;
        })
      );
    }
  };

  const handleOnSubmit = useCallback(
    async (data: Partial<Dish>) => {
      if (dishId) {
        await onUpdateSubmit(dishId, data as UpdateDishRequest);
        const images = imagesToUpload.map(({ base64image }) => {
          return AttachmentService.create({
            reference_type: AttachmentReferenceType.DISH,
            reference_id: dishId,
            attachment: base64image,
          });
        });
        await Promise.all(images);
        setUploadedImages([]);
        setImagesToDelete([]);
      } else {
        const { dish_id } = await onCreateSubmit(data as CreateDishRequest);
        const images = imagesToUpload.map(({ base64image }) => {
          return AttachmentService.create({
            reference_type: AttachmentReferenceType.DISH,
            reference_id: dish_id,
            attachment: base64image,
          });
        });
        await Promise.all(images);
        setUploadedImages([]);
        setImagesToDelete([]);
      }

      if (imagesToDelete.length > 0) {
        const deletePromises = imagesToDelete.map(
          (attachmentOrFile: AttachmentOrFile) => {
            const attachmentId = (attachmentOrFile as Attachment).attachment_id;
            if (attachmentId) {
              return AttachmentService.delete(attachmentId);
            }
          }
        ).filter((is) => is);
        await Promise.all(deletePromises);
      }
      setImagesToDelete([]);
    },
    [dishId, onUpdateSubmit, onCreateSubmit, navigateToCategory]
  );

  console.log('UPLOADED IMAGES', uploadedImages);
  console.log('IMAGES TO UPLOAD', imagesToUpload);
  console.log('IMAGES TO DELETE', imagesToDelete);
  

  return loading || !defaultValues ? (
    <div>Loading...</div>
  ) : (
    <DishForm
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
      validationSchema={createDishSchema}
      onUploadImage={setImagesToUpload}
      imagesToUpload={imagesToUpload}
      uploadedImages={uploadedImages}
      onDeleteImage={handleDeleteImage}
    />
  );
};
