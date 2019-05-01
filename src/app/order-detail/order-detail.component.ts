import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/order';
import {OrderFactory} from '../shared/order-factory';
import {OrderService} from '../shared/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/authentication.service';

@Component({
  selector: 'bs-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {
  order:Order = OrderFactory.empty();

  constructor(
      private os: OrderService,
      private route: ActivatedRoute,
      private router: Router,
      public authService: AuthService
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.os.getSingle(params['id']).subscribe(o => this.order = o);
  }

}