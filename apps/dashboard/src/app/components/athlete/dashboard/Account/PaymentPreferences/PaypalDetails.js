
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {fetchCountries} from '../../../../../actions/index';
// Import PropTypes from 'prop-types';

class PaypalDetails extends Component {
  constructor(props) {
    super(props);
    this.handleRenderConnected = this.handleRenderConnected.bind(this);
    this.handleRenderDisconnected = this.handleRenderDisconnected.bind(this);
    this.handlePaypalConnect = this.handlePaypalConnect.bind(this);
    this.handlePaypalDisconnect = this.handlePaypalDisconnect.bind(this);
    this.state = {
      data: {
        isConnected: 'Y',
        details: {
          name: 'Barry Johnson',
          email: 'barryj@gmail.com'
        }
      }
    };
  }

  handleRenderConnected() {
    const {data} = this.state;
    const {details} = data;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <p>Connected for billing as {details.name} ({details.email})</p>
          <a onClick={this.handlePaypalDisconnect} className="cl-sd-link">Remove</a>
        </div>
      </div>
    );
  }

  handleRenderDisconnected() {
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <a onClick={this.handlePaypalConnect} className="general_btn">Connect PayPal Account</a>
        </div>
      </div>
    );
  }

  handlePaypalConnect() {
    const {data} = this.state;
    this.setState({
      data: {
        ...data,
        isConnected: 'Y'
      }
    });
  }

  handlePaypalDisconnect() {
    const {data} = this.state;
    this.setState({
      data: {
        ...data,
        isConnected: 'N'
      }
    });
  }

  render() {
    const {data} = this.state;
    const {isConnected} = data;
    return (
      <div className="cl-sd-trainingLocationInner">
        <h1>PayPal Account Details</h1>
        {isConnected === 'Y' ? this.handleRenderConnected() : this.handleRenderDisconnected()}
      </div>
    );
  }
  static get propTypes() {
    return {};
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

const PaymentPreferencesClass = connect(mapStateToProps, mapDispatchToProps)(PaypalDetails);
export default (withRouter(translate(PaymentPreferencesClass)));
