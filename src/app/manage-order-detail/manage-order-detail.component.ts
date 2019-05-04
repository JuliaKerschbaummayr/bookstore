import { Component, OnInit } from '@angular/core';
import {OrderFactory} from '../shared/order-factory';
import {Order} from '../shared/order';
import {User} from '../shared/user';
import {OrderService} from '../shared/order.service';
import {AuthService} from '../shared/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StatusValidator} from '../shared/status-validator';
import {ManageOrderDetailErrorMessages} from './manage-order-detail-error-messages';
import {StatusFactory} from '../shared/status-factory';
import {Status} from '../shared/status';

@Component({
  selector: 'bs-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styles: []
})
export class ManageOrderDetailComponent implements OnInit {
  order: Order = OrderFactory.empty();
  user: User;
  status = StatusFactory.empty();
  statusForm: FormGroup;
  errors: { [key: string]: string } = {};

  constructor(
    private os: OrderService,
    public authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.os.getSingle(params['id']).subscribe(o => this.order = o);

    this.initStatus();
  }

  initStatus() {
    const params = this.route.snapshot.params;
    let order_id: number = params['id'];

    this.statusForm = this.fb.group({
        order_id: order_id,
        status: [this.status.status, [Validators.required, StatusValidator.rightstatus]],
        comment: [this.status.comment],
        changeDate: new Date(this.status.changeDate)
    });
    this.statusForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  submitForm() {
    const status: Status = StatusFactory.fromObject(this.statusForm.value);

    this.os.create(status).subscribe(res => {
        this.status = StatusFactory.empty();
        this.statusForm.reset(StatusFactory.empty());
        this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of ManageOrderDetailErrorMessages) {
      const control = this.statusForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}
