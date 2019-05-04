import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/order';
import {User} from '../shared/user';
import {OrderFactory} from '../shared/order-factory';
import {OrderService} from '../shared/order.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../shared/authentication.service';

@Component({
  selector: 'bs-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {
  order:Order = OrderFactory.empty();
  user:User;

  constructor(
    private os: OrderService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.os.getSingle(params['id']).subscribe(o => this.order = o);
  }

}
