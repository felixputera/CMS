import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {ListItem} from 'material-ui/List';


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
    	Meteor.call('crises.setResolved', this.props.taianjing);
        // console.log(this.props.key);
    }

    render(){
        return (
        	//can add Image
            <ListItem
            leftAvatar={<FontIcon className="material-icons md-36 md-light md-inactive">{requestTypeIcon[this.props.assType]}</FontIcon>}
            rightIcon={
                <span className="delete">
                    <IconButton onClick={this.deleteThisRequest.bind(this)}>
                        <FontIcon className="material-icons md-18">done</FontIcon>
                    </IconButton>
                </span>}
            primaryText={this.props.address}
            secondaryText={requestTypeDisplay[this.props.assType]}
            />
        );
    }
}

RequestItem.propTypes = {
    type: PropTypes.string.isRequired,
};