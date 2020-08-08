import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Profile from '../../common/Profile';
import RegBusinessModal from '../../common/RegBusinessModel';

import SportsServiceProvider from '../../common/SportsServiceProvider';
import Home from '../Home';
import _ShoppingCartIndex from '../../../components/common/ShoppingCart';

import ComingSoon from '../../common/ComingSoon';

import {
  selectProfile
} from '../../../routeMiddlewares/routeMiddlewares';

import {DASHBOARD_LINK, PROFILE, SSP, REGISTRATION, SHOPPING_CART, COMING_SOON, REGISTRATION_BUSINESS_MODEL} from '../../../constants/pathConstants';
import Registration from '../Registration/Registration';
import {shoppingCartPrevalidation} from '../../../routeMiddlewares/shoppingCart';
const ShoppingCartIndex = shoppingCartPrevalidation(_ShoppingCartIndex); 

const DashboardComponent = selectProfile(Home);
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Switch>
        <Route path={DASHBOARD_LINK} name="Home" component={DashboardComponent}/>
        <Route path={PROFILE} name="Profile" component={Profile}/>
        <Route path={REGISTRATION_BUSINESS_MODEL} name="model" component={RegBusinessModal}/>
        <Route path={SSP} name="SportsServiceProvider" component={SportsServiceProvider}/>
        <Route path={REGISTRATION} name="Registration" component={Registration}/>
        <Route path={SHOPPING_CART} name="ShoppingCart" component={ShoppingCartIndex}/>
        <Route path={'/' + COMING_SOON} name="ComingSoon" component={ComingSoon}/>
        <Redirect exact from="/" to={DASHBOARD_LINK}/>
      </Switch>
    );
  }
}

Dashboard.defaultProps = {
  history: {}
};

export default Dashboard;
