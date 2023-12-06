import { useRef } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { Marks ,MarksResponse } from '@shared/services';
import { MarksService, UpdateMarksRequest } from '@shared/services/MarksService';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { InputLabel } from '@shared/components/atoms/InputLabel';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { mapMarksContent } from '../mappers/mapMarksContent';
import { useMarksFormValidation } from '../validation/useMarksFormValidation';



interface UpdateMarksParams {
  onSuccess: () => Promise<void>;
  onError?: (error: AxiosError) => void;
  language: string;
}

export const useUpdateMarks = (args: UpdateMarksParams) => {
  const { t } = useTranslation();
  const { validationSchema } = useMarksFormValidation();
  const { openDialog } = useDialog();
  const { onSuccess, onError, language} = args;
  
  const updateSubmit = async ({ mark_id, name }: Marks) => {
    const id = mark_id;
    const request: UpdateMarksRequest = {
      name,
      language,
    };
    return MarksService.update(id, request);
  };

  const { execute: onUpdateSubmit } = useRequest({
    requestFunction: updateSubmit,
    onSuccess,
    onError,
  });

  const openMarksUpdateDialog = (mark: MarksResponse) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Marks>> | null>(null);
      const defaultValues: Marks = mapMarksContent(mark, language);

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
          title={t('tags:updateMarksForm.title')}
          size="lg"
          okText={t('common:buttons:edit')}
          cancelText={t('common:buttons:cancel')}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onUpdateSubmit(data as Marks);
            }}
          >
            <>
              <Input
                type={InputVariants.HIDDEN}
                name="language"
              />
              <InputLabel
                forInput="name"
                text={t('tags:updateMarksForm.label')}
              />
              <Input
                placeholder={t('tags:updateMarksForm.placeholder')}
                type={InputVariants.TEXT}
                name="name"
              />
            </>
          </Form>
        </Dialog>
      );
    });
  return {
    openMarksUpdateDialog,
  };
};
