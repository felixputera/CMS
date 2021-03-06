import React from 'react';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import classnames from 'classnames';
import { Card, CardHeader } from 'material-ui/Card';

const DragHandle = SortableHandle(() => <FontIcon className="drag-handle material-icons">drag_handle</FontIcon>);

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

export const ReportItem = SortableElement (({value, checked, info, toggleCheck }) => 
            <li className={classnames("report-item", "report-item-" + value)}>
                <Checkbox
                label={value}
                labelPosition="right"
                defaultChecked={checked}
                onCheck={toggleCheck}
                style={{width:'180px'}}
                />
                <DragHandle />
                <div className="report-info">
                    <Card>
                        <CardHeader
                        title={value}
                        subtitle={"Total: "+info}/>
                    </Card>
                </div>
            </li>
            );