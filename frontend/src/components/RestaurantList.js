import React, { Fragment, useEffect, useState} from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const RestaurantList = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [food, setFood] = useState([]);
  const [cart, setCart] = useState([]);

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

  const addToCart = async (id) => {
    try {
      const response = await fetch ("http://localhost:3001/cart/" + id);
      var jsonData = await response.json();
      const jsonList = jsonData.concat(cart);
      setCart(jsonList);
    } catch (err) {
      console.error(err.message);
    }
  }

  const removeFromCart = async (id) => {
    try {
      var jsonList = cart;
      jsonList = jsonList.splice(jsonList[id]);
      setCart(jsonList);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getRestaurants();
  }, []);

	return (
		<Fragment>	
      		<DropdownButton className="text-center mt-5" id="dropdown-basic-button" title="Restaurants" onSelect={getFood}>
      			{restaurant.map(restaurant => (
      			<Dropdown.Item key = { restaurant.rid } eventKey={restaurant.rid}>{restaurant.rname}</Dropdown.Item>
      		))}	
      		</DropdownButton>  
      		<br />
			<br/>
  			<table className="table">
    			<thead>
      				<tr>
        				<th>ID</th>
        				<th>Name</th>
        				<th>Category</th>
        				<th>Price</th>
                <th>Add to Cart</th>
      				</tr>
    			</thead>
    			<tbody>
    				{food.map(food => (
		          <tr key={food.foodid}>
                <td>{food.foodid}</td>
                <td>{food.fname}</td>
                <td>{food.category}</td>  
                <td>{food.price}</td>
                <td><button onClick={() => addToCart(food.foodid)}>Add to Cart</button></td>
              </tr>                  
    				))}
				  </tbody>
 			  </table>
      <br / >
      <h4 className="text-center mt-5">Your Cart</h4>
      <br />
        <table className="table">
          <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Remove from Cart</th>
              </tr>
          </thead>
          <tbody>
            {cart.map(cart => (
              <tr key={cart.foodid}>
                <td>{cart.foodid}</td>
                <td>{cart.fname}</td>
                <td>{cart.category}</td>  
                <td>{cart.price}</td>
                <td><button onClick={() => removeFromCart(cart.foodid)}>Remove</button></td>
              </tr>                  
            ))}
          </tbody>
        </table>
    </Fragment>  				
	)
}

export default RestaurantList;