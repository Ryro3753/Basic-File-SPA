import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FetchFileRequest } from "../models/fetch-file-request.model";
import { FileType } from "../models/file-types.model";
import { Files } from "../models/file.model";
import { BaseDataService } from "./base-data.service";



@Injectable({
  providedIn: "root"
})
export class FileService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'File')
  }

  getFilesTypes(): Observable<FileType[]>{
    const url = this.getUrl('File','GetFileTypes');
    return this.get<FileType[]>('GetFileTypes');
  }

  insertFile(file: File,files: Files): Observable<Files>{
    const formData = new FormData();
    formData.append('file',file);
    formData.append('name', files.name);
    formData.append('fileType', files.fileType);
    formData.append('length', files.length.toString());
    const url = this.getUrl('File','InsertFile');
    return this.httpClient.post<Files>(url, formData, )
  }

  getFiles(request: FetchFileRequest): Observable<Files[]>{
    return this.get<Files[]>('GetFilesByType', request);
  }

  downloadFile(file: Files): Observable<Blob>{
    return this.get<Blob>('DownloadFile', file, 'blob')
  }
}