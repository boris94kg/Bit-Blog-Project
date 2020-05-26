import React from 'react';
import { Link } from 'react-router-dom'
import { fetchAuthor } from '../../../services/authorService.js'


class AuthorName extends React.Component {
    state = {
        author: null
    }

    loadAuthorName() {
        fetchAuthor(this.props.authorId)
            .then(author => {
                this.setState({ author: author })
            })
    }

    componentDidMount() {
        this.loadAuthorName()
    }

    render() {

        const { author } = this.state;

        if (!author) {
            return <p>... </p>
        }

        return (
            <div className="author-name">
                <Link to={`/authors/${author.id}`}>{author.name}</Link>
            </div>
        )
    }
}

export default AuthorName;
