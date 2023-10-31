import { t } from '@libs/i18next';
import { Button, ButtonVariants } from '@shared/components/atoms/Button';
import { ButtonTypes } from '@shared/components/atoms/Button/types';
import { Input, InputVariants } from '@shared/components/atoms/Input';
import { InputLabel } from '@shared/components/atoms/InputLabel';
import {
  Attachment,
  AttachmentOrFile,
  FileToUpload,
} from '@shared/services/AttachmentsService';
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

export const FileUpload = (props: FileUploadProps) => {
  const { imagesToUpload, uploadedImages, onFileUpload, onDeleteImage } = props;

  const images = [...uploadedImages, ...imagesToUpload];

  const preview = images?.length || null;

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.readAsDataURL(file);
      reader.onerror = reject;
    });

  const onAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagesList = [...(imagesToUpload || [])];

    await Promise.all(
      [].map.call(e.target.files, async (file: File) => {
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

  return (
    <div className="file-upload">
      <InputLabel className="file-upload__trigger btn btn-primary mb-3" forInput="files" text={t('dishForm:image')}>
        <Input
          id="files"
          type={InputVariants.FILE}
          name="files"
          onChange={onAddFile}
        />
      </InputLabel>
      <div>
        {preview &&
          images?.map((file, index) => (
            <div className="file-upload__preview-item mb-3" key={index}>
              <img
                className="file-upload__preview-image"
                src={getFileSrc(file)}
                alt={`Preview ${index + 1}`}
              />
              <Button
                variant={ButtonVariants.DANGER}
                type={ButtonTypes.BUTTON}
                text="Delete"
                onClick={() => handleDelete(file)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
