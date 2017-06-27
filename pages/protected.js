import React from 'react';
import withAuth from '../lib/withAuth';
import Head from 'next/head';

class Dashboard extends React.Component {
    render() {
        const user = this.props.auth.getProfile();
        return (
            <div>
                <Head>
                    <title>Protected | NxtShare</title>
                </Head>
                    <div>Current user: {user.email}</div>
            </div>
        );
    }
}

export default withAuth(Dashboard); 