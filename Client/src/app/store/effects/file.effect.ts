import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { FileService } from 'src/app/services/file.service';
import { FileType } from 'src/app/models/file-types.model';
import { loadFiles, loadFilesSuccess, loadFileTypes, loadFileTypesError, loadFileTypesSuccess } from '../actions/action';
import { Files } from 'src/app/models/file.model';

@Injectable({
    providedIn: "root"
  })
export class FileEffects {
    loadFileTypes$ = createEffect((): any => { //fetch file types from server
        return this.actions$.pipe(
            ofType(loadFileTypes),
            switchMap(() => this.fileService.getFilesTypes().pipe(
                map((files:FileType[]) => loadFileTypesSuccess({fileTypes:files})),
                catchError(() => of(loadFileTypesError))
            ))
        )
    })
    loadFiles$ = createEffect((): any => { //fetch files from server
      return this.actions$.pipe(
          ofType(loadFiles),
          switchMap((action) => this.fileService.getFiles(action.request).pipe(
              map((files:Files[]) => loadFilesSuccess({files})),
              catchError(() => of(loadFileTypesError))
          ))
      )
  })
  constructor(
    private actions$: Actions,
    private fileService: FileService
  ) {}
}