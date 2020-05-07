import React from 'react';
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

const fakeAuthC = {
  isAuthenticatedC: false,
  authenticate(cb) {
    this.isAuthenticatedC = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticatedC = false
    setTimeout(cb, 100)
  }
}

const fakeAuthS = {
  isAuthenticatedS: false,
  authenticate(cb) {
    this.isAuthenticatedS = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticatedS = false
    setTimeout(cb, 100)
  }
}

const fakeAuthM = {
  isAuthenticatedM: false,
  authenticate(cb) {
    this.isAuthenticatedM = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticatedM = false
    setTimeout(cb, 100)
  }
}

const fakeAuthR = {
  isAuthenticatedR: false,
  authenticate(cb) {
    this.isAuthenticatedR = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticatedR = false
    setTimeout(cb, 100)
  }
}

const user = {
  id: '',
  setUser(id) {
    this.id = id
    console.log(id)
  }
}

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    if (user.id === 'customer') {
      fakeAuthC.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer: true
        }))
      })
    }
    if (user.id === 'staff') {
      fakeAuthS.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer: true
        }))
      })
    }
    if (user.id === 'manager') {
      fakeAuthM.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer: true
        }))
      })
    }
    if (user.id === 'rider') {
      fakeAuthR.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer: true
        }))
      })
    }
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
          <form className="d-flex mt-5">
            <input
              type="text" 
              className="form-control" 
              id={user}
              placeholder="ID"
              onChange={e => user.setUser(e.target.value)}>
            </input>
          </form>
          <button className="btn btn-success" onClick={this.login}>Login</button>
      </div>
    )
  }
}

const PrivateRouteS = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuthS.isAuthenticatedS === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const PrivateRouteM = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuthM.isAuthenticatedM === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const PrivateRouteR = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuthR.isAuthenticatedR === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const PrivateRouteC = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuthC.isAuthenticatedC === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  fakeAuthC.isAuthenticatedC ? (
    <div className="text-center mt-5">
    <p>
      Welcome! <button onClick={() => {
        fakeAuthC.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
    </div>
  ) : fakeAuthS.isAuthenticatedS ? (
    <div className="text-center mt-5">
    <p>
      Welcome! <button onClick={() => {
        fakeAuthS.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
    </div>
  ) : fakeAuthM.isAuthenticatedM ? (
    <div className="text-center mt-5">
    <p>
      Welcome! <button onClick={() => {
        fakeAuthM.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
    </div>
  ) : fakeAuthR.isAuthenticatedR ? (
    <div className="text-center mt-5">
    <p>
      Welcome! <button onClick={() => {
        fakeAuthR.signout(() => history.push('/'))
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
          <Link to="/account"><button>Account</button></Link>{" "}
          <Link to="/restaurant"><button>Restaurant</button></Link>{" "}
          <Link to="/staff"><button>Staff</button></Link>{" "}
          <Link to="/manager"><button>Manager</button></Link>{" "}
          <Link to="/rider"><button>Rider</button></Link>{" "}
          </div>
        </ul>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <PrivateRouteC path='/account' component={Customer} />
        <PrivateRouteS path='/staff' component={Staff} />
        <PrivateRouteM path='/manager' component={Manager} />
        <PrivateRouteR path='/rider' component={Rider} />
        <PrivateRouteC path='/restaurant' component={Restaurant} />
      </div>
    </Router>
  )
}