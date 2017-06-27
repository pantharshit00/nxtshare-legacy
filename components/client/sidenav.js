import React, { Component } from 'react';
import Router from 'next/router';

class Sidenav extends Component {
    render() {
        return (
            <nav className="card sidenaving">
                <ul className="sidenav">
                    <a href=""><li className="side-nav-item">Home</li></a>
                    <a href="#" onClick={this.handleLogout.bind(this)}><li className="side-nav-item">Logout</li></a>
                    <a href=""><li className="side-nav-item">Story</li></a>
                    <a href=""><li className="side-nav-item">Video</li></a>
                    <a href=""><li className="side-nav-item">test</li></a>
                </ul>
            </nav>
        );
    }
    handleLogout(e){
        e.preventDefault();
        this.props.auth.logout();
        Router.replace('/login?msg='+encodeURIComponent('Sucessfully logged out'));
    }
}

export default Sidenav;