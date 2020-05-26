import React from 'react';
import PostList from '../PostList/PostList';

const RelatedPosts = ({ relatedPosts }) => {
    return (
        <div className="related-holder">
            <h4>{relatedPosts.length} more posts from same author</h4>
            <PostList listOfPosts={relatedPosts} />
        </div>
    )
}

export default RelatedPosts;