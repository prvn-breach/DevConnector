import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';

import './App.css';
import { clearCurrentProfile } from './actions/profileActions';



// Check Auth Token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set Current User
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href="/login";
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/dashboard" 
                  component={Dashboard} 
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/create-profile" 
                  component={CreateProfile} 
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/edit-profile" 
                  component={EditProfile} 
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/add-experience" 
                  component={AddExperience} 
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/add-education" 
                  component={AddEducation} 
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/feed" 
                  component={Posts} 
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/post/:id" 
                  component={Post} 
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;