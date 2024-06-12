import React, { useState } from "react";
import { orderSummaryProps } from "./orderSummaryProps";
import { CartItemModel } from "../../../interface";
import getStatusColor from "../../../helper/getStatusColor";
import { useNavigate } from "react-router-dom";
import { SD_Roles, Sd_Status } from "../../../utility/SD";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useUpdateOrderHeaderMutation } from "../../../Api/orderApi";
import { MainLoder } from "../common";

function OrderSummary({ data, userInput }: orderSummaryProps) {
  const badgeTypeColor = getStatusColor(data.status!);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [updateOrderHeader] = useUpdateOrderHeaderMutation();
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const nextStatus: any =
    data.status! === Sd_Status.CONFIRMED
      ? { color: "info", value: Sd_Status.BEING_COOKED }
      : data.status! === Sd_Status.BEING_COOKED
      ? { color: "warning", value: Sd_Status.READY_FOR_PICKUP }
      : data.status! === Sd_Status.READY_FOR_PICKUP && {
          color: "success",
          value: Sd_Status.COMPLETED,
        };
  const handleNextStatus = async () => {
    setLoading(true);

    await updateOrderHeader({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: Sd_Status.CANCELLED,
    });
    setLoading(false);
  };
  return (
    <div>
      {loading && <MainLoder />}
      {!loading && (
        <>
          <div>
            {" "}
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="text-success">Order Summary</h3>
              <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
                {" "}
                {data.status}
              </span>
            </div>
            <div className="mt-3">
              <div className="border py-3 px-2">Name : {userInput.name}</div>
              <div className="border py-3 px-2">Email : {userInput.email}</div>
              <div className="border py-3 px-2">
                Phone : {userInput.phoneNumber}
              </div>
              <div className="border py-3 px-2">
                <h4 className="text-success">Menu Items</h4>
                <div className="p-3">
                  {data.cartItems?.map(
                    (cartItem: CartItemModel, index: number) => {
                      return (
                        <div className="d-flex" key={index}>
                          <div className="d-flex w-100 justify-content-between">
                            <p>{cartItem.menuItem?.name}</p>
                            <p>
                              ${cartItem.menuItem?.price} x {cartItem.quantity}{" "}
                              =
                            </p>
                          </div>
                          <p style={{ width: "70px", textAlign: "right" }}>
                            $
                            {(cartItem.menuItem?.price ?? 0) *
                              (cartItem.quantity ?? 0)}
                          </p>
                        </div>
                      );
                    }
                  )}

                  <hr />
                  <h4 className="text-danger" style={{ textAlign: "right" }}>
                    ${data.cartTotal?.toFixed(2)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back
            </button>
            {userData.role === SD_Roles.ADMIN && (
              <div>
                {data.status! !== Sd_Status.CANCELLED &&
                  data.status! !== Sd_Status.COMPLETED && (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}

                <button
                  className={`btn btn-${nextStatus.color}`}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
