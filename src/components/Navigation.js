import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
    console.log(userObj);
    return (
        <>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">
                        {userObj.displayName === null
                            ? `닉네임 없음 ${userObj.email}`
                            : ` ${userObj.displayName}의 프로파일 `}
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default Navigation;
