import React from 'react';

// Components
import CustomerCRUD from './CustomerCRUD';

function Customer(){

  return (
    <div>
      <h3 className="text-center mt-5">Your Account</h3>
      <CustomerCRUD />
    </div>
  );
}

export default Customer;