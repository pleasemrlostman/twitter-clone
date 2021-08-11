import React, { useState } from "react";
import Router from "./Router";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div className="App">
            <Router isLoggedIn={isLoggedIn}></Router>
            <footer className="bg-gray-300 p-5">
                &copy; Twitter {new Date().getFullYear()}
            </footer>
        </div>
    );
}

export default App;
