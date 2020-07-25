import React, { Component } from "react";
import axios from "axios";
import "./AdminComponentsCss/CreateExercise.css";
export default class CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.state = {
            username: "",
            description: "",
            files:[],
            data: new Date(0, 0, 0),
            users: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:5000/user/").then(res => {
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map(val => val.username),
                    username: res.data[0].username
                })
            }
        })
    }
    onChangeUsername(event) {
        const username = event.target.value;
        this.setState({
            username: username,
        })
    }
    onChangeDescription(event) {
        const description = event.target.value;
        this.setState({
            description: description,
        })
    }
    onChangeDate(event) {
        const date = event.target.value;
        this.setState({
            date: date,
        })
    }
    fileChangedHandler(event) {
        const files = event.target.files;
        console.log(files);
            this.setState({
                files:files
            });
    }
    onSubmitForm(event) {
        event.preventDefault();
        const username = this.state.username;
        const description = this.state.description;
        const date = this.state.date;
        const data = new FormData()
        for (var x = 0; x < 2; x++) {
            data.append('file', this.state.files[x]);
        }
        data.append('username', this.state.username);
        data.append('description', this.state.description);
        data.append('duration', this.state.duration);
        data.append('date', this.state.date);
        if (username && description  && date) {
                axios.post("http://localhost:5000/exercise/add", data).then(res => alert(res.data)).catch(err => alert(err));
        } else {
            alert("please! fill the form correctly.");
        }
    }
    render() {
        return (
            <div className="container-fluid div-form">
                <div className="row heading-div-createExercise">
                    <div>
                        <h1 className="headingBrand">
                            Notebook
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8" style={{ padding: "0" }}>
                        <form onSubmit={this.onSubmitForm} >
                            <h1>Upload Book</h1>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">choose stream</label>
                                <select id="inputState" name="username" onChange={this.onChangeUsername} className="form-control">
                                    {
                                        this.state.users.map(user => {
                                            return <option key={user} value={user}>{user}
                                            </option>
                                        })
                                    }
                                </select>
                                <label htmlFor="exampleFormControlInput1">Book description</label>
                                <textarea className="form-control" name="description" value={this.state.description} onChange={this.onChangeDescription} id="exampleFormControlTextarea1" rows="3"></textarea>
                                <label htmlFor="exampleFormControlInput1" >Pick Date Below</label>
                                <input type="date" className="form-control" name="date" onChange={this.onChangeDate} value={this.state.date} />
                                <label htmlFor="exampleFormControlInput1" >
                                <b style={{color:"red"}}>
                                    Note: please Pick the image first and then choose the book to Upload.
                                </b>
                                </label>
                                <input type="file" className="form-control" name="file" multiple onChange={this.fileChangedHandler} />
                                <button style={{ "marginTop": "10px" }} type="submit" className="btn btn-primary mb-2">submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}