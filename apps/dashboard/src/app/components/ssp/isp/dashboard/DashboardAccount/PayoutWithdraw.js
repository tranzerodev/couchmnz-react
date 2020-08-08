import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {fetchBAnkAccounts, fetchOrderSummary, saveFundSettings, fetchFundTransferSettings} from '../../../../../actions';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {withRouter} from 'react-router-dom';
import config from '../../../../../config';
import validateWithdrawAmount from '../../../../../validators/ssp/isp/withdrawPayout';

class PayoutWithdraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fundSettings: this.props.fundSettings.data ? this.props.fundSettings.data : { },
      validation: ''
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleChangeSettingsData = this.handleChangeSettingsData.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.renderTypes = this.renderTypes.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handleSaveButtonClicked = this.handleSaveButtonClicked.bind(this);
  }

  componentDidMount() {
    if (this.props.profile.status === FULFILLED) {
      const profileID = this.props.profile.data.profile.id;
      this.setState({profileID});
      if (this.props.payoutSummary.status !== FULFILLED && this.props.payoutSummary.status !== PENDING && this.props.payoutSummary.status !== REJECTED) {
        this.props.fetchOrderSummary(profileID);
      }
      if (this.props.fundSettings.status !== FULFILLED && this.props.fundSettings.status !== PENDING && this.props.fundSettings.status !== REJECTED) {
        this.props.fetchFundTransferSettings(profileID);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.fundSettings.status === PENDING &&
      nextProps.fundSettings.status === FULFILLED) {
      const {fundSettings} = nextProps;
      console.log('fundSettings', fundSettings);
      this.setState({
        fundSettings: fundSettings.data
      });
    }
  }
  handleBack() {
    this.props.history.goBack();
  }
  /*   RenderAccounts(bank, i) {
    return <option key={i} name={bank.bankName} value={bank.number}>{bank.bankName}</option>;
  } */

  renderTypes(type, index) {
    const {p} = this.props;
    const {fundSettings} = this.state;
    const id = `type${index}`;
    return (
      <span key={index}>
        <input id={id} type="radio" name="type" value={type.value} onChange={this.handleTypeChange} checked={type.value === fundSettings.type}/>
        <label htmlFor={id}>{p.t(type.displayName)}</label>
        <span className="w50"/>
      </span>
    );
  }
  handleTypeChange(event) {
    const {value} = event.target;
    this.handleChangeSettingsData({
      type: value
    });
  }
  handleChangeAmount(event) {
    console.log('Called Change Amount');
    const {value} = event.target;
    this.handleChangeSettingsData({
      cutoffAmount: value
    });
  }

  handleChangeSettingsData(data) {
    const {fundSettings} = this.state;
    const newSetting = Object.assign({}, fundSettings, data);
    this.setState({
      fundSettings: newSetting
    });
  }
  handleAccountChange(event) {
    const {value} = event.target;
    const {name} = event.target;
    this.handleChangeSettingsData({
      accountNumber: value,
      bankName: name
    });
  }

  handleSaveButtonClicked() {
    const {fundSettings} = this.state;
    const validation = validateWithdrawAmount(fundSettings);
    console.log('Validation :: ', validation);
    this.setState({
      validation
    });
    if (validation.valid) {
      const payload = {
        type: this.state.fundSettings.type,
        cutoffAmount: this.state.fundSettings.cutoffAmount
      };
      this.props.saveFundSettings(payload, this.props.profile.data.profile.id);
    }
  }

  render() {
    const fundSettings = this.props.fundSettings.data;
    const payoutSummary = this.props.payoutSummary.data;
    const {validation} = this.state;
    console.log('FundSetting :: ', fundSettings);
    const {p} = this.props;
    if (this.props.payoutSummary.status === FULFILLED && this.props.fundSettings.status === FULFILLED) {
      return (
        <div className="uk-width-xlarge-8-10 uk-width-large-7-10 uk-width-medium-1-1 uk-width-small-1-1">
          <div className="cl-sd-trainingLocationInner cl-sd-trainingLocationwthdrw">
            <a onClick={this.handleBack} className="back">
              <svg className="cl-icon-back-bl-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="7348.966 -314.516 17.534 11.033">
                <g data-name="Group 118" transform="translate(7302 -512.5)">
                  <path data-name="Path 35" className="cl-icon-back-bl-arrow-1" d="M0,0,4.749,5,3.795,6,0,10" transform="translate(52.749 208.5) rotate(180)"/>
                  <line data-name="Line 9" className="cl-icon-back-bl-arrow-1" x2="16" transform="translate(48.5 203.5)"/>
                </g>
              </svg>
              {p.t('FundWithdrawSettings.back')}
            </a>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <h1 className="uk-padding-remove">{p.t('FundWithdrawSettings.heading')}</h1>
                <p>{p.t('FundWithdrawSettings.note', {minAmount: config.minWithdrawAmount})}</p>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <div className="accDetails">
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                      <div className="current-balance error">
                        <p>{p.t('FundWithdrawSettings.current_balance')}{payoutSummary.priceUnit}{payoutSummary.withdrawableBalance}</p>
                      </div>
                    </div>
                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                      <div className="field-holder error">
                        <div className="tandc">
                          {
                            config.withdrawSettings.map(this.renderTypes)
                          }
                          <span className="w50"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-1-1  uk-width-small-1-1">
                      <div className="cl-sm-bankInfo">
                        <h6>{p.t('FundWithdrawSettings.withdraw_auto_title')}</h6>
                        <div className={validation.cutoffAmount === false ? 'field-holder error uk-width-large-5-10 uk-width-small-1-1' : 'field-holder uk-width-large-5-10 uk-width-small-1-1'} >
                          <div className="dollardiv">
                            <span className="dollar">$</span>
                            <input type="number" name="" placeholder="Enter Amount" className="uk-form-controls field-required" onChange={this.handleChangeAmount} value={this.state.fundSettings.cutoffAmount}/>
                            <span className="error-text">Please enter valid Amount</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-1  uk-width-small-1-1">
                      <div className="cl-sm-bankInfo">
                        <h6>{p.t('FundWithdrawSettings.account')}</h6>
                        <div className="field-holder">
                          {/*                         <select name="Select Bank" id="cl-select-role" onChange={this.handleAccountChange}>
                          <option value={fundSettings.accountNumber} name={fundSettings.bankName} selected={fundSettings.accountNumber}>{ fundSettings.bankName ? fundSettings.bankName : 'Select an Account' }</option>
                          {bankAccounts.map(this.renderAccounts)}
                        </select> */}
                          <p>{p.t('FundWithdrawSettings.account_type')}{fundSettings.account.mode} <br/>
                            {p.t('FundWithdrawSettings.account_details')}{fundSettings.account.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-8-10 uk-width-large-7-10 uk-width-medium-1-2  uk-width-small-1-1">
                      <a onClick={this.handleSaveButtonClicked} className="general_btn">Save</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div/>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      fetchOrderSummary: PropTypes.func.isRequired,
      fetchFundTransferSettings: PropTypes.func.isRequired,
      fundSettings: PropTypes.object.isRequired,
      payoutSummary: PropTypes.object.isRequired,
      saveFundSettings: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };
  }
}
PayoutWithdraw.defaultProps = {

};

const mapStateToProps = state => {
  const {profile, bankAccounts, payoutSummary, fundSettings} = state;
  console.log('State :: ', state);
  return {
    profile,
    bankAccounts,
    payoutSummary,
    fundSettings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBAnkAccounts: profileID => dispatch(fetchBAnkAccounts({profileID})),
    fetchOrderSummary: profileID => dispatch(fetchOrderSummary({profileID})),
    saveFundSettings: (data, profileID) => dispatch(saveFundSettings(data, {profileID})),
    fetchFundTransferSettings: profileID => dispatch(fetchFundTransferSettings({profileID}))
  };
};
export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(PayoutWithdraw)));

