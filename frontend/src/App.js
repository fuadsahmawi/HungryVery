import React from 'react';

// Components
import RestaurantList from './components/RestaurantList';

function App(){
  // function deleteMerchant() {
  //   let id = prompt('Enter merchant id');
  //   fetch(`http://localhost:3001/merchants/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(response => {
  //       return response.text();
  //     })
  //     .then(data => {
  //       alert(data);
  //       getMerchant();
  //     });
  // }

  // const { theme } = this.state;
  // const themeClass = theme ? theme.toLowerCase() : 'default';
  
  return (
    <div>
      <h1> Welcome to HungryVery, Fuad!</h1>
      <br/>
      <h2> Choose a Restaurant </h2>
      <br/>
      {/* <div>
        <span className={`h1 center-block text-center text-${theme ? themeClass : 'muted'}`} style={{ marginBottom: 25 }}>{theme || 'Default'}</span>
        
        <div className="center-block text-center">
          <DropdownButton title={`${theme || 'Default'} Theme`}>
            <Dropdown.Item eventKey="Primary" onSelect={this.chooseTheme}>Primary Theme</Dropdown.Item>
            <Dropdown.Item eventKey="Danger" onSelect={this.chooseTheme}>Danger Theme</Dropdown.Item>
            <Dropdown.Item eventKey="Success" onSelect={this.chooseTheme}>Success Theme</Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item eventKey="Reset" onSelect={this.chooseTheme}>Default Theme</Dropdown.Item>
          </DropdownButton>
        </div>
        
      </div> */}
    <RestaurantList />
    </div>
  );
}

export default App;