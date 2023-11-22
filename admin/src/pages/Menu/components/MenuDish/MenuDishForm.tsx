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
import { Dish, WeightUnit } from '@shared/services/DishService';
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
import { LayoutWithBackButton } from '@admin/layout/LayoutWithBackButton/LayoutWithBackButton';
import { SelectInput } from '@shared/components/atoms/SelectInput';
import { useGetCategory } from '../MenuCategories/hooks';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { mapCategoryContent } from '../MenuCategories/mappers/mapCategoryContent';
import { OptionType } from '@shared/components/atoms/SelectInput/types';
// import { Switcher } from '@shared/components/atoms/Switcher';
// import {useDish} from './useDish';
// import { DishActionTypes } from './types';

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
  weightUnitOptions: OptionType<WeightUnit>[];
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
    weightUnitOptions,
  } = props;

  const formRef = useRef<FormRef<Partial<Dish>> | null>(null);

  const navigate = useNavigate();
  const navigateToCategory = () => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  };

  const { loadAllCategories, categoriesList } = useGetCategory({
    menuId: menuId!,
  });

  useEffect(() => {
    const load = async () => {
      await loadAllCategories();
    };
    load();
  }, []);

  const categoryOptions = useMemo(() => {
    return categoriesList.map((category) => {
      const { category_id, name } = mapCategoryContent(category, language);
      return { value: category_id, label: name };
    });
  }, [categoriesList]);

  const defaultCategory = useMemo(() => {
    return categoryOptions.find((category) => category.value === categoryId);
  }, [categoryOptions.length]);

  // const { menuDishesActions } = useDish({categoryId: categoryId!, language});
  // const updateInStockAction = menuDishesActions[DishActionTypes.CHANGE_IN_STOCK];
  // const updateStateAction = menuDishesActions[DishActionTypes.UPDATE_STATE];

  return (
    <div className="dish-page container">
      <LayoutWithBackButton
        backTo={`/menu/${menuId}/category/${categoryId}`}
        backButtonVariant={ButtonVariants.SECONDARY}
        title={'123'}
      >
        <Form
          defaultValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          ref={formRef}
        >
          <>
            <div className="dish-form-actions">
              {/* <Switcher
                onChange={() => {
                  updateStateAction(dish)}}
                value={dish.in_stock}
                name="in_stock"
                textForChecked={t('common:inStock')}
                textForUnchecked={t('common:outStock')}
              />
              <Switcher
                onChange={() => {
                  updateInStockAction(dishItem);
                }}
                value={dish.in_stock}
                name="in_stock"
                textForChecked={t('common:inStock')}
                textForUnchecked={t('common:outStock')}
              /> */}
            </div>
            <Input type={InputVariants.HIDDEN} name="category_id" />
            <Input type={InputVariants.HIDDEN} name="status" />
            <Input
              type={InputVariants.HIDDEN}
              name="language"
              value={language}
            />
            <div className="form-group">
              <InputLabel text="category" forInput="category" />
              <SelectInput
                name="category"
                options={categoryOptions}
                defaultValue={defaultCategory!}
              />
            </div>
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
                text={t('dishForm:description')}
                forInput="description"
              />
              <Textarea
                maxLength={255}
                showCounter
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
            <div className="dish-page__form-row d-flex">
              <div className="form-group">
                <InputLabel text={t('dishForm:weight')} forInput="weight" />
                <Input
                  type={InputVariants.TEXT}
                  name="weight"
                  placeholder={t('dishForm:weightPlaceholder')}
                />
              </div>
              <div className="form-group">
                <InputLabel text="weight_unit" forInput="weight_unit" />
                <SelectInput
                  name="weight_unit"
                  options={weightUnitOptions}
                  defaultValue={null}
                />
              </div>
            </div>
            <div className="form-group">
              <InputLabel text={t('dishForm:calories')} forInput="calories" />
              <Input
                type={InputVariants.TEXT}
                name="calories"
                placeholder={t('dishForm:caloriesPlaceholder')}
              />
            </div>
            <div className="form-group">
              <InputLabel text="marks" forInput="marks" />
              <SelectInput
                name="marks"
                options={weightUnitOptions}
                defaultValue={null}
              />
            </div>
            <div className="form-group">
              <InputLabel text="alergens" forInput="alergens" />
              <SelectInput
                name="alergens"
                options={weightUnitOptions}
                defaultValue={null}
              />
            </div>
            <div className="form-group">
              <InputLabel text={t('dishForm:price')} forInput="price" />
              <Input
                type={InputVariants.TEXT}
                name="price"
                placeholder={t('dishForm:pricePlaceholder')}
              />
            </div>

            <div className='dish-page__form-row d-flex'>
              <Button
                variant={ButtonVariants.PRIMARY}
                innerContent={t('dishForm:createButton')}
                type={ButtonTypes.SUBMIT}
              />
              <Button
                variant={ButtonVariants.SECONDARY}
                innerContent={t('dishForm:backButton')}
                type={ButtonTypes.BUTTON}
                onClick={navigateToCategory}
              />
            </div>
          </>
        </Form>
      </LayoutWithBackButton>
    </div>
  );
};
