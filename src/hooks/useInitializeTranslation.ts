import i18n from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { MarketCode } from '../@types/market';
import { initializeI18n } from '../utils/I18n';

const useInitializeTranslation = (marketCode?: MarketCode) => {
  const [initialized, setInitialized] = useState(() => !!i18n.isInitialized);

  const initialize = useCallback(async (m?: MarketCode) => {
    await initializeI18n(m);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!i18n.isInitialized) {
      initialize(marketCode);
    }
  }, []);

  return initialized;
};

export default useInitializeTranslation;
