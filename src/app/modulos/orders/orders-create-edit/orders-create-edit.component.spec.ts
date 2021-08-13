import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCreateEditComponent } from './orders-create-edit.component';

describe('OrdersCreateEditComponent', () => {
  let component: OrdersCreateEditComponent;
  let fixture: ComponentFixture<OrdersCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
