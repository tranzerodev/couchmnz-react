import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {
  savePayoutOption
} from '../../../../../actions';
import NextLink from '../../../../common/RegistrationNextLink';
import appConstants from '../../../../../constants/appConstants';

import {DASHBOARD_ACCOUNT_BUSINESS_MODEL, DASHBOARD_ACCOUNT_REGISTRATION_14_PAYPAL, DASHBOARD_ACCOUNT_REGISTRATION_14_BANK_PAYOUT, DASHBOARD_MANAGE_COMPLETE_PAYPAL_SETTINGS, DASHBOARD_MANAGE_COMPLETE_BANK_PAYOUT} from '../../../../../constants/pathConstants';

class DashboardPayoutDetails extends Component {
  constructor(props) {
    super(props);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.handlePayout = this.handlePayout.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleSetCurrency = this.handleSetCurrency.bind(this);
    this.handleSetPayoutOption = this.handleSetPayoutOption.bind(this);
    const {currency, payoutOption} = props;
    this.state = {
      currency,
      payoutOption
    };
  }

  componentDidUpdate(preProps) {
    if (!preProps.currency && this.props.currency) {
      this.handleSetCurrency();
    }
    if (!preProps.payoutOption && this.props.payoutOption) {
      this.handleSetPayoutOption();
    }
  }

  handleSetCurrency() {
    const {currency} = this.props;
    this.setState({currency});
  }

