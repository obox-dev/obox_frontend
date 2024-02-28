import { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { Marks ,MarksResponse } from '@shared/services';
import { MarksService, UpdateMarksRequest } from '@shared/services/MarksService';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { ColorPickerDropdown } from '@shared/components/atoms/ColorPickerDropdown';
import { InputLabel } from '@shared/components/atoms/InputLabel';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { mapMarksContent } from '../mappers/mapMarksContent';
import { formatAsRequired } from '@shared/helpers/formatAsRequired';
import { useMarksFormValidation } from '../validation/useMarksFormValidation';
import { ColorsMarksWrapper  } from '../components/ColorsMarksWrapper';

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
  const updateSubmit = async ({ mark_id, name, color_background, color_text}: Marks) => {
    const id = mark_id;
    const request: UpdateMarksRequest = {
      name,
      color_background,
      color_text,
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
                text={formatAsRequired(t('tags:nameTag'))}
              />
              <Input
                placeholder={t('tags:nameTag')}
                type={InputVariants.TEXT}
                name="name"
              />
              <>
                <ColorsMarksWrapper 
                  title={t('tags:createMarksForm.colorsTitle')}
                >
                  <div>
                    <p className='colors-title'>{t('tags:createMarksForm.colorBackground')}</p>
                    <Controller
                      name='color_background'
                      defaultValue={defaultValues.color_background}
                      render={({ field }) => {
                        return (
                          <ColorPickerDropdown
                            {...field}
                            initialColor={defaultValues.color_background}
                          />
                        );
                      }}
                    /> 
                  </div>
                  <div>
                    <p className='colors-title'>{t('tags:createMarksForm.colorText')}</p>
                    <Controller
                      name='color_text'
                      defaultValue={defaultValues.color_text}
                      render={({ field }) => {
                        return (
                          <ColorPickerDropdown
                            {...field}
                            initialColor={defaultValues.color_text}
                          />
                        );
                      }}
                    />
                  </div>
                </ColorsMarksWrapper>
              </>
            </>
          </Form>
        </Dialog>
      );
    });
  return {
    openMarksUpdateDialog,
  };
};