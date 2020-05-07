import React, { Fragment, useEffect, useState} from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import QuantityPicker from './QuantityPicker.js'

const RestaurantList = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [selected, setSelected] = useState('');
  const [food, setFood] = useState([]);
  const [review, setReview] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [view, setView] = useState('');
  const [cid, setCid] = useState('');
  const [dlocation, setDlocation] = useState('');
  const [postalcode, setPostalcode] = useState('');

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
      setSelected(evt);
      getReview(evt);
      setCart([]);
      setCartPrice([]);
      setView(0);
    	const response = await fetch ("http://localhost:3001/food/" + evt);
    	const jsonData = await response.json();
    	setFood(jsonData);
	  } catch (err) {
		console.error(err.message);
	  }
  }

  const getReview = async (evt) => {
    try {
      const response = await fetch ("http://localhost:3001/review/" + evt);
      const jsonData = await response.json();
      setReview(jsonData);
    } catch (err) {
    console.error(err.message);
    }
  }

  const addToCart = async (id) => {
    try {
      for (var index = 0; index < cart.length; index++) {
        if (id === cart[index].foodid) {
          alert("Item is already in cart!");
          return;
        }
    }
      const response = await fetch ("http://localhost:3001/cart/" + id);
      var jsonData = await response.json();
      var item = jsonData[0];
      if (item.orderlimit - item.amountordered <= 0) {
        alert("Item is currently out of stock!");
        return;
      }
      item.quantity = 1;
      var jsonList = jsonData.concat(cart);
      updateCart(jsonList);
    } catch (err) {
      console.error(err.message);
    }
  }

  const removeFromCart = async (id) => {
    try {
      const jsonList = cart;
      for (var index = 0; index < jsonList.length; index++) {
        if (jsonList[index].foodid === id) {
          jsonList.splice(index, 1);
          break;
        }
      }
      getRestaurants();
      updateCart(jsonList);
    } catch (err) {
      console.error(err.message);
    }
  }

  function updateCart (array) {
    var totalPrice = 0;
      for (var index = 0; index < array.length; index++) {
        totalPrice = totalPrice + (array[index].price * array[index].quantity);
      }
      const totalPriceJson = [{ totalPrice: totalPrice }];
      setCart(array);
      setCartPrice(totalPriceJson);
  }

  function handleChange(idchange, quantity) {
    for (var index = 0; index < cart.length; index++) {
      if (idchange === cart[index].foodid) {
        cart[index].quantity = quantity;
      }
    }
    updateCart(cart);
  }

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
        const today = new Date();
        const timeStamp = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const body = {cart, dlocation, postalcode, timeStamp, cartPrice, selected}
        const response = await fetch("http://localhost:3001/order/" + cid ,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        console.log(response);
    } catch (err) {
        console.error(err.message);
    }
};

  useEffect(() => {
    getRestaurants();
  }, []);

  var menuFrag = (view === 0) ? <div>
  <h4 className="text-center mt-5">Menu</h4>
  <br/>
    <table className="table">
      <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
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
            <td>{food.orderlimit - food.amountordered}</td>  
            <td>{food.price}</td>
            <td><button onClick={() => addToCart(food.foodid)}>Add to Cart</button></td>
          </tr>                  
        ))}
      </tbody>
     </table>
    </div>
    :
    <div/>

  var reviewFrag = (view === 1) ? <div>
  <h4 className="text-center mt-5">Reviews</h4>
  <br/>
  <table className="table">
    <thead>
        <tr>
          <th>ID</th>
          <th>Rating</th>
          <th>Review</th>
          <th>Customer</th>
        </tr>
    </thead>
    <tbody>
      {review.map(review => (
        <tr key={review.reviewid}>
          <td>{review.reviewid}</td>
          <td>{review.foodrating}</td>
          <td>{review.foodreview}</td>  
          <td>{review.cname}</td> 
        </tr>                  
      ))}
    </tbody>
  </table>
  </div>
  :
  <div/>

  var cartFrag = (view === 2) ?
  <div>
  <h4 className="text-center mt-5">Your Cart</h4>
  <br />
    <table className="table">
      <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove from Cart</th>
          </tr>
      </thead>
      <tbody>
        {cart.map(cart => (
          <tr>
            <td>{cart.foodid}</td>
            <td>{cart.fname}</td>
            <td>{cart.category}</td>  
            <td>{cart.orderlimit - cart.amountordered}</td> 
            <td>{cart.price}</td>
            <td><QuantityPicker handleChange={handleChange} key= {cart.foodid} id =  {cart.foodid} min={1} max={cart.orderlimit - cart.amountordered}/></td>
            <td><button onClick={() => removeFromCart(cart.foodid)}>Remove</button></td>
          </tr>                  
        ))}
      </tbody>
    </table>
    <h4 className="text-center mt-5">Confirm Order</h4>
    <br />
    <form className="d-flex mt-5">
      <input type="text" className="form-control" value={cid} placeholder="Customer Id" onChange={e => setCid(e.target.value)} />
      <input type="text" className="form-control" value={dlocation} placeholder="Delivery Address" onChange={e => setDlocation(e.target.value)}/>
      <input type="text" className="form-control" value={postalcode} placeholder="Postal Code" onChange={e => setPostalcode(e.target.value)}/>
  </form>
    <table className="table">
      <thead>
          <tr>
            <th>Total Price</th>
            <th>Order</th>
          </tr>
      </thead>
      <tbody>
        {cartPrice.map(cartPrice => (
          <tr key={cartPrice.totalPrice}>
            <td>${cartPrice.totalPrice}</td>
            <td><button onClick={submitOrder}>Order</button></td>
          </tr> 
        ))}                 
      </tbody>
    </table>
    </div>
    :
    <div/>

	return (
		<Fragment>	
      		<DropdownButton className="text-center mt-5" id="dropdown-basic-button" title="Restaurants" onSelect={getFood}>
      			{restaurant.map(restaurant => (
      			<Dropdown.Item key = { restaurant.rid } eventKey={restaurant.rid}>{restaurant.rname}</Dropdown.Item>
      		))}	
      		</DropdownButton>
          <br/>
          <center>
          <button onClick={() => setView(0)}>Menu</button>{" "}
          <button onClick={() => setView(1)}>Reviews</button>{" "}
          <button onClick={() => setView(2)}>Cart</button>
          </center>
      {menuFrag}
      {reviewFrag}
      {cartFrag}
    </Fragment>  				
	)
}

export default RestaurantList;