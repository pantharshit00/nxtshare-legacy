import React, { Component } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Sidenav from './sidenav';

class Layout extends Component {
    render() {
        return (
            <div>
                <Head>
                    <link rel="stylesheet" href="/static/css/client.css" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js"></script>
                    <link href="https://fonts.googleapis.com/css?family=Quicksand:500|Roboto" rel="stylesheet" />
                </Head>
                <div className="spinner"></div>
                <div className="spinner-body">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2">
                                <Sidenav auth={this.props.auth}/>
                            </div>
                            <div className="col-md-9">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;