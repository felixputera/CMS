import React, { Component, PropTypes } from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
// import ReactDOM from 'react-dom';

const DragHandle = SortableHandle(() => <span className="drag-handle">::</span>);

const SortableItem = SortableElement(({value}) =>
    <li>
        <input
          type="checkbox"
          readOnly
          checked={true}
          onClick={this.toggleHideShelter}
        />
        {value}
        <DragHandle />
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
            order: this.props.order,
            // parentSideBar: this.props.parentSideBar,
        }
    }
    
    onSortEnd({oldIndex, newIndex}){
        this.setState ({
            order: arrayMove(this.state.order, oldIndex, newIndex),
        });

        // () => this.state.parentSideBar.state.mainMap.setState ({
        //     order: this.state.order,
        // });

        // () => this.state.parentSideBar.state.mainMap.refresh();

        this.props.onOrderChanged(this.state.order);

        // console.log(() => {return this.props.parentSideBar.props.mainMap.state.order});
        // console.log(this.props.parentSideBar.props.mainMap.props.order);
    };

    render() {
        return <SortableList className="reports"
        helperClass="dragging"
        items={this.state.order}
        onSortEnd={this.onSortEnd.bind(this)} 
        useDragHandle={true}
        lockAxis='y'/>;
    }
}

// Reports.propTypes = {
//     parentSideBar: PropTypes.object.isRequired,
// }