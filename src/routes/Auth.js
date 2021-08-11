import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
    };

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        name="email"
                        className="border p-2 rounded border-gray-300"
                        type="email"
                        placeholder="Email"
                        onChange={onChange}
                        value={email}
                        required
                    ></input>
                    <input
                        name="password"
                        className="border p-2 rounded border-gray-300"
                        type="password"
                        placeholder="Password"
                        onChange={onChange}
                        value={password}
                        required
                    ></input>
                    <input
                        className="border p-2 rounded cursor-pointer bg-blue-900 text-white w-min"
                        type="submit"
                        value="login"
                    ></input>
                </form>
                <div>
                    <button className="p-2 border border-indigo-600">
                        Continue with Google
                    </button>
                    <button className="p-2 border border-indigo-600">
                        Continue with Github
                    </button>
                </div>
            </div>
        </>
    );
};

export default Auth;
