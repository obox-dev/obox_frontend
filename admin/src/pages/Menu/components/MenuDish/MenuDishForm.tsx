import { useNavigate, useParams } from "react-router";
import { Form, FormRef } from "@shared/components/atoms/Form";
import { useTranslation } from "@libs/react-i18next";
import { Button } from "@shared/components/atoms/Button/Button";
import {
  ButtonTypes,
  ButtonVariants,
} from "@shared/components/atoms/Button/types";
import { InputVariants } from "@shared/components/atoms/Input";
import { InputLabel } from "@shared/components/atoms/InputLabel/InputLabel";
import "./DishForm.scss";
import { FormInput } from "@shared/components/atoms/FormInput";
import { Dish } from "@shared/services/DishService";
import { ObjectSchema } from "yup";
import { useState } from "react";
import { useMemo } from "react";
import { useRef } from "react";

interface DishFormProps {
  onSubmit: (data: Partial<Dish>) => void;
  validationSchema: ObjectSchema<Partial<Dish>>;
  defaultValues: Partial<Dish>;
}

export const DishForm = (props: DishFormProps) => {
  const { t } = useTranslation();
  const { menuId, categoryId } = useParams();
  const { onSubmit, validationSchema, defaultValues } = props;

  const navigate = useNavigate();
  const navigateToCategory = () => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  };

  const [file, setFile] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.readAsDataURL(file);
      reader.onerror = reject;
    });

  const onSelectFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];

    if (file) {
      const tempFile: { fileName: string; base64String: string } = {
        fileName: file.name,
        base64String:
          file.type.indexOf("image") > -1 ? await fileToBase64(file) : "",
      };

      setFile(tempFile.base64String.replace("data:image/png;base64,", ""))
    }
  };

  const formData = useMemo(() => {
    return {
      ...defaultValues,
      image: file ? file : '',
    }
  }, [defaultValues, file])

  return (
    <div className="container">
      <div className="row justify-content-center my-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <Form
                defaultValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <>
                  <div className="form-columns">
                    <div className="left-column">
                      <FormInput
                        type={InputVariants.HIDDEN}
                        name="category_id"
                      />
                      <FormInput type={InputVariants.HIDDEN} name="status" />
                      <div className="form-group">
                        <InputLabel text={t("dishForm:name")} forInput="name" />
                        <FormInput
                          type={InputVariants.TEXT}
                          name="name"
                          placeholder={t("dishForm:namePlaceholder")}
                        />
                      </div>
                      <div className="form-group">
                        <InputLabel
                          text={t("dishForm:price")}
                          forInput="price"
                        />
                        <FormInput
                          type={InputVariants.NUMBER}
                          name="price"
                          placeholder={t("dishForm:pricePlaceholder")}
                        />
                      </div>
                      <div className="form-group">
                        <InputLabel
                          text={t("dishForm:weight")}
                          forInput="weight"
                        />
                        <FormInput
                          type={InputVariants.NUMBER}
                          name="weight"
                          placeholder={t("dishForm:weightPlaceholder")}
                        />
                      </div>
                      <div className="form-group">
                        <InputLabel
                          text={t("dishForm:calories")}
                          forInput="calories"
                        />
                        <FormInput
                          type={InputVariants.NUMBER}
                          name="calories"
                          placeholder={t("dishForm:caloriesPlaceholder")}
                        />
                      </div>
                      {/* <div className="form-group">
                        <InputLabel
                          text={t("dishForm:allergens")}
                          forInput="allergens"
                        />
                        <textarea
                          id="allergens"
                          name="allergens"
                          className="form-control"
                        />
                      </div> */}
                    </div>
                    <div className="right-column">
                      <div className="form-group">
                        <InputLabel
                          text={t("dishForm:description")}
                          forInput="description"
                        />
                        <FormInput
                          type={InputVariants.TEXT}
                          name="description"
                          placeholder={t("dishForm:descriptionPlaceholder")}
                        />
                      </div>
                      <div className="form-group">
                        <InputLabel text={t("dishForm:image")} />
                        <FormInput
                          type={InputVariants.FILE}
                          name="image"
                          onChange={onSelectFiles}
                        />
                        <div>
                          {file && (
                            <img
                              className="img"
                              src={file}
                            />
                          )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 justify-content-end">
                    <Button
                      variant={ButtonVariants.SECONDARY}
                      text={t("dishForm:backButton")}
                      type={ButtonTypes.BUTTON}
                      onClick={navigateToCategory}
                    />
                    <Button
                      variant={ButtonVariants.PRIMARY}
                      text={t("dishForm:createButton")}
                      type={ButtonTypes.SUBMIT}
                    />
                  </div>
                </>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
