import { useNavigate, useParams } from "react-router";
import { useDish } from "./useDish";
import { Form } from "@shared/components/atoms/Form";
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
import { CreateDishRequest, Dish } from "@shared/services/DishService";
import { ObjectSchema } from "yup";

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
    navigate(`/menu/${menuId}/category/${categoryId}`)
  }

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
                        <FormInput type={InputVariants.TEXT} name="name" placeholder={t("dishForm:namePlaceholder")}/>
                      </div>
                      <div className="form-group">
                        <InputLabel
                          text={t("dishForm:price")}
                          forInput="price"
                        />
                        <FormInput type={InputVariants.NUMBER} name="price" placeholder={t("dishForm:pricePlaceholder")}/>
                      </div>
                      <div className="form-group">
                        <InputLabel
                          text={t("dishForm:weight")}
                          forInput="weight"
                        />
                        <FormInput type={InputVariants.NUMBER} name="weight" placeholder={t("dishForm:weightPlaceholder")} />
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
                        <textarea
                          id="description"
                          name="description"
                          placeholder={t("dishForm:descriptionPlaceholder")}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <InputLabel text={t("dishForm:image")} />
                        <input type="file" className="form-control-file" />
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