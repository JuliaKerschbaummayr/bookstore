import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../shared/order';

@Component({
  selector: 'a.bs-manage-orders-list-item',
  templateUrl: './manage-orders-list-item.component.html',
  styles: []
})
export class ManageOrdersListItemComponent implements OnInit {
  @Input() order: Order;

  constructor() { }

  ngOnInit() {
  }

}
