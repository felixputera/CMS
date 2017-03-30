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
import Toggle from 'material-ui/Toggle';

const style = {
  textField:{
    marginBottom: 20,
  },
  actionButton:{
    marginRight:0,
    marginLeft:5,
  },
  dropDownType:{
    paddingBottom:12,
    width:176,
  },
  dropDownAssType:{
    width:255,
    paddingLeft:0,
    marginLeft:0,
    marginTop:10,
  }
}

export default class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      assistanceType: null,
      address: '',
      region:'',
      description:'',
      postalCode:'',
      unitNumber:'',
      assistance: false,

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

  handleTypeChange(event, index, value){
    this.setState({
      type: value,
    })
  }

  handleAssTypeChange(event, index, value){
    this.setState({
      assistanceType: value,
    })
  }

  handleAssChange(event, bool){
    this.setState({
      assistance: !this.state.assistance,
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    // const type = ReactDOM.findDOMNode(this.refs.type).value.trim();
    // const caller = ReactDOM.findDOMNode(this.refs.caller).value.trim();
    // const number = ReactDOM.findDOMNode(this.refs.number).value.trim();
    // const address = ReactDOM.findDOMNode(this.refs.address).value.trim();

    const type = this.state.type;
    const assistanceType = this.state.assistanceType;
    const address = this.state.address;
    const region = this.state.region;
    const description = this.state.description;
    const postalCode = this.state.postalCode;
    const unitNumber = this.state.unitNumber;
    const assistance = this.state.assistance;

    if (!type || !address || !region || !description || (assistance && !assistanceType)) {
        return;
    }

    Meteor.call('crises.insert', region, address, type, description,
    assistance, assistanceType, postalCode, unitNumber);

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
        <div className="request-form-head">
        <span>NEW</span>
        <DropDownMenu value={this.state.type} name="type" style={style.dropDownType} onChange={this.handleTypeChange.bind(this)} autoWidth={false}>
          <MenuItem value={null} primaryText="Request Type" disabled={true}/>
          <MenuItem value="fire" primaryText="Fire" />
          <MenuItem value="flood" primaryText="Flood" />
          <MenuItem value="road" primaryText="Road Accident" />
        </DropDownMenu>
        <IconButton onClick={this.minimise.bind(this)}>
          <FontIcon className="material-icons">tab</FontIcon>
        </IconButton>
        </div>
        {
          this.state.minimise ? null :
          <div className="request-form-input">
            <Toggle
              label="Assistance needed"
              defaultToggled={this.state.assistance}
              onToggle={this.handleAssChange.bind(this)}
            />
            <DropDownMenu value={this.state.assistanceType} name="type" style={style.dropDownAssType} 
            onChange={this.handleAssTypeChange.bind(this)} autoWidth={false} disabled={!this.state.assistance}>
              <MenuItem value={null} primaryText="Assistance Type" disabled={true}/>
              <MenuItem value="ambulance" primaryText="Emergency Ambulance" />
              <MenuItem value="gasControl" primaryText="Gas Leak Control" />
            </DropDownMenu>
            <TextField
              hintText="Description"
              name="description"
              errorText={this.state.description? null : "This field is required"}
              value={this.state.description}
              multiLine={true}
              onChange={this.handleInputChange.bind(this)}
              style={style.textField}/>
            <br />
            <TextField
              hintText="Region"
              name="region"
              errorText={this.state.region? null : "This field is required"}
              value={this.state.region}
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
            <TextField
              hintText="Postal code"
              name="postalCode"
              value={this.state.postalCode}
              onChange={this.handleInputChange.bind(this)}/>
            <TextField
              hintText="House unit number"
              name="unitNumber"
              value={this.state.unitNumber}
              onChange={this.handleInputChange.bind(this)}/>
            <br />
            <CardActions className="request-form-actions">
              <IconButton
              onTouchTap={this.handleReset.bind(this)}
              style={style.actionButton}
              tooltip="Clear form"
              tooltipPosition="top-center">
                <FontIcon className="material-icons md-24">clear</FontIcon>
              </IconButton>
              <IconButton
              onTouchTap={this.handleSubmit.bind(this)}
              style={style.actionButton}
              tooltip={(this.state.type && this.state.address && this.state.region &&
              this.state.description && (this.state.assistance &&
              !this.state.assistanceType)) ? null : "Some fields are required"}
              tooltipPosition="top-center">
                <FontIcon className="material-icons md-24">done</FontIcon>  
              </IconButton>
            </CardActions>
          </div>
        }
      </Card>
    );
  }
}