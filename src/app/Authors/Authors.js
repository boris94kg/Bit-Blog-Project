import React, { Fragment } from 'react';
import { fetchAuthors } from '../../services/authorService.js'
import AuthorsList from './AuthorsList/AuthorsList.js';

class Authors extends React.Component {
    state = {
        authors: []
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
            <Fragment>
                <h2 className="center-align">Authors ({authors.length})</h2>
                <AuthorsList listOfAuthors={authors} />
            </Fragment>
        )
    }
}

export default Authors;