import React from "react";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "80vh",
    flexDirection: "column"
  }
};

const Page404 = () => (
  <div style={styles.root}>
    <h1>Page not found 404</h1>
  </div>
);

export default Page404;
