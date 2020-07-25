import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminComponentsCss/AdminDashboard.css"
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Streams from "../AdminComponents/streams";
import FeedbackAdmin from "../AdminComponents/FeedbackAdmin";
import BooksAdmin from "../AdminComponents/BooksAdmin";
import CreateUser from "../AdminComponents/CreateUser";
import CreateExercise from "../AdminComponents/CreateExercise";
import { Beforeunload } from 'react-beforeunload';

var FontAwesome = require('react-fontawesome');

export default class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.ExerciseFunction = this.ExerciseFunction.bind(this);
        this.StreamsFunction = this.StreamsFunction.bind(this);
        this.SideMenubar = this.SideMenubar.bind(this);
        this.FeedbackDivFunction = this.FeedbackDivFunction.bind(this);
        this.CreateStreamsFunction = this.CreateStreamsFunction.bind(this);
        this.UploadBookFunction = this.UploadBookFunction.bind(this);
        const token = localStorage.getItem("token");
        let LoggedIn = true;
        if (token === null) {
            LoggedIn = false;
        }
        this.state = {
            exerciseDiv: false,
            StreamDiv: false,
            FeedbackDiv:false,
            UploadBooks:false,
            CreateStreamDiv:false,
            LoggedIn
        }
    }
    StreamsFunction() {
        this.setState({
            StreamDiv: true,
            exerciseDiv: false,
            FeedbackDiv:false,
            UploadBooks:false,
            CreateStreamDiv:false,
        })
    }
    CreateStreamsFunction(){
        this.setState({
            exerciseDiv: false,
            StreamDiv: false,
            FeedbackDiv:false,
            UploadBooks:false,
            CreateStreamDiv:true,
        });
    }
    UploadBookFunction(){
        this.setState({
            exerciseDiv: false,
            StreamDiv: false,
            FeedbackDiv:false,
            UploadBooks:true,
            CreateStreamDiv:false,
        });
    }
    ExerciseFunction() {
        this.setState({
            exerciseDiv: true,
            StreamDiv: false,
            FeedbackDiv:false,
            UploadBooks:false,
            CreateStreamDiv:false,
        });
    }
    FeedbackDivFunction() {
        this.setState({
            FeedbackDiv:true,
            exerciseDiv: false,
            StreamDiv: false,
            UploadBooks:false,
            CreateStreamDiv:false,
        });
    }
    SideMenubar(){
        return (
            <nav class="navbar navbar-expand-lg">
                <button class="navbar-toggler toggler-button" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <FontAwesome className="fa fa-bars" />
                </button>
            <div class="collapse navbar-collapse sidenav" id="navbarTogglerDemo03">
                        <ul className="ul-padding-none">
                            <Link className="LinksForOptions" data-toggle="collapse" data-target="#navbarTogglerDemo03"  onClick={this.ExerciseFunction}>
                                <li>streams</li>
                            </Link>
                            <Link className="LinksForOptions" data-toggle="collapse" data-target="#navbarTogglerDemo03"  onClick={this.StreamsFunction}>
                                <li>Books</li>
                            </Link>
                            <Link className="LinksForOptions" data-toggle="collapse" data-target="#navbarTogglerDemo03"  onClick={this.FeedbackDivFunction}>
                                <li>Feedback</li>
                            </Link>
                            <Link className="LinksForOptions" data-toggle="collapse" data-target="#navbarTogglerDemo03"  onClick={this.CreateStreamsFunction}>
                                <li>Create Stream</li>
                            </Link>
                            <Link className="LinksForOptions" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation" onClick={this.UploadBookFunction}>
                                <li>upload Books</li>
                            </Link>
                            <Link className="LinksForOptions" to="/Logout">
                                <li><button className="btn btn-dark btn-block ">Logout</button></li>
                            </Link>
                        </ul>
                    </div>
                    </nav>
        )
    }
    render() {
        if (this.state.LoggedIn === false) {
            return  <Redirect to="/" />
        }
        if(this.state.CreateStreamDiv){
            return <div>
                        {/* <Beforeunload onBeforeunload={()=>localStorage.removeItem("token")}> */}
                        {this.SideMenubar()}
                            <CreateUser />
                        {/* </Beforeunload> */}
                    </div>
        }
        
        if(this.state.UploadBooks){
            return <div>
                        {/* <Beforeunload onBeforeunload={()=>localStorage.removeItem("token")}> */}
                            {this.SideMenubar()}
                            <CreateExercise />
                        {/* </Beforeunload> */}
                    </div>
        }
        if (this.state.exerciseDiv) {
            return (
                <div>
                  {/* <Beforeunload onBeforeunload={()=>localStorage.removeItem("token")}> */}
                    {this.SideMenubar()}
                    <Streams />
                {/* </Beforeunload> */}
                </div>
            )
        }
        if (this.state.StreamDiv) {
            return (
                <div>
                {/* <Beforeunload onBeforeunload={()=>localStorage.removeItem("token")}> */}
                    {this.SideMenubar()}
                    <BooksAdmin />
                {/* </Beforeunload> */}
                </div>
            );
        }
        if (this.state.FeedbackDiv) {
            return (
                <div>
                {/* <Beforeunload onBeforeunload={()=>localStorage.removeItem("token")}> */}
                    {this.SideMenubar()}
                    <FeedbackAdmin />
                {/* </Beforeunload> */}
                </div>
            );
        }
        return (
            // <Beforeunload onBeforeunload={()=>localStorage.removeItem("token")}>
            <div>
            {this.SideMenubar()}
            <div className="container-fluid">
                <div className="row heading-div">
                    <div>
                        <h2 className="headingBrand">
                            Notebook
                    </h2>
                    </div>
                </div>
                <div className="row heading-div-welcome">
                        <h1>
                            Wellcome Admin
                    </h1>
                </div>
            </div>
            </div>
            // </Beforeunload>
        )
    }
}
