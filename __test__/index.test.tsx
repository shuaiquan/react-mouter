import Enzyme, { mount } from 'enzyme';
import React, { Fragment } from 'react';
import Adapter from '@cfaester/enzyme-adapter-react-18';
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
          <MountConsumer name="case5" param={{ value }} />
          <MountProvider name="case5" visible={(param: any) => param && param.value % 2 === 0}>
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
          <MountConsumer name="case6" param={{ value }} />
          <MountProvider name="case6">
            {(param) => (
              <h1>{param.value}</h1>
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

  it('MountConsumer Render Fallback', () => {
    function Unit() {
      return (
        <Fragment>
          <MountConsumer name="case7" fallback={(<div className="fallback7">I'm fallback</div>)} />
          <MountProvider name="case7">
            <h1 className="7-h1">shuaiquan</h1>
          </MountProvider>
          <MountConsumer name="case8" fallback={(<div className="fallback8">I'm fallback</div>)} />
        </Fragment>
      );
    }

    const tree = mount(<Unit />);

    expect(tree.find('.fallback7').exists()).toBeFalsy();
    expect(tree.find('.fallback8').exists()).toBeTruthy();
  });

  it('ReRender when mountProvider unmount', () => {
    function Unit(props: { useProvider?: boolean }) {
      const { useProvider = true } = props;

      return (
        <Fragment>
          <MountConsumer name="case9" />
          {useProvider && <MountProvider name="case9">
            <h1>
              Mounted By React-Mounter
            </h1>
          </MountProvider>}
        </Fragment>
      );
    }

    const tree = mount(<Unit useProvider={true} />);

    expect(tree.find('h1').exists()).toBeTruthy();

    tree.setProps({ useProvider: false }, () => {
      setTimeout(() => {
        // must more render once
        expect(tree.find('h1').exists()).toBeFalsy();
      }, 5);
    });
  });
});