import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { ButtonVariants } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "Story system/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ButtonVariants },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const text = 'Hello';

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    text,
    variant: ButtonVariants.PRIMARY,
    onClick: () => {alert("hello")}
  },
};

export const Secondary: Story = {
  args: {
    text,
    variant: ButtonVariants.SECONDARY,
    onClick: () => {alert("hello")}
  },
};

export const Success: Story = {
  args: {
    text,
    variant: ButtonVariants.SUCCESS,
    onClick: () => {alert("hello")}
  },
};

export const Danger: Story = {
  args: {
    text,
    variant: ButtonVariants.DANGER,
    onClick: () => {alert("hello")}
  },
};

export const Warning: Story = {
  args: {
    text,
    variant: ButtonVariants.WARNING,
    onClick: () => {alert("hello")}
  },
};

export const Info: Story = {
  args: {
    text,
    variant: ButtonVariants.INFO,
    onClick: () => {alert("hello")}
  },
};

export const Light: Story = {
  args: {
    text,
    variant: ButtonVariants.LIGHT,
    onClick: () => {alert("hello")}
  },
};

export const Dark: Story = {
  args: {
    text,
    variant: ButtonVariants.DARK,
    onClick: () => {alert("hello")}
  },
};

export const Link: Story = {
  args: {
    text,
    variant: ButtonVariants.LINK,
    onClick: () => {alert("hello")}
  },
};
