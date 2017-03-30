import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {ListItem} from 'material-ui/List';

// import RequestForm from '../imports/ui/RequestForm.jsx';

const requestTypeDisplay = {
    "ambulance":"Emergency Ambulance",
    "gasControl":"Gas Leak Control",
}

const requestTypeIcon = {
    "ambulance":"local_hospital",
    'gasControl':"cloud"
}

export default class RequestItem extends Component{
    constructor(props) {
        super(props);
    }

	deleteThisRequest() {
    	Meteor.call('requests.remove', this.props.taianjing);
        // console.log(this.props.key);
    }

    render(){
        return (
        	//can add Image
            <ListItem className="request-item"
            leftAvatar={<FontIcon className="material-icons md-36 md-light md-inactive">{requestTypeIcon[this.props.type]}</FontIcon>}
            rightIcon={
                <IconButton onClick={this.deleteThisRequest.bind(this)}>
                    <FontIcon className="material-icons md-18">clear</FontIcon>
                </IconButton>}
            primaryText={this.props.address}
            secondaryText={requestTypeDisplay[this.props.type]}
            />
        );
    }
}

RequestItem.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};