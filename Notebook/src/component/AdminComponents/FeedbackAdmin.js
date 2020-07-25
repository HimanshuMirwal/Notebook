import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./AdminComponentsCss/AdminDashboard.css"
import { Link } from "react-router-dom";

const CommentElementCreator = props => (
    <tr className="col">
        <td className="tbody-light">{props.username}</td>
        <td className="tbody-light">{props.userDescription}</td>
        <td className="tbody-light">
            <Link onClick={() => props.deletestream(props.id)}>
                <button style={{ margin: "5px" }} type="button" className="btn btn-primary btn-md">
                    <i class="fa fa-trash" style={{ fontSize: "2rem" }}  aria-hidden="true"></i>
                </button>
            </Link>
        </td>
    </tr>
);
export default class FeedbackAdmin extends Component {
    constructor(props) {
        super(props);
        this.deleteExcercise = this.deleteComment.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.Refresh = this.Refresh.bind(this);
        this.state = {
            comments: [],
        }
    }
    componentDidMount() {
        axios.get("http://localhost:5000/Feedback/").then(res => {
            console.log(res);
            this.setState({
                comments: res.data,
            });
        }).catch(err => console.log(err));
    }

    deleteComment(id) {
        axios.delete("http://localhost:5000/Feedback/delete/" + id).then(res => console.log(res.data));
        this.setState({
            comments: this.state.comments.filter(el => el._id !== id)
        });
    }
    Streams() {
        return this.state.comments.map(currentComment => {
            return <CommentElementCreator username={currentComment.UserEmail} userDescription={currentComment.UserDescription} key={currentComment._id} id={currentComment._id} deletestream={this.deleteComment} />
        });
    }
    Refresh() {
        window.location.reload("http://localhost:3000/AdminDashboard");
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row heading-div">
                    <div>
                        <h1 className="headingBrand">
                            Notebook
                    </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive-xl col-10" id="list">
                        <table style={{ textAlign: "center" }} className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>User Email</th>
                                    <th>User Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.Streams()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}