import React, { Fragment, useState } from "react";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

const SignUp = () => {

    const [cname, setcname] = useState('');
    const [contact, setcontact] = useState('');

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

    return (
        <Fragment>
        <div>
          <p className="text-center mt-5">Sign up Here</p>
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
            <NotificationContainer/>
        </div>
        </Fragment>
)}

export default SignUp;
