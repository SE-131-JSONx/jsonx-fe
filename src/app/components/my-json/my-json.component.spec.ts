import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJsonComponent } from './my-json.component';

describe('MyJsonComponent', () => {
  let component: MyJsonComponent;
  let fixture: ComponentFixture<MyJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
