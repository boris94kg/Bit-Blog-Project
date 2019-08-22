import React from 'react';
import { Link } from "react-router-dom";
import AuthorName from '../../Authors/AuthorName/AuthorName';
import Comments from '../../Comments/Comments.js'


const PostItem = (props) => {
    const postID = props.post.id;
    // console.log(postID);
    return (
        <div className="post-holder">
            <Link to={"/posts/" + postID}>
                <div className="post-item section">
                    <h5>{props.post.title}</h5>
                    <p>{props.post.body}</p>
                </div>

            </Link>
            <AuthorName authorId={props.post.authorId} />
            <Comments postId={postID} />
        </div>
    )
}

export default PostItem;