import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserComponentsCss/feedback.css";
import Axios from 'axios';

export default class Feedback extends Component {
    constructor(props){
        super(props);
        this.state={
            UserEmail:"",
            UserDescription:""
        }
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    onDescriptionChange(event){
        const Description = event.target.value;
        this.setState({
            UserDescription:Description
        })
    }
    onEmailChange(event){
        const Email = event.target.value;
        this.setState({
            UserEmail:Email
        })
    }
    onFormSubmit(event){
        event.preventDefault();
        const Comment = {
            userEmail:this.state.UserEmail,
            userDescription:this.state.UserDescription
        };
        console.log(Comment);
        this.setState({
            userDescription:"",
            userEmail:""
        });
        const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        (Comment.userEmail.match(emailCheck))?
        Axios.post("http://localhost:5000/Feedback/add",Comment).then(res => console.log(res.data)).catch(err => console.log(err)):
        alert("Please enter the correct Email.");

    }
    render(){
    return (
        <div>
            <div class="container-fluid">
                <div class="row row-background">
                    <div className="col-12 feedback-heading">
                        Feedback
                </div>
                    <div className="col-12 form-div">
                        <form onSubmit={this.onFormSubmit}>
                            <div class="form-group form-group-content">
                                <label for="exampleFormControlInput1">Email address</label>
                                <input type="text" onChange={this.onEmailChange} value={this.state.UserEmail} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <div class="form-group form-group-content">
                                <label for="exampleFormControlTextarea1">Example textarea</label>
                                <textarea class="form-control" onChange={this.onDescriptionChange} value={this.state.UserDescription} id="exampleFormControlTextarea1" rows="5"></textarea>
                            </div>
                            <div className="form-group-content">
                            <button type="submit" class="btn btn-dark mb-2">Send Feedback</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
}
