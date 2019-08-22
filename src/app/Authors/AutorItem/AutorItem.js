import React from 'react';
import { Link } from 'react-router-dom';

const AuthorItem = (props) => {
    const authorId = props.author.id;

    return (
        <>
            <Link to={"/authors/" + authorId}>
                <div className="author-item section">
                    <h5>{props.author.name}</h5>
                </div>
                <div className="divider"></div>
            </Link>
        </>
    )
}

export default AuthorItem;