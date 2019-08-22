import React from 'react';
import { fetchComment } from '../../services/commentsService.js';

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            commentCount: null
        }
    }

    loadComments() {
        fetchComment(this.props.postId)
            .then(commentCount => {
                return this.setState({ commentCount })
            })

    }

    componentDidMount() {
        this.loadComments();
    }

    render() {
        const { commentCount } = this.state;
        return (
            <div>
                <p>Comments: {commentCount}</p>
            </div>
        )
    }
}

export default Comments;