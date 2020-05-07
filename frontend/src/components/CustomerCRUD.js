import React, { Fragment, useState } from "react";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

const CustomerCRUD = () => {
    const [cid, setcid] = useState('');
    const [u_cname, setucname] = useState('');
    const [u_contact, setucontact] = useState('');

    const [cname, setcname] = useState('');
    const [contact, setcontact] = useState('');

    const [g_cid, setgcid] = useState('');
    const [summary, setSummary] = useState([]);

    const [d_cid, setdcid] = useState('');

    const putUpdate = async (e) => {
        e.preventDefault();
        try {
            const body = {u_cname,u_contact}
            const response = await fetch("http://localhost:3001/customer/" + cid ,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteCustomer = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/customer/" + d_cid ,{
                method: "DELETE"
            });
            console.log(response);
            NotificationManager.success('Customer Deleted', 'Successful', 2000);
        } catch (err) {
            console.error(err.message);
            NotificationManager.error('Check whether Customer ID is correct', 'Error', 2000);
        }
    };

    const getSummary = async (evt) => {
        evt.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/customer/"+g_cid);
            const jsonData = await response.json();
            setSummary(jsonData);
            NotificationManager.success('Details Retrieved', 'Successful!', 2000);
        } catch (err) {
            console.error(err.message);
            NotificationManager.error('Check whether Customer ID is correct', 'Error', 2000);
        }
    }
    
    const postNewCustomer = async (evt) => {
        evt.preventDefault();
        try {
            const body = {cname, contact}
            const response = await fetch("http://localhost:3001/customer",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            NotificationManager.success('New customer added!', 'Successful!', 2000);
        } catch (err) {
            console.error(err.message);
        }
    }
// Rider-Month: total number of orders delivered, avg delivery time, 
//              number of ratings for all orders, avg rating

// Rider-Week: 

    return (
        <Fragment>
            <h4 className="text-center mt-5">Get Customer Details</h4>
            <form className="d-flex mt-5" onSubmit={getSummary}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={g_cid} 
                    placeholder="Customer ID"
                    onChange={e => setgcid(e.target.value)}>
                </input>
                <button className="btn btn-success">Retrieve</button>
            </form>
            <h4 className="text-center mt-5">Customer Details</h4>
            <br/>
            <table class="table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Contact</th>
                        <th>Reward Points</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.map(summary => (
                        <tr>
                            <td>{summary.cname}</td>
                            <td>{summary.contact}</td>
                            <td>{summary.rewardpoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4 className="text-center mt-5">New Customer</h4>
            <form className="d-flex mt-5" onSubmit={postNewCustomer}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={cname} 
                    placeholder="Type Name here"
                    onChange={e => setcname(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={contact} 
                    placeholder="Type Contact Number here"
                    onChange={e => setcontact(e.target.value)}>
                </input>
                <button className="btn btn-success">Submit</button>
            </form>
            <h4 className="text-center mt-5">Delete Customer</h4>
            <form className="d-flex mt-5" onSubmit={deleteCustomer}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={d_cid} 
                    placeholder="Type Customer ID here"
                    onChange={e => setdcid(e.target.value)}>
                </input>
                <button className="btn btn-danger">Delete</button>
            </form>
            <h4 className="text-center mt-5">Update Customer</h4>
            <form className="d-flex mt-5" onSubmit={putUpdate}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={cid} 
                    placeholder="Type Customer ID here"
                    onChange={e => setcid(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={u_cname} 
                    placeholder="Type Name here"
                    onChange={e => setucname(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="form-control" 
                    value={u_contact} 
                    placeholder="Type Contact Number here"
                    onChange={e => setucontact(e.target.value)}>
                </input>
                <button className="btn btn-success">Update</button>
            </form>
            
            <br />
            <NotificationContainer/>
        </Fragment>
    )
}

export default CustomerCRUD;