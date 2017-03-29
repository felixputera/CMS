import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import RequestForm from '../imports/ui/RequestForm.jsx';

export default class Request extends Component{

	constructor(props) {
    super(props);
  }

	deleteThisRequest() {
    	Meteor.call('requests.remove', this.props.request._id);
    }

    render(){
        return (
        	//can add Image
            <li className="request">
            	<span className="text">hello 
  					{this.props.request.text}
        		</span>
        		<button className="delete" onClick={this.deleteThisRequest.bind(this)}Delete</button>
            </li>
        );
    }
}

Request.propTypes = {
  request: PropTypes.object.isRequired,
};