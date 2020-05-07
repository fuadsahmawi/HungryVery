import React from 'react';

// Components
import RestaurantList from './RestaurantList';
import CustomerCRUD from './CustomerCRUD';

function Customer(){

  return (
    <div>
      <CustomerCRUD />
      <h4 className="text-center mt-5">Browse Restaurants Here</h4>
      <RestaurantList />
    </div>
  );
}

export default Customer;