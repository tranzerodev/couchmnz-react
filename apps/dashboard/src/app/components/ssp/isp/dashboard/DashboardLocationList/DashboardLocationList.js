import React, {Component} from 'react';
import {connect} from 'react-redux';
import LocationList from './LocationList';
import SaveLink from '../DashboardSaveLink';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import appConstants from '../../../../../constants/appConstants';
import {DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_ADD, DASHBOARD_MANAGE_SPORT_SESSIONS} from '../../../../../constants/pathConstants';

import {
  saveTrainingLocations
} from '../../../../../actions';
import {SAMPLE_LOCATION} from '../../../../../constants/assetsPaths';
import ExampleModal from '../ExampleModal/ExampleModal';

class DashboardLocationList extends Component {
  constructor(props) {
    super(props);
    this.onChangeTravelPreference = this.onChangeTravelPreference.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.getTrainingLocationNotFilled = this.getTrainingLocationNotFilled.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSampleModal = this.handleSampleModal.bind(this);

    this.state = {
      willingToTravel: this.props.travelPreferences.willingToTravel,
      isValidWillingToTravel: true,
      isNotFilledModalOpen: false,
      notFilled: [],
      isModalOpen: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onSubmitForm() {
    if (this.props.sportActivationStatus === false) {
      const notFilled = this.getTrainingLocationNotFilled(this.props);
      if (notFilled.length > 0) {
        this.setState({isNotFilledModalOpen: true, notFilled});
        return false;
      }
    }
    return true;
  }

  onChangeTravelPreference(e) {
    const value = e.target.value === '' ? null : e.target.value;
    this.setState({willingToTravel: value});
  }

  getTrainingLocationNotFilled(props) {
    const notFilled = [];
    const {locations} = props;
    if (locations.data.length < 1) {
      notFilled.push(this.props.p.t('ISPRegistration6.location'));
    }
    return notFilled;
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  handleAdd() {
    this.props.history.push(DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS_ADD);
  }

  handleSampleModal() {
    const {isModalOpen} = this.state;
    this.setState({isModalOpen: !isModalOpen});
  }

  render() {
    const {p, sportActivationStatus} = this.props;
    const {isModalOpen} = this.state;
    const buttonName = sportActivationStatus ? p.t('SaveButton.save_continue') : p.t('SaveButton.continue');
    
    const saveType = appConstants.saveType.sportsSpecific;
    const {offerTerminology} = this.props;
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="trainingLocation">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <div className="cl-sd-trainingLocationInner">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-7-10 uk-width-small-1-1">
                    <h1 className="uk-padding-remove">{p.t('DashboardLocationList.heading')}</h1>
                  </div>
                  <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-1">
                    <div className="viewExpOuter">
                      <a onClick={this.handleSampleModal} data-uk-modal>{this.props.p.t('ExampleModal.message')}</a>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                    <p>{p.t('DashboardLocationList.let_clients_know')}</p>
                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                    <div className="cl-sd-locationMapOuter">
                      <LocationList/>
                      <div className="cl-sd-locationMapInner">
                        <a onClick={this.handleAdd} className="cl-sd-addsessionlocation1-2">
                          <span className="plus-icon">
                            <svg className="cl-icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="-21149.75 -6552.75 24.129 24.127">
                              <g data-name="Symbol 27 – 2" transform="translate(-22854.186 -7086.772)">
                                <g data-name="Group 2726" transform="translate(945.047 -998.235) rotate(45)">
                                  <line data-name="Line 230" className="cl-icon-plus-1" x2="16" y2="16" transform="translate(1629.5 538.5)"/>
                                  <line data-name="Line 231" className="cl-icon-plus-1" x1="16" y2="16" transform="translate(1629.5 538.5)"/>
                                </g>
                              </g>
                            </svg>
                          </span>
                          <span className="add-text">{this.props.p.t('DashboardLocationList.add_another_location')}</span>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*         <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1"/>
        <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1"> */}

          {!sportActivationStatus && <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <div className="addLocation">
                <SaveLink
                  valid
                  saveType={saveType}
                  saveData={this.props.saveTrainingLocations}
                  data={{willingToTravel: this.state.willingToTravel}}
                  submitForm={this.onSubmitForm}
                  buttonName={buttonName}
                  isNewSports={sportActivationStatus}
                  next={DASHBOARD_MANAGE_SPORT_SESSIONS}
                />
              </div>
            </div>

          </div>}

          <ExampleModal title="ExampleModal.sessionLocation" offerTerminology={offerTerminology.singular} isModalOpen={isModalOpen} scroll={appConstants.scroll.locations} image={SAMPLE_LOCATION} onClose={this.handleSampleModal}/>

        </div>
      </div>

    );
  }
}

DashboardLocationList.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  travelPreferences: PropTypes.object.isRequired,
  saveTrainingLocations: PropTypes.func.isRequired,
  sportActivationStatus: PropTypes.bool.isRequired,
  offerTerminology: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {travelPreferences, currentSport, locations} = state;
  return {
    travelPreferences,
    sportActivationStatus: (currentSport.data.isActive === appConstants.sportsActiveFlages.active),
    locations,
    offerTerminology: currentSport.data && currentSport.data.offerTerminology ? currentSport.data.offerTerminology : {singular: appConstants.defaultOfferTerminology}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveTrainingLocations: (data, updateType) => dispatch(saveTrainingLocations(data, updateType))
  };
};
export default translate(connect(mapStateToProps, mapDispatchToProps)(DashboardLocationList));

