import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import {BookStoreService} from './shared/book-store.service';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BookFormComponent } from './book-form/book-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SearchComponent } from './search/search.component';
import {DateValueAccessorModule} from 'angular-date-value-accessor';
import { LoginComponent } from './login/login.component';
import {AuthService} from './shared/authentication.service';
import {TokenInterceptorService} from './shared/token-interceptor.service';
import {JwtInterceptorService} from './shared/jwt-interceptor.service';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import {OrderService} from './shared/order.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    BookFormComponent,
    SearchComponent,
    LoginComponent,
    CartComponent,
    OrdersComponent,
    ManageOrdersComponent,
    OrderListItemComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, DateValueAccessorModule
  ],
  providers: [BookStoreService, AuthService, OrderService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptorService,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
