import { createAction, props } from "@ngrx/store";
import { FetchFileRequest } from "src/app/models/fetch-file-request.model";
import { FileType } from "src/app/models/file-types.model";
import { Files } from "src/app/models/file.model";


//File Type actions
export const loadFileTypes = createAction('[File Screen] Get File Types');
export const loadFileTypesSuccess = createAction('[File Screen] Get File Types Success', props<{fileTypes: FileType[]}>());
export const loadFileTypesError = createAction('[File Screen] Get File Types Error');

//File Info Actions
export const loadFiles = createAction('[File Screen] Get Files', props<{request: FetchFileRequest}>());
export const loadFilesSuccess = createAction('[File Screen] Get Files Success', props<{files: Files[]}>());
export const loadFilesError = createAction('[File Screen] Get Files Error');

//Upload Action
export const fileUpload = createAction('[File Screen] Upload File', props<{file: Files}>());
export const fileUploadError = createAction('[File Screen] Upload File Error');
