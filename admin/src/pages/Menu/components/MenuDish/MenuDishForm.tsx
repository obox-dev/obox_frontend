import React from 'react';
import { Form } from '@shared/components/atoms/Form/Form'; // Update the import path
import { useTranslation } from '@libs/react-i18next';
import { Button } from '@shared/components/atoms/Button/Button';
import { ButtonVariants } from '@shared/components/atoms/Button/types';
import { InputVariants } from "@shared/components/atoms/Input";
import { InputLabel } from '@shared/components/atoms/InputLabel/InputLabel';
import './DishForm.scss';
import { FormInput } from '@shared/components/atoms/FormInput';

const DishForm: React.FC = () => {
    const { t } = useTranslation();
  
    const handleFormSubmit = () => {
        // Handle form submission logic here
    };
  
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                defaultValues={{
                                    category_id: "decb23a3-b437-4c28-95df-a93aa59d90a7",
                                    name: "Borsch",
                                    description: "Red Hot Chilly Pepper",
                                    price: 1.99,
                                    weight: 200,
                                    calories: 150,
                                    allergens: "",
                                    tags: "",
                                    state: "ENABLED",
                                    image: ""
                                }}
                                // validationSchema={/* your yup schema */}
                                
                                onSubmit={handleFormSubmit}
                            >
                                <div className="form-columns">
                                    {/* Left Column */}
                                    <div className="left-column">
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:Category')} forInput="category_id" />
                                            <FormInput type={InputVariants.TEXT} name="category_id" />
                                        </div>
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:name')} forInput="name" />
                                            <FormInput type={InputVariants.TEXT} name="name" />
                                        </div>
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:Description')} forInput="description" />
                                            <textarea id="description" name="description" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:Allergens')} forInput="allergens" />
                                            <textarea id="allergens" name="allergens" className="form-control" />
                                        </div>
                                        <div className="form-group d-inline">
                                            <InputLabel text={t('dishForm:Status')} />
                                            <FormInput type={InputVariants.RADIO} name="status" value="ENABLED" />{t('dishForm:Active')}
                                            <FormInput type={InputVariants.RADIO} name="status" value="DISABLED" />{t('dishForm:Unactive')}
                                        </div>
                                    </div>
                                    <div className="right-column">
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:Tags')} />
                                            <select multiple className="form-control">
                                                <option value="spicy">Spicy</option>
                                                <option value="vegan">Vegan</option>
                                                <option value="glutenFree">Gluten Free</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:Price')} forInput="Price" />
                                            <FormInput type={InputVariants.TEXT} name="Price" />
                                        </div>
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:Image')} />
                                            <input type="file" className="form-control-file" />
                                        </div>
                                    </div>
                                </div>
                                <Button variant={ButtonVariants.PRIMARY} text={t('dishForm:createButton')} />
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishForm;
