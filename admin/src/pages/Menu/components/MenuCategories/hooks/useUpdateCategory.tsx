import { useRef } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import {
  CategoriesService,
  Category,
  CategoryResponse,
  UpdateCategoryRequest,
} from '@shared/services';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { useCategoryFormValidation } from '../validation/useCategoryFormValidation';
import { Switcher } from '@shared/components/atoms/Switcher';
import { EntityState, UpdateStateRequest } from '@shared/utils/types';
import { mapCategoryContent } from '../mappers/mapCategoryContent';
import { Textarea } from '@shared/components/atoms/Textarea';
import { InputLabel } from '@shared/components/atoms/InputLabel';

interface UpdateCategoryParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  language: string;
}

export const useUpdateCategory = (args: UpdateCategoryParams) => {
  const { t } = useTranslation();
  const { validationSchema } = useCategoryFormValidation();
  const { openDialog } = useDialog();
  const { onSuccess, onError, language } = args;

  const updateSubmit = async ({ category_id, name, state, description }: Category) => {
    const id = category_id;
    const request: UpdateCategoryRequest = {
      name,
      state,
      language,
      description,   
    };
    return CategoriesService.update(id, request);
  };

  const updateState = async ({ category_id, state }: Category) => {
    const id = category_id;
    const request: UpdateStateRequest = {
      state,
      language,
    };

    await CategoriesService.update(id, request);
  };

  const { execute: onUpdateSubmit } = useRequest({
    requestFunction: updateSubmit,
    onSuccess,
    onError,
  });

  const openCategoryUpdateDialog = (category: CategoryResponse) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Category>> | null>(null);

      const defaultValues = mapCategoryContent(category, language);

      return (
        <Dialog
          okCallback={() => {
            if (formRef.current) {
              formRef.current.submit();
            }
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t('menu:updateCategoryForm.title')}
          size="lg"
          okText={t('common:buttons:edit')}
          cancelText={t('common:buttons:cancel')}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onUpdateSubmit(data as Category);
            }}
          >
            <>
              <Input type={InputVariants.HIDDEN} name="category_id" />
              <Input
                type={InputVariants.HIDDEN}
                name="language"
                value={language}
              />
              <Input
                placeholder={t('menu:updateCategoryForm.placeholder')}
                type={InputVariants.TEXT}
                name="name"
              />
              <InputLabel
                forInput="description"
                text={t('menu:createCategoryForm.description')}
              />
              <Textarea
                name="description"
                placeholder={t('menu:createCategoryForm:descriptionTextArea')}
                maxLength={255}
                showCounter
              />
              <Switcher
                value={defaultValues.state}
                name="state"
                text={t('menu:visibleCategory')}
                onChange={(val) => {
                  formRef.current?.setValue(
                    'state',
                    val ? EntityState.ENABLED : EntityState.DISABLED
                  );
                }}
              />
            </>
          </Form>
        </Dialog>
      );
    });
  return { openCategoryUpdateDialog, updateState };
};
