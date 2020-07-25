import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./AdminComponentsCss/AdminLogin.css";
import {Redirect} from "react-router-dom";
export default class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIN: false,
      email: "",
      pass: ""
    }
    this.onChangePassword = this.onChangePassword.bind(this);
    this.HandleFormSubmission = this.HandleFormSubmission.bind(this);
    this.AdminDashBoard = this.AdminDashBoard.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }
  onChangePassword(event) {
    console.log(event.target.value);
    const passWord = event.target.value;
    this.setState({ pass: passWord });
  }
  onChangeEmail(event) {
    console.log(event.target.value);
    const Email = event.target.value;
    this.setState({ email: Email });
  }
  HandleFormSubmission(event) {
    event.preventDefault();
    console.log("button is clicked.");
    const fullData ={
      password : this.state.pass,
      Email : this.state.email 
    }
    axios
      .post("http://localhost:5000/password", fullData)
      .then(res => this.AdminDashBoard(res))
      .catch(err => console.log(err));
  }
  AdminDashBoard(res) {
    console.log(res.data.authentication);
    if (res.data.authentication === true) {
      localStorage.setItem("token", "loged in!");
      this.setState({
        loggedIN: true
      })
    }else{
      alert("password is incorrect.");
      this.setState({
        email: "",
        pass: ""
      })
    }
  }
  render() {
    if(this.state.loggedIN === true){
      return <Redirect to="/AdminDashboard" />
    }
    return (
      <div className="container-fluid-div-admin-login">
        <div className="row row-margin row-height">
          <div className="lg-col-3 color-admin-welcome">
            <h1 className="welcome-heading">
            <img src="https://img.icons8.com/ios-filled/100/000000/microsoft-admin.png"/>            <br/>
              Admin Login!
            </h1>
            <div className="form-div">
            <form onSubmit={this.HandleFormSubmission}>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" value={this.state.email} onChange={this.onChangeEmail} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div class="form-group">
                <p>thisismytopsecretpassword</p>
                <label for="exampleInputPassword1">Password</label>
                <input type="password" onChange={this.onChangePassword} value={this.state.pass} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                <small id="emailHelp" class="form-text text-danger"><b>Only Authorize person can access this account by using email and password provided by developer.</b></small>
              </div>
              <button type="submit" class="btn btn-dark">Submit</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
