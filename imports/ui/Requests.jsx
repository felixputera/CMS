import React, { Component, PropTypes } from 'react';

import RequestItem from './RequestItem.jsx';
import RequestForm from './RequestForm.jsx';

export default class Requests extends Component{

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

    render(){
        return (
            <div className="requests">
                <ul>
                {this.requestItemDisplay()}
                </ul>
                <RequestForm />
            </div>
        );
    }
}

Requests.propTypes = {
    requestlist: PropTypes.array.isRequired,
}