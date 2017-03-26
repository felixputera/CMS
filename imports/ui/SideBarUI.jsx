import { Meteor } from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import Sidebar from 'react-sidebar'

import MapUI from './MapUI.jsx';
import Reports from './Reports.jsx';
import Requests from './Requests.jsx'

class SideBarUI extends Component {
    
    // constructor(props) {
    //     super(props);
    
    //     this.state = {
    //     hideCompleted: false,
    //     };
    // }
    
    // toggleHideCompleted() {
    //     this.setState({
    //     hideCompleted: !this.state.hideCompleted,
    //     });
    // }

    sidebarContent() {
        return (
            <div className="side-bar-content">
                <Reports/>
                {/*{ Meteor.userId() in adminWololo?
                }*/}
                <Requests/>
            </div>
        )
    }

    render(){
        // const children = <b>Children content</b>;
        return(
            <div className="side-bar">
                <Sidebar
                children={<MapUI/>}
                sidebar={
                    this.sidebarContent()
                }
                docked={true}
                styles={
                    {root:
                        {
                            top: '60px',
                            backgroundColor: '#fcfcfc',
                        }
                    }
                }
                />
            </div>
        );
    }
}

export default SideBarUI;