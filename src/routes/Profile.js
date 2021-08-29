import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();
    const onLogOut = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyTweet = async () => {
        const tweets = await dbService
            .collection("tweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
        console.log(tweets.docs.map((doc) => doc.data()));
    };
    useEffect(() => {
        getMyTweet();
    }, []);
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewDisplayName(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
            refreshUser();
        }
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={newDisplayName}
                    type="text"
                    placeholder="Display Name"
                />
                <input type="submit" value="update Profile"></input>
            </form>
            <button
                onClick={onLogOut}
                className="p-1 bg-blue-700 text-white rounded w-full"
            >
                Log Out
            </button>
        </>
    );
};

export default Profile;
