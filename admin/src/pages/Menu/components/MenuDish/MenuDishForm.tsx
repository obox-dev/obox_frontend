import { useRef } from 'react';
import { ObjectSchema } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { useTranslation } from '@libs/react-i18next';
import { Button } from '@shared/components/atoms/Button/Button';
import {
  ButtonTypes,
  ButtonVariants,
} from '@shared/components/atoms/Button/types';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { InputLabel } from '@shared/components/atoms/InputLabel/InputLabel';
import { Dish } from '@shared/services/DishService';
import type { DishDefaultValues } from './hooks/useDishForms';
import { FileUpload } from '@shared/components/molecules/FileUpload/FileUpload';
import { Textarea } from '@shared/components/atoms/Textarea';
import './DishForm.scss';
import { FieldValues } from 'react-hook-form';
import {
  Attachment,
  FileToUpload,
  AttachmentOrFile,
} from '@shared/services/AttachmentsService';

interface DishFormProps<T extends FieldValues> {
  onSubmit: (data: Partial<Dish>) => void;
  validationSchema: ObjectSchema<T>;
  defaultValues: DishDefaultValues;
  imagesToUpload: FileToUpload[];
  onUploadImage: (attachment: { base64image: string }[]) => void;
  uploadedImages: Attachment[];
  imagesToDelete?: Attachment[];
  onDeleteImage: (
    type: 'attachment' | 'file',
    attachment: AttachmentOrFile
  ) => void;
  language: string;
}

export const DishForm = <T extends FieldValues>(props: DishFormProps<T>) => {
  const { t } = useTranslation();
  const { menuId, categoryId } = useParams();

  const {
    onSubmit,
    validationSchema,
    defaultValues,
    imagesToUpload,
    uploadedImages,
    onUploadImage,
    onDeleteImage,
    language,
  } = props;

  const formRef = useRef<FormRef<Partial<Dish>> | null>(null);

  const navigate = useNavigate();
  const navigateToCategory = () => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  };

  return (
    <div className="container">
      <div className="row justify-content-center my-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <Form
                defaultValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                ref={formRef}
              >
                <>
                  <div className="form-columns">
                    <div className="left-column">
                      <Input type={InputVariants.HIDDEN} name="category_id" />
                      <Input type={InputVariants.HIDDEN} name="status" />
                      <Input
                        type={InputVariants.HIDDEN}
                        name="language"
                        value={language}
                      />
                      <div className="form-group">
                        <InputLabel text={t('dishForm:name')} forInput="name" />
                        <Input
                          type={InputVariants.TEXT}
                          name="name"
                          placeholder={t('dishForm:namePlaceholder')}
                        />
                      </div>
                      <div className="form-group">
                        <InputLabel
                          text={t('dishForm:price')}
                          forInput="price"
                        />
                        <Input
                          type={InputVariants.TEXT}
                          name="price"
                          placeholder={t('dishForm:pricePlaceholder')}
                        />
                      </div>
                      <div className="form-group">
                        <InputLabel
                          text={t('dishForm:weight')}
                          forInput="weight"
                        />
                        <Input
                          type={InputVariants.TEXT}
                          name="weight"
                          placeholder={t('dishForm:weightPlaceholder')}
                        />
                      </div>
                      <div className="form-group">
                        <InputLabel
                          text={t('dishForm:calories')}
                          forInput="calories"
                        />
                        <Input
                          type={InputVariants.TEXT}
                          name="calories"
                          placeholder={t('dishForm:caloriesPlaceholder')}
                        />
                      </div>
                    </div>
                    <div className="right-column">
                      <div className="form-group">
                        <InputLabel
                          text={t('dishForm:description')}
                          forInput="description"
                        />
                        <Textarea
                          name="description"
                          placeholder={t('dishForm:descriptionPlaceholder')}
                        />
                      </div>
                      <div className="form-group">
                        <FileUpload
                          imagesToUpload={imagesToUpload}
                          uploadedImages={uploadedImages}
                          onFileUpload={onUploadImage}
                          onDeleteImage={onDeleteImage}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 justify-content-end">
                    <Button
                      variant={ButtonVariants.SECONDARY}
                      text={t('dishForm:backButton')}
                      type={ButtonTypes.BUTTON}
                      onClick={navigateToCategory}
                    />
                    <Button
                      variant={ButtonVariants.PRIMARY}
                      text={t('dishForm:createButton')}
                      type={ButtonTypes.SUBMIT}
                    />
                  </div>
                </>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
