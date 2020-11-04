import { BaseAction } from '../../@types/action';

export const SET_PATH = 'SET_PATH';
type SET_PATH_TYPE = BaseAction<typeof SET_PATH> & {
  path: string;
};

type PathAction = SET_PATH_TYPE;

interface PathState {
  path: string;
}

export const initialState: PathState = {
  path: window.location.href,
};

const pathReducer = (state: PathState, action: PathAction) => {
  const next = { ...state };
  switch (action.type) {
    case SET_PATH:
      next.path = action.path;
      return next;

    default:
      throw new Error(`Unsupported action type`);
  }
};

export default pathReducer;
