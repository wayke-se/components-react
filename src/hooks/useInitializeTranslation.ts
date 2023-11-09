import { useCallback, useEffect, useState } from 'react';
import { MarketCode } from '../@types/market';
import { initializeI18n, i18nScoped } from '../utils/I18n';

const useInitializeTranslation = (marketCode?: MarketCode) => {
  const [initialized, setInitialized] = useState(() => !!i18nScoped.isInitialized);

  const initialize = useCallback(async (m?: MarketCode) => {
    await initializeI18n(m);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!i18nScoped.isInitialized) {
      initialize(marketCode);
    }
  }, []);

  return initialized;
};

export default useInitializeTranslation;
