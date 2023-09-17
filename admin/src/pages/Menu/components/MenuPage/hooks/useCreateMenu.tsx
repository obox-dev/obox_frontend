import { useRequest } from '@admin/hooks';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { Menu, MenuService } from '@shared/services';
import {
  CreateMenuRequest,
  CreateMenuResponse,
} from '@shared/services/MenuService';
import { useRef } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { FormInput } from '@shared/components/atoms/FormInput';
import { InputVariants } from '@shared/components/atoms/Input';
import { useMenuFormValidation } from '../validation/useMenuFormValidation';

interface CreateMenuParams {
  onSuccess: (result: CreateMenuResponse) => Promise<void>;
  restaurantId: string;
}

const DEFAULT_LANGUAGE_CODE = 'en';

export const useCreateMenu = (args: CreateMenuParams) => {
  const { onSuccess, restaurantId } = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();
  const { validationSchema } = useMenuFormValidation();

  const { execute: onCreateSubmit } = useRequest({
    requestFunction: MenuService.create,
    onSuccess,
    onError: (error) => {
      throw error;
    },
  });

  const openMenuCreateDialog = () => {
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Menu>> | null>(null);

      const defaultValues: CreateMenuRequest = {
        name: '',
        language_code: DEFAULT_LANGUAGE_CODE,
        restaurant_id: restaurantId,
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
          title={t('menu:createMenuForm.title')}
          size="lg"
          okText={t('common:buttons:confirm')}
          cancelText={t('common:buttons:cancel')}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onCreateSubmit(data as CreateMenuRequest);
            }}
          >
            <>
              <FormInput
                type={InputVariants.HIDDEN}
                name="restaurant_id"
                value={restaurantId}
              />
              <FormInput type={InputVariants.HIDDEN} name="language_code" />
              <FormInput
                placeholder={t('menu:createMenuForm.placeholder')}
                type={InputVariants.TEXT}
                name="name"
              />
            </>
          </Form>
        </Dialog>
      );
    });
  };
  return {
    openMenuCreateDialog,
  };
};
