import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Story system/Layout/Header",
  decorators: [(Story) => (<MemoryRouter><Story/></MemoryRouter>)],
  component: Header,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderExample: Story = {

};
