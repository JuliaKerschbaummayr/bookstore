import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {
  public count = 1;

  constructor() { }

  ngOnInit() {
  }

  getBook(key) {
    let bookincartdata = JSON.parse(localStorage.getItem('bookincart'));
    return bookincartdata[key];
  }

  getBookArray(key, sum, inner) {
    let bookincartarray = JSON.parse(localStorage.getItem('bookincart'));
    return bookincartarray[key][sum][inner];
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
