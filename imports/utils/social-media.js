import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Email } from 'meteor/email';
import Twit from 'twit';

const facebookKey = JSON.parse(Assets.getText("api-key.json")).facebook;

const T = new Twit({
	consumer_key:         /*consumer key*/,
	consumer_secret:      /*consumer secret*/,
	access_token:         /*access token*/,
	access_token_secret:  /*access secret*/,
	timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

export const loginFacebook = () => {

}

export const postFacebook = (event) => {
	let pageAccessToken = facebookKey;
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

export const postTwitter = (event) => {
    T.post('statuses/update', { status: text }, function(err, data, response) {
	    console.log(data);
	}
	return console.log("Twitter sent");
}