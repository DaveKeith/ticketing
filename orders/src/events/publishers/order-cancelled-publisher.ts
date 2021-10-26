import { OrderCancelledEvent, Publisher, Subjects } from "@dkticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}