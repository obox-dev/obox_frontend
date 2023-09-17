import { useRequest } from "@admin/hooks";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { CategoriesService, Category, CreateCategoryRequest, CreateCategoryResponse } from "@shared/services";
import { useTranslation } from '@libs/react-i18next';
import { useCategoryFormValidation } from "../validation/useCategoryFormValidation";
import { useRef } from "react";
import { Form, FormRef } from "@shared/components/atoms/Form";
import { Dialog } from "@shared/components/molecules/Dialog";
import { FormInput } from "@shared/components/atoms/FormInput";
import { InputVariants } from "@shared/components/atoms/Input";

interface CreateCategoryParams {
    onSuccess: (result: CreateCategoryResponse) => Promise<void>;
    menuId: string;
  }

export const useCreateCategory = (args: CreateCategoryParams) => {
    const { onSuccess, menuId } = args;
    const { openDialog } = useDialog();
    const { t } = useTranslation();
    const { validationSchema } = useCategoryFormValidation();
    const { execute: onCreateSubmit } = useRequest({
        requestFunction: CategoriesService.create,
        onSuccess,
        onError: (error) => {
          throw error;
        },
      });

      const openCategoryCreateDialog = () =>
      openDialog(({ closeDialog }) => {
        const formRef = useRef<FormRef<Partial<Category>> | null>(null);
        const defaultValues: CreateCategoryRequest = {
          menu_id: menuId,
          name: "",
        };
  
        return (
          <Dialog
            okCallback={() => {
              if (formRef.current) {
                formRef.current.submit();
              }
            }}
            cancelCallback={() => {
              closeDialog();
            }}
            title={t("menu:createCategoryForm.title")}
            size="lg"
            okText={t("common:buttons:confirm")}
            cancelText={t("common:buttons:cancel")}
          >
            <Form
              ref={formRef}
              validationSchema={validationSchema}
              defaultValues={defaultValues}
              onSubmit={async (data) => {
                await onCreateSubmit(data as CreateCategoryRequest);
              }}
            >
              <>
                <FormInput
                  type={InputVariants.HIDDEN}
                  name="menu_id"
                  value={menuId}
                />
                <FormInput
                  placeholder={t("menu:createCategoryForm.placeholder")}
                  type={InputVariants.TEXT}
                  name="name"
                />
              </>
            </Form>
          </Dialog>
        );
      });

      return {openCategoryCreateDialog}
}