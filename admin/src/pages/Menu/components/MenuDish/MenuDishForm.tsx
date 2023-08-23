import React from 'react';
import { Form } from '@shared/components/atoms/Form/Form';
import { useTranslation } from '@libs/react-i18next';
import { Button } from '@shared/components/atoms/Button/Button';
import { ButtonVariants } from '@shared/components/atoms/Button/types';
import { Input, InputVariants } from "@shared/components/atoms/Input";
import { InputLabel } from '@shared/components/atoms/InputLabel/InputLabel';
import { RadioInput } from '@shared/components/atoms/RadioInput/RadioInput';
import './DishForm.scss';

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
                            <Form onSubmit={handleFormSubmit}>
                                <div className="form-columns">
                                    <div className="left-column">
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:name')} forInput="name" />
                                            <Input type={InputVariants.TEXT} name="name" />
                                        </div>
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:description')} forInput="description" />
                                            <textarea id="description" name="description" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:allergens')} forInput="allergens" />
                                            <textarea id="allergens" name="allergens" className="form-control" />
                                        </div>
                                        {/* Other fields... */}
                                    </div>
                                    <div className="right-column">
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:tags')} />
                                            <select multiple className="form-control">
                                                <option value="spicy">Spicy</option>
                                                <option value="vegan">Vegan</option>
                                                <option value="glutenFree">Gluten Free</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <InputLabel text={t('dishForm:status')} />
                                            <RadioInput name="status" label={t('dishForm:active')} value="enable" />
                                            <RadioInput name="status" label={t('dishForm:unactive')} value="disable" />
                                        </div>
                                        {/* Other fields... */}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <InputLabel text={t('dishForm:price')} forInput="price" />
                                    <Input type={InputVariants.TEXT} name="price" />
                                </div>
                                <div className="form-group">
                                    <InputLabel text={t('dishForm:image')} />
                                    <input type="file" className="form-control-file" />
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
