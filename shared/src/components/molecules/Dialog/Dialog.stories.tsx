import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Story system/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogExample: Story = {
  args: {
    okCallback: () => {
      console.log('OK pressed');
    },
    cancelCallback: () => {
      console.log('Cancel pressed');
    },
    title: 'This is a dialog',
    size: 'lg',
    okText: 'OK',
    cancelText: 'Close',
    children: <span>Dialog text</span>
  },
};
