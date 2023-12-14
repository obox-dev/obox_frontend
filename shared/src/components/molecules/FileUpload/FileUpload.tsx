import Dropzone, { DropzoneInputProps, FileRejection } from 'react-dropzone';
import { useTranslation } from '@libs/react-i18next';
import {
  Attachment,
  AttachmentOrFile,
  FileToUpload,
} from '@shared/services/AttachmentsService';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { ButtonTypes } from '@shared/components/atoms/Button/types';
import { InputLabel } from '@shared/components/atoms/InputLabel';
import './FileUpload.scss';

interface FileUploadProps {
  imagesToUpload: FileToUpload[];
  uploadedImages: Attachment[];
  onDeleteImage: (
    type: 'attachment' | 'file',
    attachment: AttachmentOrFile
  ) => void;
  onFileUpload: (fileToUpload: FileToUpload[]) => void;
  onFileDelete?: (attachment: Attachment[]) => void;
}

const omitDropzoneInputPropsChildren = <T extends DropzoneInputProps>(
  props: T
) => {
  const { children, ...inputProps } = props;

  return {
    children,
    inputProps,
  };
};

export const FileUpload = (props: FileUploadProps) => {
  const { imagesToUpload, uploadedImages, onFileUpload, onDeleteImage } = props;
  const { t } = useTranslation();

  const images = [...uploadedImages, ...imagesToUpload];

  const showPreview = images?.length || null;

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.readAsDataURL(file);
      reader.onerror = reject;
    });

  const onAddFile = async (files: File[]) => {
    const imagesList = [...(imagesToUpload || [])];

    await Promise.all(
      [...files].map(async (file: File) => {
        const base64image =
          file.type.indexOf('image') > -1 ? await fileToBase64(file) : '';
        imagesList.push({ base64image });
      })
    );
    onFileUpload(imagesList);
  };

  const getFileSrc = (file: AttachmentOrFile) => {
    if ('base64image' in file) {
      return file.base64image;
    }

    return file.attachment_url;
  };

  const handleDelete = (file: AttachmentOrFile) => {
    if ('base64image' in file) {
      onDeleteImage('file', file);
    } else {
      onDeleteImage('attachment', file);
    }
  };

  const renderError = (fileRejections: FileRejection[]) => {
    if (!fileRejections.length) return null;
    return fileRejections.map((file) => {
      return file.errors.map((e) => {
        return (
          <p className="file-upload__error" key={e.code}>
            {e.message}
          </p>
        );
      });
    });
  };

  const maxSizeImg = 3000000;

  function largeFileValidator(file: File) {
    if (file.size > maxSizeImg) {
      return {
        code: 'file-too-large',
        message: t('dishForm:fileUpload.error'),
      };
    }

    return null;
  }

  return (
    <>
      <InputLabel forInput="files" text={t('dishForm:fileUpload.label')} />
      <Dropzone
        accept={{
          'image/jpeg': ['.jpeg', '.png'],
        }}
        multiple={false}
        onDrop={(acceptedFiles) => onAddFile(acceptedFiles)}
        validator={largeFileValidator}
      >
        {({ getRootProps, getInputProps, fileRejections }) => {
          const { inputProps } = omitDropzoneInputPropsChildren(
            getInputProps()
          );
          return (
            <div>
              {!showPreview && (
                <div className="file-upload" {...getRootProps()}>
                  <input {...inputProps} />
                  <Button
                    className="file-upload__add-button"
                    variant={ButtonVariants.PRIMARY}
                    type={ButtonTypes.BUTTON}
                    innerContent={t('dishForm:fileUpload.addButton')}
                  />
                  {renderError(fileRejections) || (
                    <p className="file-upload__drop-placeholder">
                      {t('dishForm:fileUpload.placeholder')}
                    </p>
                  )}
                  <div className="file-upload__img-params">
                    <p>{t('dishForm:fileUpload.recomendedSize')}</p>
                    <p>{t('dishForm:fileUpload.maxSize')}</p>
                    <p>{t('dishForm:fileUpload.formats')}</p>
                  </div>
                </div>
              )}
              <div>
                {showPreview &&
                  images?.map((file, index) => (
                    <div className="file-upload__preview-item" key={index}>
                      <img
                        className="file-upload__preview-image"
                        src={getFileSrc(file)}
                        alt={`Preview ${index + 1}`}
                      />
                      <Button
                        className="file-upload__delete-button"
                        variant={ButtonVariants.SECONDARY}
                        type={ButtonTypes.BUTTON}
                        innerContent={t('dishForm:fileUpload.deleteButton')}
                        onClick={() => handleDelete(file)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          );
        }}
      </Dropzone>
    </>
  );
};
