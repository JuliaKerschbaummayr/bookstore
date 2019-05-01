import {Order} from './order';

export class OrderFactory {

    static empty(): Order {
        return new Order(null, 0, new Date(), null);
    }

    static fromObject(rawOrder: any): Order {
        return new Order(
            rawOrder.id,
            rawOrder.user_id,
            typeof(rawOrder.orderDate) === 'string' ?
                new Date(rawOrder.orderDate) : rawOrder.orderDate,
            rawOrder.price,
        );
    }
}
