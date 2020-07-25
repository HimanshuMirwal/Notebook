import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./AdminComponentsCss/AdminDashboard.css"
import { Link } from "react-router-dom";

const Exercise = props => (
    <tr className="col">
        <td>
            <img height="100px" width="100px" src={"http://localhost:5000/exercise/image/:" + (props.file).substring(15)} alt={(props.file).substring(15)} />
            <a href={"http://localhost:5000/exercise/pdf/:" + (props.pdfFile).substring(15)} rel="noopener noreferrer" target="_blank" >Link</a>
        </td>
        <td className="tbody-light">{props.exercise.username}</td>
        <td className="tbody-light">{props.exercise.description}</td>
        <td className="tbody-light">{(props.exercise.date).substring(0, 10)}</td>
        {/* <td className="tbody-light">{props.exercise.path} */}
        {/* </td> */}
        <td className="tbody-light">
            <Link to={"/EditExercise/" + props.exercise._id}>
                <button style={{ margin: "5px" }} type="button" className="btn btn-primary btn-md">
                    {/* edit button */}
                    <i class="fa fa-pencil-square-o" style={{ fontSize: "2rem" }} aria-hidden="true"></i>
                </button>
            </Link>
        </td>
        <td>
            <button type="button" onClick={() => props.deleteExercise(props.id)} className="btn btn-primary btn-md">
                <i class="fa fa-trash" style={{ fontSize: "2rem" }}  aria-hidden="true"></i>
            </button>
        </td>
    </tr>
);
export default class BooksAdmin extends Component {
    constructor(props) {
        super(props);
        this.deleteExcercise = this.deleteExcercise.bind(this);
        // this.Hello = this.Hello.bind(this);
        // this.hello = this.hello.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.Refresh= this.Refresh.bind(this);
        const token = localStorage.getItem("token");
        let LoggedIn = true;
        if(token === null){
            LoggedIn = false;
        }
        this.state = {
            exercises: [],
            exerciseDiv: false,
            StreamDiv: false,
            streams: [],
            LoggedIn
        }
    }
    componentDidMount() {
        axios.get("http://localhost:5000/exercise/").then(res => {
            console.log(res);
            this.setState({
                exercises: res.data.users,
            });
            // console.log(res.data);
            // console.log(this.state);
        }).catch(err => console.log(err));

    }

    deleteExcercise(id) {
        axios.delete("http://localhost:5000/exercise/" + id).then(res => console.log(res.data));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
        console.log(this.state);
    }
    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise file={currentExercise.path} pdfFile={currentExercise.pathPdf} key={currentExercise._id} id={currentExercise._id} exercise={currentExercise} deleteExercise={this.deleteExcercise} />
        })
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
                                    <th>Profile</th>
                                    <th>Username</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>File</th>
                                    <th colSpan="2" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.exerciseList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}