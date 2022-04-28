import { Action, createReducer, on} from '@ngrx/store';
import { FileType } from 'src/app/models/file-types.model';
import { Files } from 'src/app/models/file.model';
import { fileUpload, loadFilesSuccess, loadFileTypesSuccess } from '../actions/action';

export interface State {
  fileTypes: FileType[];
  files: Files[];
}

export const initialState: State = {
  fileTypes: [],
  files: []
};

const _storeReducer = createReducer(
    initialState,
    on(loadFileTypesSuccess, (state: State, payload:any) => {
      return ({...state, fileTypes: payload.fileTypes});
    }),
    on(loadFilesSuccess, (state: State, payload:any) => {
      const files = [...state.files]
      files.push(...payload.files);
      return ({...state, files: files});
    }),
    on(fileUpload,(state: State, payload:any) => { //when upload happend, we had to manipulate state.files since we don't want to fetch files again after upload
      const files = [...state.files]
      const file = payload.file as Files;
      files.unshift(file);
      const fileTypes = [...state.fileTypes];
      let fileTypeIndex = fileTypes.findIndex(i => i.type == file.fileType)
      if(fileTypeIndex != -1)
        fileTypes[fileTypeIndex] = { count: fileTypes[fileTypeIndex].count + 1, type: fileTypes[fileTypeIndex].type} as FileType
      else
        fileTypes.push({count: 1, type: file.fileType});

      return ({...state, files: files, fileTypes: fileTypes});
    }),
  );


export function storeReducer(state : State | undefined, action : Action) {
    return _storeReducer(state, action);
  }