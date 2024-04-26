import {
  ActionAll,
  ActionNames,
  ActionOnFilterUpdate,
  ActionTypes,
  CallbackOnFilterUpdate,
} from './Actions';
import {
  EventView,
  EventHashRouteChange,
  EventItemClicked,
  EventEcom,
  EventImagesClick,
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
  CallbackEcom,
  CallbackItem,
  EventSearch,
  EventFinanceOpen,
  EventFinanceClose,
  EventInsuranceClose,
  EventInsuranceOpen,
  EventFilterApply,
  EventSearchCompleted,
  EventSearchInitiated,
  EventSearchClearQuery,
  EventSearchClearAllFiltersQuery,
  CallbackView,
} from './Events';

export type EventSubscriptions = {
  HashRouteChange: EventHashRouteChange[];
  ItemClicked: EventItemClicked[];
  Ecom: EventEcom[];
  ImagesClick: EventImagesClick[];
  OptionsClick: EventOptionsClick[];
  PhonenumberVisible: EventPhonenumberVisible[];
  PhonenumberCall: EventPhonenumberCall[];
  MailVisible: EventMailVisible[];
  InsuranceOpen: EventInsuranceOpen[];
  InsuranceClose: EventInsuranceClose[];
  InsuranceInterest: EventInsuranceInterest[];
  FinanceOpen: EventFinanceOpen[];
  FinanceClose: EventFinanceClose[];
  FinanceInterest: EventFinanceInterest[];
  Search: EventSearch[];
  SearchClearQuery: EventSearchClearQuery[];
  SearchClearAllFilters: EventSearchClearAllFiltersQuery[];
  SearchInitiated: EventSearchInitiated[];
  SearchCompleted: EventSearchCompleted[];
  FilterApply: EventFilterApply[];
  View: EventView[];
  All: EventAll[];
};

export type ActionSubscriptions = {
  onFilterUpdate: ActionOnFilterUpdate[];
  All: ActionAll[];
};

class PubSub {
  private static events: EventSubscriptions = {
    HashRouteChange: [],
    ItemClicked: [],
    Ecom: [],
    ImagesClick: [],
    OptionsClick: [],
    PhonenumberVisible: [],
    PhonenumberCall: [],
    MailVisible: [],
    InsuranceOpen: [],
    InsuranceClose: [],
    InsuranceInterest: [],
    FinanceOpen: [],
    FinanceClose: [],
    FinanceInterest: [],
    Search: [],
    SearchClearQuery: [],
    SearchClearAllFilters: [],
    SearchInitiated: [],
    SearchCompleted: [],
    FilterApply: [],
    View: [],
    All: [],
  };

  private static actions: ActionSubscriptions = {
    onFilterUpdate: [],
    All: [],
  };

  public static subscribeAction = (event: ActionTypes) =>
    PubSub.actions[event.actionName].push(event as any);

  public static unsubscribeAction = (event: ActionTypes) => {
    if (PubSub.actions[event.actionName]) {
      for (let i = 0; i < PubSub.actions[event.actionName].length; i++) {
        if (PubSub.actions[event.actionName][i] === event) {
          PubSub.actions[event.actionName].splice(i, 1);
          break;
        }
      }
    }
  };

  public static publishAction = (eventName: ActionNames, ...args: any) => {
    if (PubSub.actions.All) {
      PubSub.events.All.forEach((event) => event.callback(eventName, args[0]));
    }
    if (PubSub.actions[eventName]) {
      PubSub.actions[eventName].forEach((event: ActionTypes) => {
        switch (eventName) {
          case 'onFilterUpdate':
            (event.callback as CallbackOnFilterUpdate)(args[0]);
            break;
          default:
            break;
        }
      });
    }
  };

  public static subscribe = (event: EventType) => PubSub.events[event.eventName].push(event as any);

  public static unsubscribe = (event: EventType) => {
    if (PubSub.events[event.eventName]) {
      for (let i = 0; i < PubSub.events[event.eventName].length; i++) {
        if (PubSub.events[event.eventName][i] === event) {
          PubSub.events[event.eventName].splice(i, 1);
          break;
        }
      }
    }
  };

  public static publish = (eventName: EventNames, ...args: any) => {
    if (PubSub.events.All) {
      PubSub.events.All.forEach((event) => event.callback(eventName, args[0]));
    }
    if (PubSub.events[eventName]) {
      PubSub.events[eventName].forEach((event: EventType) => {
        switch (eventName) {
          case 'View':
            (event.callback as CallbackView)(args[0]);
            break;
          case 'HashRouteChange':
            (event.callback as CallbackHashRouteChange)(args[0]);
            break;
          case 'Ecom':
            (event.callback as CallbackEcom)(args[0]);
            break;
          case 'ItemClicked':
          case 'ImagesClick':
          case 'OptionsClick':
          case 'PhonenumberVisible':
          case 'PhonenumberCall':
          case 'MailVisible':
          case 'InsuranceInterest':
          case 'InsuranceOpen':
          case 'InsuranceClose':
          case 'FinanceOpen':
          case 'FinanceClose':
          case 'Search':
          case 'SearchClearQuery':
          case 'SearchClearAllFilters':
          case 'SearchInitiated':
          case 'SearchCompleted':
          case 'FilterApply':
          case 'FinanceInterest':
            (event.callback as CallbackItem)(args[0]);
            break;
          default:
            break;
        }
      });
    }
  };
}
export default PubSub;
