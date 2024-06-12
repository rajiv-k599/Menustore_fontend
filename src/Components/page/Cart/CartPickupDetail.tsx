import React, { useEffect } from "react";
import { useState } from "react";
import { CartItemModel, apiResponse } from "../../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import inputHelper from "../../../helper/inputHelper";
import { MiniLoader } from "../common";
import { useInitialPaymentMutation } from "../../../Api/paymentApi";
import { useNavigate } from "react-router-dom";

function CartPickupDetail() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const shoppingCartStore: CartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData = useSelector((state: RootState) => state.userAuthStore);
  let grandTotal = 0;
  let totalItem = 0;
  const initialUserDate = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: "",
  };

  shoppingCartStore?.map((cartItem: CartItemModel) => {
    totalItem += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });

  const [userInput, setUserInput] = useState(initialUserDate);
  const [initialPayment] = useInitialPaymentMutation();
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  useEffect(() => {
    setUserInput({
      name: userData.fullName,
      email: userData.email,
      phoneNumber: "",
    });
  }, [userData]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { data }: apiResponse = await initialPayment(userData.id);
    const orderSummary = { grandTotal, totalItem };

    navigate("/payment", {
      state: { apiResult: data?.result, userInput, orderSummary },
    });
  };
  return (
    <div>
      {" "}
      <div className="border pb-5 pt-3">
        <h1 style={{ fontWeight: "300" }} className="text-center text-success">
          Pickup Details
        </h1>
        <hr />
        <form className="col-10 mx-auto" onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            Pickup Name
            <input
              type="text"
              value={userInput.name}
              className="form-control"
              placeholder="name..."
              name="name"
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="form-group mt-3">
            Pickup Email
            <input
              type="email"
              value={userInput.email}
              className="form-control"
              placeholder="email..."
              onChange={handleUserInput}
              name="email"
              required
            />
          </div>

          <div className="form-group mt-3">
            Pickup Phone Number
            <input
              type="number"
              value={userInput.phoneNumber}
              className="form-control"
              placeholder="phone number..."
              onChange={handleUserInput}
              name="phoneNumber"
              required
            />
          </div>
          <div className="form-group mt-3">
            <div className="card p-3" style={{ background: "ghostwhite" }}>
              <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
              <h5>No of items : {totalItem}</h5>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-success form-control mt-3"
            disabled={loading}
          >
            {loading ? <MiniLoader /> : " Looks Good? Place Order!"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartPickupDetail;
