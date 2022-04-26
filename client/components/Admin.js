import React from "react";
import { connect } from "react-redux";
// import AllProducts from "./AllProducts";

export class Admin extends React.Component {
  render() {
    return (
      <div className="admin-page">
        <h1> Hello </h1>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {};
};

export default connect(mapState, null)(Admin);
