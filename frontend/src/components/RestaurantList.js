import React, { Fragment, useEffect, useState} from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import MenuItem from './MenuItem';
import Cart from './Cart';

const RestaurantList = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [food, setFood] = useState([]);
  const [list, setList] = useState([]);

  const getRestaurants = async () => {
  	try {
  		const response = await fetch ("http://localhost:3001/restaurant");
  		const jsonData = await response.json();
  		setRestaurant(jsonData);
  	} catch (err) {
  		console.error(err.message);
  	}
  };

  const getFood = async (evt) => {
  	try {
    	const response = await fetch ("http://localhost:3001/food/" + evt);
    	const jsonData = await response.json();
    	setFood(jsonData);
	} catch (err) {
		console.error(err.message);
	}
  }

  function handleChange(data, selected) {
	  var temp = [];
	if (selected) {
		temp = list.filter(row => row.foodid !== data.foodid);
	} else {
		temp = list;
		temp.push(data);
	}
	setList(temp);
  }

  useEffect(() => {
    getRestaurants();
  }, []);

	return (
		<Fragment>	
      		<DropdownButton id="dropdown-basic-button" title="Restaurants" onSelect={getFood}>
      			{restaurant.map(restaurant => (
      			<Dropdown.Item key = { restaurant.rid } eventKey={restaurant.rid}>{restaurant.rname}</Dropdown.Item>
      		))}	
      		</DropdownButton>  
      		<br />
  			<Cart props={list}/>
			<br/>
  			<table className="table">
    			<thead>
      				<tr>
        				<th>ID</th>
        				<th>Name</th>
        				<th>Category</th>
        				<th>Price</th>
      				</tr>
    			</thead>
    			<tbody>
    				{food.map(food =>
						<MenuItem key={food.foodid} handleChange={handleChange} props={food}/>
    				)}
				</tbody>
 			</table>
      	</Fragment>  				
	)
}

export default RestaurantList;