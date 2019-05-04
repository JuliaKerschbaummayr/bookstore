import {Status} from './status';

export class StatusFactory {

    static empty(): Status {
        return new Status(null,'', '', new Date());
    }

    static fromObject(rawStatus: any): Status {
        return new Status(
            rawStatus.order_id,
            rawStatus.status,
            rawStatus.comment,
            typeof(rawStatus.changeDate) === 'string' ?
                new Date(rawStatus.changeDate) : rawStatus.changeDate,
        );
    }
}
