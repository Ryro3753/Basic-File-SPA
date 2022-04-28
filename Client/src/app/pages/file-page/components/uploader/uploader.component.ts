import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FileService } from 'src/app/services/file.service';
import { fileUpload } from 'src/app/store/actions/action';
import { State } from 'src/app/store/reducers/reducer';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = []; //store all subs in order to unsub them when component destroys
  
  constructor(readonly alertService: AlertService,
    readonly fileService: FileService,
    readonly store: Store<{ state: State }>) { }


  //These variables are for configuration. Actually we need an admin panel to configure these options, it can be developed in future
  //
  //
  //
  fileTypeAccept = "*";
  fileSizeLimit = Number.MAX_SAFE_INTEGER;
  //
  //
  //
  //

  uploadFiles : FileUpload[] = [];

  splash : boolean = false;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  addFile(event: any){
    if(event.target.files.length > 0)
      this.addFileUpload(event.target.files[0]);
  }

  //#region drag and drop functions
  @HostListener('dragover', ['$event']) onDragOver(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.splash = true;
    setTimeout(() => {
      this.splash = false;
    }, 5000);
  }

  @HostListener('dragend', ['$event']) onDragLeave(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.splash = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: any){
    event.preventDefault();
    event.stopPropagation();
    if(event.dataTransfer.files[0] != null){
      this.splash = false;
      this.addFileUpload(event.dataTransfer.files[0]);
    }
  }
  //#endregion

  addFileUpload(file: any){
    if(file.size > this.fileSizeLimit){
      this.alertService.alert({alertInfo:{message:'You are exceeding file size limit', timeout:5000, type:'warning'}});
      return;
    }
    const fileExtension = file.name.split('.').pop();
    if(!this.fileTypeAccept.includes(fileExtension) && this.fileTypeAccept != '*'){
      this.alertService.alert({alertInfo:{message:'You are trying to upload not-supported file', timeout:5000, type:'warning'}});
      return;
    }

    this.uploadFiles.push({
      isUploaded: false,
      isUploading: false,
      file: file,
      fileInfo: {
        name: file.name,
        fileType: '.' + fileExtension,
        length: file.size,
        createdDate: new Date(),
        id: ""
      }
    });
    this.alertService.alert({alertInfo:{message:'File successfully added to Upload Table',type:'success'}});
  }

  uploadFile(index: number){
    var file = this.uploadFiles[index];
    file.isUploading = true;
    this.subscribes.push(this.fileService.insertFile(file.file, file.fileInfo).subscribe(i => {
      file.isUploaded = true;
      file.isUploading = false;
      this.store.dispatch(fileUpload({file:i}));
      this.alertService.alert({alertInfo:{message:'File successfully uploaded to server',type:'success'}});
    }));
  }

  deleteFile(index: number){
    if(index < this.uploadFiles.length){
      this.uploadFiles.splice(index,1);
      this.alertService.alert({alertInfo:{message:'File successfully removed from Upload Table',type:'success'}});
      return;
    }
    this.alertService.alert({alertInfo:{message:'Something wrong happend, please try again',type:'danger'}});
  }

}
