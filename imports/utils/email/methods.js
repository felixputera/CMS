import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Meteor.methods({
	'sendEmail': function() {
		var from = "pentium.cms@gmail.com";
		var to = "pentium.pm@mail.com";
		var subject = "Half-hourly Update from CMS";
		var text = "This is a test email";

		this.unblock();

		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});

		console.log("Email sent");
	}
})