import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, map, SubscriptionLike } from 'rxjs';
import { FetchFileRequest } from 'src/app/models/fetch-file-request.model';
import { FileType } from 'src/app/models/file-types.model';
import { Files } from 'src/app/models/file.model';
import { FileService } from 'src/app/services/file.service';
import { loadFiles, loadFileTypes } from 'src/app/store/actions/action';
import { State } from 'src/app/store/reducers/reducer';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.css']
})
export class FileTableComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = []; //store all subs in order to unsub them when component destroys
  $fileTypes: FileType[] = [];
  $files!: Files[];

  clickedTab: number = -1;
  shownFiles!: Files[];
  filteredFiles!: Files[];
  loadMoreButton: boolean = false;

  constructor(readonly fileService: FileService,
    readonly store: Store<{ state: State }>) { }

  ngOnInit(): void {
    this.getfilesTypes();
    this.subscribes.push(this.store.select(store => store.state.fileTypes).subscribe(fileTypes => {
      if (fileTypes)
        this.$fileTypes = fileTypes;
    }));
    this.subscribes.push(this.store.select(store => store.state.files).subscribe(files => {
      if (files) {
        this.$files = files;
        this.changeTab(this.clickedTab);
      }
    }));
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }
  getfilesTypes() {
    this.store.dispatch(loadFileTypes());
  }

  changeTab(index: number) {
    this.clickedTab = index;

    if (this.clickedTab == -1)
      return;
    this.shownFiles = [];
    const selectedType = this.$fileTypes[index];
    this.filteredFiles = this.$files.filter(i => i.fileType == selectedType.type);
    if (this.filteredFiles.length < 50 && selectedType.count > this.filteredFiles.length) {
      const request = {
        type: selectedType.type,
        startFrom: this.filteredFiles.length,
        size: 50
      } as FetchFileRequest
      this.store.dispatch(loadFiles({ request: request }));
    }
    this.loadMoreButton = selectedType.count > this.filteredFiles.length;
  }

  //Calculation file size in meaningful way to user
  bytesToSize(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    const floored = Math.floor(Math.log(bytes) / Math.log(1024));
    const i = parseInt(floored.toString());
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  download(file: Files) {
    this.fileService.downloadFile(file).subscribe(response => {
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      downloadLink.setAttribute('download', file.name);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }

  //this function written for infinite scroll
  loadMore(){
    const selectedType = this.$fileTypes[this.clickedTab];
    const request = {
      type: selectedType.type,
      startFrom: this.filteredFiles.length,
      size: 50
    } as FetchFileRequest
    this.store.dispatch(loadFiles({ request: request }));
  }

}
