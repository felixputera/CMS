import React, {Component, PropTypes} from 'react';

export default class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caller: '',
      number: '',
      address: ''
    };
    this.baseState = this.state;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const type = React.findDOMNode(this.refs.type).value.trim();
    const caller = React.findDOMNode(this.refs.caller).value.trim();
    const number = React.findDOMNode(this.refs.number).value.trim();
    const address = React.findDOMNode(this.refs.address).value.trim();
    if (!type || !caller || !number || !address) {
        return;
    }

    Meteor.call('requests.insert',type, caller,number,address);

    React.findDOMNode(this.refs.caller).value = '';
    React.findDOMNode(this.refs.number).value = '';
    React.findDOMNode(this.refs.address).value = '';
    return;
  }

  handleReset(event) {
    this.setState(this.baseState);
  }

  render() {
    return (
      <form>
        <label>
          NEW 
          <select ref="type" name="type" value={this.state.type} onChange={this.handleInputChange}>
            <option value="ambulance">Emergency Ambulance</option>
            <option value="gasControl">Gas Leak Control</option>
          </select>
        </label>
        <br />
        <label>
          Name:
          <br />
          <input
            name="caller"
            type="text"
            ref="caller"
            value={this.state.caller}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Mobile Number:
          <br />
          <input
            name="number"
            type="text"
            ref="number"
            value={this.state.number}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Address:
          <br />
          <textarea
            name="address"
            type="text"
            ref="address"
            value={this.state.number}
            onChange={this.handleInputChange} />
        </label>
        <button
          onClick={this.handleReset}
          type="button">Reset</button>
        <button
          onClick={this.handleSubmit}
          type="submit">Submit</button>
      </form>
    );
  }
}