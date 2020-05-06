import React, { Fragment, useEffect, useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

/*
    TODO:
    2. For each month, for each customer, find total number of orders placed by that customer for that month and total cost of the orders
    3. For each hour, for each location, find total number of orders during each hour per location
*/

const FDSManager = () => {
    const [monthlyOrdersAndCost, setMonthlyOrdersAndCost] = useState([]);
    const [hourlyOrderSummary, setHourlyOrderSummary] = useState([]);
    const [locations, setLocations] = useState([]);
    const [monthlyDeliverySummary, setMonthlyDeliverySummary] = useState([]);

    const getMonthlyOrdersAndCost = async () => {
        try {
            const response = await fetch("http://localhost:3001/monthly-summary");
            const jsonData = await response.json();
            setMonthlyOrdersAndCost(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getHourlyOrderSummary = async (evt) => {
        try {
            const response = await fetch("http://localhost:3001/hourly-order/" + evt);
            const jsonData = await response.json();
            setHourlyOrderSummary(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getLocations = async (evt) => {
        try {
            const response = await fetch("http://localhost:3001/locations");
            const jsonData = await response.json();
            setLocations(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getMonthlyDeliverySummary = async (evt) => {
        try {
            const response = await fetch("http://localhost:3001/monthly-delivery");
            const jsonData = await response.json();
            setMonthlyDeliverySummary(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getMonthlyOrdersAndCost();
        getLocations();
        getMonthlyDeliverySummary();
    }, []);

    return (
        <Fragment>
            <h2>FDS Manager Page</h2>
            <br />
            <h2>Summary for each month</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Total Number of orders</th>
                        <th>Total Cost of all orders</th>
                    </tr>
                </thead>
                <tbody>
                    {monthlyOrdersAndCost.map(monthlyOrdersAndCost => (
                        <tr>
                            <td>{monthlyOrdersAndCost.month}</td>
                            <td>{monthlyOrdersAndCost.totalorders}</td>
                            <td>{monthlyOrdersAndCost.totalcost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <h2>Rider Monthly Summary Table</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Rider ID</th>
                        <th>Month</th>
                        <th>Total number of Orders</th>
                        <th>Total cost</th>
                    </tr>
                </thead>
                <tbody>
                    {monthlyDeliverySummary.map(monthlyDeliverySummary => (
                        <tr>
                            <td>{monthlyDeliverySummary.riderid}</td>
                            <td>{monthlyDeliverySummary.month}</td>
                            <td>{monthlyDeliverySummary.numberoforders}</td>
                            <td>{monthlyDeliverySummary.totalcostoforders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default FDSManager;