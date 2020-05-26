import React, { Fragment } from 'react';
import { fetchAuthor } from '../../../services/authorService.js';


class AuthorSingle extends React.Component {
    state = {
        author: {},
    }


    loadAuthor() {
        const authorId = this.props.match.params.id;
        fetchAuthor(authorId)
            .then(data => {
                return this.setState({ author: data });
            })
    }

    onClickBack = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        this.loadAuthor();
    }

    render() {
        const { onClickBack } = this;
        const { author } = this.state;
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
                <div className="row author-info">
                    <div className="col s12 m6 l6 xl6">
                        <img src="https://via.placeholder.com/300" alt="" className="responsive-img" />
                    </div>
                    <div className="col s12 m6 l6 xl6">
                        <h1>{author.name}</h1>
                        <p>Username: {author.userName}</p>
                        <p>Email: {author.email}</p>
                        <p>Phone: {author.phone}</p>
                    </div>
                </div>
                <div className="row author-info">
                    <div className="col s12 m6 l6 xl6">
                        <h1>Address</h1>
                        <p>Street: {author.street}</p>
                        <p>City: {author.city}</p>
                        <p>Zipcode: {author.zipCode}</p>
                    </div>
                    <div className="col s12 m6 l6 xl6">
                        <iframe
                            width="100%"
                            height="300px"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            title={author.street}
                            frameBorder="0"
                            style={{ border: 0 }}
                            src={`https://maps.google.com/maps?q=${author.lat},${author.lng}&z=15&output=embed`}
                        />
                    </div>
                </div>
                <div className="row author-info">
                    <div className="col s12">
                        <h1>Company</h1>
                        <p>Name: {author.companyName}</p>
                        <p>Slogan: {author.companyPhrase}</p>
                    </div>
                </div>
            </Fragment>

        )
    }
}


export default AuthorSingle; 