import React from 'react';
import PostList from '../posts/PostList/PostList.js';
import { fetchPosts } from '../../services/postServices.js'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
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
            <>
                <h2 className="center-align">Posts</h2>
                <PostList listOfPosts={posts} />
            </>
        )
    }
}

export default Home;