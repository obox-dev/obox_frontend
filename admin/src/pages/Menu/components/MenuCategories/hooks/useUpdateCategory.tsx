import { useRef } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import {
  CategoriesService,
  Category,
  UpdateCategoryRequest,
} from '@shared/services';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { useCategoryFormValidation } from '../validation/useCategoryFormValidation';
import { Switcher } from '@shared/components/atoms/Switcher';
import { CategoryState } from '@shared/services/CategoriesService';

interface UpdateCategoryParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
}

export const useUpdateCategory = (args: UpdateCategoryParams) => {
  const { t } = useTranslation();
  const { validationSchema } = useCategoryFormValidation();
  const { openDialog } = useDialog();
  const { onSuccess, onError } = args;

  const updateSubmit = async ({ category_id, name, state }: Category) => {
    const id = category_id;
    const request: UpdateCategoryRequest = {
      name,
      state,
    };
    return CategoriesService.update(id, request);
  };

  const { execute: onUpdateSubmit } = useRequest({
    requestFunction: updateSubmit,
    onSuccess,
    onError,
  });

  const openCategoryUpdateDialog = (category: Category) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Category>> | null>(null);

      const defaultValues: Category = {
        ...category,
      };

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
          okText={t('common:buttons:confirm')}
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
              <Input type={InputVariants.HIDDEN} name="state" />
              <Input
                placeholder={t('menu:updateCategoryForm.placeholder')}
                type={InputVariants.TEXT}
                name="name"
              />
              <Switcher
                value={defaultValues.state}
                name="state"
                text={t('menu:visibleCategory')}
                onChange={(val) => {
                  formRef.current?.setValue(
                    'state',
                    val ? CategoryState.ENABLED : CategoryState.DISABLED
                  );
                }}
              />
            </>
          </Form>
        </Dialog>
      );
    });
  return { openCategoryUpdateDialog };
};
