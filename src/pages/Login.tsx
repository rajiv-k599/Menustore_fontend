import React, { useState } from "react";
import inputHelper from "../helper/inputHelper";
import { useLoginUserMutation } from "../Api/authApi";
import { apiResponse, userModel } from "../interface";
import jwt_Decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../Storage/Redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { MainLoder } from "../Components/page/common";
import toastNotify from "../helper/taostNotify";
function Login() {
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });
    if (response.data) {
      console.log(response.data);
      const { token } = response.data.result;
      const { fullName, id, email, role }: userModel = jwt_Decode(token);
      localStorage.setItem("token", token);
      dispatch(setLoggedUser({ fullName, id, email, role }));
      navigate("/");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
      setError(response.error.data.errorMessages[0]);
    }
    setLoading(false);
  };
  return (
    <div>
      {" "}
      <div className="container text-center">
        {loading && <MainLoder />}
        <form method="post" onSubmit={handleSubmit}>
          <h1 className="mt-5">Login</h1>
          <div className="mt-5">
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                required
                name="userName"
                value={userInput.userName}
                onChange={handleUserInput}
              />
            </div>

            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                required
                name="password"
                value={userInput.password}
                onChange={handleUserInput}
              />
            </div>
          </div>

          <div className="mt-2">
            {error && <p className="text-danger">{error}</p>}
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "200px" }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
