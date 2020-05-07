import React, { Fragment, useState } from "react";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

const RiderSummary = () => {
    const [update_riderid, seturid] = useState('');
    const [ridername, setName] = useState('');
    const [vnumber, setvnumber] = useState('');

    const [riderid, setRider] = useState('');
    const [summary, setSummary] = useState([]);

    const putUpdate = async (e) => {
        e.preventDefault();
        try {
            const body = {ridername,vnumber}
            const response = await fetch("http://localhost:3001/rider/" + update_riderid ,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            NotificationManager.success('Details updated', 'Successful!', 2000);
        } catch (err) {
            console.error(err.message);
            NotificationManager.error('Check whether Rider ID is correct', 'Error', 2000);
        }
    };

    const getSummary = async (evt) => {
        evt.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/monthly-rider/"+riderid);
            const jsonData = await response.json();
            setSummary(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

// Rider-Month: total number of orders delivered, avg delivery time, 
//              number of ratings for all orders, avg rating

// Rider-Week: 

    return (
        <Fragment>
            <h4 className="text-center mt-5">Update Rider Details</h4>
            <form className="d-flex mt-5" onSubmit={putUpdate}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={update_riderid} 
                    placeholder="Rider ID"
                    onChange={e => seturid(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={ridername} 
                    placeholder="Rider Name"
                    onChange={e => setName(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={vnumber} 
                    placeholder="Vehicle Number"
                    onChange={e => setvnumber(e.target.value)}>
                </input>
                <button className="btn btn-success">Update</button>
            </form>
            <h4 className="text-center mt-5">Rider Summary</h4>
            <form className="d-flex mt-5" onSubmit={getSummary}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={riderid} 
                    placeholder="Type Rider ID here"
                    onChange={e => setRider(e.target.value)}>
                </input>
                <button className="btn btn-success">Submit</button>
            </form>
            <h4 className="text-center mt-5">Rider Monthly Performance Table</h4>
            <br/>
            <table class="table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Number Of Orders Delivered</th>
                        <th>Total Delivery Fees</th>
                        <th>Average Delivery Time</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.map(summary => (
                        <tr>
                            <td>{summary.month}</td>
                            <td>{summary.numberoforders}</td>
                            <td>{summary.totaldeliveryfees}</td>
                            <td>{summary.averagedeliverytime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
        <NotificationContainer/>
        </Fragment>
    )
}

export default RiderSummary;