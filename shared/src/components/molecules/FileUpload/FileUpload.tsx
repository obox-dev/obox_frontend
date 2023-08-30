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

  const [file, setFile] = useState<string | null>(null);

  const preview = file || image_url || null;

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
    const file = e?.target?.files?.[0];

    if (file) {
      const tempFile = await fileToBase64(file);

      setFile(tempFile);
      onFileChange(tempFile);
    }
  };

  // const deleteFile = () => {
  //   setFile(null);
  //   onFileChange('');
  // }

  return (
    <div className="file-upload">
      <InputLabel forInput="images" text={t("dishForm:image")}>
        <Input id="images" type={InputVariants.FILE} name="images" onChange={onAddFile} />
      </InputLabel>
      <div>
        {preview && <img className="file-upload__preview" src={preview} />}
      </div>
      {/* <Button variant={ButtonVariants.DANGER} type={ButtonTypes.BUTTON} text="Delete" onClick={deleteFile}/> */}
    </div>
  );
};
