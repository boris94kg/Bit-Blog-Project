import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav>
                <div className="nav-wrapper container header-inner">
                    <div className="row">
                        <div className="col s6">
                            <Link to="/" className="brand-logo left">BitBlog</Link>
                        </div>
                        <div className="col s6">
                            <Link to="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></Link>
                            <ul className="right hide-on-med-and-down">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/authors">Authors</Link></li>
                                <li><Link to="/about">About</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/authors">Authors</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </header>
    )
}

export default Header;
