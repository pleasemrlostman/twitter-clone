import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccout, setNewAccout] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        try {
            let data;
            if (newAccout === true) {
                // create accou
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                // login accout
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () =>
        setNewAccout((prev) => {
            return !prev;
        });

    const onSocialClick = async (e) => {
        const {
            target: { name },
        } = e;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        name="email"
                        className="border p-2 rounded border-gray-300 shadow-xl"
                        type="email"
                        placeholder="Email"
                        onChange={onChange}
                        value={email}
                        required
                    ></input>
                    <input
                        name="password"
                        className="border p-2 rounded border-gray-300 shadow-xl"
                        type="password"
                        placeholder="Password"
                        onChange={onChange}
                        value={password}
                        required
                    ></input>
                    <input
                        className="border p-2 rounded cursor-pointer bg-blue-900 text-white w-min shadow-xl"
                        type="submit"
                        value={newAccout ? "Create Accout" : "Login"}
                    ></input>
                </form>
                {error}
                <span onClick={toggleAccount}>
                    {newAccout ? "Sign in" : "Create Accout"}
                </span>
                <div>
                    <button
                        onClick={onSocialClick}
                        name="google"
                        className="p-2 border border-indigo-600 shadow-xl "
                    >
                        Continue with Google
                    </button>
                    <button
                        onClick={onSocialClick}
                        name="github"
                        className="p-2 border border-indigo-600 shadow-xl "
                    >
                        Continue with Github
                    </button>
                </div>
            </div>
        </>
    );
};

export default Auth;
