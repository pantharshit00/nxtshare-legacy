import React, { Component } from 'react';
import withAuth from '../lib/withAuth';

class UserNav extends Component {
    render() {
        return (
            <nav>
                Hello World
            </nav>
        );
    }
}

export default withAuth(UserNav);