import { Component, OnInit } from '@angular/core';
import {count} from 'rxjs/internal/operators';

@Component({
  selector: 'bs-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {
  public cart : Array<any> = [];

  public bookPrice : number = 0;
  public totalPrice : number = 0;
  public isbn : string;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.slice(0,10) === "bookincart") {
        this.cart.push(JSON.parse(localStorage.getItem(key)));
        // this.totalPrice += this.bookPrice;
        // document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
        // this.isbn = key.slice(10);
      }
    }
  }

  getBook(item, key) {
    return this.cart[item][key];
  }

  getBookArray(item, key, sum, inner) {
    return this.cart[item][key][sum][inner];
  }

  plus(item) {
    let countHTML = Number(document.getElementById("count " + item).innerHTML);
    countHTML++;
    // this.totalPrice += this.getBook(item, 4);
    this.getBookPrice(item, countHTML);
    localStorage.setItem('counter' + item, JSON.stringify(countHTML));
    document.getElementById("count " + item).innerHTML = countHTML.toString();
    this.setPrices(item);
  }

  minus(item) {
    let countHTML = Number(document.getElementById("count " + item).innerHTML);
    if (countHTML > 1) {
      countHTML--;
      // this.totalPrice -= this.getBook(item, 4);
      this.getBookPrice(item, countHTML);
      localStorage.setItem('counter' + item, JSON.stringify(countHTML));
      document.getElementById("count " + item).innerHTML = countHTML.toString();
      this.setPrices(item);
    }
  }

  delete(item) {
    let countHTML = Number(document.getElementById("count " + item).innerHTML);
    // this.totalPrice -= (Number(this.getBook(item, 4))* Number(countHTML));
    document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
    document.getElementById("book " + item).remove();
    localStorage.removeItem('bookincart' + this.cart[item][1]);
    localStorage.removeItem('counter' + item);
    localStorage.removeItem('price' + item);
  }

  getBookPrice(item, count) {
    this.bookPrice = (Number(this.cart[item][4])) * (Number(count));
    // document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
    document.getElementById("bookPrice " + item).innerHTML = this.bookPrice.toFixed(2) + "€";
    // localStorage.setItem('price' + item, JSON.stringify(this.bookPrice));
  }

  setCounter(item) {
      this.setPrices(item);
  }

  setPrices(item) {
    //if amount is set for book
    if (localStorage.getItem('counter' + item)) {
      let counter = localStorage.getItem('counter' + item);
      document.getElementById("count " + item).innerHTML = counter;
      //set price for book
      this.bookPrice = this.cart[item][4] * Number(counter);
      document.getElementById("bookPrice " + item).innerHTML = this.bookPrice.toFixed(2) + "€";
      //set total price
      // this.totalPrice += this.cart[item][4];
      // document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
    }
    //if amount is not set in local storage, therefore is 1
    else {
      //set price for book
      this.bookPrice = this.cart[item][4];
      document.getElementById("bookPrice " + item).innerHTML = this.bookPrice.toFixed(2) + "€";
      // localStorage.setItem('price' + item, JSON.stringify(this.bookPrice));
      //set total price
      // document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
    }
  }

  calculatePrice() {
    this.totalPrice = 0;
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.slice(0, 5) === "price") {
        this.totalPrice += Number(localStorage.getItem("price" + i));
      }
    }
    document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
  }
}

