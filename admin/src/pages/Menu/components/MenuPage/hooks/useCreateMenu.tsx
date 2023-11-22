import { useRef } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { Switcher } from '@shared/components/atoms/Switcher';
import { Menu, MenuService } from '@shared/services';
import {
  CreateMenuRequest,
  CreateMenuResponse,
} from '@shared/services/MenuService';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { InputLabel } from '@shared/components/atoms/InputLabel';
import { EntityState } from '@shared/utils/types';
import { useMenuFormValidation } from '../validation/useMenuFormValidation';

interface CreateMenuParams {
  onSuccess: (result: CreateMenuResponse) => Promise<void>;
  restaurantId: string;
  language: string;
}

export const useCreateMenu = (args: CreateMenuParams) => {
  const { onSuccess, restaurantId, language } = args;
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
        language,
        restaurant_id: restaurantId,
        state: EntityState.ENABLED,
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
          okText={t('common:buttons:add')}
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
              <Input
                type={InputVariants.HIDDEN}
                name="restaurant_id"
                value={restaurantId}
              />
              <Input
                type={InputVariants.HIDDEN}
                name="language"
                value={language}
              />
              <InputLabel
                forInput="name"
                text={t('menu:createMenuForm.label')}
              />
              <Input
                placeholder={t('menu:createMenuForm.placeholder')}
                type={InputVariants.TEXT}
                name="name"
              />
              <Switcher
                value={defaultValues.state}
                name="state"
                textForChecked={t('menu:actions.menuStatusEnabled')}
                textForUnchecked={t('menu:actions.menuStatusDisabled')}
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
  };
  return {
    openMenuCreateDialog,
  };
};
