import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileTableComponent } from './components/file-table/file-table.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { FilePageComponent } from './file-page.component';

@NgModule({
  declarations: [
    FilePageComponent,
    UploaderComponent,
    FileTableComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: FilePageComponent
    }]),
    CommonModule
  ],
  providers: [],
})
export class FilePageModule { }