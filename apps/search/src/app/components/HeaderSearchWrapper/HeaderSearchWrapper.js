import React, {Component} from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';

import {SSP_SEARCH_ONLY_LOCATION, SSP_SEARCH_SPORT_LOCATION, SSP_SEARCH_SPORTS_PAGE_URL, SSP_SEARCH_PAGE_URL} from '../../constants/RouterPaths';
import HeaderSearch from '../HeaderSearch';
class HeaderSearchWrapper extends Component {
  render() {
    return (
      <Switch>
        <Route path={SSP_SEARCH_ONLY_LOCATION} component={HeaderSearch}/>
        <Route path={SSP_SEARCH_SPORT_LOCATION} component={HeaderSearch}/>
        <Redirect from={SSP_SEARCH_PAGE_URL} to={SSP_SEARCH_SPORTS_PAGE_URL}/>
        <Route component={HeaderSearch}/>
      </Switch>
    );
  }
}

export default withRouter(HeaderSearchWrapper);
