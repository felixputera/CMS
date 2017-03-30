import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
// import RequestForm from '../imports/ui/RequestForm.jsx';

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
            <li className="request-item">
                <span className="type">
  					{this.props.type}
        		</span>
            	<span className="name">
  					{this.props.name}
        		</span>
                <IconButton onClick={this.deleteThisRequest.bind(this)}>
                    <FontIcon className="material-icons md-18">clear</FontIcon>
                </IconButton>
            </li>
        );
    }
}

RequestItem.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};