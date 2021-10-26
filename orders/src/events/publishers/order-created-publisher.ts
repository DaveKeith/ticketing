import { OrderCreatedEvent, Publisher, Subjects } from "@dkticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}