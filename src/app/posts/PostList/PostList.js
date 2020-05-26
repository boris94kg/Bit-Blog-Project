import React, { Fragment } from 'react';
import PostItem from '../PostItem/PostItem.js';


const PostList = ({ listOfPosts }) => {
    return (
        <Fragment>
            <div className="post-list center-align row">
                {listOfPosts.map((post, index) => {
                    return <PostItem key={index} post={post} />
                })}

            </div>
        </Fragment>
    )

}

export default PostList;