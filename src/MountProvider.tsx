import * as React from 'react';
import MountContext from './MountContext';
import Provider from './Provider';
import { ProviderContent, ProviderVisibleParam } from './type';

interface Props {
  /**
   * Mount Identification: children will be mount by same-name MountConsumer
   */
  name: string;
  /**
   * Determines whether to mount：boolean | (param) => boolean
   */
  visible?: ProviderVisibleParam;
  /**
   */
  children: ProviderContent;
}

/**
 * MountProvider is used to provide ReactNode to be mounted by same-name MountConsumer
 */
export default class MountProvider extends React.PureComponent<Props> {
  private provider!: Provider;

  componentDidMount(): void {
    const { name, visible } = this.props;

    // create a provider
    this.provider = Provider.create(this.getChildrenNode, visible);

    // register (name => provider)'s dependency
    MountContext.Instance.mountProvider(name, this.provider);

    // broadcast component update
    MountContext.Instance.trigger(name);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { name } = this.props;
    const { name: prevName} = prevProps;

    if (prevName !== name) {
      // remove (prevName => provider)'s dependency
      MountContext.Instance.unMountProvider(prevName, this.provider);
      MountContext.Instance.trigger(prevName);

      // register (name => provider)'s dependency
      MountContext.Instance.mountProvider(name, this.provider)
    }

    // broadcast component update
    MountContext.Instance.trigger(name);
  }

  componentWillUnmount(): void {
    MountContext.Instance.unMountProvider(this.props.name, this.provider);
     // broadcast component update
     MountContext.Instance.trigger(this.props.name);
  }

  private getChildrenNode = () => {
    return this.props.children;
  }

  render() {
    return null;
  }
}