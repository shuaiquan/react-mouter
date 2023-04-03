import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page'
import Code from './assets/param-render.svg';
import { MountConsumer, MountProvider } from '../src';

const Header = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="header">
      <div className="headerButtons">
        <span onClick={() => setVisible(true)}>Visible</span>
        <span onClick={() => setVisible(false)}>Hidden</span>
      </div>
      Header ---&nbsp;
      <MountConsumer name="headerSubTitle" params={{ value: 10, visible }} />
    </div>
  );
}

const Content = () => {
  return (
    <div className="content">
      Content
      <MountProvider name="headerSubTitle" visible={(param: any) => param.visible}>
        {
          (param: any) => {
            return (
              <div>
                Get param.value
                <span style={{ color: '#f00' }}>{` ${param.value} `}</span>
                in Content From Header
              </div>
            )
          }
        }
      </MountProvider>
    </div>
  );
}

const ParamRender = () => {
  return (
    <Page code={<img className="code" src={Code} alt="param-render" />}>
      <Header />
      <Content />
    </Page>
  );
}

const meta = {
  title: 'ParamRender',
  component: ParamRender,
} satisfies Meta<typeof ParamRender>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Demo: Story = {};