import type { Meta, StoryObj } from "@storybook/react";
import { RadioInput } from "./RadioInput";

const meta: Meta<typeof RadioInput> = {
  title: "Story system/RadioInput",
  component: RadioInput,
  tags: ["autodocs"],
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const label = "label";
const name = "name";
const value = "value";

export const SingleRadio: Story = {
  args: {
    label,
    name,
    value,
    onChange: () => {console.log(123)},
  },
};
