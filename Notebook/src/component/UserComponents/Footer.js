import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StickyFooter from 'react-sticky-footer';


export default class Footer extends Component {
    render() {
        return (
            <div className="row"
                style={{
                    backgroundColor: "#efb960",
                    padding: "2rem",
                    textAlign: "center",
                }}
            >
            <div className="col-12">
                <span style={{ color: "white",textAlign:"center"}}>
                    © 2020 Copyright Notebook.com
                </span>
                </div>
            </div>

        )

    }
}