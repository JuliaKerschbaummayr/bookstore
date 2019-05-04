import { Component, OnInit } from '@angular/core';
import {count} from 'rxjs/internal/operators';

@Component({
  selector: 'bs-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {
  public cart : Array<any> = [];

  public count : number = 1;
  public bookPrice : number = 0;
  public totalPrice : number = 0;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.slice(0,10) === "bookincart") {
        this.cart.push(JSON.parse(localStorage.getItem(key)));
        this.setPrices(i);
      }
    }

    /*if (localStorage.getItem('bookincart')) {
      let bookincartdata : Array<any> = JSON.parse(localStorage.getItem('bookincart'));
      this.cart.push(bookincartdata);
      localStorage.setItem('bookincart', JSON.stringify(this.cart));
      console.log(this.cart);
    }*/
  }

  getBook(item, key) {
    return this.cart[item][key];
  }

  getBookArray(item, key, sum, inner) {
    return this.cart[item][key][sum][inner];
  }

  plus(item) {
    this.count++;
    document.getElementById("count " + item).innerHTML = this.count.toString();
    let countHTML = document.getElementById("count " + item).innerHTML;
    this.totalPrice += this.getBook(item, 4);
    this.getBookPrice(item, countHTML);
    localStorage.setItem('counter' + item, JSON.stringify(countHTML));
  }

  minus(item) {
    if (this.count > 1) {
      this.count--;
      document.getElementById("count " + item).innerHTML = this.count.toString();
      let countHTML = document.getElementById("count " + item).innerHTML;
      this.totalPrice -= this.getBook(item, 4);
      localStorage.setItem('counter' + item, JSON.stringify(countHTML));
      this.getBookPrice(item, countHTML);
    }
  }

  delete(item) {
    let amount = document.getElementById("count " + item).innerHTML;
    this.totalPrice -= (Number(this.getBook(item, 4))* Number(amount));
    document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
    document.getElementById("book " + item).remove();
    localStorage.removeItem('bookincart' + this.cart[item][1]);
    localStorage.removeItem('counter' + item);
  }

  getBookPrice(item, count) {
    this.bookPrice = (Number(this.cart[item][4])) * (Number(count));
    document.getElementById("bookPrice " + item).innerHTML = this.bookPrice.toFixed(2) + "€";
    document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
  }

  setPrices(i) {
    if (localStorage.getItem('counter' + i)) {
      /*this.bookPrice = this.cart[i][4] * JSON.parse(localStorage.getItem('counter' + i));
      document.getElementById("bookPrice " + i).innerHTML = this.bookPrice.toFixed(2) + "€";*/
      this.totalPrice += (this.cart[i][4]) * JSON.parse(localStorage.getItem('counter' + i));
      document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
    } else {
      /*this.bookPrice = this.cart[i][4];
      document.getElementById("bookPrice " + i).innerHTML = this.bookPrice.toFixed(2) + "€";*/
      this.totalPrice += this.cart[i][4];
      document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
    }
  }
}

