import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartItemModel, userModel } from "../../interface";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import {
  setLoggedUser,
  emptyUserState,
} from "../../Storage/Redux/userAuthSlice";
import { SD_Roles } from "../../utility/SD";

let logo = require("../../Assets/images/mango.png");

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartStore: CartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedUser({ ...emptyUserState }));
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="nav-link" to={"/"} aria-current="page">
          <img src={logo} style={{ height: "40px" }} className="m-1" alt="" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/"} aria-current="page">
                Home
              </NavLink>
            </li>
            {userData.role === SD_Roles.ADMIN ? (
              <>
                {" "}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin Panel
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("/menuitem/menuitemList")}
                    >
                      Menu Item
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => navigate("/order/myOrders")}
                      >
                        My Order
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => navigate("/order/allOrders")}
                      >
                        All Order
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <NavLink
                className="nav-link"
                to={"/order/myOrders"}
                aria-current="page"
              >
                My Orders
              </NavLink>
            )}

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={"/shoppingCart"}
                aria-current="page"
              >
                <i className="bi bi-cart"></i>
                {userData.id && `${shoppingCartStore.length}`}
              </NavLink>
            </li>
            <div className="d-flex" style={{ marginLeft: "auto" }}>
              {userData.id && (
                <>
                  {" "}
                  <li className="nav-item ">
                    <button
                      className="nav-link active"
                      style={{
                        cursor: "pointer",
                        background: "transparent",
                        border: 0,
                      }}
                    >
                      Welcome, {userData.fullName}
                    </button>
                  </li>
                  <li className="nav-item ">
                    <button
                      className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                      style={{
                        border: "none",
                        height: "40px",
                        width: "100px",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!userData.id && (
                <>
                  {" "}
                  <li className="nav-item text-white">
                    <NavLink className="nav-link" to={"/register"}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item text-white">
                    <NavLink
                      className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                      to={"/login"}
                      style={{
                        border: "none",
                        height: "40px",
                        width: "100px",
                      }}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
