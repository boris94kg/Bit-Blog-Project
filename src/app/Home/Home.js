import React, { Fragment } from 'react';
import PostList from '../posts/PostList/PostList.js';
import { fetchPosts } from '../../services/postServices.js'

class Home extends React.Component {
    state = {
        posts: []
    }
    loadPosts() {
        fetchPosts()
            .then(posts => {
                return this.setState({ posts })
            })
    }

    componentDidMount() {
        this.loadPosts();

    }

    render() {
        const { posts } = this.state;
        return (
            <Fragment>
                <h2 className="center-align">Posts</h2>
                <PostList listOfPosts={posts} />
            </Fragment>
        )
    }
}

export default Home;