import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: (payment) => Router.push('/orders')
    })

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        }

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if(timeLeft < 0){
        return <div>Order Expired</div>;
    }
    
    return <div>
        Time left to pay: {timeLeft} seconds 
        <StripeCheckout 
            token={({ id }) => doRequest({ token: id })} 
            stripeKey="pk_test_51JkZb0LfNclnUTnj2czb5XupVtjNmqWPMSW5BTUhTkb4P10VxCK2WxAk2kNirABGSUaG8n1d8U0q3U4p3hmOypbW00Oi21dMNN"
            amount={order.ticket.price * 100}
            email={currentUser.email}
        />
        {errors}
    </div>;
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
};

export default OrderShow;