import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./AdminComponentsCss/AdminDashboard.css"
import { Link } from "react-router-dom";

const StreamElementCreator = props => (
    <tr className="col">
        <td className="tbody-light">{props.username}</td>
        <td className="tbody-light">
            <Link onClick={() => props.deletestream(props.id)}>
                <button style={{ margin: "5px" }} type="button" className="btn btn-primary btn-md">
                <i class="fa fa-trash" style={{ fontSize: "2rem" }}  aria-hidden="true"></i>
                </button>
            </Link>
        </td>

    </tr>
);
export default class Streams extends Component {
    constructor(props) {
        super(props);
        this.deleteExcercise = this.deleteExcercise.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.Refresh= this.Refresh.bind(this);
        const token = localStorage.getItem("token");
        let LoggedIn = true;
        if(token === null){
            LoggedIn = false;
        }
        this.state = {
            streams: [],
        }
    }
    componentDidMount() {
        axios.get("http://localhost:5000/user/").then(res => {
            console.log(res);
            this.setState({
                streams: res.data,
            });
        }).catch(err => console.log(err));
    }

    deleteExcercise(id) {
        axios.delete("http://localhost:5000/user/delete/" + id).then(res => console.log(res.data));
        this.setState({
            streams: this.state.streams.filter(el => el._id !== id)
        });
        console.log(this.state);
    }
    Streams() {
        console.log(this.state.streams);
        return this.state.streams.map(currentExercise => {
            return <StreamElementCreator username={currentExercise.username} key={currentExercise._id} id={currentExercise._id} deletestream={this.deleteExcercise} />
        });
    }
    Refresh(){
        window.location.reload("http://localhost:3000/AdminDashboard");
    }
    render(){
        return(
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
                                        <th>Streams</th>
                                        <th colSpan="2" >Action</th>
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