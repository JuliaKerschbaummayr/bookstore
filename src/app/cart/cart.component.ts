import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getBook() {
    let bookincartdata = JSON.parse(localStorage.getItem('bookincart'));
  }

}
