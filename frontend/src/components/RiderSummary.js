import React, { Fragment, useEffect, useState } from "react";

const RiderSummary = () => {
    const [riderid, setRider] = useState("");
    const [summary, setSummary] = useState([]);

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
            <h4 className="text-center mt-5">Rider Summary Page</h4>
            <form className="d-flex mt-5" onSubmit={getSummary}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={riderid} 
                    onChange={e => setRider(e.target.value)}>
                </input>
                <button className="btn btn-success">Submit</button>
            </form>
            <h4 className="text-center mt-5">Rider Monthly Performance Table</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Number Of Orders Delivered</th>
                        {/* <th>Average Delivery Time</th>
                        <th>Number of ratings over all orders</th>
                        <th>Average Rating</th> */}
                    </tr>
                </thead>
                <tbody>
                    {summary.map(summary => (
                        <tr>
                            <td>{summary.month}</td>
                            <td>{summary.numberoforders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
        </Fragment>
    )
}

export default RiderSummary;