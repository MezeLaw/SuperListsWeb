import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinListComponent } from './join-list.component';

describe('JoinListComponent', () => {
  let component: JoinListComponent;
  let fixture: ComponentFixture<JoinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
