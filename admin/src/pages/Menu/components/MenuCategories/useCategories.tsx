import { Dialog } from "@shared/components/molecules/Dialog";
import { useDialog } from "@shared/providers/DialogProvider/useDialog";
import { Form, FormRef } from "@shared/components/atoms/Form"
import React, { useRef } from 'react';
import { Input, InputVariants } from "@shared/components/atoms/Input";
import { CategoriesService, CreateCategoryRequest, CreateCategoryResponse } from "@shared/services";


export const useCategories = () => {
  const { openDialog } = useDialog();
  const HARDCODED_MENU_ID = '0ef77fa3-9507-4926-b095-37b6eec3459b';

  const formRef = useRef<FormRef | null>(null);

  const onSubmit = async (data: CreateCategoryRequest) => {
    console.log(data)
    const category = await CategoriesService.create(data);
  }

  const openCategoryCreateDialog = () => openDialog(({ closeDialog }) => (
  <Dialog
    okCallback={() => {
      if (formRef.current) {
        formRef.current.submit();
        closeDialog();
      }
    }}
    cancelCallback={() => {
      closeDialog();
    }}
    title="Enter your category name"
    size="lg"
    okText="OK"
    cancelText="Cancel"
  >
    <Form ref={formRef as React.ForwardedRef<CreateCategoryRequest>} onSubmit={onSubmit}>
      <Input type={InputVariants.HIDDEN} name="menu_id" value={HARDCODED_MENU_ID}/>
      <Input placeholder="Enter your category name" type={InputVariants.TEXT} name="name" />
    </Form>
  </Dialog>
));

  return {
    openCategoryCreateDialog,
  }
}

