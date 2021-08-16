import { dbService } from "fbase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTwet] = useState(tweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm(
            "Are you sure you want to delete this tweet?"
        );
        if (ok) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            alert("completed delete");
        } else {
        }
    };

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewTwet(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet,
        });
        setEditing(false);
    };

    return (
        <>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            className="border-gray-300 border w-10/12 p-1.5"
                            placeholder="Edit your tweet"
                            onChange={onChange}
                            value={newTweet}
                            required
                        ></input>
                        <input type="submit" value="Update"></input>
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <div className="flex flex-row justify-between">
                    <h4>{tweetObj.text}</h4>
                    {isOwner ? (
                        <div className="fex flex-row align-items-center">
                            <button
                                onClick={toggleEditing}
                                className="bg-green-600 text-white p-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={onDeleteClick}
                                className="bg-red-600 text-white p-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ) : null}
                </div>
            )}
        </>
    );
};

export default Tweet;
