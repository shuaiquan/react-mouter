import Enzyme, { mount } from 'enzyme';
import React, { Fragment } from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MountConsumer from '../src/MountConsumer';
import MountProvider from '../src/MountProvider';

Enzyme.configure({ adapter: new Adapter() });

describe('Normal Render', () => {
  it('Nothing to Render - OnlyConsumer', () => {
    function Unit() {
      return (
        <MountConsumer name="case1" />
      );
    }

    const tree = mount(<Unit />);

    expect(tree.find('h1').exists()).toBeFalsy();
  });

  it('Nothing to Render - OnlyProvider', () => {
    function Unit() {
      return (
        <MountProvider name="case2">
          <h1>
            Mounted By React-Mounter
          </h1>
        </MountProvider>
      );
    }

    const tree = mount(<Unit />);

    expect(tree.find('h1').exists()).toBeFalsy();
  });

  it('Render Succeed - Provider + Consumer', () => {
    function Unit() {
      return (
        <Fragment>
          <MountConsumer name="case3" />
          <MountProvider name="case3">
            <h1>
              Mounted By React-Mounter
            </h1>
          </MountProvider>
        </Fragment>
      );
    }

    const tree = mount(<Unit />);

    expect(tree.find('h1').exists()).toBeTruthy();
  });

  it('Render in Container Succeed', () => {
    function Unit() {
      return (
        <Fragment>
          <MountConsumer name="case4">
            {(views) => (
              <div className="header-container">{views}</div>
            )}
          </MountConsumer>
          <MountProvider name="case4">
            <h1>
              Mounted By React-Mounter
            </h1>
          </MountProvider>
        </Fragment>
      );
    }

    const tree = mount(<Unit />);

    // console.log(tree.debug());

    expect(tree.find('div.header-container > h1').exists()).toBeTruthy();
  });

  it('Control By Visible', () => {
    function Unit(props: { value: number }) {
      const { value } = props;

      return (
        <Fragment>
          <MountConsumer name="case5" params={{ value }} />
          <MountProvider name="case5" visible={(params: any) => params && params.value % 2 === 0}>
            <h1>
              Mounted By React-Mounter
            </h1>
          </MountProvider>
        </Fragment>
      );
    }

    const tree = mount(<Unit value={2} />);

    expect(tree.find('h1').exists()).toBeTruthy();

    tree.setProps({ value: 1 });
    expect(tree.find('h1').exists()).toBeFalsy();
  });

  it('Use Params Render', () => {
    function Unit(props: { value: number }) {
      const { value } = props;

      return (
        <Fragment>
          <MountConsumer name="case6" params={{ value }} />
          <MountProvider name="case6">
            {(params: any) => (
              <h1>{params.value}</h1>
            )}
          </MountProvider>
        </Fragment>
      );
    }

    const tree = mount(<Unit value={2} />);

    expect(tree.find('h1').text()).toEqual('2')

    tree.setProps({ value: 10 });
    expect(tree.find('h1').text()).toEqual('10')
  })
});