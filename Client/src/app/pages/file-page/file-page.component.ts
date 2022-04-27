import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, SubscriptionLike } from 'rxjs';
import { FileType } from 'src/app/models/file-types';
import { FileService } from 'src/app/services/file.service';
import { loadFileTypes } from 'src/app/store/actions/action';
import { State } from 'src/app/store/reducers/reducer';

@Component({
  selector: 'app-file-page',
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.css']
})
export class FilePageComponent implements OnInit,OnDestroy {

  subscribes: SubscriptionLike[] = [];
  $fileTypes!: FileType[];

  constructor(readonly fileService: FileService,
    readonly store: Store<{ state: State }>,) { }

  ngOnInit(): void {
    this.subscribes.push(this.store.select(store => store.state.fileTypes).subscribe(fileTypes => {
      if(fileTypes)
        this.$fileTypes = fileTypes;
    }));
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  getfilesTypes(){
    this.store.dispatch(loadFileTypes());
  }

}
