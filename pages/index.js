import React, { Component } from 'react';
import Layout from '../components/guest/Layout';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import makeStore from '../lib/store';

class Index extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Home | NxtShare</title>
                </Head>
                <Layout path="/">
                    <h1>Hello World</h1>
                </Layout>
            </div>
        );
    }
}

export default Index;