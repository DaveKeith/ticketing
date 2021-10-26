import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import mongoose from 'mongoose';
import { OrderCancelledEvent } from "@dkticketing/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({
        title: 'concert',
        price: 10,
        userId: 'afawiof',
    });
    ticket.set({ orderId });
    await ticket.save();

    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id
        }
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, orderId, ticket, data, msg };
}

it('updates the ticket', async () => {
    const { listener, orderId, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatatedTicket = await Ticket.findById(ticket.id);
    expect(updatatedTicket!.orderId).not.toBeDefined();
});

it('publishes an event', async () => {
    const { listener, orderId, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('acks the message', async () => {
    const { listener, orderId, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});
