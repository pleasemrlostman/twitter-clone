import React, { useState } from "react";
import Router from "./Router";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div className="App">
            <Router isLoggedIn={isLoggedIn}></Router>
            <footer>&copy; Twitter {new Date().getFullYear()}</footer>
        </div>
    );
}

export default App;
