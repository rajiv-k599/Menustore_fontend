import React from "react";
import { withAdminAuth } from "../HOC";

function AuthenticationTestAdmin() {
  return <div>AuthenticationTestAdmin</div>;
}

export default withAdminAuth(AuthenticationTestAdmin);
