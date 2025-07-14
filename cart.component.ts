import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { OrderService } from '../../core/services/order/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService ,private orderService:OrderService ,private router:Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: res => {
        this.cartItems = res.items || [];
        this.calculateTotal();
      },
      error: err => console.error(err)
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;

    this.cartService.updateItem({ productId, quantity }).subscribe(() => {
      this.loadCart();
    });
  }

  removeItem(productId: string) {
    this.cartService.removeItem(productId).subscribe(() => {
      this.loadCart();
    });
  }

  getImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  const fixedPath = imagePath.replace(/\\/g, '/');
  return `http://localhost:4000/${fixedPath}`;
}

placeOrder() {
  this.orderService.create().subscribe({
    next: res => {
      alert('Order placed successfully!');
      this.router.navigate(['/user/myOrders']);
    },
    error: err => {
      console.error(err);
      alert('Failed to place order');
    }
  });
}
}
