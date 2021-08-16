import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const history = useHistory();
    const onLogOut = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
            <>
                <button
                    onClick={onLogOut}
                    className="p-1 bg-blue-700 text-white rounded w-full"
                >
                    Log Out
                </button>
            </>
        </>
    );
};

export default Profile;
