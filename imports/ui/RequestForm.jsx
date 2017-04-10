import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
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
  dropDownRegion:{
    width:255,
    paddingLeft:0,
    marginLeft:0,
    marginTop:5,
  }
}

export default class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      assistanceType: null,
      address: '',
      region:null,
      description:'',
      postalCode:'',
      unitNumber:'',
      assistance: false,
      useMarker: false,

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

  handleRegionChange(event, index, value){
    this.setState({
      region: value,
    })
  }

  handleAssChange(event, bool){
    this.setState({
      assistance: !this.state.assistance,
    })
  }

  handleMarkerChange(event, bool){
    this.setState({
      useMarker: !this.state.useMarker,
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    // const type = ReactDOM.findDOMNode(this.refs.type).value.trim();
    // const caller = ReactDOM.findDOMNode(this.refs.caller).value.trim();
    // const number = ReactDOM.findDOMNode(this.refs.number).value.trim();
    // const address = ReactDOM.findDOMNode(this.refs.address).value.trim();

    const type = this.state.type;
    const address = this.state.address;
    const region = this.state.region;
    const description = this.state.description;
    const postalCode = this.state.postalCode;
    const unitNumber = this.state.unitNumber;
    const assistance = this.state.assistance;

    if (!type || !address || !region || !description || (this.state.useMarker && !this.props.tempMarker)) {
        return;
    }

    Meteor.call('crises.insert', region, address, type, description,
    assistance, postalCode, unitNumber, this.state.useMarker, this.props.tempMarker);

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
          <MenuItem value={null} primaryText="Report Type" disabled={true}/>
          <MenuItem value="fire" primaryText="Fire" />
          <MenuItem value="flood" primaryText="Flood" />
          <MenuItem value="road" primaryText="Road Accident" />
          <MenuItem value="gasleak" primaryText="Gas Leak" />
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
            {/*<DropDownMenu value={this.state.assistanceType} name="type" style={style.dropDownAssType} 
            onChange={this.handleAssTypeChange.bind(this)} autoWidth={false} disabled={!this.state.assistance}>
              <MenuItem value={null} primaryText="Assistance Type" disabled={true}/>
              <MenuItem value="ambulance" primaryText="Emergency Ambulance" />
              <MenuItem value="gasControl" primaryText="Gas Leak Control" />
            </DropDownMenu>*/}
            <TextField
              hintText="Description"
              name="description"
              errorText={this.state.description? null : "This field is required"}
              value={this.state.description}
              multiLine={true}
              onChange={this.handleInputChange.bind(this)}
              style={style.textField}/>
            <br />
            <DropDownMenu value={this.state.region} name="region" style={style.dropDownRegion} 
            onChange={this.handleRegionChange.bind(this)} autoWidth={false}>
              <MenuItem value={null} primaryText="Region" disabled={true}/>
              <MenuItem value="north" primaryText="North" />
              <MenuItem value="central" primaryText="Central" />
              <MenuItem value="east" primaryText="East" />
              <MenuItem value="west" primaryText="West" />
              <MenuItem value="south" primaryText="South" />
            </DropDownMenu>
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
            <Toggle
              label="Use marker coordinate"
              defaultToggled={this.state.useMarker}
              onToggle={this.handleMarkerChange.bind(this)}
            />
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
              this.state.description) ? null : "Some fields are required"}
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