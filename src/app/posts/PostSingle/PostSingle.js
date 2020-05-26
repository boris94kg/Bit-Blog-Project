import React, { Fragment } from 'react';
import { fetchPost, fetchRelatedPosts } from '../../../services/postServices';
import RelatedPosts from '../RelatedPosts/RelatedPosts.js';
import AuthorName from '../../Authors/AuthorName/AuthorName.js';

class PostSingle extends React.Component {
    state = {
        post: null,
        relatedPosts: []
    }

    loadPost() {
        const postId = this.props.match.params.id;
        fetchPost(postId)
            .then(post => {
                this.setState({ post })
                this.loadRelatedPosts(post.authorId);
            })
    }

    loadRelatedPosts(id) {
        fetchRelatedPosts(id)
            .then(posts => {
                const id = this.props.match.params.id;
                const currentPost = Number.parseInt(id);
                const relatedPosts = posts.filter(post => post.id !== currentPost);
                this.setState({ relatedPosts })
            })
    }

    onClickBack = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        this.loadPost();
    }

    componentDidUpdate(prevProps) {
        const id = this.props.match.params.id
        if (prevProps.match.params.id !== id) {
            this.loadPost(id);
        }
    }

    render() {
        const { onClickBack } = this;
        const { post, relatedPosts } = this.state;
        if (!post) {
            return <p>Loading posts</p>
        }

        return (
            <Fragment>
                <div className="row back-link">
                    <div className="col s12">
                        <div className="back-button" onClick={onClickBack}>
                            <span className="fas fa-chevron-left"></span>
                            <span>Back</span>
                        </div>
                    </div>
                </div>
                <div className="single-holder center-align">
                    <h4>{post.title}</h4>
                    {post && <AuthorName authorId={post.authorId} />}
                    <p>{post.body}</p>
                </div>
                <RelatedPosts relatedPosts={relatedPosts} />
            </Fragment>
        )
    }
}
export default PostSingle;