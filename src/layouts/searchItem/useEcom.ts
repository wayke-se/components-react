import { useEffect, useRef } from 'react';
import { SettingsContextProps } from '../../State/Settings/SettingsContext';
import PubSub from '../../utils/pubsub/pubsub';
import { Branch, Maybe } from '../../@types/codegen/types';

interface EcomWeb {
  start: () => void;
  destroy: () => void;
}

function useEcom(
  id: string,
  ecomSettings: SettingsContextProps['ecomSettings'],
  branch?: Maybe<Branch>
) {
  const ecomContext = useRef<EcomWeb | undefined>();
  const branchRef = useRef(branch);
  branchRef.current = branch;

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
          onEvent: (view, event, currentStep?, data?) => {
            PubSub.publish('Ecom', {
              id,
              branchId: branchRef.current?.id,
              branchName: branchRef.current?.name,
              view,
              event,
              currentStep,
              data,
            });
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
