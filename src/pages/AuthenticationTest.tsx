import React from "react";
import { withAuth } from "../HOC";

function AuthenticationTest() {
  return <div>AuthenticationTest</div>;
}

export default withAuth(AuthenticationTest);
