import { useEffect, useRef } from 'react';
import { Ad } from '../../Gql/ad/types';
import { adEvent, waykeId } from '../../Gql/ad/view';
import { Settings } from '../../State/Settings/settings';
import PubSub from '../../utils/pubsub/pubsub';

interface EcomWeb {
  start: () => void;
  destroy: () => void;
}

/**
 * Buy online. ecom-web is keyed on the legacy waykeId: the commerce order flow
 * answers 404 on ad.id for ads from before ads-service.
 */
function useEcom(ad: Ad, ecom: Settings['ecom'], marketCode: Settings['marketCode']) {
  const ecomContext = useRef<EcomWeb | undefined>(undefined);
  const id = waykeId(ad);

  useEffect(() => {
    if (!ecom) return;
    let destroyed = false;
    import('@wayke-se/ecom-web')
      .then((module) => {
        if (destroyed) return;
        ecomContext.current = new module.default({
          id,
          ecomSdkConfig: {
            api: {
              address: ecom.url,
            },
            bankIdThumbprint: ecom.bankIdThumbprint,
          },
          logo: ecom.serviceLogotypeUrl,
          logoX2: ecom.serviceLogotypeUrl,
          // Language, and Drive's look in Norway
          marketCode,
          onEvent: (view, event, currentStep?, data?) => {
            PubSub.publish('Ecom', { ...adEvent(ad), view, event, currentStep, data });
          },
        });
      })
      .catch(() => undefined);
    return () => {
      destroyed = true;
      ecomContext.current?.destroy();
      ecomContext.current = undefined;
    };
  }, [id]);

  return ecomContext;
}

export default useEcom;
