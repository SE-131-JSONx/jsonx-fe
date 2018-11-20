import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnshareJsonDialogComponent } from './unshare-json-dialog.component';

describe('UnshareJsonDialogComponent', () => {
  let component: UnshareJsonDialogComponent;
  let fixture: ComponentFixture<UnshareJsonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnshareJsonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnshareJsonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
