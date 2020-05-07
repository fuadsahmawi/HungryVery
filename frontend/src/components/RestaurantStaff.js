import React, { Fragment, useEffect, useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';


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

    const [newname, setnewname] = useState('');
    const [staffid, setstaffid] = useState('');

    const [pname,setpname] = useState('');
    const [discount, setdiscount] = useState('');
    const [startdate, setstart] = useState();
    const [enddate, setend] = useState();

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
            NotificationManager.success('New staff added!', 'Successful!', 2000);
        } catch (err) {
            console.error(err.message);
            NotificationManager.error('Check whether Restaurant ID is correct', 'Error', 2000);
        }
    }; 

    const updateStaff = async (e) => {
        e.preventDefault();
        try {
            const body = {newname}
            const response = await fetch("http://localhost:3001/rstaff/" + staffid,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            NotificationManager.success('Staff name updated', 'Successful!', 2000);
        } catch (err) {
            console.error(err.message);
            NotificationManager.error('Check whether Staff ID is correct', 'Error', 2000);
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
            if (response.status === 200) {
            NotificationManager.success('Food added', 'Successful!', 2000);
        } else {
            NotificationManager.error('Check whether number for order is smaller than amount ordered', 'Error', 2000);
        }
        } catch (err) {
            console.error(err.message);
            NotificationManager.error('Food cannot be added', 'Error', 2000);
        }
    }; 

    const postPromotion = async (e) => {
        e.preventDefault();
        try {
            const body = {pname,discount,startdate,enddate}
            const response = await fetch("http://localhost:3001/promotions",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            if (response.status === 200) {
            NotificationManager.success('New promotion added!', 'Successful!', 2000);
            } else {
            NotificationManager.error('Check if you entered end date earlier than start date', 'Error', 2000);
            }
        } catch (err) {
            console.error(err.message);
            NotificationManager.error('Promotion cannot be added', 'Error', 2000);
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

    const getPromoSummary = async () => {
        try {
            const response = await fetch("http://localhost:3001/promotions-summary/");
            const jsonData = await response.json();
            setPromos(jsonData);
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
    }

    useEffect(() => {
        getRestaurants();
        getPromoSummary();
    }, []);

    return (
        <Fragment>
            <h4 className="text-center mt-5">Restaurant Staff Page</h4>
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
            <h4 className="text-center mt-5">Update Staff Name</h4>
            <form className="d-flex mt-5" onSubmit={updateStaff}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={newname} 
                    placeholder="Type new staff name here"
                    onChange={e => setnewname(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={staffid} 
                    placeholder="Type Staff ID here"
                    onChange={e => setstaffid(e.target.value)}>
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
            
            <h4 className="text-center mt-5">Add New Promotion</h4>
            <form className="d-flex mt-5" onSubmit={postPromotion}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={pname} 
                    placeholder="Type Promotion name here"
                    onChange={e => setpname(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={discount} 
                    placeholder="Type Discount here"
                    onChange={e => setdiscount(e.target.value)}>
                </input>
                <input 
                    type="datetime-local" 
                    className="form-control" 
                    value={startdate} 
                    onChange={e => setstart(e.target.value)}>
                </input>
                <input 
                    type="datetime-local" 
                    className="form-control" 
                    value={enddate} 
                    onChange={e => setend(e.target.value)}>
                </input>
                <button className="btn btn-success">Submit</button>
            </form>
            <br />
            <DropdownButton className="text-center mt-5" id="dropdown-basic-button" title="Restaurants" onSelect={getData}>
                {restaurant.map(restaurant => (
                    <Dropdown.Item key={restaurant.rid} eventKey={restaurant.rid}>{restaurant.rname}</Dropdown.Item>
                ))}
            </DropdownButton>
            <h4 className="text-center mt-5">Staff Summary Table</h4>
            <br/>
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
            <h4 className="text-center mt-5">Top Five Items</h4>
            <br/>
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
            <br/>
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
        <NotificationContainer/>
        </Fragment>
    )
}

export default RestaurantStaff;