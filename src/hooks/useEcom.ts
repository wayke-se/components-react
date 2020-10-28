import { EcomSettings } from '../providers/WaykeProvider';

const useEcom = (ecomSettings?: EcomSettings) => {
  if (ecomSettings?.url) {
    import('@wayke-se/ecom').then(({ config }) => {
      config.bind({
        api: {
          address: ecomSettings.url,
        },
        /** Specifying an origin is optional **/
        origin: {
          topic: 'Wayke',
          channel: 'wayke.se',
        },
        bankIdThumbprint: ecomSettings.bankIdThumbprint,
      });
    });
  }
};

export default useEcom;
