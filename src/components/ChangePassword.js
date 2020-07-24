/*
Author: Chethin Manage
Credit to: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from './Firebase';

const ChangePasswordPage = () => (
    <div>
        <h1 className="sign-headings">Change Passowrd </h1>
        <PasswordChangeForm />
    </div>
);


const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { passwordOne, passwordTwo, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return (
            <form onSubmit={this.onSubmit} className="sign-in-form">
                <input
                    className="input-text"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"
                />
                <input
                    className="input-text"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password"
                />
                <button 
                    className="sign-in-btn"
                    disabled={isInvalid} type="submit">
                    Reset My Password
        </button>

                {error && <p className="error" >{error.message}</p>}
            </form>
        );
    }
}

const PasswordChangeLink = () => (
    <p className="emphasis-text-bottom">
        Want to change your password? 
        <Link to={"/change_password"}> Click Here</Link>
    </p>
);

export default withFirebase(ChangePasswordPage);
export { PasswordChangeForm, PasswordChangeLink };