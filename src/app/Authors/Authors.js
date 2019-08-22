import React from 'react';
import { fetchAuthors } from '../../services/authorService.js'
import AuthorsList from './AuthorsList/AuthorsList.js';


class Authors extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authors: []
        }
    }

    loadAuthors() {
        fetchAuthors()
            .then(data => {
                return this.setState({ authors: data })
            })
    }

    componentDidMount() {
        this.loadAuthors()
    }

    render() {
        const { authors } = this.state;
        return (
            <>
                <h2 className="center-align">Authors ({authors.length})</h2>
                <AuthorsList listOfAuthors={authors} />
            </>
        )
    }
}

export default Authors;