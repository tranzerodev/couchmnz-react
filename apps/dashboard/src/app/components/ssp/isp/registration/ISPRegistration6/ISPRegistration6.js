import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import LocationListClass from '../../common/LocationList';
import NewLocation from '../NewLocation';
import TravelPreferencesClass from '../../common/TravelPreferences';
import FinishLaterLink from '../../../../common/FinishLaterLink';
import NextLink from '../../../../common/RegistrationNextLink';
import {
  fetchLocations,
  sspTravelPreferenceSubmit,
  sspTrainingLocationsSubmit,
  saveTrainingLocations
} from '../../../../../actions';
import {REGISTRATION_ISP_SESSIONS, REGISTRATION_ISP_PRICING} from '../../../../../constants/pathConstants';
import appConstants from '../../../../../constants/appConstants';
import {notNull} from '../../../../../validators/common/util';
import RequiredNotFilledModal from '../RequiredNotFilledModal';

class ISPRegistration6Class extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAddLocationToggle = this.onAddLocationToggle.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditSave = this.onEditSave.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleNav = this.handleNav.bind(this);
    this.getTrainingLocationNotFilled = this.getTrainingLocationNotFilled.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.onChangeTravelPreference = this.onChangeTravelPreference.bind(this);
    this.state = {
      addLocation: false,
      edit: false,
      editLocation: {},
      isNotFilledModalOpen: false,
      notFilled: [],
      willingToTravel: this.props.travelPreferences.willingToTravel
    };
  }
  onEditSave() {
    this.setState({edit: false, editLocation: {}, addLocation: false});
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleNav() {
    this.props.history.push(REGISTRATION_ISP_SESSIONS);
  }
  handleBack() {
    this.props.history.push(REGISTRATION_ISP_PRICING);
  }
  handleSubmit(status) {
    this.props.sspTravelPreferenceSubmit(status);
    this.props.sspTrainingLocationsSubmit(status);
  }
  onAddLocationToggle() {
    this.setState({
      addLocation: !this.state.addLocation,
      edit: false,
      editLocation: {}
    });
  }
  onEdit(e) {
    const id = e.currentTarget.getAttribute('value');
    const index = this.props.locations.data.findIndex(location => location.id === id);
    if (index >= 0) {
      const location = this.props.locations.data[index];
      this.setState({edit: true, editLocation: location});
    }
  }
  onSubmitForm() {
    const notFilled = this.getTrainingLocationNotFilled(this.props);
    if (notFilled.length > 0) {
      this.setState({isNotFilledModalOpen: true, notFilled});
      return false;
    }
    return true;
  }
  getTrainingLocationNotFilled(props) {
    const notFilled = [];
    const {locations} = props;
    if (locations.data.length < 1) {
      notFilled.push(this.props.p.t('ISPRegistration6.location'));
    }
    if (!notNull(this.state.willingToTravel)) {
      notFilled.push(this.props.p.t('ISPRegistration6.travel_preference'));
    }
    return notFilled;
  }
  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  onChangeTravelPreference(e) {
    const value = e.target.value === '' ? null : e.target.value;
    this.setState({willingToTravel: value});
  }
  render() {
    return (
      <div>
        <section className="profileType">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="profileTypeInfo">
                    <svg className="cl-icon-ssp-coach" xmlns="http://www.w3.org/2000/svg" viewBox="470.462 1354.31 62.695 83.038">
                      <g data-name="Group 13" transform="translate(-3700 382)">
                        <g data-name="Coach,-Trainer,-Instructor" transform="translate(4171 973)">
                          <path className="cl-icon-ssp-coach-1" d="M5.989,16.971s1.635-7.309,6.685-12.14S25.6,0,25.6,0s5.181,4.282,6.669,8.883A67.159,67.159,0,0,1,34.49,18.75l-28.555.087Z"/>
                          <path className="cl-icon-ssp-coach-1" d="M28.686,0s4.909,5.533,5.88,8.114A59.914,59.914,0,0,1,36.4,16.8a47.45,47.45,0,0,1,4.63-4.67A20.573,20.573,0,0,1,44.388,10.7s-.978-4.975-4.481-7.278S28.686,0,28.686,0Z"/>
                          <path className="cl-icon-ssp-coach-1" d="M38.578,18.1a28.641,28.641,0,0,1,4.461-3.96,39.961,39.961,0,0,1,4.146-2.389l13.639.381a2.144,2.144,0,0,1,.468,2.793c-.887,1.832-1.009,3.121-2.347,3.121S38.578,18.1,38.578,18.1Z"/>
                          <path className="cl-icon-ssp-coach-2" d="M6.436,19.351S4.416,25.4,5.08,30.224,7.536,37.5,8.148,40.263a43.2,43.2,0,0,1,.739,5.084c.056.62,20.8,6.424,20.8,6.424s-1.141-4.341-.1-5.694,8.207-.918,9.777-1.778a10.4,10.4,0,0,0,4.526-4.886c1.8-3.99,2.026-9.407,2.371-11.544a47.825,47.825,0,0,0,.03-9.268"/>
                          <path className="cl-icon-ssp-coach-2" d="M6.09,50.91a27.9,27.9,0,0,0-3.978,6.26C1.062,59.947,0,67.153,0,67.153s9.222,6.832,19.663,8.2,24.86-3.225,24.86-3.225-3.89-6.266-6.306-9.846a47.288,47.288,0,0,0-6.975-7.5Z"/>
                          <path className="cl-icon-ssp-coach-1" d="M8.814,45.857l-2.54,4.849s23.943,7.818,27.532,8.022-4.09-6.692-4.09-6.692Z"/>
                          <g transform="translate(26.025 51.018)">
                            <g>
                              <ellipse data-name="Ellipse 13" className="cl-icon-ssp-coach-3" cx="15.827" cy="15.665" rx="15.827" ry="15.665" transform="translate(0 0)"/>
                              <ellipse data-name="Ellipse 14" className="cl-icon-ssp-coach-4" cx="15.327" cy="15.165" rx="15.327" ry="15.165" transform="translate(0.5 0.5)"/>
                            </g>
                            <g transform="translate(5.552 6.456)">
                              <path className="cl-icon-ssp-coach-1" d="M1.906,9.857H8.62s-1.05,6.917,5.161,6.917a5.341,5.341,0,0,0,5.748-5.4,4.709,4.709,0,0,0-2.434-4.148C15.1,6.082,12.013,6.5,12.013,6.5L11.979,7.88H10.253L8.371,6.122,0,5.976Z"/>
                              <g>
                                <path data-name="Path 31" className="cl-icon-ssp-coach-5" d="M5.07,6.052V9.877H1.914L.01,6.052Z"/>
                                <path data-name="Path 32" className="cl-icon-ssp-coach-6" d="M4.57,6.552H.817L2.224,9.377H4.57Z"/>
                              </g>
                              <path className="cl-icon-ssp-coach-2" d="M13.732,14.658A3.733,3.733,0,0,0,15.816,14a4.946,4.946,0,0,0,1.325-2"/>
                              <path className="cl-icon-ssp-coach-2" d="M11.567,4.15l1.655-3.3"/>
                              <path data-name="Line" className="cl-icon-ssp-coach-2" d="M9.716,4.15V.461"/>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <h5>{this.props.p.t('ISPRegistration6.createProfile')}</h5>
                    <h2>{this.props.p.t('ISPRegistration6.title')}</h2>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="processProgress">
                    <ul>
                      <li className="complete">
                        <span>
                          <svg className="tick-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 8">
                            <path fill="none" fillRule="evenodd" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 3.793l2.095 2.794L9.38 1"/>
                          </svg>
                        </span>
                        <div/>
                        <p>{this.props.p.t('ISPRegistration6.buildYour')}<br/> {this.props.p.t('ISPRegistration6.profile')}</p>

                      </li>
                      <li className="processing">
                        <span/>
                        <div>
                          <ul className="buildStep uk-dotnav">
                            <li><a className="complete"/></li>
                            <li><a className="current"/></li>
                            <li><a className="upcoming"/></li>
                          </ul>
                        </div>
                        <p>{this.props.p.t('ISPRegistration6.defineTraining')}<br/> {this.props.sessionName ? this.props.sessionName : 'Session'}</p>
                      </li>
                      <li className="upcoming">
                        <span/>
                        <div/>
                        <p>{this.props.p.t('ISPRegistration6.completeYour')} <br/>{this.props.p.t('ISPRegistration6.account')}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="top-back-sec">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <a onClick={this.handleBack} className="back">
                    <svg className="cl-icon-back-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="7348.966 -314.516 17.534 11.033">
                      <g data-name="Group 118" transform="translate(7302 -512.5)">
                        <path data-name="Path 35" className="cl-icon-back-arrow-1" d="M0,0,4.749,5,3.795,6,0,10" transform="translate(52.749 208.5) rotate(180)"/>
                        <line data-name="Line 9" className="cl-icon-back-arrow-1" x2="16" transform="translate(48.5 203.5)"/>
                      </g>
                    </svg>
                    {this.props.p.t('ISPRegistration6.back')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end back SECTION --> */}
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <div className="uk-container uk-container-center cl-sd-location-1">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <TravelPreferencesClass handleChangeTravelPreference={this.onChangeTravelPreference} willingToTravel={this.state.willingToTravel ? this.state.willingToTravel : ''}/>
                { !(this.state.addLocation || this.state.edit) && <LocationListClass handleAddLocationToggle={this.onAddLocationToggle} handleEdit={this.onEdit}/> }
                {(!(this.props.locations && this.props.locations.data && this.props.locations.data.length >= 1) || this.state.addLocation || this.state.edit) &&
                  <NewLocation edit={this.state.edit} location={this.state.editLocation} handleEditSave={this.onEditSave}/> }
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-2"/>
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-2">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-2 mnone"/>
                  <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
                    <div className="nxtAlign">
                      <NextLink
                        submitForm={this.onSubmitForm}
                        saveData={this.props.saveTrainingLocations}
                        data={{willingToTravel: this.state.willingToTravel}}
                        saveType={appConstants.saveType.sportsSpecific}
                        next={REGISTRATION_ISP_SESSIONS}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-1  uk-width-small-1-1">
                <div className="finishDivSec">
                  <FinishLaterLink/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.saveTrainingLocations}
          data={{willingToTravel: this.state.willingToTravel}}
          saveType={appConstants.saveType.sportsSpecific}
        />
      </div>
    );
  }
  static get propTypes() {
    return {
      buttonText: PropTypes.string,
      history: PropTypes.object,
      locations: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      saveTrainingLocations: PropTypes.func.isRequired,
      travelPreferences: PropTypes.object.isRequired
    };
  }
}

ISPRegistration6Class.defaultProps = {
  buttonText: 'Next',
  locations: {data: []},
  history: {}
};

const mapStateToProps = state => {
  const {locations, travelPreferences, sspValidation, userIDs, profile, sport} = state;
  return {
    travelPreferences,
    locations,
    userIDs,
    sspValidation,
    profile,
    sport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLocations: userID => dispatch(fetchLocations(userID)),
    sspTravelPreferenceSubmit: data => dispatch(sspTravelPreferenceSubmit(data)),
    sspTrainingLocationsSubmit: data => dispatch(sspTrainingLocationsSubmit(data)),
    saveTrainingLocations: (data, updateType) => dispatch(saveTrainingLocations(data, updateType))
  };
};
const Registration6 = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration6Class);
export default translate(Registration6);
