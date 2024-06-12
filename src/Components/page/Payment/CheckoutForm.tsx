import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import toastNotify from "../../../helper/taostNotify";
import { orderSummaryProps } from "../Order/orderSummaryProps";
import { CartItemModel, apiResponse } from "../../../interface";
import { useCreateOrderMutation } from "../../../Api/orderApi";
import { Sd_Status } from "../../../utility/SD";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ data, userInput }: orderSummaryProps) => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [CreateOrder] = useCreateOrderMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occurred", "error");

      setIsProcessing(false);
    } else {
      let grandTotal = 0;
      let totalItems = 0;
      console.log(userInput);
      const orderDetailsDTO: any = [];
      data.cartItems?.forEach((item: CartItemModel) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["MenuItemId"] = item.menuItem?.id;
        tempOrderDetail["Quantity"] = item.quantity;
        tempOrderDetail["ItemName"] = item.menuItem?.name;
        tempOrderDetail["Price"] = item.menuItem?.price;
        orderDetailsDTO.push(tempOrderDetail);
        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItems += item.quantity!;
      });
      console.log(data);
      console.log(result);
      console.log(orderDetailsDTO);
      console.log(userInput);
      const response: apiResponse = await CreateOrder({
        PickupName: userInput.name,
        PickupPhone: userInput.phoneNumber,
        PickupEmail: userInput.email,
        TotalItems: totalItems,
        OrderTotal: grandTotal,
        StripePaymentIntentId: data.stripePaymentIntentId,
        ApplicationUserId: data.userId,
        OrderDetails: orderDetailsDTO,
        Status:
          result.paymentIntent.status === "succeeded"
            ? Sd_Status.CONFIRMED
            : Sd_Status.PENDING,
      });
      console.log(response.data?.result.status);
      if (response.data?.result.status === Sd_Status.CONFIRMED) {
        navigate(
          `/order/orderConfirmed/${response.data?.result.orderHeaderId}`
        );
      } else {
        navigate("/failed");
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;
