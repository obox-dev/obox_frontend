import * as yup from "yup";
import { useTranslation } from '@libs/react-i18next';

export const useMenuFormValidation = () => {
    const { t } = useTranslation();
    const MIN_NAME_LENGTH = 1;
    const MAX_NAME_LENGTH = 200;

    const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required(
        t("common:validation:isRequired", { field: t("common:name") })
        )
        .min(
        MIN_NAME_LENGTH,
        t("common:validation:morethan", {
            field: t("common:name"),
            min: MIN_NAME_LENGTH,
        })
        )
        .max(
        MAX_NAME_LENGTH,
        t("common:validation:lessthan", {
            field: t("common:name"),
            max: MAX_NAME_LENGTH,
        })
        )
        .trim(),
    });
return {validationSchema};
};