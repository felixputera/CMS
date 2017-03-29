import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

//Testing facebook login and update
import { FB } from 'fb';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';
 
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});

//Testing facebook login and update
Template.login.events ({
	'click #login-buttons-facebook': function(event) {
		Meteor.loginWithFacebook({ requestPermissions: ['manage_pages', 'publish_actions', 'publish_pages'] }, function(error) {
			if (error) {
				return console.log("Facebook login failed!");
			} else {
			console.log("Added successfully");
			}
			Meteor.call('sendEmail');
		})
	},
	'click #login-buttons-logout': function(event) {
		
		//Testing page posting
		Meteor.call('postFacebook');
	}
})