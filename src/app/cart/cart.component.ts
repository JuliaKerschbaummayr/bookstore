import { Component, OnInit } from '@angular/core';
import {OrderService} from '../shared/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/authentication.service';
import {OrderFactory} from '../shared/order-factory';
import {Order} from '../shared/order';
import {Item} from '../shared/item';
import {Book} from '../shared/book';
import {BookFactory} from '../shared/book-factory';

@Component({
  selector: 'bs-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {
  public order: Order = OrderFactory.empty();
  public book: Book = BookFactory.empty();
  public cart : Array<any> = [];
  public prices : Array<any> = [];
  public cartItems: Item[] = [];

  public bookPrice : number = 0;
  public totalPrice : number = 0;
  public isbn : string;

  constructor(
      private os: OrderService,
      private route: ActivatedRoute,
      private router: Router,
      public authService: AuthService
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    // this.os.getSingle(params['id']).subscribe(o => this.order = o);

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.slice(0,10) === "bookincart") {
        this.cart.push(JSON.parse(localStorage.getItem(key)));
        this.isbn = key.slice(10);
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
    this.getBookPrice(item, countHTML);
    localStorage.setItem('counter' + item, JSON.stringify(countHTML));
    document.getElementById("count " + item).innerHTML = countHTML.toString();
    this.setPrices(item);
  }

  minus(item) {
    let countHTML = Number(document.getElementById("count " + item).innerHTML);
    if (countHTML > 1) {
      countHTML--;
      this.getBookPrice(item, countHTML);
      localStorage.setItem('counter' + item, JSON.stringify(countHTML));
      document.getElementById("count " + item).innerHTML = countHTML.toString();
      this.setPrices(item);
    }
  }

  delete(item) {
    let countHTML = Number(document.getElementById("count " + item).innerHTML);
    localStorage.removeItem('bookincart' + this.cart[item][1]);
    localStorage.removeItem('counter' + item);
    localStorage.removeItem('price' + item);
    document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
    document.getElementById("book " + item).remove();
  }

  getBookPrice(item, count) {
    this.bookPrice = (Number(this.cart[item][4])) * (Number(count));
    document.getElementById("bookPrice " + item).innerHTML = this.bookPrice.toFixed(2) + "€";
  }

  setPrices(item) {
    //if amount is set for book
    if (localStorage.getItem('counter' + item)) {
      let counter = localStorage.getItem('counter' + item);
      if (document.getElementById("count " + item)) {
        document.getElementById("count " + item).innerHTML = counter;
      }
      this.bookPrice = this.cart[item][4] * Number(counter);
      if (document.getElementById("bookPrice " + item)) {
        document.getElementById("bookPrice " + item).innerHTML = this.bookPrice.toFixed(2) + "€";
      }
    }
    //if amount is not set in local storage, therefore is 1
    else {
      this.bookPrice = this.cart[item][4];
      if (document.getElementById("bookPrice " + item)) {
        document.getElementById("bookPrice " + item).innerHTML = this.bookPrice.toFixed(2) + "€";
        localStorage.setItem('counter' + item, "1");
        localStorage.setItem('price' + item, JSON.stringify(this.bookPrice));
      }
    }
  }

  calculatePrice() {
    this.totalPrice = 0;
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.slice(0, 5) === "price") {
        this.prices.push(JSON.parse(localStorage.getItem(key)));
      }
    }

    for (let j = 0; j < this.prices.length; j++) {
      this.totalPrice += (Number(localStorage.getItem("price" + j)) * Number(localStorage.getItem("counter" + j)));
    }
    document.getElementById("totalPrice").innerHTML = this.totalPrice.toFixed(2) + "€";
  }

  saveOrder(){
    if(this.cart.length > 0) {
      if (localStorage.getItem('userId')) {
          this.calculatePrice();
          for (let i = 0; i < this.cart.length; i++) {
              // let item = JSON.parse(this.cart[i]);
              this.cartItems.push({
                  book: this.cart[i],
                  quantity: Number(localStorage.getItem('counter' + i)),
              });
          }

          this.order.user_id = JSON.parse(localStorage.getItem('userId'));
          this.order.orderDate = new Date(this.order.orderDate);
          this.order.price = this.totalPrice;
          this.order.items = this.cartItems;

          console.log(this.order);

          this.os.createOrder(this.order).subscribe(res =>
          {
              this.order = OrderFactory.empty();
              this.router.navigate(['../orders'], { relativeTo: this.route });
          });
      } else {
          this.router.navigate(['../login'], { relativeTo: this.route });
      }
    }
  }
}

