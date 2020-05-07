import React from 'react';

// Components
import RestaurantList from './RestaurantList';

function Restaurant(){

  return (
    <div>
      <h4 className="text-center mt-5">Browse Restaurants Here</h4>
      <RestaurantList />
    </div>
  );
}

export default Restaurant;