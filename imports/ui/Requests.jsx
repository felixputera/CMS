import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import RequestItem from './RequestItem.jsx';
import RequestForm from './RequestForm.jsx';

export default class Requests extends Component{
    constructor(props){
        super(props);
        this.state = {
            hideForm: true,
        }
    }
    requestItemDisplay(){
        if(this.props.requestlist){
            return(
                this.props.requestlist.map((request) =>
                {
                return(
                    <RequestItem
                    key={request._id}
                    taianjing={request._id}
                    type={request.type}
                    name={request.name}
                    number={request.number}
                    address={request.address}
                    date={request.createdAt}
                    />
                )
            }))
        } else return;
    }

    hideShowForm(event){
        this.setState({
            hideForm: !this.state.hideForm,
        })
    }

    render(){
        return (
            <div className="requests">
                <ul>
                {this.requestItemDisplay()}
                </ul>
                {this.state.hideForm ? null : <RequestForm/>}
                <span className="add-request">
                    <IconButton onClick={this.hideShowForm.bind(this)}>
                        {this.state.hideForm ? <FontIcon className="material-icons md-24">add</FontIcon> :
                        <FontIcon className="material-icons md-24">delete</FontIcon>}
                    </IconButton>
                </span>
            </div>
        );
    }
}

Requests.propTypes = {
    requestlist: PropTypes.array.isRequired,
}