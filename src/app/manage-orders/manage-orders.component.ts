import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/order';
import {OrderService} from '../shared/order.service';

@Component({
  selector: 'bs-manage-orders',
  templateUrl: './manage-orders.component.html',
  styles: []
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[];

  constructor(private os: OrderService) { }

  ngOnInit() {
      this.os.getAllOrders().subscribe(res => this.orders = res);
  }

}
