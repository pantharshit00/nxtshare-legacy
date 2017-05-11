import React, { Component } from 'react';
import AuthService from './authService';
import Router from 'next/router';
import Layout from '../components/Layout';



export default function withAuth(AuthComponent,name) {
    const Auth = new AuthService('http://localhost:3000');
    return class Authenticated extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isLoading: true
            };
        }

        componentDidMount() {
            Auth.loggedIn().then(data => {
                if (!data) {
                    Router.replace('/login?next=' + this.props.url.pathname);
                }
                else {
                    this.setState({ isLoading: false });
                }
            });
        }

        showloader() {
            if (typeof window !== 'undefined') {
                document.querySelector('.spinner').className = 'spinner show';
                document.querySelector('.spinner-body').className = 'spinner-body hide';
            }
        }

        hideLoader() {
            document.querySelector('.spinner').className = 'spinner hide';
            document.querySelector('.spinner-body').className = 'spinner-body show';
        }

        render() {
            return (
                <Layout path={name || 'something'}>
                    {this.state.isLoading ? (
                        <div>{this.showloader()}</div>
                    ) : (<div>
                        {this.hideLoader()}
                        <AuthComponent {...this.props} auth={Auth} />
                    </div>
                        )}
                </Layout>
            );
        }
    };
}