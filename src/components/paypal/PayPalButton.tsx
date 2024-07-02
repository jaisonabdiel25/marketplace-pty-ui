'use client';

import { usePayPalCheckPayment } from '@/hooks/usePayPalCheckPayment';
import { PaymentSale } from '@/interfaces/Payment';
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from '@paypal/paypal-js/types';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface Props {
  orderId: string;
  amount: number;
}



export const PayPalButton = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const { paypalCheckPayment } = usePayPalCheckPayment({orderId});

  const rountedAmount = (Math.round(amount * 100)) / 100;


  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    )
  }


  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            value: `${rountedAmount}`,
            currency_code: 'USD',
          }
        }
      ],
    });

    return transactionId;
  }


  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {

    const details = await actions.order?.capture();

    console.log({ details })
    if (!details) return;

    const body: PaymentSale = {
      orderId,
      transactionId: details.id!
    }

    await paypalCheckPayment(body);

  }

  return (
    <div className="relative z-0">
      <PayPalButtons
        createOrder={createOrder}
        onApprove={async (data: OnApproveData, actions: OnApproveActions) => {
          await onApprove(data, actions)
        
        }}
      />
    </div>
  )
}