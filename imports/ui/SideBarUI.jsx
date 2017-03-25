// import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import Sidebar from 'react-sidebar'

class SideBarUI extends Component {

    render(){
        const sidebar = <b>Sidebar content</b>;
        const open = true;
        const children = <b>Children content</b>;
        return(
            <div className="side-bar">
                <Sidebar
                children={children}
                sidebar={sidebar}
                docked={open}/>
            </div>
        );
    }
}

export default SideBarUI;