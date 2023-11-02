import { useRef } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import {
  CategoriesService,
  Category,
  CreateCategoryRequest,
  CreateCategoryResponse,
} from '@shared/services';
import { useCategoryFormValidation } from '../validation/useCategoryFormValidation';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { CategoryState } from '@shared/services/CategoriesService';
import { Switcher } from '@shared/components/atoms/Switcher';

interface CreateCategoryParams {
  onSuccess: (result: CreateCategoryResponse) => Promise<void>;
  menuId: string;
  language: string;
}

export const useCreateCategory = (args: CreateCategoryParams) => {
  const { onSuccess, menuId, language } = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();
  const { validationSchema } = useCategoryFormValidation();
  const { execute: onCreateSubmit } = useRequest({
    requestFunction: CategoriesService.create,
    onSuccess,
    onError: (error) => {
      throw error;
    },
  });

  const openCategoryCreateDialog = () =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Category>> | null>(null);
      const defaultValues: CreateCategoryRequest = {
        menu_id: menuId,
        name: '',
        state: CategoryState.ENABLED,
        language,
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
          title={t('menu:createCategoryForm.title')}
          size="lg"
          okText={t('common:buttons:confirm')}
          cancelText={t('common:buttons:cancel')}
        >
          <Form
            ref={formRef}
            validationSchema={validationSchema}
            defaultValues={defaultValues}
            onSubmit={async (data) => {
              await onCreateSubmit(data as CreateCategoryRequest);
            }}
          >
            <>
              <Input
                type={InputVariants.HIDDEN}
                name="menu_id"
                value={menuId}
              />
              <Input
                type={InputVariants.HIDDEN}
                name="language"
                value={language}
              />
              <Input
                placeholder={t('menu:createCategoryForm.placeholder')}
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

  return { openCategoryCreateDialog };
};
