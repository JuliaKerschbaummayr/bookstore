import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../shared/order';

@Component({
  selector: 'a.bs-order-list-item',
  templateUrl: './order-list-item.component.html',
  styles: []
})
export class OrderListItemComponent implements OnInit {

  @Input() order: Order;

  constructor() { }

  ngOnInit() {
  }

}
