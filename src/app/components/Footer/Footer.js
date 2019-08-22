import React from 'react';

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <footer className="page-footer">
            <div className="footer-copyright">
                <div className="container center-align">
                    Copyright &copy; {date} BIT
                </div>
            </div>
        </footer>
    )
}

export default Footer;