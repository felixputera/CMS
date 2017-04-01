import React, { Component } from 'react';
import { Accounts } from 'meteor/std:accounts-ui';


export default class LoginUI extends Component {
  render() {
    return(
      <div className="login-page">
        <Accounts.ui.LoginForm/>
      </div>
    );
  }
}