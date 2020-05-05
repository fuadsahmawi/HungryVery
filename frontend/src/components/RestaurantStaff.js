import React, { Fragment, useEffect, useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const RestaurantStaff = () => {
    const [restaurant, setRestaurant] = useState([]);
    const [summary, setSummary] = useState([]);
    const [promos, setPromos] = useState([]);

    const getRestaurants = async () => {
        try {
            const response = await fetch("http://localhost:3001/restaurant");
            const jsonData = await response.json();
            setRestaurant(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getSummary = async (evt) => {
        try {
            const response = await fetch("http://localhost:3001/monthly-restaurant/" + evt);
            const jsonData = await response.json();
            setSummary(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getPromotions = async (evt) => {
        try {
            const response = await fetch("http://localhost:3001/promotions-summary");
            const jsonData = await response.json();
            setPromos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getRestaurants();
        getPromotions();
    }, []);

    return (
        <Fragment>
            <DropdownButton id="dropdown-basic-button" title="Restaurants" onSelect={getSummary}>
                {restaurant.map(restaurant => (
                    <Dropdown.Item key={restaurant.rid} eventKey={restaurant.rid}>{restaurant.rname}</Dropdown.Item>
                ))}
            </DropdownButton>
            <br />
            <h2>Staff Summary Table</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Month</th>
                        <th>Number Of Orders</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.map(summary => (
                        <tr>
                            <td>{summary.rid}</td>
                            <td>{summary.month}</td>
                            <td>{summary.numOrders}</td>
                            <td>{summary.totalCost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <h2>Promotion Summary Table</h2>
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
                            <td>{promos.hoursDuration}</td>
                            <td>{promos.numberOfOrders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default RestaurantStaff;