import React from "react";

function MessageBox(props) {
  const { variant, children } = props;
  return <div className={`alert alert-${variant || "info"}`}>{children}</div>;
}

export default MessageBox;
