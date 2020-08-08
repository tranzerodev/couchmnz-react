import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {saveBusinessModel} from '../../../actions';
import appConstants from '../../../constants/appConstants';
import DashboardSaveLink from '../../ssp/isp/dashboard/DashboardSaveLink';
import {notNull} from '../../../validators/common/util';
import {DASHBOARD_ISP_LOCATION} from '../../../constants/pathConstants';

class DashboardBusinessModel extends Component {
  constructor(props) {
    super(props);
    const {businessModel} = props;
    this.state = {
      businessModel,
      notFilled: [],
      isBiographyNotFilledModalOpen: false,
      submit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onBiographyNotFilledModalClose = this.onBiographyNotFilledModalClose.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getNotFilled() {
    const notFilled = [];
    if (!notNull(this.state.businessModel)) {
      notFilled.push(this.props.p.t('BusinessModel.businessModel'));
    }
    return notFilled;
  }

  handleChange(e) {
    this.setState({businessModel: e.target.value});
  }

  onBiographyNotFilledModalClose() {
    this.setState({isBiographyNotFilledModalOpen: false});
  }

  onSubmitForm() {
    const notFilled = this.getNotFilled();
    this.setState({submit: true});
    if (notFilled.length > 0) {
      if (this.props.profileActivationStatus) {
        return false;
      }
      this.setState({notFilled, isBiographyNotFilledModalOpen: true});
      return false;
    }
    return true;
  }

  render() {
    const {p, profileActivationStatus} = this.props;
    const {businessModel, submit} = this.state;
    const valid = notNull(businessModel);
    const buttonName = profileActivationStatus ? p.t('DashboardSaveLink.save') : p.t('DashboardSaveLink.save_and_continue');
    return (
      <div className="dashboardSection">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-10 uk-width-large-1-10 uk-width-medium-1-1 uk-width-small-1-1"/>
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
            <div className="trainingLocation">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="cl-sd-trainingLocationInner service_location ">

                    <div className={valid === false && submit === true ? 'field-holder error' : 'field-holder'}>
                      <div className="uk-grid">
                        <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1  uk-width-small-1-1">

                          <div className="subcription">
                            <div className="tandc">
                              <input id="subcription1" type="radio" value={'PPB'} checked={businessModel === 'PPB'} onClick={this.handleChange}/>
                              <label htmlFor="subcription1">{p.t('BusinessModel.payPerBooking')}</label>
                            </div>
                            <div className="tableDiv">
                              <div className="rCol">
                                <p className="mb15 pt0 pb0">{p.t('DashboardAccount.payPerBookingMessage')}</p>
                                <p className="pt0 pb5"><strong>{p.t('DashboardAccount.fees')}</strong></p>
                                <p className="pt0 pb5">{p.t('DashboardAccount.payPerBookingCoachlistMessage')}</p>
                                {/* <p className="pt0 pb0"><a href="#subcriptionOneModal" data-uk-modal>{p.t('DashboardAccount.learnMore')}</a></p> */}
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1  uk-width-small-1-1">
                          <div className="subcription ">
                            <div className="tandc">
                              <input id="subcription2" type="radio" readOnly checked={false}/>
                              <label htmlFor="subcription2" className="not-visible"><span>{p.t('DashboardAccount.paidSubscription')}  <span className="cl-sd-comingSoon">{p.t('DashboardAccount.coming_soon')}</span></span></label>
                            </div>
                            <div className="tableDiv">
                              <div className="rCol">
                                <p className="mb15 pt0 pb0">{p.t('DashboardAccount.cost_effective')}</p>
                                <p className="pt0 pb5"><strong>{p.t('DashboardAccount.fees')}</strong></p>
                                <p className="pt0 pb5">{p.t('DashboardAccount.you_pay')}</p>
                                {/* <p className="pt0 pb0"><a href="#subcriptionTwoModal" data-uk-modal>{p.t('DashboardAccount.learnMore')}</a></p> */}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <span className="error-text">{p.t('DashboardAccount.validationMessage.businessModel')}</span>
                    </div>

                  </div>
                  <div className="uk-grid">
                    <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1">
                      <DashboardSaveLink
                        saveType={appConstants.saveType.onlyProfile}
                        saveData={this.props.saveBusinessModel}
                        data={
                          businessModel
                        }
                        submitForm={this.onSubmitForm}
                        buttonName={buttonName}
                        isNewSports={profileActivationStatus}
                        next={DASHBOARD_ISP_LOCATION}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      businessModel: PropTypes.string,
      saveBusinessModel: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      profileActivationStatus: PropTypes.bool.isRequired
    };
  }
}

DashboardBusinessModel.defaultProps = {
  businessModel: null
};
const mapStateToProps = state => {
  const {businessModel, userProfiles} = state;
  return {
    businessModel,
    profileActivationStatus: userProfiles.selectedProfile.isActive === appConstants.profileActiveFlages.active
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveBusinessModel: (data, updateType) => dispatch(saveBusinessModel(data, updateType))
  };
};
const DashboardBusinessModelPage = translate(connect(mapStateToProps, mapDispatchToProps)(DashboardBusinessModel));
export default DashboardBusinessModelPage;
