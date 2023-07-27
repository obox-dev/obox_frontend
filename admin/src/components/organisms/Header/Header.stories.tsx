import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from 'storybook-addon-react-router-v6';
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Story system/Layout/Header",
  decorators: [withRouter],
  component: Header,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderExample: Story = {

};
