import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {
  saveBankPayoutDetails
} from '../../../../../actions';
import appConstants from '../../../../../constants/appConstants';
import {validateBankPayoutDetails} from '../../../../../validators/ssp/isp/registration/bankDetails';
import FinishLaterLink from '../../../../common/FinishLaterLink';
import NextLink from '../../../../common/RegistrationNextLink';
import {WELCOME} from '../../../../../constants/pathConstants';
import RequiredNotFilledModal from '../RequiredNotFilledModal';

/* eslint complexity:0 */
class BankPayoutDetails extends Component {
  constructor(props) {
    super(props);
    this.handleAccountNumber = this.handleAccountNumber.bind(this);
    this.handleBank = this.handleBank.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleHolder = this.handleHolder.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleNickName = this.handleNickName.bind(this);
    this.handleRoutingNumber = this.handleRoutingNumber.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleChangeBankPayoutDetails = this.handleChangeBankPayoutDetails.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);

    const {bankDetails} = this.props;
    const validation = validateBankPayoutDetails(bankDetails);
    this.state = {
      bankDetails,
      validation,
      submit: false,
      notFilled: [],
      isNotFilledModalOpen: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getNotFilled() {
    const {p} = this.props;
    const {validation} = this.state;

    const {accountNumber, routingNumber, holder, type, nickName, bank, firstName, lastName} = validation;
    const notFilled = [];
    if (accountNumber.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.accountNumber'));
    }
    if (routingNumber.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.routingNumber'));
    }
    if (holder.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.holder'));
    }
    if (type.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.type'));
    }
    if (nickName.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.nickname'));
    }
    if (bank.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.bank'));
    }

    if (firstName.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.firstName'));
    }
    if (lastName.required === false) {
      notFilled.push(p.t('RequiredNotFilledModal.lastName'));
    }

    return notFilled;
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  onSubmitForm() {
    const {bankDetails} = this.state;
    const validation = validateBankPayoutDetails(bankDetails);
    if (validation.valid === true) {
      if (validation.required === true) {
        return true;
      }
      this.setState({submit: true, validation, notFilled: this.getNotFilled(), isNotFilledModalOpen: true});
    }
    this.setState({submit: true, validation});
    return false;
  }

  handleChangeBankPayoutDetails(data) {
    const {bankDetails} = this.state;
    const newBankDetails = Object.assign({}, bankDetails, data);
    const validation = validateBankPayoutDetails(newBankDetails);
    this.setState({
      bankDetails: newBankDetails,
      validation
    });
  }

  handleAccountNumber(e) {
    this.handleChangeBankPayoutDetails({accountNumber: e.target.value});
  }
  handleBank(e) {
    this.handleChangeBankPayoutDetails({bank: e.target.value});
  }
  handleFirstName(e) {
    this.handleChangeBankPayoutDetails({firstName: e.target.value});
  }
  handleHolder(e) {
    console.log(e);
    this.handleChangeBankPayoutDetails({holder: e.target.value});
  }
  handleLastName(e) {
    this.handleChangeBankPayoutDetails({lastName: e.target.value});
  }
  handleNickName(e) {
    this.handleChangeBankPayoutDetails({nickName: e.target.value});
  }
  handleRoutingNumber(e) {
    this.handleChangeBankPayoutDetails({routingNumber: e.target.value});
  }
  handleType(e) {
    this.handleChangeBankPayoutDetails({type: e.target.value});
  }
  render() {
    let {bankDetails, validation, submit} = this.state;
    if (!bankDetails) {
      bankDetails = {};
    }
    return (
      <div className="uk-container uk-container-center">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
            <h1 className="uk-padding-remove">{this.props.p.t('BankPayoutDetails.title')}</h1>
            <p>{this.props.p.t('BankPayoutDetails.header')}</p>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
            <div className="accDetails">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1">
                  <div className="field-holder">
                    <label>{this.props.p.t('BankPayoutDetails.accountHolderInformation')}</label>
                    <div className="tandc">
                      <input id="holder1" type="radio" value={appConstants.BankDetails.holder.individual} checked={bankDetails.holder === appConstants.BankDetails.holder.individual} onChange={this.handleHolder}/>
                      <label htmlFor="holder1">{this.props.p.t('BankPayoutDetails.individual')}</label>
                      <span className="w70"/>
                      <input id="holder2" type="radio" value={appConstants.BankDetails.holder.company} checked={bankDetails.holder === appConstants.BankDetails.holder.company} onChange={this.handleHolder}/>
                      <label htmlFor="holder2">{this.props.p.t('BankPayoutDetails.company')}</label>
                    </div>

                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                  <label>{this.props.p.t('BankPayoutDetails.nameOnAccount')}</label>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1 ">
                  <div className="field-holder">
                    <input type="text" name className="uk-form-controls" placeholder={this.props.p.t('BankPayoutDetails.firstName')} value={bankDetails.firstName} onChange={this.handleFirstName}/>

                  </div>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1 ">
                  <div className="field-holder">
                    <input type="text" name className="uk-form-controls" placeholder={this.props.p.t('BankPayoutDetails.lastName')} value={bankDetails.lastName} onChange={this.handleLastName}/>

                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2 uk-width-small-1-1">
                  <div className="field-holder">
                    <label>{this.props.p.t('BankPayoutDetails.accountType')}</label>
                    <div className="tandc">
                      <input id="acctype1" type="radio" checked={bankDetails.type === appConstants.BankDetails.accountType.checking} value={appConstants.BankDetails.accountType.checking} onChange={this.handleType}/>
                      <label htmlFor="acctype1">{this.props.p.t('BankPayoutDetails.checking')}</label>
                      <span className="w70"/>
                      <input id="acctype2" type="radio" checked={bankDetails.type === appConstants.BankDetails.accountType.saving} value={appConstants.BankDetails.accountType.saving} onChange={this.handleType}/>
                      <label htmlFor="acctype2">{this.props.p.t('BankPayoutDetails.saving')}</label>
                    </div>

                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                      <div className="field-holder">
                        <label>{this.props.p.t('BankPayoutDetails.bankName')}</label>
                        <input type="text" name className="uk-form-controls" placeholder={this.props.p.t('BankPayoutDetails.bankName')} value={bankDetails.bank} onChange={this.handleBank}/>

                      </div>
                    </div>
                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                      <div className={((validation.routingNumber.valid === false) && submit) ? 'field-holder error' : 'field-holder'}>
                        <label>{this.props.p.t('BankPayoutDetails.routingNumber')}</label>
                        <input type="text" name className="uk-form-controls" placeholder={this.props.p.t('BankPayoutDetails.routingNumberExample')} value={bankDetails.routingNumber} onChange={this.handleRoutingNumber}/>
                        <span className="error-text">{this.props.p.t('BankPayoutDetails.validation_messages.routingNumber.number')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                      <div className={((validation.accountNumber.valid === false) && submit) ? 'field-holder error' : 'field-holder'}>
                        <label>{this.props.p.t('BankPayoutDetails.accountNumber')}</label>
                        <input type="text" name className="uk-form-controls" placeholder={this.props.p.t('BankPayoutDetails.accountNumberExample')} value={bankDetails.accountNumber} onChange={this.handleAccountNumber}/>
                        <span className="error-text">{this.props.p.t('BankPayoutDetails.validation_messages.accountNumber.number')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 ">
                      <div className="field-holder">
                        <label>{this.props.p.t('BankPayoutDetails.accountNickname')}</label>
                        <input type="text" name className="uk-form-controls" placeholder={this.props.p.t('BankPayoutDetails.accountNicknameExample')} value={bankDetails.nickName} onChange={this.handleNickName}/>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <div className="bankcheque">
                    <svg className="cl-img-cheque" xmlns="http://www.w3.org/2000/svg" viewBox="9537 633 468 247">
                      <g data-name="Group 300" transform="translate(8764 -72)">
                        <g transform="translate(250 -50)">
                          <rect data-name="Rectangle 192" className="cl-img-cheque-1" width="468" height="207" transform="translate(523 755)"/>
                          <rect data-name="Rectangle 193" className="cl-img-cheque-2" width="467" height="206" transform="translate(523.5 755.5)"/>
                        </g>
                        <text data-name="John Roberts, 579 Main St" className="cl-img-cheque-3" transform="translate(1095 723)"><tspan x={0} y={0}>{this.props.p.t('BankPayoutDetails.nameAddressSample')}</tspan></text>
                        <text data-name="Pay to the Order of" className="cl-img-cheque-4" transform="translate(790 764)"><tspan x={0} y={0}> {this.props.p.t('BankPayoutDetails.payToThe')}</tspan><tspan x={0} y={17}>{this.props.p.t('BankPayoutDetails.orderOf')}</tspan></text>
                        <text className="cl-img-cheque-4" transform="translate(790 851)"><tspan x={0} y={0}>{this.props.p.t('BankPayoutDetails.memo')}</tspan></text>
                        <text data-name="Routing Numbe r" className="cl-img-cheque-5" transform="translate(796 947)"><tspan x={0} y={0}>{this.props.p.t('BankPayoutDetails.routingNumber')}</tspan></text>
                        <text data-name="12345678 9" className="cl-img-cheque-6" transform="translate(803 896)"><tspan x={0} y={0}>{this.props.p.t('BankPayoutDetails.routingNumberExample')}</tspan></text>
                        <text data-name="Account number" className="cl-img-cheque-7" transform="translate(959 947)"><tspan x={0} y={0}>{this.props.p.t('BankPayoutDetails.accountNumber')}</tspan></text>
                        <text data-name="0008765432 1" className="cl-img-cheque-8" transform="translate(940 896)"><tspan x={0} y={0}>{this.props.p.t('BankPayoutDetails.accountNumberSample')}</tspan></text>
                        <text data-name="1234" className="cl-img-cheque-9" transform="translate(1118 896)"><tspan x={0} y={0}>{this.props.p.t('BankPayoutDetails.accountNumberSample2')}</tspan></text>
                        <path className="cl-img-cheque-10" d="M604.5,949.5v27.018" transform="translate(250 -50)"/>
                        <path className="cl-img-cheque-10" d="M765.5,949.5v27.018" transform="translate(250 -50)"/>
                        <text data-name="$" className="cl-img-cheque-11" transform="translate(1116 783)"><tspan x="0" y="0">$</tspan></text>
                        <text className="cl-img-cheque-4" transform="translate(1042 851)"><tspan x={0} y={0}>{this.props.p.t('BankPayoutDetails.date')}</tspan></text>
                        <rect className="cl-img-cheque-12" width="90" height="33" transform="translate(1133.5 748.5)"/>
                        <text data-name="Bank of NCP" className="cl-img-cheque-13" transform="translate(790 737)"><tspan x={0} y={0}>{this.props.p.t('BankPayoutDetails.bankNameSample')}</tspan></text>
                        <text data-name="San Francisco, CA 94103" className="cl-img-cheque-3" transform="translate(1095 736)"><tspan x={0} y={0}>{this.props.p.t('BankPayoutDetails.addressSample')}</tspan></text>
                        <path data-name="Line" className="cl-img-cheque-14" d="M541.5,836.5H866.506" transform="translate(250 -50)"/>
                        <path className="cl-img-cheque-14" d="M541.5,870.5h433" transform="translate(250 -50)"/>
                        <path className="cl-img-cheque-14" d="M541.5,903.5h239" transform="translate(250 -50)"/>
                        <path className="cl-img-cheque-14" d="M793.5,903.5H974.511" transform="translate(250 -50)"/>
                        <g transform="translate(250 -50)">
                          <rect data-name="Rectangle 200" className="cl-img-cheque-15" width="4" height="12" transform="translate(539 931)"/>
                          <rect data-name="Rectangle 201" className="cl-img-cheque-16" width="3" height="11" transform="translate(539.5 931.5)"/>
                        </g>
                        <g transform="translate(250 -50)">
                          <rect data-name="Rectangle 202" className="cl-img-cheque-15" width="4" height="12" transform="translate(675 931)"/>
                          <rect data-name="Rectangle 203" className="cl-img-cheque-16" width="3" height="11" transform="translate(675.5 931.5)"/>
                        </g>
                        <g transform="translate(250 -50)">
                          <rect data-name="Rectangle 204" className="cl-img-cheque-15" width="4" height="12" transform="translate(852 931)"/>
                          <rect data-name="Rectangle 205" className="cl-img-cheque-16" width="3" height="11" transform="translate(852.5 931.5)"/>
                        </g>
                        <g transform="translate(250 -50)">
                          <rect data-name="Rectangle 206" className="cl-img-cheque-15" width="4" height="8" transform="translate(547 928)"/>
                          <rect data-name="Rectangle 207" className="cl-img-cheque-16" width="3" height="7" transform="translate(547.5 928.5)"/>
                        </g>
                        <g transform="translate(250 -50)">
                          <rect data-name="Rectangle 208" className="cl-img-cheque-15" width="4" height="8" transform="translate(683 928)"/>
                          <rect data-name="Rectangle 209" className="cl-img-cheque-16" width="3" height="7" transform="translate(683.5 928.5)"/>
                        </g>
                        <g transform="translate(250 -50)">
                          <rect data-name="Rectangle 210" className="cl-img-cheque-15" width="4" height="8" transform="translate(859 927)"/>
                          <rect data-name="Rectangle 211" className="cl-img-cheque-16" width="3" height="7" transform="translate(859.5 927.5)"/>
                        </g>
                        <g transform="translate(250 -50)">
                          <rect data-name="Rectangle 212" className="cl-img-cheque-15" width="4" height="8" transform="translate(547 938)"/>
                          <rect data-name="Rectangle 213" className="cl-img-cheque-16" width="3" height="7" transform="translate(547.5 938.5)"/>
                        </g>
                        <g transform="translate(250 -50)">
                          <rect data-name="Rectangle 214" className="cl-img-cheque-15" width="4" height="8" transform="translate(683 938)"/>
                          <rect data-name="Rectangle 215" className="cl-img-cheque-16" width="3" height="7" transform="translate(683.5 938.5)"/>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1"/>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2"/>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2">
            <div className="nxtAlign">
              <NextLink submitForm={this.onSubmitForm} saveData={this.props.saveBankPayoutDetails} data={bankDetails} saveType={appConstants.saveType.onlyProfile} next={WELCOME}/>
            </div>
          </div>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-1">
            <div className="finishDiv">
              <FinishLaterLink/>
            </div>
          </div>
        </div>
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.saveBankPayoutDetails}
          data={bankDetails}
          saveType={appConstants.saveType.onlyProfile}
        />
      </div>
    );
  }
  /* eslint complexity:0 */
  static get propTypes() {
    return {
      bankDetails: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      saveBankPayoutDetails: PropTypes.func.isRequired
    };
  }
}

BankPayoutDetails.defaultProps = {
  bankDetails: {}
};

const mapStateToProps = state => {
  const {bankDetails} = state;
  return {
    bankDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveBankPayoutDetails: (bankDetails, updateType) => dispatch(saveBankPayoutDetails(bankDetails, updateType))
  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(BankPayoutDetails));
