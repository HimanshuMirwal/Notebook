import React, { Component } from "react";
import axios from "axios";
import "./AdminComponentsCss/CreateUser.css"

export default class CreateUSer extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.state = {
            username: ""
        }
    }
    onChangeUsername(event) {
        const user = event.target.value;
        this.setState({
            username: user
        });
    }
    onSubmitForm(event) {
        event.preventDefault();
        const userBackup = {
            username: this.state.username
        }
        console.log(userBackup);
        this.setState({
            username: ""
        });
        axios.post("http://localhost:5000/user/add", userBackup).then(res => alert(res.data));
    }
    render() {
        return (
            <div className="container-fluid div-form">
                <div className="row heading-div-createuser">
                    <div>
                        <h1 className="headingBrand">
                            Notebook
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6" style={{padding:"0"}}>
                        <h1>create stream</h1>
                        <form onSubmit={this.onSubmitForm} >
                            <div className="form-group">
                                <label htmlsfor="exampleFormControlInput1">stream name</label>
                                <input type="text" className="form-control" name="username" onChange={this.onChangeUsername} value={this.state.username} />
                            </div>
                            <div className="form-group">
                                <button style={{ "marginTop": "10px" }} type="submit" className="btn btn-primary mb-2">submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}