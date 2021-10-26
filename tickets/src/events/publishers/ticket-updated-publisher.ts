import { Publisher, Subjects, TicketUpdatedEvent } from "@dkticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}