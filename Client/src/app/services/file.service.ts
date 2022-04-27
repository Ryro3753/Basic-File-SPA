import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileType } from "../models/file-types";
import { BaseDataService } from "./base-data.service";



@Injectable({
  providedIn: "root"
})
export class FileService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Files')
  }

  getFilesTypes(): Observable<FileType[]>{
    const url = this.getUrl('Files','GetFilesByType');
    return this.httpClient.get<FileType[]>(url);
  }
}