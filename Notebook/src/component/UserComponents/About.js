import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserComponentsCss/about.css";
import { Link } from "react-router-dom";


function Feedback() {
    return (
        <div>
            <div class="container-fluid">
                <div class="row row-background-color">
                    <div className="col-12 About-heading">
                        About us
                </div>
                <div className="col-12 about-description-padding">
                        <p>
                        <q>
                            Our orgnization provides E-Books to any one who is intrested 
                            in learning and getting knowledge by reading books.the books given
                            by us are free of cost and user can download it from our website. 
                        </q>
                        </p>
                        <button className="btn btn-dark btn-md button-margin" >
                                <Link className="nav-link" style={{color:"white"}} to="/BooksCategory">
                                Get Books
                                <span className="sr-only">(current)</span></Link>
                        </button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Feedback;
