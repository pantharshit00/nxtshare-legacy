import React, { Component } from 'react';
import Layout from '../components/guest/Layout';
import Input from '../components/InputField';
import Reveal from '../components/ScrollReveal';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import Head from 'next/head';
import { validatedate, monthNames, validateEmail } from '../lib/utils';


class Register extends Component {

    constructor() {
        super();
        this.state = {
            error: ''
        };
        this._onChange = this._onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.day = [];
        this.year = [];
        for (let i = 1; i <= 31; i++) {
            this.day.push(i);
        }
        for (let i = new Date().getFullYear(); i >= 1905; i--) {
            this.year.push(i);
        }
    }

    render() {
        const errorMarkup = <p className="text-danger"><span className='glyphicon glyphicon-exclamation-sign' />&nbsp;{this.state.error}</p>;
        return (
            <div>
                <Head>
                    <title>Register | NxtShare</title>
                </Head>
                <Layout path='/register'>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                                <Reveal sid="reg" origin="bottom" duration={1200} distance="250px">
                                    <div className="card">
                                        <h1>Register</h1>
                                        <hr />
                                        <form onSubmit={this.onSubmit}>
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">
                                                    <Input
                                                        type="text"
                                                        name="FirstName"
                                                        label="First Name"
                                                        placeholder="First Name goes here..."
                                                        onChange={this._onChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <Input
                                                        type="text"
                                                        label="Last Name"
                                                        name="LastName"
                                                        placeholder="Last Name goes here..."
                                                        onChange={this._onChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <Input
                                                type="email"
                                                name="Email"
                                                onChange={this._onChange}
                                                required
                                            />
                                            <Input
                                                type="password"
                                                name="Password"
                                                onChange={this._onChange}
                                                required
                                            />
                                            <Input
                                                type="password"
                                                name="Password2"
                                                placeholder="Enter Password one more time here..."
                                                label="Confirm Password"
                                                onChange={this._onChange}
                                                required
                                            />
                                            <div className="form-group">
                                                <label><h4>Gender</h4></label>
                                                <select name="gender" required className="form-control" onChange={this._onChange}>
                                                    <option value="">Select one</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label><h4>Birthday</h4></label>
                                                <br />
                                                <select name="dd" required className="btn btn-default" onChange={this._onChange}>
                                                    <option value="">Day</option>
                                                    {this.day.map(i => <option key={i}>{i}</option>)}
                                                </select>
                                                <select name="mm" required className="btn btn-default" onChange={this._onChange}>
                                                    <option value="">Month</option>
                                                    {monthNames.map((i, index) => <option key={index}>{i}</option>)}
                                                </select>
                                                <select name="yy" required className="btn btn-default" onChange={this._onChange}>
                                                    <option value="">Year</option>
                                                    {this.year.map((i, index) => <option key={index}>{i}</option>)}
                                                </select>
                                            </div>
                                            {this.state.error ? errorMarkup : null}
                                            <Input
                                                onChange={this._onChange.bind(this)}
                                                type="submit"
                                                className="form-control submit-btn"
                                            />
                                        </form>
                                    </div>
                                    <style jsx>
                                        {`
                                .card{
                                    margin-top: 40px;
                                    margin-bottom: 40px;
                                    padding: 20px;
                                    } 
                                .btn-default:hover, .btn-default:focus, .btn-default.focus{
                                    background-color:#fff !important;
                                }
                                .btn-default{
                                    margin-right:7px !important;
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
    _onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({
            error: ''
        });
        const { firstname, lastname, email, password, password2, gender, dd, mm, yy } = this.state;
        if (!firstname || !lastname || !email || !password || !password2 || !gender || !dd || !mm || !yy) {
            this.setState({
                error: 'Please fill in all the fields'
            });
        }
        else if (!validatedate(dd, mm, yy)) {
            this.setState({
                error: 'Selected Date is invalid'
            });
        }
        else if (!validateEmail(email)) {
            this.setState({
                error: 'Please enter a correct email'
            });
            $('[name="email"]').focus();
        }
        else if (!(password == password2)) {
            this.setState({
                error: 'Passwords do not match'
            });
            $('[name="password"]').val('');
            $('[name="password2"]').val('');
            $('[name="password"]').focus();
        }
        else if (password.length < 8) {
            this.setState({
                error: 'Password must be 8 characters long'
            });
            $('[name="password"]').val('');
            $('[name="password2"]').val('');
            $('[name="password"]').focus();
        }
        else {
            const date = new Date(dd + ' ' + mm + ' ' + yy).toISOString();
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstname,
                    lastName: lastname,
                    email,
                    password,
                    password2,
                    gender,
                    date
                })
            };
            fetch('/api/register', options).then(res => {
                if (res.status >= 200 && res.status < 300) {
                    res.json().then((res) => {
                        console.log(res);
                        Router.replace('/login');
                    });
                }
                else {
                    res.json().then((res) => {
                        console.log(res);
                    });
                }
            });
        }
    }
}

export default Register;