  handleSetPayoutOption() {
    const {payoutOption} = this.props;
    this.setState({payoutOption});
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleCurrency(e) {
    this.setState({currency: e.target.value});
  }
  handlePayout(e) {
    this.setState({payoutOption: e.target.value});
  }
  onSubmitForm() {
    return true;
  }
  render() {
    const {p, profileActivationStatus} = this.props;
    const {currency, payoutOption} = this.state;
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-7-10 uk-width-medium-1-1 uk-width-small-1-1">

        <div className="cl-sd-trainingLocationInner">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <h1 className="uk-padding-remove">{p.t('PayoutDetails.title')}</h1>
              <p>{p.t('PayoutDetails.message')}</p>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div className="accDetails">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2  uk-width-small-1-1">
                    <label>{p.t('PayoutDetails.currency')}</label>
                    <select className="uk-form-controls" value={currency} onChange={this.handleCurrency}>
                      <option value="">{this.props.p.t('PayoutDetails.select_currency')}</option>
                      <option value="USD">{this.props.p.t('PayoutDetails.currencyList.usd')}</option>
                      <option value="GBP">{this.props.p.t('PayoutDetails.currencyList.gbp')}</option>
                    </select>
                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                    <h6>{this.props.p.t('PayoutDetails.recievePaymentsBy')}</h6>
                    <div className="tandc tandsec">
                      <input id="payoption1" type="radio" checked={payoutOption === 'PP'} value="PP" onChange={this.handlePayout}/>

                      <label htmlFor="payoption1">
                        <svg className="cl-icon-paypal" xmlns="http://www.w3.org/2000/svg" viewBox="9161 -1878.5 94 59">
                          <g data-name="Group 291" transform="translate(8749 -2381.5)">
                            <rect data-name="Rectangle 185" className="cl-icon-paypal-1" width="93" height="58" rx="5" transform="translate(412.5 503.5)"/>
                            <g data-name="Group 290" transform="translate(-69 7)">
                              <g data-name="Group 288" transform="translate(506 534.612)">
                                <path data-name="Path 38" className="cl-icon-paypal-2" d="M40.88,6.749H37.5a.47.47,0,0,0-.465.4l-1.368,8.676a.282.282,0,0,0,.279.326h1.615a.47.47,0,0,0,.465-.4l.369-2.34a.47.47,0,0,1,.464-.4h1.071A3.475,3.475,0,0,0,43.778,9.8a2.606,2.606,0,0,0-.431-2.184A3.139,3.139,0,0,0,40.88,6.749Zm.39,3.169c-.185,1.214-1.113,1.214-2.01,1.214H38.75l.358-2.267a.282.282,0,0,1,.279-.238h.234c.611,0,1.187,0,1.485.348A1.128,1.128,0,0,1,41.27,9.918Z" transform="translate(-35.66 -6.749)"/>
                                <path data-name="Path 39" className="cl-icon-paypal-2" d="M58.827,12.919h-1.62a.282.282,0,0,0-.279.238l-.072.453-.113-.164a2.306,2.306,0,0,0-1.914-.679,3.726,3.726,0,0,0-3.618,3.258,3.058,3.058,0,0,0,.6,2.489,2.535,2.535,0,0,0,2.041.824,3.1,3.1,0,0,0,2.243-.928l-.072.45a.282.282,0,0,0,.278.327h1.459a.47.47,0,0,0,.465-.4l.876-5.545A.281.281,0,0,0,58.827,12.919Zm-2.258,3.153a1.806,1.806,0,0,1-1.828,1.547A1.255,1.255,0,0,1,53.4,16.045a1.814,1.814,0,0,1,1.816-1.559,1.367,1.367,0,0,1,1.081.441A1.4,1.4,0,0,1,56.569,16.073Z" transform="translate(-43.494 -9.789)"/>
                                <path data-name="Path 40" className="cl-icon-paypal-2" d="M76.386,13.075H74.758a.472.472,0,0,0-.389.206l-2.246,3.308-.952-3.179a.472.472,0,0,0-.451-.335h-1.6a.282.282,0,0,0-.268.373l1.793,5.263-1.686,2.38a.282.282,0,0,0,.23.445h1.626a.469.469,0,0,0,.386-.2l5.415-7.817A.282.282,0,0,0,76.386,13.075Z" transform="translate(-52.423 -9.945)"/>
                                <path data-name="Path 41" className="cl-icon-paypal-3" d="M89.661,6.749H86.277a.47.47,0,0,0-.464.4l-1.368,8.676a.281.281,0,0,0,.278.326h1.737a.329.329,0,0,0,.325-.278l.388-2.459a.47.47,0,0,1,.464-.4h1.071A3.475,3.475,0,0,0,92.558,9.8a2.6,2.6,0,0,0-.432-2.184A3.136,3.136,0,0,0,89.661,6.749Zm.39,3.169c-.185,1.214-1.112,1.214-2.01,1.214h-.51l.359-2.267a.281.281,0,0,1,.278-.238H88.4c.611,0,1.187,0,1.485.348A1.128,1.128,0,0,1,90.051,9.918Z" transform="translate(-60.307 -6.749)"/>
                                <path data-name="Path 42" className="cl-icon-paypal-3" d="M107.61,12.919H105.99a.281.281,0,0,0-.278.238l-.072.453-.114-.164a2.305,2.305,0,0,0-1.913-.679A3.725,3.725,0,0,0,100,16.025a3.06,3.06,0,0,0,.6,2.489,2.536,2.536,0,0,0,2.041.824,3.1,3.1,0,0,0,2.243-.928l-.072.45a.282.282,0,0,0,.279.327h1.459a.47.47,0,0,0,.464-.4l.876-5.545A.283.283,0,0,0,107.61,12.919Zm-2.258,3.153a1.805,1.805,0,0,1-1.828,1.547,1.255,1.255,0,0,1-1.342-1.575A1.814,1.814,0,0,1,104,14.485a1.367,1.367,0,0,1,1.081.441A1.4,1.4,0,0,1,105.351,16.073Z" transform="translate(-68.142 -9.789)"/>
                                <path data-name="Path 43" className="cl-icon-paypal-3" d="M117.873,6.986l-1.389,8.835a.282.282,0,0,0,.278.326h1.4a.469.469,0,0,0,.465-.4l1.369-8.676a.282.282,0,0,0-.278-.326h-1.563A.283.283,0,0,0,117.873,6.986Z" transform="translate(-76.496 -6.748)"/>
                              </g>
                              <g data-name="Group 289" transform="translate(516.3 505)">
                                <path data-name="Path 44" className="cl-icon-paypal-2" d="M6.674,26.469l.473-3L6.093,23.44H1.061l3.5-22.173a.293.293,0,0,1,.1-.174.286.286,0,0,1,.186-.069h8.485c2.817,0,4.761.586,5.776,1.743A3.974,3.974,0,0,1,20.028,4.5a6.26,6.26,0,0,1,.006,2.392l-.011.07v.611l.476.27a3.338,3.338,0,0,1,.963.734,3.42,3.42,0,0,1,.782,1.753,7.415,7.415,0,0,1-.111,2.544,8.957,8.957,0,0,1-1.042,2.879,5.922,5.922,0,0,1-1.651,1.809,6.7,6.7,0,0,1-2.223,1,11.088,11.088,0,0,1-2.779.321h-.66a1.986,1.986,0,0,0-1.964,1.676l-.05.27-.836,5.3-.038.194a.167.167,0,0,1-.052.113.14.14,0,0,1-.087.032H6.674Z" transform="translate(-0.101 -0.098)"/>
                                <path data-name="Path 45" className="cl-icon-paypal-3" d="M21.439,7.667h0q-.038.243-.087.5c-1.119,5.745-4.947,7.729-9.836,7.729H9.027a1.209,1.209,0,0,0-1.195,1.024h0L6.557,25,6.2,27.292a.637.637,0,0,0,.629.736H11.24a1.062,1.062,0,0,0,1.049-.9l.043-.224.831-5.275.053-.289a1.062,1.062,0,0,1,1.049-.9h.66c4.278,0,7.626-1.737,8.6-6.762.409-2.1.2-3.852-.885-5.085A4.222,4.222,0,0,0,21.439,7.667Z" transform="translate(-0.591 -0.732)"/>
                                <path data-name="Path 46" className="cl-icon-paypal-4" d="M20.442,7.109q-.256-.075-.528-.136t-.56-.106a13.825,13.825,0,0,0-2.194-.16h-6.65a1.06,1.06,0,0,0-1.048.9l-1.415,8.96-.041.261A1.209,1.209,0,0,1,9.2,15.8h2.489c4.889,0,8.717-1.985,9.836-7.729.033-.17.062-.336.087-.5a5.964,5.964,0,0,0-.92-.388C20.611,7.16,20.527,7.134,20.442,7.109Z" transform="translate(-0.764 -0.64)"/>
                                <path data-name="Path 47" className="cl-icon-paypal-2" d="M8.7,6.964a1.061,1.061,0,0,1,1.048-.9h6.65a13.825,13.825,0,0,1,2.194.16q.288.046.56.106t.528.136l.251.078a6.054,6.054,0,0,1,.92.388A5.426,5.426,0,0,0,19.7,2.058C18.433.617,16.149,0,13.226,0H4.742a1.213,1.213,0,0,0-1.2,1.025L.009,23.426a.729.729,0,0,0,.719.843H5.966l1.315-8.344Z" transform="translate(0)"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                        &nbsp;{this.props.p.t('PayoutDetails.transferToPaypal')}
                      </label>
                    </div>
                    <div className="tandc tandsec">
                      <input id="payoption2" type="radio" checked={payoutOption === 'BK'} value="BK" onChange={this.handlePayout}/>
                      <label htmlFor="payoption2">
                        <svg className="cl-icon-bank" xmlns="http://www.w3.org/2000/svg" viewBox="9162 -1786 92.5 57.5">
                          <g data-name="Group 294" transform="translate(8764 -2364)">
                            <g transform="translate(398 577.5)">
                              <rect data-name="Rectangle 183" className="cl-icon-bank-1" width="92.5" height="57.5" rx="5" transform="translate(0 0.5)"/>
                              <rect data-name="Rectangle 184" className="cl-icon-bank-2" width="91.283" height="56.302" rx="5" transform="translate(0.609 1.099)"/>
                            </g>
                            <g data-name="Group 293" transform="translate(0 2)">
                              <text className="cl-icon-bank-3" transform="translate(417 607)"><tspan x="0" y="0">{p.t('PayoutDetails.bank')}</tspan></text>
                              <g data-name="Group 292">
                                <text data-name="321186345" className="cl-icon-bank-4" transform="translate(407 617)"><tspan x="0" y="0">321186345</tspan></text>
                                <text data-name="74218447" className="cl-icon-bank-4" transform="translate(456 617)"><tspan x="0" y="0">74218447</tspan></text>
                              </g>
                            </g>
                          </g>
                        </svg>
                        &nbsp;{this.props.p.t('PayoutDetails.transferToBank')}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <NextLink
          submitForm={this.onSubmitForm}
          saveData={this.props.savePayoutOption}
          data={{currency, payoutOption}}
          saveType={appConstants.saveType.onlyProfile}
          next={payoutOption ? payoutOption === 'PP' ? profileActivationStatus === true ? DASHBOARD_ACCOUNT_REGISTRATION_14_PAYPAL : DASHBOARD_MANAGE_COMPLETE_PAYPAL_SETTINGS : profileActivationStatus === true ? DASHBOARD_ACCOUNT_REGISTRATION_14_BANK_PAYOUT : DASHBOARD_MANAGE_COMPLETE_BANK_PAYOUT : DASHBOARD_ACCOUNT_BUSINESS_MODEL}
        />
      </div>
    );
  }
  static get propTypes() {
    return {
      payoutOption: PropTypes.string,
      currency: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      profileActivationStatus: PropTypes.bool.isRequired,
      savePayoutOption: PropTypes.func.isRequired
    };
  }
}
DashboardPayoutDetails.defaultProps = {
  payoutOption: '',
  currency: ''
};

const mapStateToProps = state => {
  const {payoutOption, currency, userProfiles} = state;
  return {
    payoutOption,
    profileActivationStatus: userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active,
    currency
  };
};

const mapDispatchToProps = dispatch => {
  return {
    savePayoutOption: (data, updateType) => dispatch(savePayoutOption(data, updateType))
  };
};
const DashboardPayoutDetailsPage = translate(connect(mapStateToProps, mapDispatchToProps)(DashboardPayoutDetails));
export default DashboardPayoutDetailsPage;
