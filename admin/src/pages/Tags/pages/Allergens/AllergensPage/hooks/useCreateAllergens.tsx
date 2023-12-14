import { useRef } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { Allergens, AllergensService } from '@shared/services';
import { CreateAllergensResponse, CreateAllergenRequest  } from '@shared/services/AllergensService';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { InputLabel } from '@shared/components/atoms/InputLabel';
import { useAllergensFormValidation } from '../validation/useAllergensFormValidation';


interface CreateAllergensParams {
  onSuccess: (result: CreateAllergensResponse) => Promise<void>;
  referenceType: string,
  language: string;
  restaurantId: string,
}

export const useCreateAllergens = (args: CreateAllergensParams) => {
  const { onSuccess, referenceType, language, restaurantId} = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();
  const { validationSchema } = useAllergensFormValidation();

  const { execute: onCreateSubmit } = useRequest({
    requestFunction: AllergensService.create,
    onSuccess,
    onError: (error) => {
      throw error;
    },
  });

  const openAllergensCreateDialog = () => {
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Allergens>> | null>(null);

      const defaultValues: CreateAllergenRequest = {
        reference_type: referenceType,
        reference_id: restaurantId,
        name: '',
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
          title={t('tags:createAllergensForm.title')}
          size="lg"
          okText={t('common:buttons:add')}
          cancelText={t('common:buttons:cancel')}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onCreateSubmit(data as CreateAllergenRequest);
            }}
          >
            <>
              <Input
                type={InputVariants.HIDDEN}
                name="reference_type"
              />
              <Input
                type={InputVariants.HIDDEN}
                name="restaurant_id"
              />
              <Input
                type={InputVariants.HIDDEN}
                name="language"
              />
              <InputLabel
                forInput="name"
                text={t('tags:createAllergensForm.label')}
              />
              <Input
                placeholder={t('tags:createAllergensForm.placeholder')}
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
    openAllergensCreateDialog,
  };
};