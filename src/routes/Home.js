import Tweet from "components/Tweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
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
        await dbService.collection("tweets").add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setTweet("");
    };
    const onChange = (e) => {
        const { value } = e.target;
        setTweet(value);
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
                        className="w-2/12 p-1.5 border"
                        type="submit"
                        value="tweet"
                    ></input>
                </form>
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
