import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import firebase from "./firebase";

console.log(firebase);
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
