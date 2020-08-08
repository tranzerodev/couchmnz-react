import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {
  saveBusinessModel
} from '../../../../../actions';
import NextLink from '../../../../common/RegistrationNextLink';
import FinishLaterLink from '../../../../common/FinishLaterLink';
import appConstants from '../../../../../constants/appConstants';
import {REGISTRATION_ISP_BOOKING_PREFERENCES} from '../../../../../constants/pathConstants';
import RequiredNotFilledModal from '../../registration/RequiredNotFilledModal';
import {notNull} from '../../../../../validators/common/util';

class ISPRegistration9Class extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onBiographyNotFilledModalClose = this.onBiographyNotFilledModalClose.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.state = {
      businessModel: this.props.businessModel,
      notFilled: [],
      isBiographyNotFilledModalOpen: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleChange(e) {
    this.setState({businessModel: e.target.value});
  }
  onSubmitForm() {
    const notFilled = this.getNotFilled();
    if (notFilled.length > 0) {
      this.setState({notFilled, isBiographyNotFilledModalOpen: true});
      return false;
    }
    return true;
  }
  onBiographyNotFilledModalClose() {
    this.setState({isBiographyNotFilledModalOpen: false});
  }
  getNotFilled() {
    const notFilled = [];
    if (!notNull(this.state.businessModel)) {
      notFilled.push(this.props.p.t('BusinessModel.businessModel'));
    }
    return notFilled;
  }
  render() {
    const {businessModel} = this.state;
    return (
      <section className="stepSection stepSectionNxt ssp-regflow-1o">
        <div className="uk-container uk-container-center">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <h1 className="uk-padding-remove">{this.props.p.t('ISPRegistration9.title')}</h1>
              <p>{this.props.p.t('ISPRegistration9.message')}:</p>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="subcription subcriptionfirst">
                <div className="tandc">
                  <input id="subcription1" type="radio" value={appConstants.businessModel.payPerBooking} checked={businessModel === appConstants.businessModel.payPerBooking} onClick={this.handleChange}/>
                  <label htmlFor="subcription1">{this.props.p.t('BusinessModel.payPerBooking')}</label>
                </div>
                <div className="tableDiv">
                  <div className="lCol"/>
                  <div className="rCol">
                    <p className="mb30">{this.props.p.t('BusinessModel.payPerBookingMessage')}</p>
                    <h6>{this.props.p.t('BusinessModel.fees')}</h6>
                    <p>{this.props.p.t('BusinessModel.payPerBookingCoachlistMessage')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="subcription subcriptionSec">
                <div className="tandc">
                  <input id="subcription2" type="radio" disabled/>
                  <label htmlFor="subcription2">{this.props.p.t('ISPRegistration9.paidSubscriptionHeader')} <i>({this.props.p.t('ISPRegistration9.comingSoon')})</i></label>
                </div>
                <div className="tableDiv">
                  <div className="lcol"/>
                  <div className="rcol">
                    <p className="mb30">{this.props.p.t('ISPRegistration9.paidSubscriptionMessage')}</p>
                    <h6>{this.props.p.t('ISPRegistration9.fees')}</h6>
                    <p>{this.props.p.t('ISPRegistration9.subscriptionMessage')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2"/>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2 mnone"/>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2">
              <div className="nxtAlign">
                <NextLink
                  submitForm={this.onSubmitForm}
                  saveData={this.props.saveBusinessModel}
                  data={
                    this.state.businessModel
                  }
                  saveType={appConstants.saveType.onlyProfile}
                  next={REGISTRATION_ISP_BOOKING_PREFERENCES}
                />
              </div>
            </div>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1">
              <div className="finishDivSec">
                <FinishLaterLink/>
              </div>
            </div>
          </div>
        </div>
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isBiographyNotFilledModalOpen}
          handleClose={this.onBiographyNotFilledModalClose}
          saveData={this.props.saveBusinessModel}
          data={
            this.state.businessModel
          }
          saveType={appConstants.saveType.onlyProfile}
        />
      </section>
    );
  }
  static get propTypes() {
    return {
      businessModel: PropTypes.string.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      saveBusinessModel: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {businessModel} = state;
  return {
    businessModel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveBusinessModel: (businessModel, updateType) => dispatch(saveBusinessModel(businessModel, updateType))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(ISPRegistration9Class));
