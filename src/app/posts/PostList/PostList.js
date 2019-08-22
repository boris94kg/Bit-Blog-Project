import React from 'react';
import PostItem from '../PostItem/PostItem.js';


const PostList = (props) => {
    return (
        <>
            <div className="post-list center-align row">
                {props.listOfPosts.map((post, index) => {
                    return <PostItem key={index} post={post} />
                })}

            </div>
        </>
    )

}

export default PostList;