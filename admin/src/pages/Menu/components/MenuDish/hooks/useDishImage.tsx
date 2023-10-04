import { useState, useCallback } from 'react';
import {
  Attachment,
  FileToUpload,
  AttachmentOrFile,
  AttachmentReferenceType,
  AttachmentService,
} from '@shared/services/AttachmentsService';
import { useRequest } from '@admin/hooks';

export const useDishImage = () => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileToUpload[]>([]);
  const [attachmentsToDelete, setAttachmentsToDelete] = useState<Attachment[]>([]);

  const { execute: createAttachment } = useRequest({
    requestFunction: AttachmentService.create,
  });

  const { execute: deleteAttachment } = useRequest({
    requestFunction: AttachmentService.delete,
  });

  const { execute: getDishAttachments } = useRequest({
    requestFunction: AttachmentService.getAllAttachments,
    onSuccess: (images: Attachment[]) => {
      setAttachments(images);
    },
  });

  const handleDeleteButtonClick = (
    type: 'attachment' | 'file',
    attachment: AttachmentOrFile
  ) => {
    console.log(type, attachment);
    
    if (type === 'attachment') {
      const existingImage = attachment as Attachment;
      setAttachments(
        attachments.filter((att) => {
          return att.attachment_id !== existingImage.attachment_id;
        })
      );

      const toDelete = [...attachmentsToDelete, existingImage];
      setAttachmentsToDelete(toDelete);
    } else {
      setFilesToUpload(
        filesToUpload.filter((file) => {
          return file.base64image !== (attachment as FileToUpload).base64image;
        })
      );
    }
  };

  const uploadFiles = async (dishId: string, files: FileToUpload[]) => {
    const images = files.map(({ base64image }) => {
      return createAttachment({
        reference_type: AttachmentReferenceType.DISH,
        reference_id: dishId,
        attachment: base64image,
      });
    });
    await Promise.all(images);
    setAttachments([]);
    setAttachmentsToDelete([]);
  };

  const deleteMarkedAttachments = useCallback(async () => {
    if (attachmentsToDelete.length > 0) {
      const deletePromises = attachmentsToDelete.map((attachment: Attachment) => {
        const id = attachment.attachment_id;
        return deleteAttachment(id);
      });
      await Promise.all(deletePromises);
      setAttachmentsToDelete([]);
    }
  }, [attachmentsToDelete]);

  return {
    attachments,
    filesToUpload,
    attachmentsToDelete,
    handleDeleteButtonClick,
    uploadFiles,
    deleteMarkedAttachments,
    getDishAttachments,
    setFilesToUpload,
  }
};
