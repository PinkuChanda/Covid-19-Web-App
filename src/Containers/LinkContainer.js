import React from "react";
import NavBar from "../Components/Navbar/NavBar";
import Protected from "../Components/Protected/Protected";

const LinkContainer = () => {
  return (
    <div>
      <NavBar />
      <Protected />
    </div>
  );
};

export default LinkContainer;
