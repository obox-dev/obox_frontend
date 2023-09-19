import { useRef } from "react";
import { ObjectSchema } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormRef } from "@shared/components/atoms/Form";
import { useTranslation } from "@libs/react-i18next";
import { Button } from "@shared/components/atoms/Button/Button";
import {
  ButtonTypes,
  ButtonVariants,
} from "@shared/components/atoms/Button/types";
import { InputVariants } from "@shared/components/atoms/Input";
import { InputLabel } from "@shared/components/atoms/InputLabel/InputLabel";
import { FormInput } from "@shared/components/atoms/FormInput";
import { Dish } from "@shared/services/DishService";
import type { DishDefaultValues } from "./hooks/useDishForms";
// import { FileUpload } from "@shared/components/molecules/FileUpload/FileUpload";
import { Textarea } from "@shared/components/atoms/Textarea";
import "./DishForm.scss";
import { FieldValues } from "react-hook-form";

interface DishFormProps<T extends FieldValues> {
  onSubmit: (data: Partial<Dish>) => void;
  validationSchema: ObjectSchema<T>;
  defaultValues: DishDefaultValues;
}

export const DishForm = <T extends FieldValues, >(props: DishFormProps<T>) => {
  const { t } = useTranslation();
  const { menuId, categoryId } = useParams();
  const { onSubmit, validationSchema, defaultValues } = props;

  const formRef = useRef<FormRef<Partial<Dish>> | null>(null);

  const navigate = useNavigate();
  const navigateToCategory = () => {
    navigate(`/menu/${menuId}/category/${categoryId}`);
  };

  return (
    <div className="container">
      <div className="row justify-content-center my-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <Form
                defaultValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                ref={formRef}
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
                          type={InputVariants.TEXT}
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
                          type={InputVariants.TEXT}
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
                          type={InputVariants.TEXT}
                          name="calories"
                          placeholder={t("dishForm:caloriesPlaceholder")}
                        />
                      </div>
                    </div>
                    <div className="right-column">
                      <div className="form-group">
                        <InputLabel
                          text={t("dishForm:description")}
                          forInput="description"
                        />
                        <Textarea
                          name="description"
                          placeholder={t("dishForm:descriptionPlaceholder")}
                        />
                      </div>
                      {/* <div className="form-group">
                          <FileUpload image_url={defaultValues.images} onFileChange={(base64) => {
                            formRef.current?.setValue('images', base64);
                          }}/>
                      </div> */}
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
