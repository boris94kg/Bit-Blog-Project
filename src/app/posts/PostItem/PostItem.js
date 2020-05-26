import React from 'react';
import { Link } from "react-router-dom";
import AuthorName from '../../Authors/AuthorName/AuthorName';
import Comments from '../../Comments/Comments.js'


const PostItem = ({ post: { id, title, body, authorId } }) => {
    const postID = id;
    // console.log(postID);
    return (
        <div className="post-holder">
            <Link to={"/posts/" + postID}>
                <div className="post-item section">
                    <h5>{title}</h5>
                    <p>{body}</p>
                </div>

            </Link>
            <AuthorName authorId={authorId} />
            <Comments postId={postID} />
        </div>
    )
}

export default PostItem;