import React, { Component } from 'react';

class UserNav extends Component {
    render() {
        return (
                <nav className="navbar">
                    <div className="bars" onClick={this.handleClick.bind(this)} ref="bars">
                        <div className="bar1" />
                        <div className="bar2" />
                        <div className="bar3" />
                    </div>
                    <div className="navbar-brand">Nxt<span className="brand-color">Share</span></div>
                </nav>
        );
    }
    handleClick() {
        this.refs.bars.classList.toggle('bars-change');
    }
}

export default UserNav;