import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './components/UserProfile/UserProfile.js';
import Layout from './components/Layout/Layout.js';
import {Router, useHistory, BrowserRouter, Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import LadderBoard from './components/LadderBoard/LadderBoard.js';
import LoginPage from './components/LoginPage/LoginPage.js';
import LandingPage from './components/LandingPage/LandingPage.js';
import {ProtectedRoute} from './protected.route';
import Donate from './components/Donate/Donate.js';
import './index.css'
import './App.css'
import Register from './components/Register/Register';


class App extends React.Component {
  state = {
    token: "asd",
    logged: false,
  }

  loginHandler = (token) => {
    this.setState({
      token,
      logged: true,
    })
  }

  render() {

    return (
      <BrowserRouter>
      <Switch>
      <Route exact path="/" render={(props) => <LandingPage {...props} onLogin={this.loginHandler}/>} />
      <Route exact path="/register" render={(props) => <Register {...props} onLogin={this.loginHandler}/>} />

      <Layout>
      <ProtectedRoute path="/app" component={() => <UserProfile token={this.state.token} />} />
      <ProtectedRoute path="/leader" component={() => <LadderBoard token={this.state.token}/>} />
      
      <ProtectedRoute path="/donate" component={() => <Donate token={this.state.token}/>} />
      
      
      </Layout>
      
      </Switch>
      </BrowserRouter>
      
    )

    
  }
  
}

export default App;
