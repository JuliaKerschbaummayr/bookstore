import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BookListComponent} from './book-list/book-list.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookFormComponent} from './book-form/book-form.component';
import {LoginComponent} from './login/login.component';
import {CartComponent} from './cart/cart.component';
import {OrdersComponent} from './orders/orders.component';
import {ManageOrdersComponent} from './manage-orders/manage-orders.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'books', component: BookListComponent},
    {path: 'books/:isbn', component: BookDetailsComponent},
    {path: 'admin', component: BookFormComponent},
    {path: 'admin/:isbn', component: BookFormComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cart', component: CartComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'order/:id', component: OrderDetailComponent},
    {path: 'manageorders', component: ManageOrdersComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}