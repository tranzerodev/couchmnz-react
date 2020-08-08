import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import DashboardNewLocation from '../DashboardNewLocation';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

class DashboardLocationAdd extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const {state} = this.props.location;
    const location = (state) ? state.location : null;

    return (
      (location) ? <DashboardNewLocation edit editLocation={location}/> : <DashboardNewLocation/>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      location: PropTypes.object.isRequired
    };
  }
}
export default withRouter(translate(DashboardLocationAdd));
