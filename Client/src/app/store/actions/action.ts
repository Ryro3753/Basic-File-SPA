import { createAction, props } from "@ngrx/store";
import { FileType } from "src/app/models/file-types";


export const loadFileTypes = createAction('[File Screen] Get File Types');
export const loadFileTypesSuccess = createAction('[File Screen] Get File Types Success', props<{fileTypes: FileType[]}>());
export const loadFileTypesError = createAction('[File Screen] Get File Types Error');
