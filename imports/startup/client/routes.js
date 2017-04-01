import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import App from '../../ui/container/App.jsx';
import SideBarUI from '../../ui/SideBarUI.jsx';
import LoginUI from '../../ui/LoginUI.jsx'

FlowRouter.route('/', {
    name: 'home',
    action() {
        console.log('route working');
        mount(App, {
            main: <SideBarUI/>,
        });
    },
});

FlowRouter.route('/login', {
    name: 'loginPage',
    action() {
        console.log('route working');
        mount(App, {
            main: < LoginUI />,
        });
    },
});


