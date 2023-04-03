import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page'
import Code from './assets/simple-render.svg';
import { MountConsumer, MountProvider } from '../src';

const Header = () => {
  return (
    <div className="header">
      Header ---&nbsp;
      <MountConsumer name="headerSubTitle" />
    </div>
  );
}

const Content = () => {
  return (
    <div className="content">
      Content
      <MountProvider name="headerSubTitle">
        <span style={{ color: '#f00' }}> this text's component is declared in the Content component </span>
      </MountProvider>
    </div>
  );
}

const SimpleRender = () => {
  return (
    <Page
      code={(<img className="code" src={Code} alt="simple-code" />)}
    >
      <Header />
      <Content />
    </Page>
  );
}

const meta = {
  title: 'SimpleRender',
  component: SimpleRender,
} satisfies Meta<typeof SimpleRender>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Demo: Story = {};