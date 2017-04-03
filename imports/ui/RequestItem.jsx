import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {ListItem} from 'material-ui/List';


const reportTypeDisplay = {
    "fire":"Fire",
    "flood":"Flood",
    "road":"Road Accident",
    "gasleak":"Gas Leak",
}

const reportTypeIcon = {
    "fire":"whatshot",
    'flood':"pool",
    'road':'traffic',
    "gasleak":'cloud',
}

export default class RequestItem extends Component{
    constructor(props) {
        super(props);
    }

	resolveThisRequest() {
    	Meteor.call('crises.setResolved', this.props.taianjing);
        // console.log(this.props.key);
    }

    render(){
        return (
            <ListItem
            key={this.props.taianjing}
            className="request-item"
            leftAvatar={<FontIcon className="material-icons md-36 md-light md-inactive">{reportTypeIcon[this.props.type]}</FontIcon>}
            rightIcon={
                <span className="delete">
                    <IconButton onTouchTap={this.resolveThisRequest.bind(this)}>
                        <FontIcon className="material-icons md-18">done</FontIcon>
                    </IconButton>
                </span>}
            children={<div style={{display:"none"}}><input className="lat" defaultValue={this.props.lat} /><input className="lng" defaultValue={this.props.lng} /></div>}
            primaryText={this.props.address}
            secondaryText={reportTypeDisplay[this.props.type]}
            hoverColor="#383838"
            onTouchTap={this.props.setMapCenter.bind(this)}
            />
        );
    }
}

RequestItem.propTypes = {
    type: PropTypes.string.isRequired,
};