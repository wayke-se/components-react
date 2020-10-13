import { WaykePubSub } from '../../../src';

declare global {
  interface Window {
    WaykePubSub: WaykePubSub;
  }
}
