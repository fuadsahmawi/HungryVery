import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

//Components
import Customer from './Customer.js';
import Restaurant from './Restaurant.js';
import Home from './Home.js';
import Staff from './RestaurantStaff';
import Manager from './FDSmanager.js';
import Rider from './RiderSummary.js';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div className="text-center mt-5">
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <div className="text-center mt-5">
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
    </div>
  ) : (
    <div className="text-center mt-5">
    <p>You are not logged in.</p>
    </div>
  )
))

export default function AuthExample () {
  return (
    <Router>
      <div>
        <AuthButton/>
        <center>
        <img src={require('./icon.png')} alt="Logo">
        </img>
        </center>
        <ul>
          <div className="text-center mt-5">
          <Link to="/"><button>Home</button></Link>{" "}
          <Link to="/account"><button onClick={() => {fakeAuth.signout()}}>Account</button></Link>{" "}
          <Link to="/restaurant"><button onClick={() => {fakeAuth.signout()}}>Restaurant</button></Link>{" "}
          <Link to="/staff"><button onClick={() => {fakeAuth.signout()}}>Staff</button></Link>{" "}
          <Link to="/manager"><button onClick={() => {fakeAuth.signout()}}>Manager</button></Link>{" "}
          <Link to="/rider"><button onClick={() => {fakeAuth.signout()}}>Rider</button></Link>{" "}
          </div>
        </ul>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path='/account' component={Customer} />
        <PrivateRoute path='/staff' component={Staff} />
        <PrivateRoute path='/manager' component={Manager} />
        <PrivateRoute path='/rider' component={Rider} />
        <PrivateRoute path='/restaurant' component={Restaurant} />
      </div>
    </Router>
  )
}