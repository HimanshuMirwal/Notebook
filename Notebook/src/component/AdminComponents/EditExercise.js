import React, { Component } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import { Beforeunload } from 'react-beforeunload';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount= this.componentDidMount.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        const token = localStorage.getItem("token");
        let LoggedIn = true;
        if (token === null) {
            LoggedIn = false;
        }
        this.state = {
            username: "",
            description: "",
            date: "",
            users: [],
            LoggedIn
        }
    }
    componentDidMount() {
        axios.get("http://localhost:5000/exercise/"+this.props.match.params.id).then(res => {
            console.log(res.data.date);
            const date = res.data.date;

                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: date.substring(0, 10),
                });
        });
        // axios.get("http://localhost:5000/user/"+this.props.match.params.id).then(res => {
        //         console.log(res)
        //         // this.setState({
        //         //     users:res.data.map(val => val.username),
        //         // })
            
        // });
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
    onChangeDuration(event) {
        const duration = event.target.value;
        this.setState({
            duration: duration,
        })
    }
    onChangeDate(event) {
        const date = event.target.value;
        this.setState({
            date: date,
        })
    }
    onSubmitForm(event) {
        event.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }
        console.log(exercise);
        axios.post("http://localhost:5000/exercise/update/"+this.props.match.params.id, exercise).then(res => console.log(res.data));
        window.location = "/";
    }
    render() {
        
        if (this.state.LoggedIn === false) {
            return  <Redirect to="/" />
        }
        return (
            <Beforeunload onBeforeunload={()=>localStorage.removeItem("token")}>

            <div className="container-fluid" style={{padding:"2% 5% 2% 5%"}}>
            <h3>Edit Detail</h3>
            <form onSubmit={this.onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Stream Name</label>
                    <select id="inputState" onChange={this.onChangeUsername} className="form-control">
                        {/* {
                            this.state.users.map(user => {
                                return <option key={user} value={user}>{user}

                                </option>
                            })
                        } */}
                        <option key={this.state.username} value={this.state.username}>
                            {this.state.username}
                        </option>
                    </select>
                    <label htmlFor="exampleFormControlInput1">description</label>
                    <textarea className="form-control" value={this.state.description} onChange={this.onChangeDescription} id="exampleFormControlTextarea1" rows="3"></textarea>
                    {/* <label htmlFor="exampleFormControlInput1" >duration</label>
                    <input type="text" className="form-control" value={this.state.duration} onChange={this.onChangeDuration} id="exampleFormControlInput1" /> */}
                    <label htmlFor="exampleFormControlInput1" >Pick Date Below</label>
                    <input type="date" className="form-control"value={this.state.date} onChange={this.onChangeDate}  />
                    <button style={{ "marginTop": "10px" }} type="submit" className="btn btn-primary mb-2">Edit Exercise Log</button>
                </div>
            </form>
            </div>
            </Beforeunload>
        )
    }
}