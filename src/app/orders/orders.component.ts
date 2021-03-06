import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/order';
import {OrderService} from '../shared/order.service';

@Component({
  selector: 'bs-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor(private os: OrderService) { }

  ngOnInit() {
      this.os.getAll().subscribe(res => this.orders = res);
  }

}
