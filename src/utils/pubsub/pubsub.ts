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
} from './Events';

type EventSubscriptions = {
  HashRouteChange: EventHashRouteChange[];
  ItemClicked: EventItemClicked[];
  EcomOnInit: EventEcomOnInit[];
  EcomOnUserEvent: EventEcomOnUser[];
  EcomOnExit: EventEcomOnExit[];
  ImagesClick: EventImagesClick[];
  InformationClick: EventInformationClick[];
  OptionsClick: EventOptionsClick[];
  PhonenumberVisible: EventPhonenumberVisible[];
  PhonenumberCall: EventPhonenumberCall[];
  MailVisible: EventMailVisible[];
  InsuranceInterest: EventInsuranceInterest[];
  FinanceInterest: EventFinanceInterest[];
  All: EventAll[];
};

export class PubSub {
  private static events: EventSubscriptions = {
    HashRouteChange: [],
    ItemClicked: [],
    EcomOnInit: [],
    EcomOnUserEvent: [],
    EcomOnExit: [],
    ImagesClick: [],
    InformationClick: [],
    OptionsClick: [],
    PhonenumberVisible: [],
    PhonenumberCall: [],
    MailVisible: [],
    InsuranceInterest: [],
    FinanceInterest: [],
    All: [],
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
      PubSub.events.All.forEach((event) => event.callback(eventName, args));
    }
    if (PubSub.events[eventName]) {
      PubSub.events[eventName].forEach((event: EventType) => {
        switch (eventName) {
          case 'HashRouteChange':
            (event.callback as CallbackHashRouteChange)(args[0]);
            break;
          case 'ItemClicked':
            (event.callback as CallbackEventItemClicked)(args[0]);
            break;
          case 'EcomOnUserEvent':
            (event.callback as CallbackEcomOnUserEvent)(args[0], args[1]);
            break;
          case 'EcomOnInit':
          case 'EcomOnExit':
          case 'ImagesClick':
          case 'InformationClick':
          case 'OptionsClick':
          case 'PhonenumberVisible':
          case 'PhonenumberCall':
          case 'MailVisible':
          case 'InsuranceInterest':
          case 'FinanceInterest':
            (event.callback as CallbackEmpty)();
            break;
          default:
            break;
        }
      });
    }
  };
}
export default PubSub;
