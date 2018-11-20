import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJsonDialogComponent } from './delete-json-dialog.component';

describe('DeleteJsonDialogComponent', () => {
  let component: DeleteJsonDialogComponent;
  let fixture: ComponentFixture<DeleteJsonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteJsonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteJsonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
