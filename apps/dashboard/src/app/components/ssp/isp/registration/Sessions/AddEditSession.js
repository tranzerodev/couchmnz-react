import React, {Component} from 'react';
import {BlockPicker} from 'react-color';
import {connect} from 'react-redux';
import appConstants from '../../../../../constants/appConstants';

import translate from 'redux-polyglot/translate';
import {
  updateSession,
  removeSession,
  sspSessionSubmit
} from '../../../../../actions';
import {PropTypes} from 'prop-types';
import config from '../../../../../config';

import {validateSession} from '../../../../../validators/ssp/isp/registration/session';
import {notNull} from '../../../../../validators/common/util';

/* eslint complexity: 0 */

class AddEditSession extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);

    this.handleClose = this.handleClose.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleBuffer = this.handleBuffer.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
    this.handleLength = this.handleLength.bind(this);
    this.handleLevel = this.handleLevel.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleNumberOfSessions = this.handleNumberOfSessions.bind(this);
    this.handleSpecificNumber = this.handleSpecificNumber.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleColorPicker = this.handleColorPicker.bind(this);
    this.handleOverridePricing = this.handleOverridePricing.bind(this);
    this.handleGroupSize = this.handleGroupSize.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleRenderPrice = this.handleRenderPrice.bind(this);
    this.handleRenderGender = this.handleRenderGender.bind(this);
    let session = {
      id: null,
      ageGroupID: null,
      ageGroupName: null,
      color: '#42B7DB',
      gender: null,
      name: '',
      overridePricing: 0,
      skillLevelID: null,
      skillLevelName: null,
      subSSPTypeBaseRateID: null,
      subSSPTypeID: null,
      subSSPTypeName: null,
      trainingLocationID: null,
      bufferBetweenSession: appConstants.profileSession.buffer.def,
      defaultSessionLength: appConstants.profileSession.session.def
    };

    const {isEdit} = this.props;
    if (isEdit) {
      session = this.props.session;
    }

    this.state = {
      colorPicker: 'none',
      sessionName: config.offerTerminologies.Session,
      session,
      submit: false,
      validation: {}
    };
  }
  handleSave() {
    const {session} = this.state;

    const validation = validateSession(session);
    console.log('validationnn ', validation);
    if (validation.valid) {
      this.props.onSave({
        id: (session.id) ? session.id : null,
        color: session.color ? session.color : config && config.colors && config.colors.length ? config.colors[0] : '#42B7DB',
        defaultSession: 'N',
        calendarLabel: 'calendar',
        numberOfSessions: 1,
        ...session
      });
      this.props.closeModal();
    } else {
      this.setState({
        validation,
        submit: true
      });
    }
  }

  handleValidation() {
    const {session} = this.state;
    const validation = validateSession(session);
    this.setState({
      validation
    });
  }

  handleName(e) {
    const {session} = this.state;
    const newSession = Object.assign({}, session, {name: e.target.value});
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleClose() {
    this.props.closeModal();
  }
  handleAge(e) {
    const {session} = this.state;
    const id = e.target.value;
    const age = this.props.ages[this.handleSearchAge(this.props.ages, id)];

    const newSession = Object.assign({}, session, {ageGroupID: age ? age.id : null, ageGroupName: age ? age.name : null});
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleType(e) {
    const {session} = this.state;
    const subSSPType = this.props.training[this.handleSearchTraining(this.props.training, e.target.value)];
    const serviceType = subSSPType ? {} : this.props.services[this.handleSearchTraining(this.props.services, e.target.value)];
    const newSession = Object.assign({}, session,
      {
        subSSPTypeID: subSSPType ? subSSPType.id : serviceType ? serviceType.id : null,
        subSSPTypeName: subSSPType ? subSSPType.name : serviceType ? serviceType.name : null,
        subSSPTypeBaseRateID: null
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }

  handleGender(e) {
    const {session} = this.state;

    const newSession = Object.assign({}, session,
      {
        gender: e.target.value.length > 6 ? null : e.target.value
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleLevel(e) {
    const {session} = this.state;
    const skillLevel = this.props.skillLevels[this.handleSearchSkillLevel(this.props.skillLevels, e.target.value)];

    const newSession = Object.assign({}, session,
      {
        skillLevelID: skillLevel ? skillLevel.id : null,
        skillLevelName: skillLevel ? skillLevel.name : null
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleLabel(e) {
    const {session} = this.state;

    const newSession = Object.assign({}, session,
      {
        calendarLabel: e.target.value
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }

  handleLength(e) {
    const {session} = this.state;

    const newSession = Object.assign({}, session,
      {
        defaultSessionLength: isNaN(e.target.value) ? null : (parseInt(e.target.value, 10) > 0 ? parseInt(e.target.value, 10) : 0)
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }

  handleBuffer(e) {
    const {session} = this.state;

    const newSession = Object.assign({}, session,
      {
        bufferBetweenSession: isNaN(e.target.value) ? null : (parseInt(e.target.value, 10) > 0 ? parseInt(e.target.value, 10) : 0)
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleLocation(e) {
    const {session} = this.state;
    const trainingLocation = this.props.locations.data[this.handleSearchLocations(this.props.locations.data, e.target.value)];

    const newSession = Object.assign({}, session,
      {
        trainingLocationID: trainingLocation ? trainingLocation.id : null
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleNumberOfSessions(e) {
    const {session} = this.state;

    const newSession = Object.assign({}, session,
      {
        numberOfSessions: isNaN(e.target.value) ? null : parseInt(e.target.value, 10)
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleSpecificNumber(e) {
    const {session} = this.state;

    const newSession = Object.assign({}, session,
      {
        isSpecificNumberOfSessions: e.target.value
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleOverridePricing(e) {
    const {session} = this.state;
    const {value} = e.target;
    const intValue = parseInt(value, 10);
    const newSession = Object.assign({}, session,
      {
        overridePricing: (intValue) ? intValue : 0
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleSearchSession(sessions, id) {
    return sessions.findIndex(session => session.id === id);
  }
  handleSearchAge(ages, id) {
    return ages.findIndex(age => age.id === id);
  }
  handleSearchTraining(trainingPrefs, id) {
    return trainingPrefs.findIndex(training => training.id === id);
  }
  handleSearchLocations(locations, id) {
    return locations.findIndex(location => location.id === id);
  }
  handleSearchSkillLevel(skillLevels, id) {
    return skillLevels.findIndex(skillLevel => skillLevel.id === id);
  }
  handleSearchPrice(prices, id) {
    return prices.findIndex(price => price.id === id);
  }
  handleColorPicker() {
    const colorPicker = this.state.colorPicker === 'none' ? 'block' : 'none';
    this.setState({
      colorPicker
    });
  }
  handleChangeColor(color/* , event */) {
    const {session} = this.state;

    const newSession = Object.assign({}, session,
      {
        color: color.hex
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleGroupSize(e) {
    const {session} = this.state;

    const newSession = Object.assign({}, session,
      {
        subSSPTypeBaseRateID: isNaN(e.target.value) ? null : e.target.value
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }
  handleCloseModal() {
    this.setState({session: {subSSPTypeBaseRateID: null}});
    this.props.closeModal();
  }
  handleRenderTraining(training, i) {
    return <option key={i} name={training.name} id={training.id} value={training.id}>{training.name}</option>;
  }
  handleRenderPrice(price, i) {
    return <option key={i} value={price.id}>{this.props.p.t('SessionsCreateModal.participants', {min: price.min, max: price.max})}</option>;
  }
  handleRenderGender(gender, i) {
    return <option key={i} value={gender}>{this.props.p.t('SessionsCreateModal.genders.' + gender)}</option>;
  }
  handleRenderAge(age, i) {
    return <option key={i} value={age.id}>{age.name}</option>;
  }
  handleRenderSkillLevels(skillLevel, i) {
    return <option key={i} value={skillLevel.id}>{skillLevel.name}</option>;
  }
  handleRenderLocations(location, i) {
    return <option key={i} value={location.id}>{location.title}</option>;
  }
  render() {
    const {session, validation} = this.state;
    const {sport, isEdit, p} = this.props;
    const {offerTerminology} = sport;
    const terminology = offerTerminology.singular;
    const subSSPType = this.props.training[this.handleSearchTraining(this.props.training, session.subSSPTypeID)];
    const type = subSSPType && subSSPType.name ? subSSPType.name : '';
    const subSSPTypeBaseRateID = notNull(session.subSSPTypeBaseRateID) && session.subSSPTypeBaseRateID >= 0 ? session.subSSPTypeBaseRateID : -1;

    const price = this.props.prices && this.props.prices.length ? this.props.prices[this.handleSearchPrice(this.props.prices, session.subSSPTypeID)] : {};
    const basePrice = (price && price.prices[0]) ? price.prices[0].price : 0;

    const isValidationShown = Boolean(this.state.submit);

    const title = (isEdit) ? p.t('SessionsCreateModal.editTitle', {terminology}) : p.t('SessionsCreateModal.createTitle', {terminology});

    return (
      <div id="newSessionModal">
        <div className="uk-modal-dialog uk-modal-dialog-large">
          <div className="uk-modal-header">
            <h2>{title}</h2>
            <a className="del uk-modal-close" onClick={this.handleCloseModal}>
              <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                <g transform="translate(-1946.5 -5770.5)">
                  <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2={18} y2={18} transform="translate(1629.5 538.5)"/>
                  <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1={18} y2={18} transform="translate(1629.5 538.5)"/>
                </g>
              </svg>
            </a>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <label>{terminology} {this.props.p.t('SessionsCreateModal.name')}</label>
              </div>
              <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className={isValidationShown && validation.name === false ? 'field-holder error' : 'field-holder'}>
                  <input type="text" className="uk-form-controls field-required" defaultValue={session.name} onChange={this.handleName}/>
                  <span className="error-text">{this.props.p.t('SessionsCreateModal.session.sessionName', {session: terminology})}</span>
                </div>
              </div>
              <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                <a className="colorPicker" onClick={this.handleColorPicker}>
                  <div
                    className="blueDiv"
                    style={{backgroundColor: session.color,
                      position: 'relative',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 6
                    }}
                  />
                </a>
                <div style={{display: this.state.colorPicker}}>
                  <BlockPicker color={session.color ? session.color : config.colors[0]} onChange={this.handleChangeColor} colors={config.colors}/>
                </div>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-3 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                <label>{terminology} {this.props.p.t('SessionsCreateModal.type')}</label>

                <div className={isValidationShown && validation.subSSPType === false ? 'field-holder error' : 'field-holder'}>
                  <select className="uk-form-controls field-required" onChange={this.handleType} value={session.subSSPTypeID}>
                    <option value={null}>{this.props.p.t('SessionsCreateModal.selectTypef', {type: terminology})}</option>
                    {(this.props.prices && this.props.prices.length ? this.props.prices : []).map(this.handleRenderTraining)}
                  </select>
                  <span className="error-text">{this.props.p.t('SessionsCreateModal.session.subSSPType')}</span>
                </div>
              </div>
              <div className="uk-width-xlarge-1-3 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 " style={{display: price && price.prices && price.prices.length && (price.name === 'Team Training' || price.name === 'Group Training' || price.name === 'Clinics') ? 'block' : 'none'}}>
                <label>{this.props.p.t('SessionsCreateModal.typeSize').replace(/{type}/g, type)}</label>
                <div className={isValidationShown && validation.groupSize === false ? 'field-holder error' : 'field-holder'}>
                  <select className="uk-form-controls field-required" onChange={this.handleGroupSize} value={subSSPTypeBaseRateID}>
                    <option value={-1}>{this.props.p.t('SessionsCreateModal.selectTypeSize').replace(/{type}/g, type)}</option>
                    {(price && price.prices && price.prices.length ? price.prices : []).map(this.handleRenderPrice)}
                  </select>
                  <span className="error-text">{this.props.p.t('SessionsCreateModal.session.selectTypeSize').replace(/{type}/g, type)}</span>
                </div>
              </div>
              {/* <div className="uk-width-xlarge-1-3 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className="field-holder">
                  <label>{this.props.p.t('SessionsCreateModal.overridePricing')}</label>
                  <div className="dollardiv">
                    <span className="dollar">$</span>
                    <input type="number" name placeholder={`$${basePrice}`} className="uk-form-width-small field-required" onChange={this.handleOverridePricing} value={(session.overridePricing < 1) ? '' : session.overridePricing}/>
                    <span className="error-text"/>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1 ">
                <label>{this.props.p.t('SessionsCreateModal.gender')}</label>
                <div className={isValidationShown && validation.gender === false ? 'field-holder error' : 'field-holder'}>
                  <select className="uk-form-controls field-required" onChange={this.handleGender} value={session.gender}>
                    <option value={null}>{this.props.p.t('SessionsCreateModal.selectGender')}</option>
                    {this.props.gender.map(this.handleRenderGender)}
                  </select>
                  <span className="error-text">{this.props.p.t('SessionsCreateModal.session.gender')}</span>
                </div>
              </div>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1 ">
                <label>{this.props.p.t('SessionsCreateModal.age')}</label>
                <div className={isValidationShown && validation.ageGroup === false ? 'field-holder error' : 'field-holder'}>
                  <select className="uk-form-controls field-required" onChange={this.handleAge} value={session.ageGroupID}>
                    <option value={null}>{this.props.p.t('SessionsCreateModal.selectAgeGroup')}</option>
                    {this.props.ages.map(this.handleRenderAge)}
                  </select>
                  <span className="error-text">{this.props.p.t('SessionsCreateModal.session.age')}</span>
                </div>
              </div>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1 ">
                <label>{this.props.p.t('SessionsCreateModal.skillLevel')}</label>
                <div className={isValidationShown && validation.skillLevel === false ? 'field-holder error' : 'field-holder'}>
                  <select className="uk-form-controls field-required" onChange={this.handleLevel} value={session.skillLevelID}>
                    <option value={null}>{this.props.p.t('SessionsCreateModal.selectSkillLevel')}</option>
                    {this.props.skillLevels.map(this.handleRenderSkillLevels)}
                  </select>
                  <span className="error-text">{this.props.p.t('SessionsCreateModal.session.skillLevel')}</span>
                </div>
              </div>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1 ">
                <label>{this.props.p.t('SessionsCreateModal.selectSessionLocation', {session: terminology})}</label>
                <div className={isValidationShown && validation.location === false ? 'field-holder error' : 'field-holder'}>
                  <select className="uk-form-controls field-required" onChange={this.handleLocation} value={session.trainingLocationID}>
                    <option value={null}>{this.props.p.t('SessionsCreateModal.selectLocation', {session: terminology})}</option>
                    {this.props.locations.data && this.props.locations.data.map(this.handleRenderLocations)}
                  </select>
                  <span className="error-text">{this.props.p.t('SessionsCreateModal.session.location', {session: terminology})}</span>
                </div>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className={isValidationShown && validation.defaultSessionLength === false ? 'field-holder error' : 'field-holder'}>
                  <label>{this.props.p.t('SessionsCreateModal.defaultSessionLength', {session: terminology}).replace(/Classs/g, 'Classes')}</label>
                  <input type="number" className="uk-form-controls field-required" onChange={this.handleLength} step={appConstants.profileSession.session.step} value={session.defaultSessionLength}/>
                  <span className="error-text">{this.props.p.t('SessionsCreateModal.session.defaultSessionLength', {session: terminology, minimum: appConstants.profileSession.session.min, default: appConstants.profileSession.session.step})}</span>
                </div>
              </div>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className={isValidationShown && validation.bufferBetweenSession === false ? 'field-holder error' : 'field-holder'}>
                  <label>{this.props.p.t('SessionsCreateModal.bufferBetweenSessions', {session: terminology}).replace(/Classs/g, 'Classes')}</label>
                  <input type="number" className="uk-form-controls field-required" onChange={this.handleBuffer} step={appConstants.profileSession.buffer.step} value={session.bufferBetweenSession}/>
                  <span className="error-text">{this.props.p.t('SessionsCreateModal.session.bufferBetweenSession', {session: terminology, minimum: appConstants.profileSession.buffer.min, default: appConstants.profileSession.buffer.step})}</span>
                </div>
              </div>

            </div>
            <div className="borderClass pb35 mb10"/>
          </div>
          <div className="uk-modal-footer">
            <div className="tableDiv">
              <div className="lCol">
                <a className="finish" onClick={this.handleSave}>{this.props.p.t('SessionsCreateModal.save')}</a>
              </div>
              <div className="rCol">
                <a className="finish" onClick={this.handleCloseModal}>{this.props.p.t('SessionsCreateModal.close')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
  static get propTypes() {
    return {
      locations: PropTypes.object,
      // Sessions: PropTypes.object,
      sport: PropTypes.object.isRequired,
      onSave: PropTypes.func.isRequired,
      closeModal: PropTypes.func.isRequired,
      ages: PropTypes.array.isRequired,
      training: PropTypes.array.isRequired,
      services: PropTypes.array.isRequired,
      skillLevels: PropTypes.array.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      session: PropTypes.object,
      isEdit: PropTypes.bool.isRequired,
      prices: PropTypes.array,
      gender: PropTypes.array.isRequired
    };
  }
}

AddEditSession.defaultProps = {
  locations: {data: []},
  // Sessions: {data: []},
  session: null,
  prices: []
};

const mapStateToProps = state => {
  const {locations, sessions, ages, gender, skillLevels, training, services, sport, sspValidation, prices} = state;
  return {
    locations,
    sessions,
    ages,
    gender,
    skillLevels,
    training,
    services,
    sport,
    sspValidation,
    prices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSession: session => dispatch(updateSession(session)),
    removeSession: profile => dispatch(removeSession(profile)),
    sspSessionSubmit: data => dispatch(sspSessionSubmit(data))
  };
};

const CreateModal = connect(mapStateToProps, mapDispatchToProps)(AddEditSession);
export default translate(CreateModal);
