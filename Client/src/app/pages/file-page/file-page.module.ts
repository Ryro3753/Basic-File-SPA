import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilePageComponent } from './file-page.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: FilePageComponent
    }]),
  ],
  providers: [
  ],
})
export class FilePageModule { }
