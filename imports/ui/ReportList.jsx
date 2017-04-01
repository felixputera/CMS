import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';

import { ReportItem } from './ReportItem.jsx';

/*export default class ReportList extends SortableContainer {

    // updateState(name, check){
    //     console.log(name, check);
    // }

    render(){
        return (
            <ul>
            {this.props.items.map((value, index) => (
                <ReportItem key={`item-${index}`} index={index} value={value.name} checked={!value.hide} toggleCheck={this.props.updateState}/>
            ))}
            </ul>
        );
    }
}*/

export const ReportList = SortableContainer (({items, info, updateState})=>
            <ul>
            {items.map((value, index) => (
                <ReportItem
                key={`item-${index}`}
                index={index}
                value={value.name}
                checked={!value.hide}
                info={info[value.name]}
                toggleCheck={updateState}/>
            ))}
            </ul>
        );