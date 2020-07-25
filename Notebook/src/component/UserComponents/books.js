import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserComponentsCss/books.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavbarArea";
import Footer from "./Footer";


const BookForDownload = props => {
    return (
        <div class="col-lg-5 card-col-download  card-width">
            <img class="card-img-top" src={"http://localhost:5000/exercise/image/:" + (props.file).substring(15)} alt="Card image cap" />
            <div class="card-body">
                <h5 class="card-title">{props.name}</h5>
                <p class="card-text">{props.description}.</p>
            </div>
            <div class="card-body">
                <a target="_blank" href={"http://localhost:5000/exercise/pdf/:" + (props.pdfFile).substring(15)} class="card-link">
                    <button className="btn btn-primary">Download</button>
                </a>
            </div>
        </div>
    )
}

export default class books extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.BooksCardComponentMaker = this.BooksCardComponentMaker.bind(this);
        this.state = {
            data: [],
            bookType: "",
        }
    }
    componentDidMount() {
        axios.get("http://localhost:5000/exercise/").then(res => {
            console.log(this.props.match.params.name);
            this.setState({
                data: res.data.users,
                bookType: this.props.match.params.name
            })
        });
    }
    BooksCardComponentMaker() {
        console.log(this.state.data);
        return this.state.data.map(currentExercise => {
            if (currentExercise.username === this.state.bookType) {
                return (<BookForDownload 
                        file={currentExercise.path} 
                        pdfFile={currentExercise.pathPdf} 
                        key={currentExercise._id} 
                        id={currentExercise._id} 
                        exercise={currentExercise} 
                        name={currentExercise.username} 
                        description={currentExercise.description} />
                    );
            }
        })
    }
    render() {
        return (
            <div>
            <Navbar />
            <div className="row-div-Books-Download">
            <div className="row row-div-Books-Download">
                {this.BooksCardComponentMaker()}
            </div>
            </div>
            <Footer />
            </div>
        )

    }
}