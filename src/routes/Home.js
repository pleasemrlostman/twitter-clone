import Tweet from "components/Tweet";
import { dbService, stroageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    // const getTweets = async () => {
    //     const dbTweets = await dbService.collection("tweets").get();
    //     dbTweets.forEach((document) => {
    //         const tweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         setTweets((prev) => [tweetObject, ...prev]);
    //     });
    // };
    useEffect(() => {
        // getTweets();
        dbService.collection("tweets").onSnapshot((snapshot) => {
            const tweetArray = snapshot.docs.map((value) => {
                return {
                    id: value.id,
                    ...value.data(),
                };
            });
            setTweets(tweetArray);
            console.log(tweetArray);
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = stroageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(
                attachment,
                "data_url"
            );
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("tweets").add(nweetObj);

        setTweet("");
        setAttachment("");
    };
    const onChange = (e) => {
        const { value } = e.target;
        setTweet(value);
    };
    const onFileChange = (e) => {
        const {
            target: { files },
        } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => {
        const imgUploadInput = document.querySelector("#imgUploadInput");
        setAttachment("");
        imgUploadInput.value = null;
    };

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        className="border-gray-300 border w-10/12 p-1.5"
                        maxLength={120}
                        type="text"
                        value={tweet}
                        onChange={onChange}
                        placeholder="whats on your mind"
                    ></input>
                    <input
                        id="imgUploadInput"
                        className="border-gray-300 border w-10/12 p-1.5"
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                    ></input>
                    <input
                        className="w-2/12 p-1.5 border"
                        type="submit"
                        value="tweet"
                    ></input>
                </form>
                {attachment ? (
                    <div>
                        <button
                            onClick={onClearAttachment}
                            className="border-gray-300 border w-full p-1.5"
                        >
                            Clear Button
                        </button>
                        <img src={attachment}></img>
                    </div>
                ) : null}
            </div>
            <div>
                {tweets.map((value, id) => {
                    return (
                        <Tweet
                            key={value.id}
                            tweetObj={value}
                            isOwner={value.creatorId === userObj.uid}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Home;
