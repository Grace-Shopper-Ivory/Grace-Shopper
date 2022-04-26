import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import { me } from './store';
import UserCreate from './components/UserCreate';
import UserPage from './components/UserPage';
import Order from './components/Order';
import Confirmation  from './components/Confirmation';
import Admin from "./components/Admin";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/products" component={AllProducts} />
            <Route path={`/userpage/:id`} component={UserPage} />
            <Route path={`/order`} component={Order} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/adminpage/:id" component={Admin} />
            <Route path='/confirmation' component={Confirmation}/>
            <Route path="/" component={AllProducts} />         
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/products" component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path={`/order`} component={Order} />
            <Route path="/signup" component={UserCreate} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path='/confirmation' component={Confirmation}/>
            <Route exact path="/" component={AllProducts} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
