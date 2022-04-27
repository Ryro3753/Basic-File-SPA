import { Action, createReducer, on} from '@ngrx/store';
import { FileType } from 'src/app/models/file-types';
import { loadFileTypesSuccess } from '../actions/action';

export interface State {
  fileTypes: FileType[] | undefined;
}

export const initialState: State = {
  fileTypes: undefined
};

const _storeReducer = createReducer(
    initialState,
    on(loadFileTypesSuccess, (state: State, payload:any) => {
      return ({...state, fileTypes: payload.fileTypes});
    }),
  );


export function storeReducer(state : State | undefined, action : Action) {
    return _storeReducer(state, action);
  }