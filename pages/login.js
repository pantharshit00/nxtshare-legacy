import React from 'react';
import Layout from '../components/Layout';
import Input from '../components/InputField';
import Reveal from '../components/ScrollReveal';
import AuthService from '../lib/authService';
import Router from 'next/router';
import Head from 'next/head';
import { validateEmail } from '../lib/utils';


const auth = new AuthService('http://localhost:3000');

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: props.error,
            email: null,
            password: null
        };
    }

    static getInitialProps(props) {
        if (props.query.next !== undefined) {
            return { error: 'Login in order to continue' };
        }
        else {
            return {};
        }
    }

    render() {
        const errorMarkup = <div className="alert alert-danger"><span className='glyphicon glyphicon-exclamation-sign' />&nbsp; {this.state.error}</div>;
        return (
            <div>
                <Head>
                    <title>Login | NxtShare</title>
                </Head>
                <Layout path="/login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 col-md-offset-3">
                                <Reveal sid="login-animate" origin="left" distance="500px" duration={1200}>
                                    <div className="card">
                                        <h2>Login</h2>
                                        <hr />
                                        {this.state.error ? errorMarkup : ''}
                                        <form onSubmit={this._handleSubmit.bind(this)}>
                                            <Input
                                                name="Email"
                                                onChange={this._onChange.bind(this)}
                                                type="email"
                                            />
                                            <Input
                                                name="Password"
                                                onChange={this._onChange.bind(this)}
                                                type="password"
                                            />
                                            <Input
                                                onChange={this._onChange.bind(this)}
                                                type="submit"
                                                className="form-control submit-btn"
                                            />
                                        </form>
                                    </div>
                                    <style jsx>
                                        {`
                                    div{
                                        margin-top: 40px;
                                        margin-bottom: 40px;
                                        padding: 20px;
                                        } 
                                    `}
                                    </style>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        );
    }

    _handleSubmit(e) {

        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({
                error: 'Please fill in all the fields.'
            });
        }

        else if (!validateEmail(email)) {
            this.setState({
                error: 'Email is not valid. Enter a correct email'
            });
        }
        else {
            const sub = document.querySelector('.submit-btn');
            sub.value = 'Submitting...';
            sub.className += ' bg-animation';
            auth.login(email, password).then(() => {
                sub.value = 'Submit';
                sub.className += 'form-control submit-btn';
                const path = this.props.url.query.next ? this.props.url.query.next : '/';
                Router.replace(path);
            }
            ).catch(err => {
                console.warn(err);
                sub.value = 'Submit';
                sub.className += 'form-control submit-btn';
                if (err.response.status == 400) {
                    this.setState({
                        error: 'Please provide email and password to the server'
                    });
                }
                else if (err.response.status >= 401 && err.response.status <= 403) {
                    this.setState({
                        error: 'Username or Password is incorrect. Try again'
                    });
                }
                else {
                    this.setState({
                        error: 'Something went wrong. Try again'
                    });
                }
            });
        }

    }

    _onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

}

export default Login;