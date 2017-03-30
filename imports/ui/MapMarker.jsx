import React, {Component, PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card';

const mapIcon = {
    shelters: "nature",
    flood: "pool",
    fire: "whatshot",
    road: "traffic",
}

const hoverColor = {
    shelters: "#FFE082",
    fire: "#EF9A9A",
    flood: "#81D4FA",
    road: "#FFCC80",
}

const iconColor = {
    shelters: "#f4c20d",
    fire: "#db3236",
    flood: "#4885ed",
    road: "#FF9800",
}

export default class MapMarker extends Component {
    render(){
        return(
            <div className={this.props.kelas}>
                <FontIcon className="material-icons md-48" color={iconColor[this.props.type]} hoverColor={hoverColor[this.props.type]}>{mapIcon[this.props.type]}</FontIcon>
                <div className="marker-info" style={{backgroundColor:hoverColor[this.props.type]}}>
                    {this.props.address}
                    {/*<Card style={{backgroundColor:iconColor[this.props.type]}}>
                        <CardHeader title={this.props.address} subtitle={this.props.region}/>
                        <CardTitle title={this.props.type} subtitle={this.props.name} />
                        {this.props.desc? <CardText>
                            {this.props.desc}
                        </CardText> : null}
                    </Card>*/}
                </div>
            </div>
        )
    }
}