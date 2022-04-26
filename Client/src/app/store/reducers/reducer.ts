import { Action, createReducer} from '@ngrx/store';

export interface State {
}

export const initialState: State = {
};

const _storeReducer = createReducer(
    initialState
  );


export function storeReducer(state : State | undefined, action : Action) {
    return _storeReducer(state, action);
  }