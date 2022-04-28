import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { storeReducer } from 'src/app/store/reducers/reducer';
import { UploaderComponent } from './uploader.component';


describe('UploaderCompoenent', () => {
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploaderComponent ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({ state : storeReducer }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render upload files', () => {

    component.uploadFiles = [
      {
        fileInfo: {
          id: '',
          name: 'file1',
          fileType: '.png',
          length: 5000,
          createdDate: new Date()
        },
        file: '',
        isUploaded: false,
        isUploading: false
      }
    ];

    fixture.detectChanges();

    const filesElement: HTMLElement = fixture.nativeElement;

    component.uploadFiles.forEach(files => {
      const button = filesElement.querySelector("#"+ files.fileInfo.name);
      expect(button?.textContent).toContain(files.fileInfo.name);
    })
  });
});
