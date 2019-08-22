import React from 'react';
import PostList from '../PostList/PostList';

const RelatedPosts = (props) => {
    return (
        <div className="related-holder">
            <h4>{props.relatedPosts.length} more posts from same author</h4>
            <PostList listOfPosts={props.relatedPosts} />
        </div>
    )
}

export default RelatedPosts;