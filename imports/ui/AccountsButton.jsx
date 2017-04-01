import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import RaisedButton from 'material-ui/RaisedButton';
import { createContainer } from 'meteor/react-meteor-data';


class AccountsButton extends Component{
    render(){
        return this.props.user ? (
            <RaisedButton label="Logout" onClick={Meteor.logout} className="login-button"/>
        ) : (
            <RaisedButton label="Login" href="/login" className="login-button"/>
        );

    }
}

export default createContainer(() => {
    return{
        user: Meteor.user()
    }
}, AccountsButton)