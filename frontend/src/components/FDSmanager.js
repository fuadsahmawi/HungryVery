import React, { Fragment, useEffect, useState } from "react";

/*
    TODO:
    2. For each month, for each customer, find total number of orders placed by that customer for that month and total cost of the orders
    3. For each hour, for each location, find total number of orders during each hour per location
*/

const FDSManager = () => {
    const [monthlyOrdersAndCost, setMonthlyOrdersAndCost] = useState([]);
    const [hourlyOrderSummary, setHourlyOrderSummary] = useState([]);
    const [monthlyDeliverySummary, setMonthlyDeliverySummary] = useState([]);

    // const [ftid, setftid] = useState('');
    // const [ptid, setptid] = useState('');
    
    // const deleteFT = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch("http://localhost:3001/riderft/" + ftid ,{
    //             method: "DELETE"
    //         });
    //         console.log(response);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // };

    // const deletePT = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch("http://localhost:3001/riderpt/" + ptid ,{
    //             method: "DELETE"
    //         });
    //         console.log(response);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // };
    

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
            const response = await fetch("http://localhost:3001/hourly-order");
            const jsonData = await response.json();
            setHourlyOrderSummary(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    // const getLocations = async (evt) => {
    //     try {
    //         const response = await fetch("http://localhost:3001/locations");
    //         const jsonData = await response.json();
    //         setLocations(jsonData);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

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
        getMonthlyDeliverySummary();
        getHourlyOrderSummary();
    }, []);

    return (
        <Fragment>
            <h4 className="text-center mt-5">FDS Manager Page</h4>
            <br />
            {/* <h4 className="text-center mt-5">Delete Full Time Rider</h4>
            <form className="d-flex mt-5" onSubmit={deleteFT}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={ftid} 
                    placeholder="Full time rider ID"
                    onChange={e => setftid(e.target.value)}>
                </input>
                <button className="btn btn-success">Delete Fulltimer</button>
            </form>
            <h4 className="text-center mt-5">Delete Part Time Rider</h4>
            <form className="d-flex mt-5" onSubmit={deletePT}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={ptid} 
                    placeholder="Part time rider ID"
                    onChange={e => setptid(e.target.value)}>
                </input>
                <button className="btn btn-success">Delete Parttimer</button>
            </form> */}
            <h4 className="text-center mt-5">Monthly Order Summary</h4>
            <br/>
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
            <h4 className="text-center mt-5">District Hourly Order Summary</h4>
            <br/>
            <table class="table">
                <thead>
                    <tr>
                        <th>District</th>
                        <th>Hour</th>
                        <th>Total Orders</th>
                    </tr>
                </thead>
                <tbody>
                    {hourlyOrderSummary.map(hourlyOrderSummary => (
                        <tr>
                            <td>{hourlyOrderSummary.district}</td>
                            <td>{hourlyOrderSummary.hour}</td>
                            <td>{hourlyOrderSummary.totalorders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <h4 className="text-center mt-5">Monthly Summary of Rider Performance</h4>
            <br />
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