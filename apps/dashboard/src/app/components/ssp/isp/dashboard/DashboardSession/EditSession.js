import React, {Component} from 'react';
import {ChromePicker} from 'react-color';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import appConstants from '../../../../../constants/appConstants';
import {
  updateSession,
  removeSession,
  sspSessionSubmit,
  postSession,
  sspValidateSession,
  sspValidationClearSession
} from '../../../../../actions';
import {PropTypes} from 'prop-types';
import config from '../../../../../config';
import {DASHBOARD_MANAGE_SPORT_SESSIONS,DASHBOARD_SCHEDULE_SESSION} from '../../../../../constants/pathConstants';
import {validateSession, notNull} from '../../../../../validators/ssp/isp/registration/session';
import ExampleModal from '../ExampleModal/ExampleModal';
import {SAMPLE_SESSION} from '../../../../../constants/assetsPaths';

/* eslint complexity:0 */
class EditSession extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleBuffer = this.handleBuffer.bind(this);
    this.handleDefault = this.handleDefault.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
    this.handleLength = this.handleLength.bind(this);
    this.handleLevel = this.handleLevel.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleColorPicker = this.handleColorPicker.bind(this);
    this.handleOverridePricing = this.handleOverridePricing.bind(this);
    this.handleGroupSize = this.handleGroupSize.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRenderPrice = this.handleRenderPrice.bind(this);
    this.handleRenderGender = this.handleRenderGender.bind(this);
    this.handleOpenPositions = this.handleOpenPositions.bind(this);
    this.handleSampleModal = this.handleSampleModal.bind(this);
    this.handleCloseColorPicker = this.handleCloseColorPicker.bind(this);
    this.handleColorPickerToggle = this.handleColorPickerToggle.bind(this);
    this.renderTimeInHours = this.renderTimeInHours.bind(this);
    this.handleAllAges = this.handleAllAges.bind(this)
    this.handleAllSkillLevels = this.handleAllSkillLevels.bind(this)
    this.state = {
      session: {
        subSSPTypeBaseRateID: null,
        overridePricing: 0,
        defaultSession: appConstants.defaultSession.yes,
        bufferBetweenSession: appConstants.profileSession.buffer.def,
        defaultSessionLength: appConstants.profileSession.session.def,
        totalSlots: appConstants.profileSession.totalSlots.def
      },
      colorPicker: 'none',
      shouldCloseColorPicker: false,
      sessionName: config.offerTerminologies.Session,
      edit: false,
      isModalOpen: false
    };
  }

  handleSave() {
    const {session} = this.state;

    const validation = validateSession(session);
    
    if (validation.valid) {
      let newSession = {};
      if (this.state.edit) {
        newSession = session;
      } else {
        newSession = {
          id: null,
          sportID: this.props.sport.id,
          color: session.color ? session.color : config && config.colors && config.colors.length ? config.colors[0] : '#42B7DB',
          calendarLabel: 'calendar',
          numberOfSessions: 1,
          ...session
        };
      }
      this.props.postSession(newSession, {profileID: this.props.profile.data.profile.id});
      const path = this.props.location.search ? DASHBOARD_SCHEDULE_SESSION : DASHBOARD_MANAGE_SPORT_SESSIONS
      this.props.history.push(path);
      this.props.sspValidationClearSession();
    } else {
      this.setState({
        validation,
        submit: true
      });
    }
  }

  componentWillUnmount() {
    if (this.props.edit) {
      this.setState({session: this.props.session});
    } else {
      this.setState({
        colorPicker: 'none',
        session: {
          subSSPTypeBaseRateID: null
        }
      });
    }
  }

  componentDidMount() {
    const {state} = this.props.location;
    
    const session = (state) ? state.session : null;
    if (session) {
      const editSession = Object.assign({}, session, {sportID: this.props.sport.id});
      
      editSession.trainingLocationID = session.trainingLocation ? session.trainingLocation.id : '';
      this.setState({session: editSession, edit: true});
      this.props.sspValidateSession({...editSession});
    }
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

  handleOpenPositions(e) {
    const {session} = this.state;
    const newSession = Object.assign({}, session,
      {
        totalSlots: isNaN(e.target.value) ? null : (parseInt(e.target.value, 10) > 0 ? parseInt(e.target.value, 10) : 0)
      });
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation
    });
  }

  handleDefault(e) {
    const {session} = this.state;
    
    this.setState({
      session: {
        ...session,
        defaultSession: e.target.checked ? 'Y' : 'N'
      }
    }, () => {
      this.props.sspValidateSession(this.state.session);
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

  handleLocation(e) {
    const {session} = this.state;
    const trainingLocation = this.props.locations.data[this.handleSearchLocations(this.props.locations.data, e.target.value)];

    const newSession = Object.assign({}, session,
      {
        // trainingLocationID: trainingLocation ? trainingLocation.id : null
        trainingLocationID: e && e.target && e.target.value ? e.target.value : null
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
      }
    );
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
    const {colorPicker} = this.state;
    this.setState({
      colorPicker: colorPicker === 'block' ? 'none' : 'block'
    });
  }

  handleChangeColor(color) {
    const {session} = this.state;
    const newSession = Object.assign({}, session, {color: color.hex});
    const validation = validateSession(newSession);
    this.setState({
      session: newSession,
      validation,
      shouldCloseColorPicker: false
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
    this.props.sspSessionSubmit({status: false});
    this.props.history.push(DASHBOARD_MANAGE_SPORT_SESSIONS);
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
  // quick hack to get all ages to work. this need to redo soon. 
  handleAllAges(ages) {
    const allAges = ages.filter( age => { return age.name == 'All Ages' } )
    if ( allAges.length < 1 ) {
      ages.push({
        id: "58e4b35fdb252928067b4379",
        name: "All Ages",
        displayOrder: 0
      })
    }
    return ages.sort(this.handleDisplayOrder)
  }
  // quick hack to get all skill level to work. this need to redo soon. 
  handleAllSkillLevels(skillLevels) {
    const allSkills = skillLevels.filter( skillLevel => { return skillLevel.name == 'All Levels' } )
    if ( allSkills.length < 1 ) {
      skillLevels.push({
        id: "58e4b35fdb252928067b4370",
        name: "All Levels",
        displayOrder: 0
      })
    }
    return skillLevels.sort(this.handleDisplayOrder)
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

  handleSampleModal() {
    const {isModalOpen} = this.state;
    this.setState({isModalOpen: !isModalOpen});
  }

  handleCloseColorPicker() {
    setTimeout(() => {
      const {colorPicker, shouldCloseColorPicker} = this.state;
      if (colorPicker === 'block' && shouldCloseColorPicker) {
        this.setState({colorPicker: 'none', shouldCloseColorPicker: false});
      } else {
        this.setState({shouldCloseColorPicker: true});
      }
    }, 50);
  }

  handleColorPickerToggle() {
    this.setState({shouldCloseColorPicker: false});
  }

  handleDisplayOrder(i1, i2) {
    return i1.displayOrder > i2.displayOrder;
  }

  renderTimeInHours() {
    const {defaultSessionLength} = this.state.session;
    const hours = Math.floor(defaultSessionLength / 60);
    const mins = defaultSessionLength % 60;
    return (
      <p className="comingsoon">{this.props.p.t('EditSession.time', {hours, mins})}</p>
    );
  }
  render() {
    const {session, edit, validation, isModalOpen} = this.state;
    const {sport} = this.props;
    const {offerTerminology} = sport;
    const terminology = offerTerminology ? offerTerminology.singular : '';
    const subSSPType = this.props.training[this.handleSearchTraining(this.props.training, session.subSSPTypeID)];
    const type = subSSPType && subSSPType.name ? subSSPType.name : '';

    const price = this.props.prices && this.props.prices.length ? this.props.prices[this.handleSearchPrice(this.props.prices, session.subSSPTypeID)] : {};
    const basePrice = (price && price.prices && price.prices[0]) ? price.prices[0].price : 0;

    const isValidationShown = Boolean(this.state.submit);
    const subSSPTypeBaseRateID = notNull(session.subSSPTypeBaseRateID) && session.subSSPTypeBaseRateID >= 0 ? session.subSSPTypeBaseRateID : -1;

    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="cl-sd-editSession">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
              <div className="cl-sd-trainingLocationInner" onClick={this.handleCloseColorPicker}>

                <p className="mb20"/>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-7-10 uk-width-small-1-1">
                    <h1 className="uk-padding-remove">{ edit ? this.props.p.t('EditSession.edit') : this.props.p.t('EditSession.add_new')} {terminology}</h1>
                  </div>
                  <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-1">
                    <div className="viewExpOuter">
                      <a onClick={this.handleSampleModal} data-uk-modal>{this.props.p.t('ExampleModal.message')}</a>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                    <p>{this.props.p.t('Sessions.sessionsMessage', {session: terminology})}</p>
                  </div>
                </div>

                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                    <label>{terminology} {this.props.p.t('SessionsCreateModal.name')}</label>
                  </div>
                  <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <div className={isValidationShown && validation.name === false ? 'field-holder error' : 'field-holder'}>
                      <input type="text" className="uk-form-controls field-required" value={session.name} onChange={this.handleName}/>
                      <span className="error-text">{this.props.p.t('SessionsCreateModal.session.sessionName', {session: terminology})}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 " onClick={this.handleColorPickerToggle}>
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
                    <div style={{display: this.state.colorPicker, position: 'absolute', zIndex: 10}}>
                      <ChromePicker color={session.color ? session.color : config.colors[0]} onChange={this.handleChangeColor} colors={config.colors} disableAlpha/>
                    </div>
                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                    <div className="tandc">
                      <input className="" id="edit1" type="checkbox" onChange={this.handleDefault} style={{display: 'none'}} checked={session.defaultSession == appConstants.defaultSession.yes ? true : false}/> 
                      <label htmlFor="edit1"> <span>{this.props.p.t('EditSession.default', {terminology})}</span></label>
                    </div>
                  </div>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-3 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <label>{terminology} {this.props.p.t('SessionsCreateModal.type')}</label>
                    <div className={isValidationShown && validation.subSSPType === false ? 'field-holder error' : 'field-holder'}>
                      <select className="uk-form-controls field-required" onChange={this.handleType} value={session.subSSPTypeID}>
                        <option value={null}>{this.props.p.t('SessionsCreateModal.selectType')}</option>
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
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <label>{this.props.p.t('SessionsCreateModal.gender')}</label>
                    <div className={isValidationShown && validation.gender === false ? 'field-holder error' : 'field-holder'}>
                      <select className="uk-form-controls field-required" onChange={this.handleGender} value={session.gender}>
                        <option value={null}>{this.props.p.t('SessionsCreateModal.selectGender')}</option>
                        {this.props.gender.map(this.handleRenderGender)}
                      </select>
                      <span className="error-text">{this.props.p.t('SessionsCreateModal.session.gender')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <label>{this.props.p.t('SessionsCreateModal.age')}</label>
                    <div className={isValidationShown && validation.ageGroup === false ? 'field-holder error' : 'field-holder'}>
                      <select className="uk-form-controls field-required" onChange={this.handleAge} value={session.ageGroupID}>
                        <option value={null}>{this.props.p.t('SessionsCreateModal.selectAgeGroup')}</option>
                        {this.handleAllAges(this.props.ages).map(this.handleRenderAge)}
                      </select>
                      <span className="error-text">{this.props.p.t('SessionsCreateModal.session.age')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <label>{this.props.p.t('SessionsCreateModal.skillLevel')}</label>
                    <div className={isValidationShown && validation.skillLevel === false ? 'field-holder error' : 'field-holder'}>
                      <select className="uk-form-controls field-required" onChange={this.handleLevel} value={session.skillLevelID}>
                        <option value={null}>{this.props.p.t('SessionsCreateModal.selectSkillLevel')}</option>
                        {this.handleAllSkillLevels(this.props.skillLevels).map(this.handleRenderSkillLevels)}
                      </select>
                      <span className="error-text">{this.props.p.t('SessionsCreateModal.session.skillLevel')}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
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
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <div className={isValidationShown && validation.defaultSessionLength === false ? 'field-holder error' : 'field-holder'}>
                      <label>{this.props.p.t('SessionsCreateModal.defaultSessionLength', {session: terminology}).replace(/Classs/g, 'Classes')}</label>
                      <input type="number" className="uk-form-controls field-required" onChange={this.handleLength} step={appConstants.profileSession.session.step} value={session.defaultSessionLength} min={appConstants.profileSession.session.min}/>
                      {
                        this.renderTimeInHours()
                      }
                      <span className="error-text">{this.props.p.t('SessionsCreateModal.session.defaultSessionLength', {session: terminology, minimum: appConstants.profileSession.session.min, default: appConstants.profileSession.session.step})}</span>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
                    <div className={isValidationShown && validation.bufferBetweenSession === false ? 'field-holder error' : 'field-holder'}>
                      <label>{this.props.p.t('SessionsCreateModal.bufferBetweenSessions', {session: terminology}).replace(/Classs/g, 'Classes')}</label>
                      <input type="number" className="uk-form-controls field-required" onChange={this.handleBuffer} step={appConstants.profileSession.buffer.step} value={session.bufferBetweenSession} min={appConstants.profileSession.buffer.min}/>
                      <span className="error-text">{this.props.p.t('SessionsCreateModal.session.bufferBetweenSession', {session: terminology, minimum: appConstants.profileSession.buffer.min, default: appConstants.profileSession.buffer.step})}</span>
                    </div>
                  </div>
                </div>
                {/* <div className="uk-grid">
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1 ">
                <div className="field-holder">
                  <label>{this.props.p.t('SessionsCreateModal.overridePricing')}</label>
                  <input type="number" name placeholder={`$${basePrice}`} onChange={this.handleOverridePricing} value={(session.overridePricing < 1) ? '' : session.overridePricing}/>
                </div>
              </div>
            </div> */}

              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
              <a onClick={this.handleSave} className="general_btn">{this.props.p.t('SessionsEditModal.save')}</a>
            </div>
            {/*             <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 uk-text-right">
              <a onClick={this.handleCloseModal} className="cancel">{this.props.p.t('EditSession.cancel')}</a>
            </div> */}
          </div>

        </div>
        <ExampleModal title="ExampleModal.sessionSession" offerTerminology={terminology} isModalOpen={isModalOpen} scroll={appConstants.scroll.session} image={SAMPLE_SESSION} onClose={this.handleSampleModal}/>
      </div>
    );
  }
  static get propTypes() {
    return {
      locations: PropTypes.object,
      sport: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      history: PropTypes.object.isRequired,
      postSession: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      edit: PropTypes.bool,
      session: PropTypes.object,
      location: PropTypes.object.isRequired,
      sspSessionSubmit: PropTypes.func.isRequired,
      sspValidateSession: PropTypes.func.isRequired,
      training: PropTypes.array.isRequired,
      services: PropTypes.array.isRequired,
      sspValidationClearSession: PropTypes.func.isRequired,
      prices: PropTypes.array,
      gender: PropTypes.array.isRequired,
      ages: PropTypes.array.isRequired,
      skillLevels: PropTypes.array.isRequired
    };
  }
}

EditSession.defaultProps = {
  locations: {data: []},
  edit: false,
  session: {},
  prices: []
};

const mapStateToProps = state => {
  const {locations, sessions, gender, ages, skillLevels, training, services, sport, sspValidation, prices, profile} = state;
  return {
    locations,
    sessions,
    ages,
    skillLevels,
    training,
    services,
    sport,
    gender,
    sspValidation,
    prices,
    profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSession: session => dispatch(updateSession(session)),
    removeSession: profile => dispatch(removeSession(profile)),
    sspSessionSubmit: data => dispatch(sspSessionSubmit(data)),
    postSession: (data, params) => dispatch(postSession(data, params)),
    sspValidateSession: session => dispatch(sspValidateSession(session)),
    sspValidationClearSession: () => dispatch(sspValidationClearSession())
  };
};

const CreateModal = connect(mapStateToProps, mapDispatchToProps)(EditSession);
export default translate(CreateModal);
