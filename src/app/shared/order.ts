import {Item} from './item';
import {User} from './user';
import {Book} from './book';
import {Status} from './status';

export class Order {
    constructor(public id:number, public user_id:number, public orderDate:Date, public price:number, public items:Item[], public user: User, public books: Book, public statuses: Status) {

    }
}
