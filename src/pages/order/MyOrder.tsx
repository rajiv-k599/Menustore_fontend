import React from "react";
import { withAuth } from "../../HOC";
import { RootState } from "../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "../../Api/orderApi";
import OrderList from "../../Components/page/Order/OrderList";
import { MainLoder } from "../../Components/page/common";

function MyOrder() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery(userId);
  console.log(data);
  return (
    <div>
      {" "}
      {isLoading && <MainLoder />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result} />
      )}
    </div>
  );
}

export default withAuth(MyOrder);
