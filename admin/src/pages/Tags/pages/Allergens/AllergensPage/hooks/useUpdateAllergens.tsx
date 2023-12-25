import { useRef } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { Allergens ,AllergensResponse } from '@shared/services';
import { AllergensService, UpdateAllergensRequest } from '@shared/services/AllergensService';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { InputLabel } from '@shared/components/atoms/InputLabel';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { formatAsRequired } from '@shared/helpers/formatAsRequired';
import { useRequest } from '@admin/hooks';
import { mapAllergensContent } from '../mappers/mapAllergensContent';
import { useAllergensFormValidation } from '../validation/useAllergensFormValidation';

interface UpdateAllergensParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  language: string;
}

export const useUpdateAllergens = (args: UpdateAllergensParams) => {
  const { t } = useTranslation();
  const { validationSchema } = useAllergensFormValidation();
  const { openDialog } = useDialog();
  const { onSuccess, onError, language} = args;
  
  const updateSubmit = async ({ allergen_id, name }: Allergens) => {
    const id = allergen_id;
    const request: UpdateAllergensRequest = {
      name,
      language,
    };
    return AllergensService.update(id, request);
  };

  const { execute: onUpdateSubmit } = useRequest({
    requestFunction: updateSubmit,
    onSuccess,
    onError,
  });

  const openAllergensUpdateDialog = (allergen: AllergensResponse) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Allergens>> | null>(null);
      const defaultValues: Allergens = mapAllergensContent(allergen, language);

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
          title={t('common:update')}
          size="lg"
          okText={t('common:buttons:edit')}
          cancelText={t('common:buttons:cancel')}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onUpdateSubmit(data as Allergens);
            }}
          >
            <>
              <Input
                type={InputVariants.HIDDEN}
                name="language"
              />
              <InputLabel
                forInput="name"
                text={formatAsRequired(t('tags:nameAllergen'))}
              />
              <Input
                placeholder={t('tags:updateAllergensForm.placeholder')}
                type={InputVariants.TEXT}
                name="name"
              />
            </>
          </Form>
        </Dialog>
      );
    });
  return {
    openAllergensUpdateDialog,
  };
};
