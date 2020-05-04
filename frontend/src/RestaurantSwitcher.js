import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

class RestaurantSwitcher extends Component {

  state = { selected: '',
            list: ''}

  constructor(props){
    super(props);
    this.getRestaurantList = this.getRestaurantList.bind(this);
    this.state.selected = '';
    this.state.list = '';
  }
  
  
  selectRestaurant = (restaurant, evt) => {
    evt.preventDefault();
    if (restaurant.toLowerCase() === 'reset') { restaurant = null }
    this.setState({ selected: restaurant });
  }

  getRestaurantList() {
    fetch('http://localhost:3000/q1')
      .then(res => res.json())
      .then ((out) => {
        this.setState({list: out});
        //console.log(this.state.list);
      })
  
  }

  componentDidMount() {
    this.getRestaurantList();
  }
  
  render() {
  
    const selected = this.state.selected;
    const restaurantClass = selected ? selected.toLowerCase() : 'default';
    var listofRestaurant = [];
    const parentContainerStyles = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'table'
    };
    
    const subContainerStyles = {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'table-cell',
      verticalAlign: 'middle'
    };
    
    if (this.state.list != '') {
      this.state.list.forEach(restaurant => {
      listofRestaurant.push(<Dropdown.Item eventKey={restaurant.eid} id= "rest1" onSelect={this.selectRestaurant}>{restaurant.eid}</Dropdown.Item>);
      });
    }

    return (
      <div>
        <div>
          <span className={`h1 center-block text-center text-${selected ? restaurantClass : 'muted'}`} style={{ marginBottom: 25 }}>{selected || 'Default'}</span>
          
          <div id="switch" className="center-block text-center">
            <DropdownButton title={`${selected || 'Select Restaurant'}`}>
              {listofRestaurant}
            </DropdownButton>
          </div>
          
        </div>
      </div>
    );
    
  }
}
export default RestaurantSwitcher;