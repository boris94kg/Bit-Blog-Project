import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const AuthorItem = ({ author: { id, name } }) => {
    const authorId = id;

    return (
        <Fragment>
            <Link to={"/authors/" + authorId}>
                <div className="author-item section">
                    <h5>{name}</h5>
                </div>
                <div className="divider"></div>
            </Link>
        </Fragment>
    )
}

export default AuthorItem;