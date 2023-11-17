import { useRef } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { Menu, MenuResponse } from '@shared/services';
import { UpdateMenuRequest, MenuService, MenuState } from '@shared/services/MenuService';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { useMenuFormValidation } from '../validation/useMenuFormValidation';
import { Switcher } from '@shared/components/atoms/Switcher';
import { mapMenuContent } from '../mappers/mapMenuContent';

interface UpdateMenuParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  language: string;
}

export const useUpdateMenu = (args: UpdateMenuParams) => {
  const { t } = useTranslation();
  const { validationSchema } = useMenuFormValidation();
  const { openDialog } = useDialog();
  const { onSuccess, onError, language } = args;

  const updateSubmit = async ({ menu_id, name, state }: Menu) => {
    const id = menu_id;
    const request: UpdateMenuRequest = {
      name,
      state,
      language
    };

    return MenuService.update(id, request);
  };

  const { execute: onUpdateSubmit } = useRequest({
    requestFunction: updateSubmit,
    onSuccess,
    onError,
  });

  const openMenuUpdateDialog = (menu: MenuResponse) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Menu>> | null>(null);
      const defaultValues: Menu = mapMenuContent(menu, language);

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
          title={t('menu:updateMenuForm.title')}
          size="lg"
          okText={t('common:buttons:confirm')}
          cancelText={t('common:buttons:cancel')}
        >
          
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onUpdateSubmit(data as Menu);
            }}
          >
            <>
              <Input type={InputVariants.HIDDEN} name="restaurant_id" />
              <Input type={InputVariants.HIDDEN} name="language" value={language} />
              <Input
                placeholder={t('menu:createMenuForm.placeholder')}
                type={InputVariants.TEXT}
                name="name"
              />
              <Switcher value={defaultValues.state} name="state" text={t('menu:visibleMenu')} onChange={(val) => {
                formRef.current?.setValue('state', val ? MenuState.ENABLED : MenuState.DISABLED);
              }}/>
            </>
          </Form>
        </Dialog>
      );
    });
  return {
    openMenuUpdateDialog,
  };
};
