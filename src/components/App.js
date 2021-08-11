import React, { useState } from "react";
import Router from "components/Router";
import { authService } from "fbase";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
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
