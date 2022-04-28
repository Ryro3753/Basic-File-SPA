import { Files } from "./file.model";

export interface FileUpload{
    fileInfo: Files;
    isUploaded: boolean;
    isUploading: boolean;
    file: any;
}