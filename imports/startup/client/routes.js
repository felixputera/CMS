import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import App from '../../ui/container/App.jsx';
import Public from '../../ui/container/Public.jsx';
import SideBarUI from '../../ui/SideBarUI.jsx';
import LoginUI from '../../ui/LoginUI.jsx'


FlowRouter.route('/', {
    name: 'public',
    action() {
        mount(Public, {
            main: <SideBarUI/>,
        });
    },
});

FlowRouter.route('/admin', {
    name: 'admin',
    action() {
        mount(App, {
            main: <SideBarUI/>,
        });
    },
});

FlowRouter.route('/login', {
    name: 'loginPage',
    action() {
        mount(App, {
            main: <LoginUI/>,
        });
    },
});

