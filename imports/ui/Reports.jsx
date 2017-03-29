import React, { Component, PropTypes } from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
// import ReactDOM from 'react-dom';

import { ReportList } from './ReportList.jsx';

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

    doCheckUpdate(event, check){
        let newOrder = this.state.order;
        let name = event.target.nextSibling.firstChild.nextSibling.innerHTML;
        newOrder.forEach((pair) => {
            if(pair.name == name) {
                pair.hide = !check;
            }
        });
        this.props.onOrderChanged(newOrder);
    }

    // componentDidMount(){
    //     return true;
    // }

    render() {
        return (
            <ReportList className="reports"
            helperClass="dragging"
            items={this.state.order}
            onSortEnd={this.onSortEnd.bind(this)} 
            useDragHandle={true}
            lockAxis='y'
            updateState={this.doCheckUpdate.bind(this)}/>
        );
    }
}

// Reports.propTypes = {
//     parentSideBar: PropTypes.object.isRequired,
// }