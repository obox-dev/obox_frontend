import { useRef } from 'react';
import { ObjectSchema } from 'yup';
import { useParams } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';
import { Options } from 'react-select';
import { useTranslation } from '@libs/react-i18next';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Button } from '@shared/components/atoms/Button/Button';
import {
  ButtonTypes,
  ButtonVariants,
} from '@shared/components/atoms/Button/types';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { InputLabel } from '@shared/components/atoms/InputLabel/InputLabel';
import { Dish, DishResponse } from '@shared/services/DishService';
import { OptionType } from '@shared/components/atoms/SelectInput/types';
import { FileUpload } from '@shared/components/molecules/FileUpload/FileUpload';
import { Textarea } from '@shared/components/atoms/Textarea';
import './DishForm.scss';
import {
  Attachment,
  FileToUpload,
  AttachmentOrFile,
} from '@shared/services/AttachmentsService';
import { SelectInput } from '@shared/components/atoms/SelectInput';
import { LayoutWithBackButton } from '@admin/layout/LayoutWithBackButton/LayoutWithBackButton';
import { DishDefaultValues } from './hooks/useDishForms';
// import { Switcher } from '@shared/components/atoms/Switcher';
import { useDish } from './useDish';
import { DishActionTypes } from './types';

interface DishFormProps<T extends FieldValues> {
  dish?: DishResponse;
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
  categoryOptions: OptionType<string>[];
  weightUnitOptions: OptionType<string>[];
  allergensOptions: OptionType<string>[];
  marksOptions: OptionType<string>[];
}

