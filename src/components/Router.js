import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const Router = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <HashRouter>
            {isLoggedIn ? (
                <>
                    <Route path="/">
                        <Home></Home>
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
