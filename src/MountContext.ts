import Provider from "./Provider";
import { Subscription } from "./type";

export default class MountContext {
  /** 
   * MountContext Singleton
   */
  static Instance = new MountContext();

  /**
   * name => Provider[]
   */
  private providerMap: { [key: string]: Provider[] } = {};

  /**
   * name => Subscription[]
   */
  private subscriptionMap: { [key: string]: Subscription[] } = {};

  mountProvider(name: string, provider: Provider) {
    if (!this.providerMap[name]) {
      this.providerMap[name] = [];
    }

    const providers = this.providerMap[name];
    providers.push(provider);
  }

  unMountProvider(name: string, provider: Provider) {
    const providers = this.providerMap[name] || [];
    this.providerMap[name] = providers.filter(p => !p.isCurrent(provider));
  }

  getProviderByName(name: string) {
    return this.providerMap[name] || [];
  }

  registerSubscription(name: string, subscription: Subscription) {
    if (!this.subscriptionMap[name]) {
      this.subscriptionMap[name] = [];
    }

    const subscriptions = this.subscriptionMap[name];
    subscriptions.push(subscription);
  }

  unregisterSubscription(name: string, subscription: Subscription) {
    const subscriptions = this.subscriptionMap[name] || [];
    this.subscriptionMap[name] = subscriptions.filter(sub => sub === subscription);
  }

  /**
   * broadcast [name] consumer need to re-render
   */
  trigger(name: string) {
    const subscriptions = this.subscriptionMap[name] || [];
    subscriptions.forEach(subscription => subscription());
  }
}