export const DishForm = <T extends FieldValues>(props: DishFormProps<T>) => {
  const { t } = useTranslation();
  const { menuId, categoryId, dishId } = useParams();

  const {
    dish,
    onSubmit,
    validationSchema,
    defaultValues,
    imagesToUpload,
    uploadedImages,
    onUploadImage,
    onDeleteImage,
    language,
    categoryOptions,
    weightUnitOptions,
    allergensOptions,
    marksOptions,
  } = props;

  const formRef = useRef<FormRef<Partial<Dish>> | null>(null);

  const setSingleValue = (field: keyof Dish, option: OptionType<string>) => {
    const value = option?.value;
    formRef.current?.setValue(field, value);
  };

  const setMultipleValues = (
    field: keyof Dish,
    options: Options<OptionType<string>>
  ) => {
    formRef.current?.setValue(
      field,
      options.map((op) => op.value)
    );
  };

  const { menuDishesActions } = useDish({ categoryId: categoryId!, language });
  const deleteAction = menuDishesActions[DishActionTypes.DELETE];
  // const updateInStockAction = menuDishesActions[DishActionTypes.CHANGE_IN_STOCK];
  // const updateStateAction = menuDishesActions[DishActionTypes.UPDATE_STATE];

  const headerTitle = dishId
    ? t('dishForm:updateDish')
    : t('dishForm:createDish');

  return (
    <div className="dish-page container">
      <LayoutWithBackButton
        backTo={`/menu/${menuId}/category/${categoryId}`}
        backButtonVariant={ButtonVariants.SECONDARY}
        title={headerTitle}
      >
        <Form
          defaultValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          ref={formRef}
        >
          <>
            {/* <div className="dish-form-actions">
              <Switcher
                onChange={() => {
                  updateStateAction(dishItem)}}
                value={dish.in_stock}
                name="in_stock"
                textForChecked={t('common:inStock')}
                textForUnchecked={t('common:outStock')}
              />
              <Switcher
                onChange={() => {
                  updateInStockAction(dish);
                }}
                value={dish.in_stock}
                name="in_stock"
                textForChecked={t('common:inStock')}
                textForUnchecked={t('common:outStock')}
              />
            </div> */}
            <Input
              type={InputVariants.HIDDEN}
              name="language"
              value={language}
            />
            <div className="form-group">
              <InputLabel
                text={t('dishForm:category')}
                forInput="category_id"
              />
              <SelectInput
                name="category_id"
                options={categoryOptions}
                defaultValue={defaultValues.category_id}
                onChange={(e) => {
                  setSingleValue('category_id', e as OptionType<string>);
                }}
              />
            </div>
            <div className="form-group">
              <InputLabel text={t('dishForm:dishName')} forInput="name" />
              <Input
                type={InputVariants.TEXT}
                name="name"
                placeholder={t('dishForm:placeholder.dishName')}
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
                placeholder={t('dishForm:placeholder.description')}
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
                  placeholder={t('dishForm:placeholder.weight')}
                />
              </div>
              <div className="form-group">
                <InputLabel
                  text={t('dishForm:weightUnit')}
                  forInput="weight_unit"
                />
                <SelectInput
                  name="weight_unit"
                  options={weightUnitOptions}
                  defaultValue={defaultValues.weight_unit}
                  onChange={(e) => {
                    setSingleValue('weight_unit', e as OptionType<string>);
                  }}
                  placeholder={t('dishForm:placeholder.weightUnit')}
                  isClearable
                />
              </div>
            </div>
            <div className="dish-page__form-row d-flex">
              <div className="form-group">
                <InputLabel text={t('dishForm:calories')} forInput="calories" />
                <Input
                  type={InputVariants.TEXT}
                  name="calories"
                  placeholder={t('dishForm:placeholder.calories')}
                />
              </div>
              <div className="form-group">
                <InputLabel
                  text={t('dishForm:cookingTime')}
                  forInput="cooking_time"
                />
                <Input
                  type={InputVariants.TEXT}
                  name="cooking_time"
                  placeholder={t('dishForm:placeholder.cookingTime')}
                />
              </div>
            </div>
            <div className="form-group">
              <InputLabel text={t('dishForm:marks')} forInput="marks" />
              <SelectInput
                name="marks"
                options={marksOptions}
                isMulti
                defaultValue={defaultValues.marks}
                closeMenuOnSelect={false}
                onChange={(e) => {
                  setMultipleValues('marks', e as Options<OptionType<string>>);
                }}
                placeholder={t('dishForm:placeholder.marks')}
              />
            </div>
            <div className="form-group">
              <InputLabel text={t('dishForm:allergens')} forInput="allergens" />
              <SelectInput
                name="allergens"
                options={allergensOptions}
                isMulti
                defaultValue={defaultValues.allergens}
                closeMenuOnSelect={false}
                onChange={(e) => {
                  setMultipleValues(
                    'allergens',
                    e as Options<OptionType<string>>
                  );
                }}
                placeholder={t('dishForm:placeholder.allergens')}
              />
            </div>
            <div className="dish-page__form-row d-flex">
              <div className="form-group">
                <InputLabel text={t('dishForm:price')} forInput="price" />
                <Input
                  type={InputVariants.TEXT}
                  name="price"
                  placeholder={t('dishForm:placeholder.price')}
                />
              </div>
              <div className="form-group">
                <InputLabel
                  text={t('dishForm:specialPrice')}
                  forInput="special_price"
                />
                <Input
                  type={InputVariants.TEXT}
                  name="special_price"
                  placeholder={t('dishForm:placeholder.specialPrice')}
                />
              </div>
            </div>

            <div className="dish-page__form-row d-flex">
              <Button
                variant={ButtonVariants.PRIMARY}
                innerContent={t('dishForm:createButton')}
                type={ButtonTypes.SUBMIT}
              />
              {dish ? (
                <Button
                  variant={ButtonVariants.SECONDARY}
                  innerContent={t('dishForm:deleteButton')}
                  type={ButtonTypes.BUTTON}
                  onClick={() => deleteAction(dish)}
                />
              ) : (
                <Button
                  variant={ButtonVariants.SECONDARY}
                  innerContent={t('dishForm:resetButton')}
                  type={ButtonTypes.BUTTON}
                  onClick={() => formRef.current?.reset()}
                />
              )}
            </div>
          </>
        </Form>
      </LayoutWithBackButton>
    </div>
  );
};
