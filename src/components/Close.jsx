import React from "react";
import { Link } from "react-router-dom";

const Close = () => {
  return (
    <Link
      to="/"
      style={{
        position: "fixed",
        top: "5%",
        right: "3%",
        zIndex: 10,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="#F2F2E5">
        <path d="M21 2.115 18.885 0 10.5 8.385 2.115 0 0 2.115 8.385 10.5 0 18.885 2.115 21l8.385-8.385L18.885 21 21 18.885 12.615 10.5Z" />
      </svg>
    </Link>
  );
};

export default Close;
