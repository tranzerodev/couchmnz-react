import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {updateAthletePaymentMethod} from '../../../../../actions/index';
import PropTypes from 'prop-types';
import {notNull} from '../../../../../validators/common/util';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
    this.state = {
      method: 'P'
    };
  }
  handlePaymentMethod(e) {
    const {value} = e.target;
    this.setState({method: value});
  }
  handleSubmitPaymentMethod() {
    const {method} = this.state;
    const {profileId} = this.props;
    if (notNull(method)) {
      this.props.updatePaymentMethod(profileId, method);
    }
  }
  render() {
    const {method} = this.state;
    return (
      <div className="cl-sd-trainingLocationInner mb30">
        <h1 className="uk-padding-remove">Payment Method</h1>
        <p className="pb25">Select which method you would like to make payments.</p>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
            <div className={method === 'P' ? 'cl-sd-paymentBy active' : 'cl-sd-paymentBy'}>
              <input id="paymethod1" type="radio" name="paymethod" onClick={this.handlePaymentMethod} value="P" checked={method === 'P'}/>
              <label htmlFor="paymethod1">
                <svg className="cl-icon-creditcard" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 60 60" xmlSpace="preserve"><g><g><path className="cl-icon-creditcard-1" d="M9,49h42c2.8,0,5-2.2,5-5V16c0-2.8-2.2-5-5-5H9c-2.8,0-5,2.2-5,5v28C4,46.8,6.2,49,9,49z M51,47H9c-1.7,0-3-1.3-3-3V28h48    v16C54,45.7,52.7,47,51,47z M9,13h42c1.7,0,3,1.3,3,3v4H6v-4C6,14.3,7.3,13,9,13z"/><path className="cl-icon-creditcard-2" d="M16.3,32h-2c-2.2,0-4,1.8-4,4v2c0,2.2,1.8,4,4,4h2c2.2,0,4-1.8,4-4v-2C20.3,33.8,18.5,32,16.3,32z M18.3,38    c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V38z"/><rect x="23.3" y="34.2" width="26.5" height={2} className="cl-icon-creditcard-3"/><rect x="23.3" y="38.2" width="21.5" height={2} className="cl-icon-creditcard-4"/></g></g></svg>
                <h4>Pay by Credit or Debit card</h4>
              </label>
            </div>
          </div>
          <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 ">
            <div className={method === 'C' ? 'cl-sd-paymentBy active' : 'cl-sd-paymentBy'}>
              <input id="paymethod2" type="radio" name="paymethod" onClick={this.handlePaymentMethod} value="C" checked={method === 'C'}/>
              <label htmlFor="paymethod2">
                <svg className="cl-icon-paypal-vertical" data-name="Group 3" xmlns="http://www.w3.org/2000/svg" viewBox="758.66 705 87.926 57.178">
                  <g data-name="Group 2" transform="translate(-64 27)">
                    <path data-name="Path 1" className="cl-icon-paypal-vertical-1" d="M46.211,6.749H39.372a.95.95,0,0,0-.939.8L35.667,25.088a.569.569,0,0,0,.564.658H39.5a.95.95,0,0,0,.939-.8l.746-4.73a.949.949,0,0,1,.938-.8h2.165c4.505,0,7.1-2.18,7.784-6.5A5.268,5.268,0,0,0,51.2,8.5C50.224,7.353,48.5,6.749,46.211,6.749ZM47,13.154c-.374,2.454-2.249,2.454-4.062,2.454H41.906l.724-4.583a.57.57,0,0,1,.563-.481h.473c1.235,0,2.4,0,3,.7A2.279,2.279,0,0,1,47,13.154Z" transform="translate(787 705)"/>
                    <path data-name="Path 2" className="cl-icon-paypal-vertical-1" d="M66.654,13.075H63.379a.57.57,0,0,0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373a7.531,7.531,0,0,0-7.312,6.586,6.182,6.182,0,0,0,1.22,5.031,5.124,5.124,0,0,0,4.125,1.666,6.266,6.266,0,0,0,4.533-1.875l-.146.91a.57.57,0,0,0,.562.66h2.95a.95.95,0,0,0,.939-.8l1.77-11.209A.568.568,0,0,0,66.654,13.075Zm-4.565,6.374a3.65,3.65,0,0,1-3.695,3.127,2.537,2.537,0,0,1-2.713-3.184,3.666,3.666,0,0,1,3.67-3.152,2.763,2.763,0,0,1,2.184.892A2.835,2.835,0,0,1,62.089,19.449Z" transform="translate(787 705)"/>
                    <path data-name="Path 3" className="cl-icon-paypal-vertical-1" d="M84.1,13.075H80.805a.954.954,0,0,0-.787.417l-4.539,6.686-1.924-6.425a.953.953,0,0,0-.912-.678H69.409a.57.57,0,0,0-.541.754l3.625,10.638-3.408,4.811a.57.57,0,0,0,.465.9h3.287a.949.949,0,0,0,.781-.408l10.946-15.8A.57.57,0,0,0,84.1,13.075Z" transform="translate(787 705)"/>
                    <path data-name="Path 4" className="cl-icon-paypal-vertical-2" d="M94.992,6.749h-6.84a.95.95,0,0,0-.938.8L84.448,25.088a.569.569,0,0,0,.562.658h3.51a.665.665,0,0,0,.656-.562l.785-4.971a.949.949,0,0,1,.938-.8h2.164c4.506,0,7.105-2.18,7.785-6.5A5.264,5.264,0,0,0,99.975,8.5C99,7.353,97.281,6.749,94.992,6.749Zm.789,6.405c-.373,2.454-2.248,2.454-4.062,2.454H90.688l.725-4.583a.568.568,0,0,1,.562-.481h.473c1.234,0,2.4,0,3,.7A2.279,2.279,0,0,1,95.781,13.154Z" transform="translate(787 705)"/>
                    <path data-name="Path 5" className="cl-icon-paypal-vertical-2" d="M115.434,13.075h-3.273a.567.567,0,0,0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373a7.53,7.53,0,0,0-7.311,6.586,6.185,6.185,0,0,0,1.219,5.031,5.127,5.127,0,0,0,4.125,1.666,6.266,6.266,0,0,0,4.533-1.875l-.146.91a.57.57,0,0,0,.564.66h2.949a.95.95,0,0,0,.938-.8L116,13.733A.571.571,0,0,0,115.434,13.075Zm-4.565,6.374a3.649,3.649,0,0,1-3.695,3.127,2.537,2.537,0,0,1-2.713-3.184,3.667,3.667,0,0,1,3.67-3.152,2.763,2.763,0,0,1,2.184.892A2.82,2.82,0,0,1,110.869,19.449Z" transform="translate(787 705)"/>
                    <path data-name="Path 6" className="cl-icon-paypal-vertical-2" d="M119.295,7.23l-2.807,17.858a.569.569,0,0,0,.562.658h2.822a.949.949,0,0,0,.939-.8l2.768-17.536a.57.57,0,0,0-.562-.659h-3.16A.571.571,0,0,0,119.295,7.23Z" transform="translate(787 705)"/>
                  </g>
                  <g data-name="Group 1">
                    <path data-name="Path 7" className="cl-icon-paypal-vertical-1" d="M7.266,29.154l.523-3.322L6.624,25.8H1.061L4.927,1.292A.324.324,0,0,1,5.035,1.1a.316.316,0,0,1,.206-.076h9.38c3.114,0,5.263.648,6.385,1.927a4.393,4.393,0,0,1,1.023,1.917,6.921,6.921,0,0,1,.007,2.644l-.012.077v.676l.526.3a3.69,3.69,0,0,1,1.065.812,3.781,3.781,0,0,1,.864,1.938,8.2,8.2,0,0,1-.123,2.812A9.9,9.9,0,0,1,23.2,17.308a6.547,6.547,0,0,1-1.825,2,7.4,7.4,0,0,1-2.458,1.109,12.258,12.258,0,0,1-3.072.355h-.73a2.2,2.2,0,0,0-2.171,1.853l-.055.3-.924,5.855-.042.215a.185.185,0,0,1-.058.125.155.155,0,0,1-.1.035H7.266Z" transform="translate(787 705)"/>
                    <path data-name="Path 8" className="cl-icon-paypal-vertical-2" d="M23.048,7.667h0q-.042.268-.1.55c-1.237,6.351-5.469,8.545-10.874,8.545H9.326a1.336,1.336,0,0,0-1.321,1.132h0L6.6,26.83l-.4,2.533a.7.7,0,0,0,.7.814h4.881a1.175,1.175,0,0,0,1.16-.99l.048-.248.919-5.832.059-.32a1.174,1.174,0,0,1,1.16-.992h.73c4.729,0,8.431-1.92,9.513-7.476.452-2.321.218-4.259-.978-5.622A4.667,4.667,0,0,0,23.048,7.667Z" transform="translate(787 705)"/>
                    <path data-name="Path 9" className="cl-icon-paypal-vertical-3" d="M21.754,7.151q-.283-.082-.584-.15t-.619-.117a15.284,15.284,0,0,0-2.426-.177H10.773A1.172,1.172,0,0,0,9.614,7.7L8.05,17.6l-.045.289a1.336,1.336,0,0,1,1.321-1.132h2.752c5.4,0,9.637-2.195,10.874-8.545.037-.188.068-.371.1-.55a6.594,6.594,0,0,0-1.017-.429C21.941,7.208,21.848,7.179,21.754,7.151Z" transform="translate(787 705)"/>
                    <path data-name="Path 10" className="cl-icon-paypal-vertical-1" d="M9.614,7.7a1.173,1.173,0,0,1,1.159-.991h7.352a15.284,15.284,0,0,1,2.426.177q.318.051.619.117t.584.15c.094.028.187.057.278.086a6.693,6.693,0,0,1,1.017.429c.368-2.347,0-3.945-1.272-5.392C20.378.682,17.853,0,14.622,0H5.242A1.341,1.341,0,0,0,3.917,1.133L.01,25.9a.806.806,0,0,0,.8.932H6.6L8.05,17.6Z" transform="translate(787 705)"/>
                  </g>
                </svg>
                <h4>Pay via Paypal</h4>
              </label>
            </div>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
            <a className="general_btn">Update</a>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      updatePaymentMethod: PropTypes.func.isRequired,
      profileId: PropTypes.string
    };
  }
}

PaymentMethod.defaultProps = {
  profileId: null
};

const mapStateToProps = state => {
  const {profile, countries, userProfiles} = state;
  return {
    profile,
    profileId: userProfiles.selectedProfile.id,
    countries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePaymentMethod: (profileId, data) => dispatch(updateAthletePaymentMethod(profileId, data))
  };
};

const PaymentPreferencesClass = connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);
export default (withRouter(translate(PaymentPreferencesClass)));
