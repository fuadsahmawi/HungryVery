import React, { Fragment, useEffect, useState} from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import MenuItem from './MenuItem';

const RestaurantList = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [food, setFood] = useState([]);
  var [list, setList] = useState([]);

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
	if (selected) {
		//list.splice(list.indexOf(data.firstChild.innerText),1);
		list = list.filter(row => row.key !== data.firstChild.innerText);
	} else {
		list.push({key: data.firstChild.innerText, value : data});
	}
	setList(list);
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
  			<table>
    			<thead>
      				<tr>
        				<th>ID</th>
        				<th>Name</th>
        				<th>Category</th>
        				<th>Price</th>
						<th>Quantity</th>
      				</tr>
    			</thead>
    			<tbody>
					{list
						// <tr key={index}>
						// <td>{food.foodid}</td>
						// <td>{food.fname}</td>
						// <td>{food.category}</td>
						// <td>{food.price}</td>
						// <td><input type='text' defaultValue='Enter Quantity'></input></td>
						// </tr>
    				}
				</tbody>
 			</table>
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