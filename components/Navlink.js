import React, { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

// Test
class Navlink extends Component {
    componentDidMount() {
        Router.prefetch(this.props.to);
    }

    render() {
        return (
            <a href={this.props.to} onClick={this.onClick.bind(this)}>{this.props.children}</a>
        );
    }
    onClick(e) {
        e.preventDefault();
        if (window.location.pathname !== this.props.to) {
            document.querySelector('.spinner').className = 'spinner';
            document.querySelector('.spinner-body').className = 'spinner-body';
        }
        Router.push(this.props.to);
    }
}

Navlink.propTypes = {
    to: PropTypes.string.isRequired
};

export default Navlink;