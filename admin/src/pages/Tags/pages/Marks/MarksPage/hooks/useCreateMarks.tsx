import { useRef } from 'react';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { Marks, MarksService } from '@shared/services';
import { CreateMarksResponse, CreateMarksRequest  } from '@shared/services/MarksService';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { InputLabel } from '@shared/components/atoms/InputLabel';
import { formatAsRequired } from '@shared/helpers/formatAsRequired';
import { useMarksFormValidation } from '../validation/useMarksFormValidation';

interface CreateMarksParams {
  onSuccess: (result: CreateMarksResponse) => Promise<void>;
  referenceType: string,
  language: string;
  restaurantId: string,
}

export const useCreateMarks = (args: CreateMarksParams) => {
  const { onSuccess, referenceType, language, restaurantId} = args;
  const { openDialog } = useDialog();
  const { t } = useTranslation();
  const { validationSchema } = useMarksFormValidation();

  const { execute: onCreateSubmit } = useRequest({
    requestFunction: MarksService.create,
    onSuccess,
    onError: (error) => {
      throw error;
    },
  });

  const openMarksCreateDialog = () => {
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Marks>> | null>(null);

      const defaultValues: CreateMarksRequest = {
        reference_type: referenceType,
        reference_id: restaurantId,
        name: '',
        color_background: '',
        color_text: '',
        emoji: '',
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
          title={t('tags:createMarksForm.title')}
          size="lg"
          okText={t('common:buttons:add')}
          cancelText={t('common:buttons:cancel')}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onCreateSubmit(data as CreateMarksRequest);
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
                text={formatAsRequired(t('tags:createMarksForm.label'))}
              />
              <Input
                placeholder={t('tags:createMarksForm.placeholder')}
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
    openMarksCreateDialog,
  };
};