import React, { Component } from 'react';
import './reset.css'
import './App.css';
import './cards.css'


import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
} from 'react-router-dom'

import Auth from './modules/Auth'
import Nav from './components/Nav'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import Dashboard from './components/Dashboard'
import ThingList from './components/ThingList'
import ThingSingle from './components/ThingSingle'
import ThingCreate from './components/ThingCreate'
import Home from './components/Home'
// import Card from './components/cards/card'
// import CardToggle from './components/cards/CardToggle'
// import CardsPage from './components/cards/CardsPage'



class App extends Component {
  constructor() {
    super()
    this.state = {
      activeCard: '',
      prevCard: '',
      toggled: false,
      auth: Auth.isUserAuthenticated(),
      shouldFireRedirect: false,
      thingName: '',
      thingDesc: '',
      loginUserName: '',
      loginPassword: '',
      registerUserName: '',
      registerEmail: '',
      registerPassword: '',
      registerName: ''
    }

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.handleThingSubmit = this.handleThingSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.resetFireRedirect = this.resetFireRedirect.bind(this)
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleLoginSubmit(e) {
  e.preventDefault();
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({
      username: this.state.loginUserName,
      password: this.state.loginPassword,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(res => {
    console.log(res);
    if (res.token) {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
        loginUserName: '',
        loginUserPassword: '',
      })
    }
  }).catch(err => {
    console.log(err);
  })
}

handleRegisterSubmit(e) {
  e.preventDefault();
  fetch('/users', {
    method: 'POST',
    body: JSON.stringify({
      user: {
        username: this.state.registerUserName,
        password: this.state.registerPassword,
        email: this.state.registerEmail,
        name: this.state.registerName,
      }
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  .then(res => {
    if (res.token) {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
      })
    }
  }).catch(err => {
    console.log(err);
  })
}

handleThingSubmit(e) {
  e.preventDefault();
  fetch('/things', {
    method: 'POST',
    body: JSON.stringify({
      thing: {
        name: this.state.thingName,
        description: this.state.thingDesc,
      }
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${Auth.getToken()}`,
      token: Auth.getToken(),
    }
  }).then(res => res.json())
  .then(res => {
    this.setState({
      shouldFireRedirect: true,
    });
  }).catch(err => {
    console.log(err);
  });
}

 logoutUser() {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then(res => {
      Auth.deauthenticateUser();
      this.setState({
        auth: Auth.isUserAuthenticated(),
        loginUserName: '',
        loginUserPassword: '',
      })
    })
  }

  resetFireRedirect() {
    if (this.state.shouldFireRedirect) {
      this.setState({
        shouldFireRedirect: false,
      })
    }
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Nav logoutUser={this.logoutUser} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={(props) => {
          return (
            !this.state.auth ?
              <LoginForm
                auth={this.state.auth}
                loginUserName={this.state.loginUsername}
                loginPassword={this.state.loginPassword}
                handleInputChange={this.handleInputChange}
                handleLoginSubmit={this.handleLoginSubmit}
              /> :
              <Redirect to="/dash" />
            )
          }}
        />
        <Route exact path="/register" render={(props) => {
          return (
            !this.state.auth ?
            <RegisterForm
              auth={this.state.auth}
              registerUserName={this.state.registerUsername}
              registerPassword={this.state.registerPassword}
              registerEmail={this.state.registerEmail}
              registerName={this.state.registerName}
              handleInputChange={this.handleInputChange}
              handleRegisterSubmit={this.handleRegisterSubmit}
            />
            :
            <Redirect to="/dash" />
          )
        }}
      />
      <Route exact path="/dash" render={(props) => {
        return (
          this.state.auth ?
            <Dashboard auth={this.state.auth} resetFireRedirect={this.resetFireRedirect} />
            : <Redirect to="/login" />
          )
        }}
      />
      <Route exact path="/things" component={ThingList} />
      <Route exact path="/newthing" render={(props) => {
        return (
          this.state.auth ?
            <ThingCreate
              thingName={this.state.thingName}
              thingDesc={this.state.thingDesc}
              handleInputChange={this.handleInputChange}
              handleThingSubmit={this.handleThingSubmit}
              shouldFireRedirect={this.state.shouldFireRedirect}
            />
            :
            <Redirect to="/login" />
          )
        }}
      />
      </div>
      </Router>
    );
  }
}

export default App;
