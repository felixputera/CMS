import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
	'postFacebook': function() {
		var userAccessToken = Meteor.user().services.facebook.accessToken;
		var pageAccessToken = HTTP.get("https://graph.facebook.com/v2.8/286242935138459?fields=access_token");
		var message = "Sup World!!";
		return HTTP.post("https://graph.facebook.com/v2.8/286242935138459/feed?message=" + message + "&access_token=" + pageAccessToken);
	}
});