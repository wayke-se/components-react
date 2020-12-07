import WaykeSearch, { WaykeSearchSettings, WaykeSearchProps } from './layouts/search/index';
import WaykeSearchItem, { WaykeSearchItemProps } from './layouts/searchItem/index';
import WaykeProvider, { WaykeProviderSettings } from './providers/WaykeProvider';
import WaykeComposite, {
  WaykeCompositeWithProviderProps,
} from './layouts/WaykeCompositeWithProvider';

import SearchBar from './components/SearchBar/index';
import WaykeThemeProvider from './providers/themeProvider';

import WaykePubSub, { EventSubscriptions } from './utils/pubsub/pubsub';
import { SearchFilterTypes, SearchFilterNameTypes } from './@types/filter';
import {
  EventHashRouteChange,
  EventItemClicked,
  EventEcomOnInit,
  EventEcomOnUser,
  EventEcomOnExit,
  EventImagesClick,
  EventInformationClick,
  EventOptionsClick,
  EventPhonenumberVisible,
  EventPhonenumberCall,
  EventMailVisible,
  EventInsuranceInterest,
  EventFinanceInterest,
  EventAll,
  EventType,
  EventNames,
  CallbackHashRouteChange,
  CallbackEventItemClicked,
  CallbackEcomOnUserEvent,
  CallbackEmpty,
} from './utils/pubsub/Events';

export {
  WaykeProvider,
  WaykeSearch,
  WaykeSearchItem,
  SearchBar,
  WaykeThemeProvider,
  WaykePubSub,
  WaykeCompositeWithProviderProps,
  WaykeProviderSettings,
  WaykeSearchSettings,
  WaykeSearchProps,
  WaykeSearchItemProps,
  SearchFilterTypes,
  SearchFilterNameTypes,
  EventSubscriptions,
  EventHashRouteChange,
  EventItemClicked,
  EventEcomOnInit,
  EventEcomOnUser,
  EventEcomOnExit,
  EventImagesClick,
  EventInformationClick,
  EventOptionsClick,
  EventPhonenumberVisible,
  EventPhonenumberCall,
  EventMailVisible,
  EventInsuranceInterest,
  EventFinanceInterest,
  EventAll,
  EventType,
  EventNames,
  CallbackHashRouteChange,
  CallbackEventItemClicked,
  CallbackEcomOnUserEvent,
  CallbackEmpty,
};

export default WaykeComposite;
