import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetaisComponent } from './product-detais.component';

describe('ProductDetaisComponent', () => {
  let component: ProductDetaisComponent;
  let fixture: ComponentFixture<ProductDetaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
