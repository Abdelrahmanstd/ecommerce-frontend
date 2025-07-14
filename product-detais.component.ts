import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { CartService } from '../../core/services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detais',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './product-detais.component.html',
  styleUrl: './product-detais.component.css'
})
export class ProductDetaisComponent implements OnInit {
  product: any;
  productId: string = '';
 
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.getProduct();
  }

  getProduct() {
    this.productService.getById(this.productId).subscribe({
      next: (res) => this.product = res,
      error: (err) => console.error(err)
    });
  }

  addToCart() {
    this.cartService.addToCart({ productId: this.productId, quantity: 1 }).subscribe({
      next: () => alert('Product added to cart!'),
      error: (err) => alert('Error adding to cart')
    });
  }

  getImageUrl(imagePath: string): string {
    return 'http://localhost:4000/' + imagePath.replace(/\\/g, '/');
  }
}
