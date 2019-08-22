import React from 'react';
import { Link } from 'react-router-dom'
import { fetchAuthor } from '../../../services/authorService.js'


class AuthorName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: null
        }
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

        if (!this.state.author) {
            return <p>... </p>
        }

        return (
            <div className="author-name">
                <Link to={`/authors/${this.state.author.id}`}>{this.state.author.name}</Link>
            </div>
        )
    }
}


export default AuthorName;
