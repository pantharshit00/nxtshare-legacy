import React, { Component } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import PropTypes from 'prop-types';
import Router from 'next/router';
if (typeof window !== 'undefined') {
    var Reveal = require('scrollreveal');
}

Router.onRouteChangeStart = () => {
    document.querySelector('.spinner').className = 'spinner show';
    document.querySelector('.spinner-body').className = 'spinner-body hide';
};
Router.onRouteChangeComplete = () => {
    document.querySelector('.spinner').className = 'spinner hide';
    document.querySelector('.spinner-body').className = 'spinner-body show';
};
Router.onRouteChangeError = () => {
    document.querySelector('.spinner').className = 'spinner hide';
    document.querySelector('.spinner-body').className = 'spinner-body show';
};


class Layout extends Component {
    componentWillMount() {
        if (typeof window !== 'undefined') {
            window.sr = new Reveal();
        }
    }
    render() {
        return (
            <div>
                <Head>
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="/static/css/style.css" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js"></script>
                    <link href="https://fonts.googleapis.com/css?family=Quicksand:500|Roboto" rel="stylesheet" />
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                </Head>
                <div className="spinner" />
                <Navbar path={this.props.path} />
                <div className="spinner-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    path: PropTypes.string.isRequired
};

export default Layout;