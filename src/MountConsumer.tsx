import * as  React from "react";
import MountContext from "./MountContext";

interface Props {
  /**
   * Mount Identification: mount ReactNode that provide by same-name MountProvider
   */
  name: string;
  /**
   * Param will deliver to MountProvider's (visible and children)'s Function
   */
  params?: object;
  /**
   * 
   * @param views All ReactNode in same-name MountProvider
   * @returns 
   */
  children?: (views: React.ReactNode[]) => React.ReactNode;
}

/**
 * MountConsumer is used to mount ReactNode that provide by same-name MountProvider
 */
export default class MountConsumer extends React.PureComponent<Props> {
  componentDidMount(): void {
    const { name } = this.props;
    // register (name => subscription)
    MountContext.Instance.registerSubscription(name, this.subscription);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { name } = this.props;
    const { name: prevName } = prevProps;

    if (prevName !== name) {
      // remove (prevName => subscription) dependency
      MountContext.Instance.unregisterSubscription(prevName, this.subscription);
      
      // register (name => subscription)
      MountContext.Instance.registerSubscription(name, this.subscription);
    }
  }

  componentWillUnmount(): void {
    const { name } = this.props;
    // remove (prevName => subscription) dependency
    MountContext.Instance.unregisterSubscription(name, this.subscription);
  }

  private subscription = () => {
    this.forceUpdate();
  }

  render() {
    const { name, params, children } = this.props;

    // get all same-name providers
    const providers = MountContext.Instance.getProviderByName(name);

    // filter by visible
    const views = providers.filter(provider => provider.isVisible(params)).map(provider => provider.getContent(params));

    if (children && typeof children === 'function') {
      return <div>{children(views)}</div>;
    }

    return (
      <div>{views}</div>
    );
  }
}