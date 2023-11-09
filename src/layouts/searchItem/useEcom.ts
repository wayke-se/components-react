import { useEffect, useRef } from 'react';
import { SettingsContextProps } from '../../State/Settings/SettingsContext';
import PubSub from '../../utils/pubsub/pubsub';

interface EcomWeb {
  start: () => void;
  destroy: () => void;
}

function useEcom(id: string, ecomSettings: SettingsContextProps['ecomSettings']) {
  const ecomContext = useRef<EcomWeb | undefined>();

  const load = async () => {
    if (!ecomSettings) return;
    try {
      const module = await import('@wayke-se/ecom-web');
      if (module) {
        ecomContext.current = new module.default({
          id,
          ecomSdkConfig: {
            api: {
              address: ecomSettings.url,
            },
            bankIdThumbprint: ecomSettings?.bankIdThumbprint,
          },
          logo: ecomSettings.serviceLogotypeUrl,
          logoX2: ecomSettings.serviceLogotypeUrl,
          onEvent(view, event, currentStep?, data?) {
            PubSub.publish('EcomOnUserEvent', view, event, currentStep, data);
          },
        });
      }
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    load();
    return () => {
      if (ecomContext.current) {
        ecomContext.current.destroy();
      }
    };
  }, []);

  return ecomContext;
}

export default useEcom;
