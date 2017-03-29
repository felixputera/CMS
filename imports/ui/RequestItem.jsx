import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
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
            <li className="request">
                <span className="type">
  					{this.props.type}
        		</span>
            	<span className="name">
  					{this.props.name}
        		</span>
        		<button className="delete" onClick={this.deleteThisRequest.bind(this)}>Delete</button>
            </li>
        );
    }
}

RequestItem.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};