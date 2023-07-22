import AButton from './Button'
import '@admin/styles/style.scss'

export default {
  titile: 'Button',
  component: AButton,
  argTypes: {
    children: {
      type: 'string',
      name: 'Lable'
    },

    variant: {
      type: 'string',
      description: 'Background color',
      name: 'Color',
      defaultValue: 'primary',
      options: ['primary', 'dark', 'light', 'warning', 'success', 'danger', 'link'],
      control: {
        type: 'radio'
      }

    },

    size: {
      type: 'string',
      description: 'Button size',
      name: 'Size',
      defaultValue: 'default',
      options: ['default', 'lg', 'sm'],
      control: {
        type: 'radio'
      }

    },

    type: {
      type: 'string',
      description: 'Type of button',
      name: 'Type',
      defaultValue: 'button',
      options: ['button', 'submit', 'reset'],
      control: {
        type: 'radio'
      }

    },
  }
}

const Template = (arg) => <AButton {...arg} />

export const Default = Template.bind({});
Default.args = {
  children: 'Press me',
  variant: 'primary',
}

export const Link = Template.bind({});
Link.args = {
  children: 'Simple link',
  variant: 'link',
}

export const Warning = Template.bind({});
Warning.args = {
  children: 'Sign Up',
  variant: 'warning',
}
