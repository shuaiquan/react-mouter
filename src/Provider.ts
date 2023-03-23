import { ReactNode } from "react";
import { ProviderContentParam, ProviderVisibleParam } from "./type";

/**
 * Provider is a structure that includes visible、content properties , 
 * and is used to record ReactNode that will be mounted by Consumer.
 */
export default class Provider {
  private static globalId = 0;

  static create(content: ProviderContentParam, visible?: ProviderVisibleParam) {
    return new Provider(content, visible);
  }

  /**
   * provider unique identification
   */
  private id: number = 0;

  /**
   * A function that returns ProviderContent
   */
  private content: ProviderContentParam;

  /**
   * A function that returns boolean to determine whether is visible
   */
  private visible: ProviderVisibleParam;

  constructor(content: ProviderContentParam, visible?: ProviderVisibleParam) {
    this.id = (++Provider.globalId);
    this.content = content;
    this.visible = visible ?? true;
  }

  isCurrent(provider: Provider) {
    return this.id === provider.id;
  }

  isVisible(params?: object) {
    const { visible } = this;
    
    if (typeof visible === 'function') {
      return visible(params);
    }

    return visible;
  }

  getContent(params?: object): ReactNode {
    // ProviderContentParam => ProviderContent
    const content = this.content();

    // ProviderContent => ReactNode
    if (typeof content === 'function') {
      return content(params);
    }

    return content;
  }
}