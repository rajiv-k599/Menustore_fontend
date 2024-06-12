import React from "react";
import { MainLoder } from "../common";
import OrderListProps from "./OrderListType";
import { OrderHeaderModel } from "../../../interface";
import { useNavigate } from "react-router-dom";
import getStatusColor from "../../../helper/getStatusColor";

function OrderList({ isLoading, orderData }: OrderListProps) {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <>
        {isLoading && <MainLoder />}
        {!isLoading && (
          <div>
            {" "}
            <div className="table p-5">
              <h1 className="text-success">Orders List</h1>
              <div className="p-2">
                <div className="row border">
                  <div className="col-1">ID</div>
                  <div className="col-2">Name</div>
                  <div className="col-2">Phone</div>
                  <div className="col-1">Total</div>
                  <div className="col-1">Items</div>
                  <div className="col-2">Date</div>
                  <div className="col-2">Status</div>
                  <div className="col-1"></div>
                </div>
                {orderData.map((item: OrderHeaderModel) => {
                  const badgeTypeColor = getStatusColor(item.status!);
                  return (
                    <div className="row border" key={item.orderHeaderId}>
                      <div className="col-1">{item.orderHeaderId}</div>
                      <div className="col-2">{item.pickupName}</div>
                      <div className="col-2">{item.pickupPhone}</div>
                      <div className="col-1">
                        $ {item.orderTotal!.toFixed(2)}
                      </div>
                      <div className="col-1"># {item.totalItems}</div>
                      <div className="col-2">
                        {new Date(item.orderDate!).toLocaleDateString()}
                      </div>
                      <div className="col-2">
                        {" "}
                        <span className={`badge bg-${badgeTypeColor}`}>
                          {" "}
                          {item.status}
                        </span>
                      </div>
                      <div className="col-1">
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            navigate(
                              "/order/OrderDetails/" + item.orderHeaderId
                            )
                          }
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default OrderList;
