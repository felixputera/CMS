import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import '../imports/startup/accounts-config.js';
import App from '../imports/ui/Main.jsx';
 
Meteor.startup(() => {
  render(<Main />, document.getElementById('render-target'));
});