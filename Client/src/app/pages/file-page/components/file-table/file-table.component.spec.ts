import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { storeReducer } from 'src/app/store/reducers/reducer';

import { FileTableComponent } from './file-table.component';

describe('FileTableComponent', () => {
  let component: FileTableComponent;
  let fixture: ComponentFixture<FileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileTableComponent ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({ state : storeReducer }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render files', () => {
    component.$fileTypes = [
      {
        type: 'png',
        count: 10
      }
    ];

    fixture.detectChanges();

    const filesElement: HTMLElement = fixture.nativeElement;

    component.$fileTypes.forEach(fileType => {
      const button = filesElement.querySelector("#"+ fileType.type);
      expect(button?.textContent).toContain(fileType.type);
    })

  });

  it('should not render navbar contents when fileTypes empty', () => {
    component.$fileTypes = [];

    fixture.detectChanges();

    const filesElement: HTMLElement = fixture.nativeElement;

    component.$fileTypes.forEach(fileType => {
      const button = filesElement.querySelector("#"+ fileType.type);
      expect(button?.textContent).not.toContain(fileType.type);
    })
  })

});
