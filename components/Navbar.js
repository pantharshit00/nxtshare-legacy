import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navlink from './Navlink';
import Reveal from './ScrollReveal';

class Navbar extends Component {
    render() {
        const homeActiveClass = this.props.path == '/' ? 'active' : '';
        const loginActiveClass = this.props.path == '/login' ? 'active' : '';
        const registerActiveClass = this.props.path == '/register' ? 'active':'';
        return (
            <Reveal sid="nnavbar" origin="left" duration={1200}>
                <nav className="navbar navbar-inverse">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Nxt<span className="brand-color">Share</span></a>
                        </div>
                        <div id="navbar" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li className={homeActiveClass}><Navlink to="/" >Home</Navlink></li>
                                <li className={loginActiveClass}><Navlink to="/login">Login</Navlink></li>
                                <li className={registerActiveClass}><Navlink to="/register">Register</Navlink></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </Reveal>
        );
    }
}

Navbar.propTypes = {
    path: PropTypes.string.isRequired
};


export default Navbar;