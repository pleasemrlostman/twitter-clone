import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    email: user.email,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
            updateProfile: (args) => user.updateProfile(args),
        });
    };

    return (
        <div className="App">
            {init ? (
                <Router
                    isLoggedIn={isLoggedIn}
                    userObj={userObj}
                    refreshUser={refreshUser}
                ></Router>
            ) : (
                "initializing"
            )}
            <footer className="bg-gray-300 p-5">
                &copy; Twitter {new Date().getFullYear()}
            </footer>
        </div>
    );
}

export default App;
