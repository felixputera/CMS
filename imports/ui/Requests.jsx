import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

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
                    lat={request.latitude}
                    lng={request.longitude}
                    type={request.type}
                    assType={request.assistanceType}
                    desc={request.description}
                    name={request.userId}
                    number={request.unitNumber}
                    address={request.address}
                    date={request.time}
                    setMapCenter={this.props.setMapCenter.bind(this)}
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
                <div style={{position:'fixed', width:'100%', backgroundColor:'#303030', zIndex:1500, boxShadow:"rgba(0, 0, 0, 0.3) -3px 3px 10px"}}>
                    <Subheader>Requests</Subheader>
                </div>
                <List style={{marginTop:40}}>
                    {this.requestItemDisplay()}
                    <Divider/>
                    <div style={{height:50}}/>
                </List>
                {this.state.hideForm ? null : <RequestForm tempMarker={this.props.tempMarker}/>}
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