import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../Components/page/Payment";
import { OrderSummary } from "../Components/page/Order";

function Payment() {
  const stripePromise = loadStripe(
    "pk_test_51OUkHvAtzVz2HlIhP4P0BJI5PBC4rQLUmQLJecCycmRsVvRYTpumczewyItszAkcjwch2gkLNrdzD4QEZFyxS02T00cXTRK2Gx"
  );
  const {
    state: { apiResult, userInput, orderSummary },
  } = useLocation();
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };
  apiResult.cartTotal = orderSummary.grandTotal;

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <div className="container m-5 p-5">
          <div className="row">
            <div className="col-md-7">
              <OrderSummary data={apiResult} userInput={userInput} />
            </div>
            <div className="col-md-5">
              <CheckoutForm data={apiResult} userInput={userInput} />
            </div>
          </div>
        </div>
      </Elements>
    </div>
  );
}

export default Payment;
