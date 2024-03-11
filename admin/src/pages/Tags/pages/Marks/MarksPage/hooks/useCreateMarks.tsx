import { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from '@libs/react-i18next';
import { useRequest } from '@admin/hooks';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { Marks, MarksService } from '@shared/services';
import { CreateMarksResponse, CreateMarksRequest  } from '@shared/services/MarksService';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { ColorPickerDropdown } from '@shared/components/atoms/ColorPickerDropdown';
import { CustomEmojiPicker } from '@shared/components/atoms/EmojiPicker';
import { InputLabel } from '@shared/components/atoms/InputLabel';
import { formatAsRequired } from '@shared/helpers/formatAsRequired';
import { useMarksFormValidation } from '../validation/useMarksFormValidation';
import { ColorsMarksWrapper } from '../components/ColorsMarksWrapper';
import { EmojiWrapper } from '../components/EmojiWrapper';
import './ColorsPickerMarksTitle.scss';

interface CreateMarksParams  {
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
      const defaultColorBackground = getComputedStyle(document.documentElement).getPropertyValue('--action-button-active');
      const defaultColorText = getComputedStyle(document.documentElement).getPropertyValue('--color-border-focus-1px');
      const defaultValues: CreateMarksRequest = {
        color_background: defaultColorBackground,
        color_text: defaultColorText,
        emoji: '',
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
                            initialColor={defaultColorBackground}
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
                            initialColor={defaultColorText}
                          />
                        );
                      }}
                    />
                  </div>
                </ColorsMarksWrapper>
                <EmojiWrapper
                  title={t('tags:createMarksForm.emojiTitle')}
                  descriptionAction={t('tags:createMarksForm.emojiDescriptionAction')}
                >
                  <Controller
                    name='emoji'
                    defaultValue={defaultValues.emoji}
                    render={({ field }) => {
                      return (
                        <CustomEmojiPicker
                          {...field}
                          initialEmoji={''}
                        />
                      );
                    }}
                  /> 
                </EmojiWrapper>
              </>
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

