import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKeywordComponent } from './manage-keyword.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, 
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule, 
  MatNativeDateModule,
  MatIconModule, 
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule, 
  MatProgressSpinnerModule} from '@angular/material';

describe('ManageKeywordComponent', () => {
  let component: ManageKeywordComponent;
  let fixture: ComponentFixture<ManageKeywordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageKeywordComponent ],
      imports: [
        MatButtonModule, 
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatIconModule, 
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule, 
        MatProgressSpinnerModule,
        RouterModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
