import { Injectable } from '@angular/core';
import {catchError, retry} from 'rxjs/internal/operators';
import {Observable, throwError} from 'rxjs';
import {Order} from './order';
import {HttpClient} from '@angular/common/http';
import {Status} from './status';

@Injectable()
export class OrderService {

    private api = "http://bookstore19.s1610456015.student.kwmhgb.at/api";
    constructor(private http: HttpClient) {

    }

    getAll(): Observable<Array<Order>> {
        return this.http.get(`${this.api}/orders/${localStorage.getItem('userId')}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getSingle(id): Observable<Order> {
        return this.http.get(`${this.api}/order/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getAllOrders(): Observable<Array<Order>> {
        return this.http.get(`${this.api}/manageorders`).pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    create(status:Status) : Observable<any> {
        return this.http.post(`${this.api}/manageorders`, status).pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    createOrder(order:Order) : Observable<any> {
        return this.http.post(`${this.api}/orders`, order).pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    private errorHandler(error: Error | any): Observable<any> {
        return throwError(error);
    }
}
