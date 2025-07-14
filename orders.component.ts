import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/order/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getAll().subscribe({
      next: res => this.orders = res,
      error: err => console.error(err)
    });
  }

  changeStatus(id: string, newStatus: string) {
    this.orderService.updateStatus(id, newStatus).subscribe(() => this.getOrders());
  }

  deleteOrder(id: string) {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      this.orderService.delete(id).subscribe(() => this.getOrders());
    }
  }
}
