interface EventBase<Callback> {
  eventName: EventNames;
  callback: Callback;
}

export type CallbackEmpty = () => void;

export type CallbackHashRouteChange = (id: string) => void;
export interface EventHashRouteChange extends EventBase<CallbackHashRouteChange> {
  eventName: 'HashRouteChange';
}

export type CallbackEventItemClicked = (id: string) => void;
export interface EventItemClicked extends EventBase<CallbackEventItemClicked> {
  eventName: 'ItemClicked';
}

export interface EventEcomOnInit extends EventBase<CallbackEmpty> {
  eventName: 'EcomOnInit';
}

export type CallbackEcomOnUserEvent = (userEvent: string, currentStep: string) => void;
export interface EventEcomOnUser extends EventBase<CallbackEcomOnUserEvent> {
  eventName: 'EcomOnUserEvent';
}

export interface EventEcomOnExit extends EventBase<CallbackEmpty> {
  eventName: 'EcomOnExit';
}

export interface EventImagesClick extends EventBase<CallbackEmpty> {
  eventName: 'ImagesClick';
}

export interface EventInformationClick extends EventBase<CallbackEmpty> {
  eventName: 'InformationClick';
}

export interface EventOptionsClick extends EventBase<CallbackEmpty> {
  eventName: 'OptionsClick';
}

export interface EventPhonenumberVisible extends EventBase<CallbackEmpty> {
  eventName: 'PhonenumberVisible';
}

export interface EventPhonenumberCall extends EventBase<CallbackEmpty> {
  eventName: 'PhonenumberCall';
}

export interface EventMailVisible extends EventBase<CallbackEmpty> {
  eventName: 'MailVisible';
}

export interface EventInsuranceInterest extends EventBase<CallbackEmpty> {
  eventName: 'InsuranceInterest';
}

export interface EventFinanceInterest extends EventBase<CallbackEmpty> {
  eventName: 'FinanceInterest';
}

export type CallbackAll = (eventName: Omit<EventNames, 'All'>, data: any) => void;
export interface EventAll extends EventBase<CallbackAll> {
  eventName: 'All';
}

export type EventType =
  | EventHashRouteChange
  | EventItemClicked
  | EventEcomOnInit
  | EventEcomOnUser
  | EventEcomOnExit
  | EventImagesClick
  | EventInformationClick
  | EventOptionsClick
  | EventPhonenumberVisible
  | EventPhonenumberCall
  | EventMailVisible
  | EventInsuranceInterest
  | EventFinanceInterest
  | EventAll;

export type EventNames = Pick<EventType, 'eventName'>['eventName'];
