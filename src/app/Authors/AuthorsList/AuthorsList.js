import React, { Fragment } from 'react';
import AuthorItem from '../AutorItem/AutorItem.js'

const AuthorsList = ({ listOfAuthors }) => {
    return (
        <Fragment>
            <div className="row author-list center-align">
                {listOfAuthors.map((author, index) => {
                    return <AuthorItem key={index} author={author} />
                })}
            </div>
        </Fragment >
    )
}

export default AuthorsList;
