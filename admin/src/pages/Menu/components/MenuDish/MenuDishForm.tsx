import { useRef, useCallback } from 'react';
import { ObjectSchema } from 'yup';
import { useParams } from 'react-router-dom';
import { Controller, FieldValues } from 'react-hook-form';
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
import {
  Attachment,
  FileToUpload,
  AttachmentOrFile,
} from '@shared/services/AttachmentsService';
import { SelectInput } from '@shared/components/atoms/SelectInput';
import { Switcher } from '@shared/components/atoms/Switcher';
import { formatAsRequired } from '@shared/helpers/formatAsRequired';
import { LayoutWithBackButton } from '@admin/layout/LayoutWithBackButton/LayoutWithBackButton';
import { DishDefaultValues } from './hooks/useDishForms';
import { useDish } from './useDish';
import { DishActionTypes } from './types';
import './DishForm.scss';

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
  onReset: () => void;
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
    onReset,
  } = props;

  const formRef = useRef<FormRef<Partial<Dish>> | null>(null);

  const { menuDishesActions } = useDish({ categoryId: categoryId!, language, menuId: menuId! });
  const deleteAction = menuDishesActions[DishActionTypes.DELETE];

  const headerTitle = dishId
    ? t('dishForm:updateDish')
    : t('dishForm:createDish');

  const renderSecondaryButton = useCallback(() => {
    const buttonProps = {
      type: ButtonTypes.BUTTON,
      variant: ButtonVariants.SECONDARY,
    };

    const onClick = dish
      ? () => deleteAction(dish)
      : () => {
        formRef.current?.reset();
        onReset();
      };

    const innerContent = dish
      ? t('dishForm:deleteButton')
      : t('dishForm:resetButton');

    return (
      <Button {...buttonProps} onClick={onClick} innerContent={innerContent} />
    );
  }, [t]);

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
            <div className="dish-page__actions dish-page__form-row d-flex">
              <Controller
                name="state"
                defaultValue={defaultValues.state}
                render={({ field }) => {
                  return (
                    <Switcher
                      {...field}
                      textForChecked={t('dishForm:statusActive')}
                      textForUnchecked={t('dishForm:statusInActive')}
                    />
                  );
                }}
              />
              <Controller
                name="in_stock"
                defaultValue={defaultValues.in_stock}
                render={({ field }) => {
                  return (
                    <Switcher
                      {...field}
                      textForChecked={t('dishForm:inStock')}
                      textForUnchecked={t('dishForm:outOfStock')}
                    />
                  );
                }}
              />
            </div>
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
              <Controller
                name="category_id"
                defaultValue={defaultValues.category_id}
                render={({ field }) => {
                  return (
                    <SelectInput
                      {...field}
                      options={categoryOptions}
                      defaultValue={defaultValues.category_id}
                    />
                  );
                }}
              />
            </div>
            <div className="form-group">
              <InputLabel
                text={formatAsRequired(t('dishForm:dishName'))}
                forInput="name"
              />
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
                  onChange={(e) => {
                    if (e.target.value === '') {
                      formRef.current?.clearFieldErrors('weight_unit');
                    }
                  }}
                />
              </div>
              <div className="form-group">
                <InputLabel
                  text={t('dishForm:weightUnit')}
                  forInput="weight_unit"
                />
                <Controller
                  name="weight_unit"
                  defaultValue={defaultValues.weight_unit}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <SelectInput
                        {...field}
                        options={weightUnitOptions}
                        defaultValue={defaultValues.weight_unit}
                        placeholder={t('dishForm:placeholder.weightUnit')}
                        isClearable
                        error={error}
                      />
                    );
                  }}
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
              <Controller
                name="marks"
                defaultValue={defaultValues.marks}
                render={({ field }) => {
                  return (
                    <SelectInput
                      {...field}
                      name="marks"
                      options={marksOptions}
                      isMulti
                      defaultValue={defaultValues.marks}
                      closeMenuOnSelect={false}
                      placeholder={t('dishForm:placeholder.marks')}
                    />
                  );
                }}
              />
            </div>
            <div className="form-group">
              <InputLabel text={t('dishForm:allergens')} forInput="allergens" />
              <Controller
                name="allergens"
                defaultValue={defaultValues.allergens}
                render={({ field }) => {
                  return (
                    <SelectInput
                      {...field}
                      name="marks"
                      options={allergensOptions}
                      isMulti
                      defaultValue={defaultValues.allergens}
                      closeMenuOnSelect={false}
                      placeholder={t('dishForm:placeholder.allergens')}
                    />
                  );
                }}
              />
            </div>
            <div className="dish-page__form-row d-flex">
              <div className="form-group">
                <InputLabel
                  text={formatAsRequired(t('dishForm:price'))}
                  forInput="price"
                />
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
              {renderSecondaryButton()}
            </div>
          </>
        </Form>
      </LayoutWithBackButton>
    </div>
  );
};
