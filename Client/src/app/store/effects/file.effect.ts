import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { FileService } from 'src/app/services/file.service';
import { FileType } from 'src/app/models/file-types';
import { loadFileTypes, loadFileTypesError, loadFileTypesSuccess } from '../actions/action';

@Injectable({
    providedIn: "root"
  })
export class FileEffects {
    loadFileTypes$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(loadFileTypes),
            switchMap((action) => this.fileService.getFilesTypes().pipe(
                map((files:FileType[]) => loadFileTypesSuccess({fileTypes:files})),
                catchError(() => of(loadFileTypesError))
            ))
        )
    })
  constructor(
    private actions$: Actions,
    private fileService: FileService
  ) {}
}