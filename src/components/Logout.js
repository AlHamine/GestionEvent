import React, { useState } from "react";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../constants";
import Login from "./Login";

function Logout() {
  const [isAuthenticated, setAuth] = useState(false);

  const logout = ({ autho }) => {
    fetch(SERVER_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(user),
    })
      .then((res) => {
        const jwtToken = res.headers.get("Authorization");
        if (jwtToken != null) {
          //   sessionStorage.setItem("jwt", jwtToken);
          sessionStorage.removeItem("jwt");
          setAuth(false);
          <Login />;
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>
  );
}

export default Logout;
