import { HTTP } from 'meteor/http';
import { Email } from 'meteor/email';
import Twit from 'twit';

const keys = JSON.parse(Assets.getText("api-key.json"));

const T = new Twit({
	consumer_key: keys.twitter.consumer_key,
	consumer_secret: keys.twitter.consumer_secret,
	access_token: keys.twitter.access_token,
	access_token_secret: keys.twitter.access_token_secret,
	timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
});

export const postFacebook = (text) => {
	let pageAccessToken = keys.facebook;
	return HTTP.post("https://graph.facebook.com/v2.8/286242935138459/feed?message=" + text + "&access_token=" + pageAccessToken);
};

export const sendEmail = (text) => {
	let from = "pentium.cms@gmail.com";
	let to = "pentium.pm@mail.com";
	let subject = "Half-hourly Update from CMS";

	this.unblock();

	Email.send({
		to: to,
		from: from,
		subject: subject,
		text: text
	});

	return console.log("Email sent");
};

export const postTwitter = (text) => {
    T.post('statuses/update', { status: text }, function(err, data, response) {
	    console.log(data);
	});
	return console.log("Twitter sent");
};