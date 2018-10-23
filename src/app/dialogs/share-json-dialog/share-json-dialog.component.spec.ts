import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareJsonDialogComponent } from './share-json-dialog.component';

describe('ShareJsonDialogComponent', () => {
  let component: ShareJsonDialogComponent;
  let fixture: ComponentFixture<ShareJsonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareJsonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareJsonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
