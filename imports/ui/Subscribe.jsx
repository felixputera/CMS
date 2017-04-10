import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';

export default class Subscribe extends Component {
    constructor(props){
        super(props);
        this.state = {
            number: '',
            region: null,
            tempNum: '',
            tempRegion: '',
            open: false,
        }
    }

    handleNumChange(event){
        this.setState({
            number: event.target.value,
        })
    }

    handleRegionChange(event, index, value){
        this.setState({
            region: value,
        })
    }

    subscribe(){
        let verNum = /^([+0-9]{6,})$/;
        if(!verNum.test(this.state.number) || !this.state.region){
            return;
        }
        Meteor.call("sms.insert", this.state.number, this.state.region);
        this.setState({
            tempNum: this.state.number,
            tempRegion: this.state.region,
        })
        this.handleTouchTap();

        this.setState({
            number: '',
            region: null,
        })
    }

    handleTouchTap(){
        this.setState({
            open: true,
        });
    };

    handleRequestClose(){
        this.setState({
            open: false,
        });
    };

    render(){
        return (
            <div className="subscribe">
                <TextField value={this.state.number}
                floatingLabelText="Phone Number"
                hintText="e.g. +6598765432"
                style={{top:-15, width:200}}
                onChange={this.handleNumChange.bind(this)}
                />
                <DropDownMenu value={this.state.region} name="region" style={{width:150}} onChange={this.handleRegionChange.bind(this)} autoWidth={false}>
                    <MenuItem value={null} primaryText="Region" disabled={true}/>
                    <MenuItem value="north" primaryText="North" />
                    <MenuItem value="central" primaryText="Central" />
                    <MenuItem value="east" primaryText="East" />
                    <MenuItem value="west" primaryText="West" />
                    <MenuItem value="south" primaryText="South" />
                </DropDownMenu>
                <RaisedButton label="Subscribe" onTouchTap={this.subscribe.bind(this)} style={{marginBottom:10}}primary={true} className="subscribe-button"/>
                <Snackbar
                open={this.state.open}
                message={"Subscribed to " + this.state.tempNum + " in region " + this.state.tempRegion}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose.bind(this)}
                />
            </div>
        )
    }
}