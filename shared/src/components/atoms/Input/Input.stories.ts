import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { InputVariants } from './types';

const meta: Meta<typeof Input> = {
  title: 'Story system/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const name = 'input';
const placeholder = 'Enter your thing';

export const Text: Story = {
  args: {
    name,
    placeholder,
    type: InputVariants.TEXT,
    onChange: () => {console.log(123);}
  },
};

export const Password: Story = {
  args: {
    name,
    placeholder,
    type: InputVariants.PASSWORD,
    onChange: () => {console.log(123);}
  },
};

export const Email: Story = {
  args: {
    name,
    placeholder,
    type: InputVariants.EMAIL,
    onChange: () => {console.log(123);}
  },
};

export const Radio: Story = {
  args: {
    name,
    placeholder,
    type: InputVariants.RADIO,
    onChange: () => {console.log(123);}
  },
};

export const Checkbox: Story = {
  args: {
    name,
    placeholder,
    type: InputVariants.CHECKBOX,
    onChange: () => {console.log(123);}
  },
};
