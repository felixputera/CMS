import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';

const mapIcon = {
    shelters: "nature",
    flood: "pool",
    fire: "whatshot",
    road: "traffic",
    add: "add_location",
}

const hoverColor = {
    shelters: "#FFE082",
    fire: "#EF9A9A",
    flood: "#81D4FA",
    road: "#FFCC80",
    add: "#404040",
}

const iconColor = {
    shelters: "#f4c20d",
    fire: "#db3236",
    flood: "#4885ed",
    road: "#FF9800",
    add: "#404040",
}

export default class MapMarker extends Component {
    constructor(props){
        super(props);
        this.state = {
            showInfo: false,
        };
    }

    toggleClickOrClear(){
        if (this.props.type == "add"){
            console.log("ini marker add");
        }
    }

    render(){
        return(
            <div className={this.props.kelas}>
                {/*<IconButton onTouchTap={this.toggleClickOrClear.bind(this)}>*/}
                <FontIcon className="material-icons md-48"
                color={iconColor[this.props.type]}
                hoverColor={hoverColor[this.props.type]}
                >
                    {mapIcon[this.props.type]}
                </FontIcon>
                {/*</IconButton>*/}
                <div className="marker-info" style={{backgroundColor:"#FAFAFA"}}>
                    {this.props.address}
                </div>
            </div>
        )
    }
}