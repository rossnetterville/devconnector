import './App.css';
import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';


// Redux
import {Provider} from 'react-redux'
import store from './store'

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import AddEducation from './components/profile-form/AddEducation';


if(localStorage.token)  {
  setAuthToken(localStorage.token);
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
      <Route exact path='/' component={ Landing } />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
        </Switch>
      </section>
      </Fragment>
      </Router>
  </Provider>
)};

export default App;
