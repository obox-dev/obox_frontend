import type { Meta, StoryObj } from '@storybook/react';
import { withActions } from '@storybook/addon-actions/decorator';
import { Form } from './Form';
import { Input, InputVariants } from '../Input';
import { InputLabel } from '../InputLabel';
import { RadioInput } from '../RadioInput';

const submitButtonText = 'Submit';

const meta: Meta<typeof Form> = {
  title: 'Story system/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    actions: {
      handles: ['submit'],
    },
  },
  args: {
    submitButtonText,
    onSubmit: (e: any) => {
      e.preventDefault();
    },
    isDisabled: false,
  },
  decorators: [withActions as any],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Forms: Story = {
  render: (args) => (
    <Form {...args}>
      <>
        <InputLabel text="Enter your data" />
        <Input
          name="test"
          type={InputVariants.TEXT}
          onChange={() => {
            console.log(123);
          }}
        />
        <RadioInput
          name="test"
          label="1"
          value="text"
          onChange={() => {
            console.log(123);
          }}
        />
        <RadioInput
          name="test"
          label="2"
          value="text"
          onChange={() => {
            console.log(123);
          }}
        />
      </>
    </Form>
  ),
};

export const DisabledForms: Story = {
  render: (args) => (
    <Form {...args} isDisabled>
      <>
        <InputLabel text="Enter your data" />
        <Input
          name="test"
          type={InputVariants.TEXT}
          onChange={() => {
            console.log(123);
          }}
          isDisabled
        />
        <RadioInput
          name="test"
          label="1"
          value="text"
          onChange={() => {
            console.log(123);
          }}
          isDisabled
        />
        <RadioInput
          name="test"
          label="2"
          value="text"
          onChange={() => {
            console.log(123);
          }}
          isDisabled
        />
      </>
    </Form>
  ),
};
