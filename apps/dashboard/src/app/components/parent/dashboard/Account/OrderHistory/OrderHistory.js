import React, {Component} from 'react';
import {Redirect, Switch, withRouter, Route} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import SideNav from '../common/SideNav';
import {DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY, DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST, DASHBOARD_PARENT_ACCOUNT_ORDER_DETAILS} from '../../../../../constants/pathConstants';
import HistoryList from '../../../../athlete/dashboard/Account/OrderHistory/HistoryList';
import OrderDetails from '../../../../athlete/dashboard/Account/OrderHistory/OrderDetails';
class ParentOrderHistory extends Component {
  render() {
    return (
      <div className="booking-wrapper">
        <div className="dashboardSection">
          <div className="uk-grid">
            <SideNav/>
            <Switch>
              <Route path={DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST} component={HistoryList}/>
              <Route path={DASHBOARD_PARENT_ACCOUNT_ORDER_DETAILS} component={OrderDetails}/>
              <Redirect exact from={DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY} to={DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST}/>
            </Switch>
          </div>

        </div>
      </div>);
  }
}

export default (withRouter(translate(ParentOrderHistory)));
