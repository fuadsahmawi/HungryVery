import React, {useState, useEffect} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import RestaurantSwitcher from './RestaurantSwitcher';

function App(){
  var [merchants, setMerchants, test] = useState(false);

  useEffect(() => {
    getMerchant();
  }, []);

  function getMerchant() {
    fetch('http://localhost:3001/e')
      .then(response => {
        test = response.json();
      })
      .then(data => {
        setMerchants(data);
      });
  }

  function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
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
    <RestaurantSwitcher ListOfRestaurants={test} ></RestaurantSwitcher>
    {merchants ? merchants : 'There is no Employee data available'}
    <DropdownButton id="dropdown-basic-button" title="Restaurant">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item><br />
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item><br />
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item><br />
    </DropdownButton>

    <DropdownButton id="dropdown-basic-button" title="Filter">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item><br />
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item><br />
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item><br />
    </DropdownButton>
    <br />
    <p>Total</p>
    <button onClick={createMerchant}>Order</button>
    <br />
    <ListGroup>
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
    </div>
  );
}

export default App;