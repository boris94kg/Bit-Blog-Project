import React from 'react';

const Main = (props) => {
    return (
        <main>
            <div className="container">
                {props.children}
            </div>
        </main>
    )
}

export default Main;