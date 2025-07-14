import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product/product.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
@Component({
  selector: 'app-product-list',
  standalone:true,
  imports: [CommonModule , RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService , private cartService:CartService ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: res => this.products = res,
      error: err => console.error(err)
    });
  }

  getImageUrl(imagePath: string): string {
    const fixedPath = imagePath?.replace(/\\/g, '/');
    return `http://localhost:4000/${fixedPath}`;
  }

  addToCart(productId: string) {
  this.cartService.addToCart({ productId, quantity: 1 }).subscribe({
    next: res => {
      alert('Product added to cart successfully!');
    },
    error: err => {
      console.error(err);
      alert('Error adding product to cart');
    }
  });
}
}
