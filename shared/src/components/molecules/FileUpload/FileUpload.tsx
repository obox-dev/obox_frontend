import { t } from "@libs/i18next";
import { FormRef } from "@shared/components/atoms/Form";
import { FormInput } from "@shared/components/atoms/FormInput";
import { Input, InputVariants } from "@shared/components/atoms/Input";
import { InputLabel } from "@shared/components/atoms/InputLabel";
import { Dish } from "@shared/services/DishService";
import { useState, useRef } from "react";

interface FileUploadProps<T> {
  onFileLoaded: (fileAsBase64: string) => void;
  image_url?: string;
}

export const FileUpload = <T, >(props: FileUploadProps<T>) => {
  const { image_url, onFileLoaded } = props;
  const formRef = useRef<FormRef<Partial<Dish>> | null>(null);

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
      onFileLoaded(tempFile);
    }
  };

  return (
    <div>
      <InputLabel text={t("dishForm:image")} />
      {/* <FormInput type={InputVariants.HIDDEN} name="image" /> */}
      <Input
        type={InputVariants.FILE}
        name="images"
        onChange={onAddFile}
      />
      <div>{preview && <img className="img" src={preview} />}</div>
    </div>
  );
};
