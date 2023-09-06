import { t } from "@libs/i18next";
import { Button, ButtonVariants } from "@shared/components/atoms/Button";
import { ButtonTypes } from "@shared/components/atoms/Button/types";
import { Input, InputVariants } from "@shared/components/atoms/Input";
import { InputLabel } from "@shared/components/atoms/InputLabel";
import { useState } from "react";
import "./FileUpload.scss";

interface FileUploadProps {
  onFileChange: (fileAsBase64: string) => void;
  image_url?: string;
}

export const FileUpload = (props: FileUploadProps) => {
  const { image_url, onFileChange } = props;

  const [fileData, setFileData] = useState<{ base64String: string }[]>([]);

  const preview =
    fileData.length > 0 ? fileData[0].base64String : image_url || null;

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
    const tempFileList: { base64String: string }[] = [];
    await Promise.all(
      [].map.call(e.target.files, async (file: File) => {
        tempFileList.push({
          base64String:
            file.type.indexOf("image") > -1 ? await fileToBase64(file) : "",
        });
      })
    );
    setFileData(tempFileList);
    tempFileList.forEach((fileData) => {
      onFileChange(fileData.base64String);
    });
  };

  // const deleteFile = () => {
  //   setFile(null);
  //   onFileChange('');
  // }

  return (
    <div className="file-upload">
      <InputLabel forInput="images" text={t("dishForm:image")}>
        <Input
          id="images"
          type={InputVariants.FILE}
          name="images"
          onChange={onAddFile}
        />
      </InputLabel>
      <div>
        {preview &&
          fileData.map((file, index) => (
            <img
              key={index}
              className="file-upload__preview"
              src={file.base64String}
              alt={`Preview ${index}`}
            />
          ))}
      </div>
      {/* <Button variant={ButtonVariants.DANGER} type={ButtonTypes.BUTTON} text="Delete" onClick={deleteFile}/> */}
    </div>
  );
};
