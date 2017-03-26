import React, { Component, PropTypes } from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span className="drag-handle">::</span>);

const SortableItem = SortableElement(({value}) =>
    <li>
      <DragHandle />
      {value}
    </li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export default class Reports extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        };
    }
    
    onSortEnd({oldIndex, newIndex}){
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    render() {
        return <SortableList className="reports"
        helperClass="dragging"
        items={this.state.items}
        onSortEnd={this.onSortEnd.bind(this)} 
        useDragHandle={true}
        lockAxis='y'/>;
    }
}