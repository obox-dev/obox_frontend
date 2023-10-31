import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { SidebarNavigation } from './SidebarNavigation';

const meta: Meta<typeof SidebarNavigation> = {
  title: 'Story system/Layout/Header',
  decorators: [(Story) => (<MemoryRouter><Story/></MemoryRouter>)],
  component: SidebarNavigation,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderExample: Story = {

};
