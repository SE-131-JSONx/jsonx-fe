import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJsonDialogComponent } from './update-json-dialog.component';

describe('UpdateJsonDialogComponent', () => {
  let component: UpdateJsonDialogComponent;
  let fixture: ComponentFixture<UpdateJsonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateJsonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateJsonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
