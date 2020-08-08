import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import SideNav from '../common/SideNav';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import {fetchCountries} from '../../../../../actions/index';
import PropTypes from 'prop-types';
// Import PaymentMethod from './PaymentMethod';
import CardsList from './CardsList';
import {Elements, StripeProvider} from 'react-stripe-elements';
// Import PaypalDetails from './PaypalDetails';
import config from '../../../../../config';
const {payment} = config;

class PaymentPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe: null
    };
  }
  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe(payment.stripe.apiKey)});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({stripe: window.Stripe(payment.stripe.apiKey)});
      });
    }
    if (this.props.countries.status !== FULFILLED) {
      this.props.fetchCountries();
    }
  }
  render() {
    return (
      <div className="booking-wrapper">
        <div className="dashboardSection">
          <div className="uk-grid">
            <SideNav/>
            <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
              {/* <PaymentMethod/> */}
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <CardsList/>
                </Elements>
              </StripeProvider>
              {/* <PaypalDetails/> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      fetchCountries: PropTypes.func.isRequired,
      countries: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, countries} = state;
  return {
    profile,
    countries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCountries: () => dispatch(fetchCountries())
  };
};

const PaymentPreferencesClass = connect(mapStateToProps, mapDispatchToProps)(PaymentPreferences);
export default (withRouter(translate(PaymentPreferencesClass)));
