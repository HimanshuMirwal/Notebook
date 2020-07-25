import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Redirect} from "react-router-dom";
export default class AdminLogin extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("token");
  }
  render() {
    return (
      <Redirect to="/" />
    )
  }
}
