import { EcomEvent, EcomStep, EcomView } from '@wayke-se/ecom-web/src/Utils/ecomEvent';

interface EventBase<Callback> {
  eventName: EventNames;
  callback: Callback;
}

export type CallbackEmpty = () => void;

interface CallbackHashRouteChangeData {
  id: string;
}
export type CallbackHashRouteChange = (data: CallbackHashRouteChangeData) => void;

interface CallbackViewDataBase<T> {
  type: T;
}

interface CallbackViewSearchData extends CallbackViewDataBase<'search'> {}

interface CallbackViewItemData extends CallbackViewDataBase<'item'> {
  id: string;
}

type CallbackViewData = CallbackViewSearchData | CallbackViewItemData;

export type CallbackView = (data: CallbackViewData) => void;

interface CallbackItemData {
  id: string;
  branchId: string;
  branchName: string;
}
export type CallbackItem = (data: CallbackItemData) => void;

export interface CallbackSearchData {
  query: string;
}
export type CallbackSearch = (data: CallbackSearchData) => void;

export interface CallbackSearchClearQueryData {
  query: string;
}
export type CallbackSearchClearQuery = (data: CallbackSearchClearQueryData) => void;

export interface CallbackSearchClearAllFiltersQueryData {
  query: string;
}
export type CallbackSearchClearAllFiltersQuery = (
  data: CallbackSearchClearAllFiltersQueryData
) => void;

export interface CallbackSearchInitiatedData {
  query: string;
}
export type CallbackSearchInitiated = (data: CallbackSearchInitiatedData) => void;

export interface CallbackSearchCompletedData {
  query: string;
  hits: number;
  totalHits: number;
}
export type CallbackSearchCompleted = (data: CallbackSearchCompletedData) => void;

export interface CallbackEcomData extends CallbackItemData {
  view: EcomView;
  event: EcomEvent;
  currentStep?: EcomStep;
  data?: any;
}

export interface CallbackFilterApplyData {
  type: 'checkbox' | 'range';
  filter: string;
  value?: string;
  checked?: boolean;
  min?: number;
  max?: number;
}
export type CallbackFilterApply = (data: CallbackFilterApplyData) => void;

export type CallbackEcom = (data: CallbackEcomData) => void;

export interface EventView extends EventBase<CallbackView> {
  eventName: 'View';
}

export interface EventHashRouteChange extends EventBase<CallbackHashRouteChange> {
  eventName: 'HashRouteChange';
}

export interface EventItemClicked extends EventBase<CallbackItem> {
  eventName: 'ItemClicked';
}

export interface EventEcom extends EventBase<CallbackEcom> {
  eventName: 'Ecom';
}

export interface EventImagesClick extends EventBase<CallbackItem> {
  eventName: 'ImagesClick';
}

export interface EventOptionsClick extends EventBase<CallbackItem> {
  eventName: 'OptionsClick';
}

export interface EventPhonenumberVisible extends EventBase<CallbackItem> {
  eventName: 'PhonenumberVisible';
}

export interface EventPhonenumberCall extends EventBase<CallbackItem> {
  eventName: 'PhonenumberCall';
}

export interface EventMailVisible extends EventBase<CallbackItem> {
  eventName: 'MailVisible';
}

export interface EventInsuranceOpen extends EventBase<CallbackItem> {
  eventName: 'InsuranceOpen';
}

export interface EventInsuranceClose extends EventBase<CallbackItem> {
  eventName: 'InsuranceClose';
}

export interface EventInsuranceInterest extends EventBase<CallbackItem> {
  eventName: 'InsuranceInterest';
}

export interface EventFinanceOpen extends EventBase<CallbackItem> {
  eventName: 'FinanceOpen';
}

export interface EventFinanceClose extends EventBase<CallbackItem> {
  eventName: 'FinanceClose';
}

export interface EventFinanceInterest extends EventBase<CallbackItem> {
  eventName: 'FinanceInterest';
}

export interface EventSearch extends EventBase<CallbackSearch> {
  eventName: 'Search';
}

export interface EventSearchClearQuery extends EventBase<CallbackSearchClearQuery> {
  eventName: 'SearchClearQuery';
}

export interface EventSearchClearAllFiltersQuery
  extends EventBase<CallbackSearchClearAllFiltersQuery> {
  eventName: 'SearchClearAllFilters';
}

export interface EventSearchInitiated extends EventBase<CallbackSearchInitiated> {
  eventName: 'SearchInitiated';
}

export interface EventSearchCompleted extends EventBase<CallbackSearchCompleted> {
  eventName: 'SearchCompleted';
}

export interface EventFilterApply extends EventBase<CallbackFilterApply> {
  eventName: 'FilterApply';
}

export type CallbackAll = (eventName: Omit<EventNames, 'All'>, data: any) => void;
export interface EventAll extends EventBase<CallbackAll> {
  eventName: 'All';
}

export type EventType =
  | EventView
  | EventHashRouteChange
  | EventItemClicked
  | EventEcom
  | EventImagesClick
  | EventOptionsClick
  | EventPhonenumberVisible
  | EventPhonenumberCall
  | EventMailVisible
  | EventInsuranceOpen
  | EventInsuranceClose
  | EventInsuranceInterest
  | EventFinanceOpen
  | EventFinanceClose
  | EventFinanceInterest
  | EventSearch
  | EventSearchClearQuery
  | EventSearchClearAllFiltersQuery
  | EventSearchInitiated
  | EventSearchCompleted
  | EventFilterApply
  | EventAll;

export type EventNames = Pick<EventType, 'eventName'>['eventName'];
