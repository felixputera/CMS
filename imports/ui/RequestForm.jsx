import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

const style = {
  textField:{
    marginBottom: 20,
  },
  actionButton:{
    marginRight:0,
    marginLeft:5,
  },
  dropDown:{
    paddingBottom:12,
    width:176,
  }
}

export default class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      caller: '',
      number: '',
      address: '',
      minimise: false,
    };
    this.baseState = this.state;
    
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleReset = this.handleReset.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleDropDownChange(event, index, value){
    this.setState({
      type: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    // const type = ReactDOM.findDOMNode(this.refs.type).value.trim();
    // const caller = ReactDOM.findDOMNode(this.refs.caller).value.trim();
    // const number = ReactDOM.findDOMNode(this.refs.number).value.trim();
    // const address = ReactDOM.findDOMNode(this.refs.address).value.trim();

    const type = this.state.type;
    const caller = this.state.caller;
    const number = this.state.number;
    const address = this.state.address;

    if (!type || !caller || !number || !address) {
        return;
    }

    Meteor.call('requests.insert',type,caller,number,address);

    this.handleReset(null);

    return;
  }

  componentWillUnmount(){
    this.handleReset(null);
  }

  handleReset(event) {
    this.setState(this.baseState);
  }

  minimise(event){
    this.setState({
      minimise: !this.state.minimise,
    })
  }

  render() {
    return (
      <Card className="request-form">
        {/*<AppBar
          title={
            <span>NEW
            <DropDownMenu value={this.state.type} ref="type" name="type" onChange={this.handleInputChange} autoWidth={false} style={{width:150}}>
              <MenuItem value="ambulance" primaryText="Emergency Ambulance" />
              <MenuItem value="gasControl" primaryText="Gas Leak Control" />
            </DropDownMenu>
            </span>
            }
          onTitleTouchTap={this.minimise.bind(this)}
          iconElementLeft={null}
          iconElementRight={<IconButton touch={true} onTouchTap={this.props.toggleHide}><FontIcon className="material-icons">delete</FontIcon></IconButton>}
        />*/}
        <div className="request-form-head">
        <span>NEW</span>
        <DropDownMenu value={this.state.type} name="type" style={style.dropDown} onChange={this.handleDropDownChange.bind(this)} autoWidth={false}>
          <MenuItem value={null} primaryText="Request Type" disabled={true}/>
          <MenuItem value="ambulance" primaryText="Emergency Ambulance" />
          <MenuItem value="gasControl" primaryText="Gas Leak Control" />
        </DropDownMenu>
        <IconButton onClick={this.minimise.bind(this)}>
          <FontIcon className="material-icons">tab</FontIcon>
        </IconButton>
        </div>
        {
          this.state.minimise ? null :
          <div className="request-form-input">
            <TextField
              hintText="Name"
              name="caller"
              errorText={this.state.caller? null : "This field is required"}
              value={this.state.caller}
              onChange={this.handleInputChange.bind(this)}
              style={style.textField}/>
            <br />
            <TextField
              hintText="Mobile Number"
              name="number"
              errorText={this.state.number? null : "This field is required"}
              value={this.state.number}
              onChange={this.handleInputChange.bind(this)}
              style={style.textField}/>
            <br />
            <TextField
              hintText="Address"
              name="address"
              errorText={this.state.address? null : "This field is required"}
              value={this.state.address}
              multiLine={true}
              onChange={this.handleInputChange.bind(this)}
              style={style.textField}/>
            <br />
            <CardActions className="request-form-actions">
              <IconButton
              onTouchTap={this.handleReset.bind(this)}
              style={style.actionButton}>
                <FontIcon className="material-icons md-24" style={{color:'D32F2F'}}>clear</FontIcon>
              </IconButton>
              <IconButton
              onTouchTap={this.handleSubmit.bind(this)}
              style={style.actionButton}
              tooltip={(this.state.number && this.state.address && this.state.type && this.state.number) ? null : "All field is required"} tooltipPosition="top-center">
              <FontIcon className="material-icons md-24">done</FontIcon>  
              </IconButton>
            </CardActions>
          </div>
        }
      </Card>
    );
  }
}