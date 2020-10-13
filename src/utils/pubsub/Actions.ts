interface ActionBase<Callback> {
  actionName: ActionNames;
  callback: Callback;
}

export type ActionCallbackEmpty = () => void;

export type CallbackOnFilterUpdate = (query: string) => void;
export interface ActionOnFilterUpdate extends ActionBase<CallbackOnFilterUpdate> {
  actionName: 'onFilterUpdate';
}

export type ActionCallbackAll = (eventName: Omit<ActionNames, 'All'>, data: any) => void;
export interface ActionAll extends ActionBase<ActionCallbackAll> {
  actionName: 'All';
}

export type ActionTypes = ActionOnFilterUpdate | ActionAll;

export type ActionNames = Pick<ActionTypes, 'actionName'>['actionName'];
