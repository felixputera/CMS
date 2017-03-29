import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Email } from 'meteor/email';

export const postFacebook = (event) => {
	let userAccessToken = Meteor.user().services.facebook.accessToken;
	let pageAccessToken = HTTP.get("https://graph.facebook.com/v2.8/286242935138459?access_token=" + userAccessToken + "&fields=access_token");
	let message = "An update on " + event;
	return HTTP.post("https://graph.facebook.com/v2.8/286242935138459/feed?message=" + message + "&access_token=" + pageAccessToken);
}

export const sendEmail = (text) => {
	let from = "pentium.cms@gmail.com";
	let to = "pentium.pm@mail.com";
	let subject = "Half-hourly Update from CMS";
	let content = "This is a test email " + text;

	this.unblock();

	Email.send({
		to: to,
		from: from,
		subject: subject,
		text: text
	});

	return console.log("Email sent");
}