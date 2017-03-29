import React, { Component, PropTypes } from 'react';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import Checkbox from 'material-ui/Checkbox';

const DragHandle = SortableHandle(() => <span className="drag-handle">::</span>);

/*export default class ReportItem extends SortableElement {

    render(){
        return (
            <li>
                <input
                type="checkbox"
                readOnly
                checked={this.props.checked}
                onClick={this.props.toggleCheck(this.props.value, !this.props.checked).bind(this)}
                />
                {this.props.value}
                <DragHandle />
            </li>
        );
    }
}*/

export const ReportItem = SortableElement (({value, checked, toggleCheck }) => 
            <li className="report-item">
                {/*<input
                type="checkbox"
                defaultChecked={checked}
                onChange={toggleCheck(value, !checked)}
                />*/}
                <Checkbox
                label={value}
                labelPosition="right"
                defaultChecked={checked}
                style={{marginBottom: 16}}
                onCheck={toggleCheck}
                style={{width:'180px'}}
                />
                <DragHandle />
            </li>
            )