import { ReactNode } from "react";

/**
 * Provider's visible parameter type
 */
export type ProviderVisibleParam = boolean | ((param?: any) => boolean);

/**
 * Provider's real content type
 */
export type ProviderContent = ReactNode | ((param?: any) => ReactNode);;

/**
 * Provider's content parameter type
 */
export type ProviderContentParam = () => ProviderContent;

/**
 * MountContent's subscription type
 */
export type Subscription = () => void;
