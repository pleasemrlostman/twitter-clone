import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const Router = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <HashRouter>
            {isLoggedIn && <Navigation userObj={userObj} />}
            {isLoggedIn ? (
                <>
                    <Route exact path="/">
                        <Home userObj={userObj}></Home>
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser} />
                    </Route>
                </>
            ) : (
                <>
                    <Route path="/">
                        <Auth></Auth>
                    </Route>
                </>
            )}
        </HashRouter>
    );
};

export default Router;
