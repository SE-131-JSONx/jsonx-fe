import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveJsonDialogComponent } from './save-json-dialog.component';

describe('SaveJsonDialogComponent', () => {
  let component: SaveJsonDialogComponent;
  let fixture: ComponentFixture<SaveJsonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveJsonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveJsonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
