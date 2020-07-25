import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserComponentsCss/BooksCategory.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavbarArea";
import Footer from "./Footer";

const Stream= props=>{
    return (
            <div className="col-lg-5 col-md-5 col-div-books-category">
                <p>{props.streamName}</p>
                    <Link to={"/books/"+props.streamName}>
                     <button className="btn btn-lg btn-primary">
                     Get Books
                     </button>
                    </Link>
        </div>
    )
}
export default class BooksCategory extends Component {
    constructor(props){
        super(props);
        this.BooksList= this.BooksList.bind(this);
        this.state ={
            books:[],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/user/").then(res => {
        if (res.data.length > 0) {
                this.setState({
                    books: res.data.map(val => val.username),
                })
            }
        })
     }
     BooksList(props){
         console.log(this.state.books);
        return this.state.books.map(currentExercise => {
            return <Stream key={currentExercise} streamName={currentExercise}/>
        })
     }
    
    render() {
        return (
            <div>
            <Navbar />
            <div className="row row-div-Books-category">
                {this.BooksList()}
            </div>
            <Footer />
            </div>
        )

    }
}