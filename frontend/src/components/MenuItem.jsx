import React from "react";

class MenuItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected : '',
            id : this.props.props.foodid,
            name : this.props.props.fname,
            category : this.props.props.category,
            price : this.props.props.price
        }
        if (props.handleChange) {
            this.handleChange = props.handleChange.bind(this);
            this.onClick = this.onClick.bind(this);
        }
    }

    onClick(e) {
        this.handleChange(this.props.props, this.state.isSelected);
        if (this.state.isSelected) {
            this.setState({isSelected : ''})
        } else {
            this.setState({isSelected : 'true'})
        }
    }

    render(){
        return (
            <tr onClick={this.onClick}>
                <td>{this.state.id}</td>
                <td>{this.state.name}</td>
                <td>{this.state.category}</td>
                <td>{this.state.price}</td>
            </tr>
        );
    }
}

export default MenuItem;