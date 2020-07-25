import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UserComponentsCss/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/favicon.png";
var FontAwesome = require('react-fontawesome');

export default class NavbarArea extends Component {
    constructor(props){
        super();
        console.log(process.env.PUBLIC_URL);
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg  navbar-padding navbar-background ">
                    <a className="navbar-brand" href="/">
                    <img src={logo} className="logo-image" />Notebook 
                    </a>
                    <button className="navbar-toggler nav-button-styles" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesome className="fa fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto navbar-ul">
                            <li className="nav-item active">
                                <Link className="nav-link navbar-link" to="/">
                                <button className="btn btn-outline-dark btn-block">
                                Home
                                <span className="sr-only">(current)</span>
                                </button>
                                </Link>
                            </li>
                            {/* <li className="nav-item active navbar-ul-li">
                                <Link className="nav-link navbar-link" to="/CreateUser">Create USer <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active navbar-ul-li">
                                <Link className="nav-link navbar-link" to="/CreateExercise">Create Exercise <span className="sr-only">(current)</span></Link>
                            </li> 
                            */}
                            <li className="nav-item active navbar-ul-li">
                            <Link className="nav-link" to="/BooksCategory"> 
                                <button className="btn btn-dark btn-block">
                                Get Books
                                <span className="sr-only">(current)</span>
                                </button>
                            </Link> 
                            </li>
                            <li className="nav-item active navbar-ul-li">
                            <Link className="nav-link" to="/Adminlogin"> 
                                <button className="btn btn-dark btn-block">
                                Admin
                                <span className="sr-only">(current)</span>
                                </button>
                            </Link> 
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}