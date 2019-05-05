import {Item} from './item';

export class Order {
    constructor(public id:number, public user_id:number, public orderDate:Date, public price:number, public items:Item[]) {

    }
}
