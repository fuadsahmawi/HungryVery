import React, { Fragment, useEffect, useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

/*
    Requirements should be met. May want to find name of five best items in each restaurant
*/

const RestaurantStaff = () => {
    const [restaurant, setRestaurant] = useState([]);
    const [summary, setSummary] = useState([]);
    const [promos, setPromos] = useState([]);
    const [topfive, setTopfive] = useState([]);

    const [fname, setFname] = useState("");
    const [category, setCategory] = useState("");
    const [amountOrdered, setAmountOrdered] = useState("");
    const [orderLimit, setOrderLimit] = useState("");
    const [price, setPrice] = useState("");

    const [sname,setSname] = useState("");
    const [rid, setRid] = useState("");

    const postStaff = async (e) => {
        e.preventDefault();
        try {
            const body = {sname,rid}
            const response = await fetch("http://localhost:3001/rstaff",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }; 

    const postFood = async (e) => {
        e.preventDefault();
        try {
            const body = {fname,category,amountOrdered,orderLimit,price}
            const response = await fetch("http://localhost:3001/food",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }; 

    const getRestaurants = async () => {
        try {
            const response = await fetch("http://localhost:3001/restaurant");
            const jsonData = await response.json();
            setRestaurant(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getData = async (evt) => {
        // Monthly total number of completed orders, total cost of completed orders
        try {
            const response = await fetch("http://localhost:3001/monthly-restaurant/" + evt);
            const jsonData = await response.json();
            setSummary(jsonData);
        } catch (err) {
            console.error(err.message);
        }
        // Top five food items of the restaurant
        try {
            const response = await fetch("http://localhost:3001/top-food/" + evt);
            const jsonData = await response.json();
            setTopfive(jsonData);
        } catch (err) {
            console.error(err.message);
        }
        try {
            const response = await fetch("http://localhost:3001/promotions-summary/" + evt);
            const jsonData = await response.json();
            setPromos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getRestaurants();
    }, []);

    return (
        <Fragment>
            <h4 className="text-center mt-5">Restaurant Staff Page</h4>
            <DropdownButton className="text-center mt-5" id="dropdown-basic-button" title="Restaurants" onSelect={getData}>
                {restaurant.map(restaurant => (
                    <Dropdown.Item key={restaurant.rid} eventKey={restaurant.rid}>{restaurant.rname}</Dropdown.Item>
                ))}
            </DropdownButton>
            <h4 className="text-center mt-5">Add New Staff</h4>
            <form className="d-flex mt-5" onSubmit={postStaff}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={sname} 
                    placeholder="Type new staff name here"
                    onChange={e => setSname(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={rid} 
                    placeholder="Type Restaurant ID here"
                    onChange={e => setRid(e.target.value)}>
                </input>
                <button className="btn btn-success">Submit</button>
            </form>
            <h4 className="text-center mt-5">Upload new food item</h4>
            <form className="d-flex mt-5" onSubmit={postFood}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={fname} 
                    placeholder="Food name"
                    onChange={e => setFname(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={category} 
                    placeholder="Category"
                    onChange={e => setCategory(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={amountOrdered} 
                    placeholder="Amount Ordered"
                    onChange={e => setAmountOrdered(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={orderLimit} 
                    placeholder="Number for Order Limit"
                    onChange={e => setOrderLimit(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={price} 
                    placeholder="Price"
                    onChange={e => setPrice(e.target.value)}>
                </input>
                
                <button className="btn btn-success">Submit</button>
            </form>

            <br />
            <h4 className="text-center mt-5">Staff Summary Table</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Number Of Orders</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.map(summary => (
                        <tr>
                            <td>{summary.month}</td>
                            <td>{summary.numorders}</td>
                            <td>{summary.totalcost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <h4 className="text-center mt-5">Top-Five items for restaurant</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th>Food ID</th>
                        <th>Number of Orders</th>                        
                    </tr>
                </thead>
                <tbody>
                    {topfive.map(topfive => (
                        <tr>
                            <td>{topfive.foodid}</td>
                            <td>{topfive.numorders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <h4 className="text-center mt-5">Promotion Summary Table</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th>Promotion ID</th>
                        <th>Promotion Name</th>
                        <th>Duration (Hours)</th>
                        <th>Number of Orders</th>
                    </tr>
                </thead>
                <tbody>
                    {promos.map(promos => (
                        <tr>
                            <td>{promos.promoid}</td>
                            <td>{promos.pname}</td>
                            <td>{promos.hoursduration}</td>
                            <td>{promos.numberoforders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default RestaurantStaff;