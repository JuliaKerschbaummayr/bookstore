import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {
  public count = 1;
  public cart : Array<any> = [];

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('bookincart')) {
      let bookincartdata : Array<any> = JSON.parse(localStorage.getItem('bookincart'));
      this.cart.push(bookincartdata);
      console.log(this.cart);
    }
  }

  getBook(item, key) {
    return this.cart[item][key];
  }

  getBookArray(item, key, sum, inner) {
    return this.cart[item][key][sum][inner];
  }

  plus() {
    this.count++;
      document.getElementById("count").innerHTML = this.count.toString();
  }

  minus() {
    if (this.count > 1) {
      this.count--;
      document.getElementById("count").innerHTML = this.count.toString();
    }
  }
}
