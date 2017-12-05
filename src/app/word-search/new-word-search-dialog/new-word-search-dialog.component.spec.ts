import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWordSearchDialogComponent } from './new-word-search-dialog.component';

describe('NewWordSearchDialogComponent', () => {
  let component: NewWordSearchDialogComponent;
  let fixture: ComponentFixture<NewWordSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWordSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWordSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
