import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMenuItemByIdQuery } from "../Api/menuItemApi";
import { setMenuItem } from "../Storage/Redux/menuItemSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUpdateShoppingCartMutation } from "../Api/shoppingCartApi";
import { MainLoder, MiniLoader } from "../Components/page/common";
import { apiResponse, userModel } from "../interface";
import toastNotify from "../helper/taostNotify";
import { RootState } from "../Storage/Redux/store";
// userId - c9bcd880-48d5-4ad8-b65d-85d5b28ad464

function MenuItemDetails() {
  const { menuItemId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;
    if (newQuantity === 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    return;
  };

  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingCart(true);
    const response: apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });
    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to Cart successfully!");
    }
    console.log(response);
    setIsAddingCart(false);
  };

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        {!isLoading ? (
          <>
            <div className="col-7">
              <h2 className="text-success">{data.result?.name}</h2>
              <span>
                <span
                  className="badge text-bg-dark pt-2"
                  style={{ height: "40px", fontSize: "20px" }}
                >
                  {data.result?.catagories}
                </span>
              </span>
              <span>
                <span
                  className="badge text-bg-light pt-2"
                  style={{ height: "40px", fontSize: "20px" }}
                >
                  {data.result?.specialTag}
                </span>
              </span>
              <p style={{ fontSize: "20px" }} className="pt-2">
                {data.result?.description}
              </p>
              <span className="h3">${data.result?.price}</span>{" "}
              &nbsp;&nbsp;&nbsp;
              <span
                className="pb-2  p-3"
                style={{ border: "1px solid #333", borderRadius: "30px" }}
              >
                <i
                  className="bi bi-dash p-1"
                  onClick={() => handleQuantity(-1)}
                  style={{ fontSize: "25px", cursor: "pointer" }}
                ></i>
                <span className="h3 mt-3 px-3">{quantity}</span>
                <i
                  className="bi bi-plus p-1"
                  onClick={() => handleQuantity(+1)}
                  style={{ fontSize: "25px", cursor: "pointer" }}
                ></i>
              </span>
              <div className="row pt-4">
                <div className="col-5">
                  {isAddingCart ? (
                    <>
                      <button disabled className="btn btn-success form-control">
                        <MiniLoader />
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-success form-control"
                      onClick={() => handleAddToCart(data.result.id)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>

                <div className="col-5 ">
                  <Link to={"/"} className="btn btn-secondary form-control">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-5">
              <img
                src={data.result?.image}
                width="100%"
                style={{ borderRadius: "50%" }}
                alt="No content"
              ></img>
            </div>
          </>
        ) : (
          <MainLoder />
        )}
      </div>
    </div>
  );
}

export default MenuItemDetails;
