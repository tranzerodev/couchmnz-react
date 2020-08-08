import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import InputRange from 'react-input-range';
import {Map as map, List as immutableList} from 'immutable';
import moment from 'moment';
import {FULFILLED} from '../../../../../../constants/ActionTypes';
import appConstants from '../../../../../../constants/appConstants';

import {notNull} from '../../../../../../validators/common/util';
import SessionDropDown from '../SessionDropDown/SessionDropDown';
import {
  ispFetchWorkingDays,
  ispSaveWorkingDays,
  fetchNewSessions,
  updateScheduleSettings
} from '../../../../../../actions';
import validateSchedulerSettings from '../../../../../../validators/ssp/isp/schedulerSettings';
const DROP_DOWN_OPTION_SELECT = 'DROP_DOWN_OPTION_SELECT';

function getTimeValueInMinutes(time) {
  return ((time.hour * 60) + time.minute);
}

function getTime(number) {
  const hour = parseInt((number / 60), 10);
  const minute = parseInt((number % 60), 10);
  return {
    hour,
    minute
  };
}

function formatTimeLabel(value) {
  const time = getTime(value);
  return (moment().set({h: time.hour, m: time.minute}).format('hh:mm A'));
}

class SchedulerSettingModal extends Component {
  constructor(props) {
    super(props);
    const {workingDays} = this.props;
    const settings = {
      sportId: null,
      defaultSessionId: null,
      sessions: []
    };
    const validation = validateSchedulerSettings(settings, workingDays.data);
    this.state = {
      submitted: false,
      weeks: workingDays.data,
      settings,
      validation,
      dropdownClasses: 'uk-button-dropdown theme-dropdown'
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.findElementById = this.findElementById.bind(this);

    this.handleSaveButtonClicked = this.handleSaveButtonClicked.bind(this);

    this.renderWeek = this.renderWeek.bind(this);
    this.renderDay = this.renderDay.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleWeekDayCheckboxChange = this.handleWeekDayCheckboxChange.bind(this);
    this.renderSessionDetails = this.renderSessionDetails.bind(this);
    this.handleChangeSport = this.handleChangeSport.bind(this);
    this.handleChangeSessionOverridePricing = this.handleChangeSessionOverridePricing.bind(this);
    this.handleChangeSessionData = this.handleChangeSessionData.bind(this);
    this.handleChangeDefaultSessionLength = this.handleChangeDefaultSessionLength.bind(this);
    this.renderSessionBufferOptions = this.renderSessionBufferOptions.bind(this);
    this.handleChangeSessionBuffer = this.handleChangeSessionBuffer.bind(this);
    this.handleChangeSession = this.handleChangeSession.bind(this);
    this.handleSchedulerSettingsDataChange = this.handleSchedulerSettingsDataChange.bind(this);
  }

  handleWeekWorkingHourDataChange(newWeekDaysData) {
    const {settings} = this.state;
    const validation = validateSchedulerSettings(settings, newWeekDaysData);
    this.setState({
      weeks: newWeekDaysData,
      validation
    });
  }

  handleSchedulerSettingsDataChange(settingsData) {
    this.setState({dropdownClasses: 'uk-button-dropdown theme-dropdown uk-dropdown-close'})
    const {settings, weeks} = this.state;
    const newSettings = Object.assign({}, settings, settingsData);
    const validation = validateSchedulerSettings(newSettings, weeks);
    this.setState({
      settings: newSettings,
      validation
    });
  }

  handleRangeChange = day => value => {
    const range = {
      startTime: getTime(value.min),
      endTime: getTime(value.max)
    };
    const newWeekDays = map(this.state.weeks).set(day, range).toJS();
    this.handleWeekWorkingHourDataChange(newWeekDays);
  }

  handleWeekDayCheckboxChange(event) {
    const {value, checked} = event.target;
    const rangeValue = (checked === true) ? appConstants.workingDaysSlider.defaultDayTiming : {startTime: null, endTime: null};
    const newWeekDays = map(this.state.weeks).set(value, rangeValue).toJS();
    this.handleWeekWorkingHourDataChange(newWeekDays);
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  getDefaultSession(sessions) {
    return sessions.find(sessionNew => {
      return sessionNew.isDefault === appConstants.apiBooleanFlags.TRUE;
    });
  }

  componentDidMount() {
    const {selectedProfile, sports, sessionsNew} = this.props;

    const defaultSport = sports[0];

    this.props.ispFetchWorkingDays({profileId: selectedProfile.id});
    this.props.fetchNewSessions({profileID: selectedProfile.id, sportID: defaultSport.id});

    const defaultSession = this.getDefaultSession(sessionsNew.data);

    this.handleSchedulerSettingsDataChange({
      sportId: (defaultSport && defaultSport.id) ? defaultSport.id : null,
      defaultSessionId: (defaultSession && defaultSession.id) ? defaultSession.id : null
    });
  }

  componentWillReceiveProps(nextProps) {
    const oldWorkingDays = this.props.workingDays;
    const newWorkingDays = nextProps.workingDays;
    const {scheduleSettings, sessionsNew} = nextProps;
    if (oldWorkingDays.status !== FULFILLED && newWorkingDays.status === FULFILLED) {
      this.handleWeekWorkingHourDataChange(newWorkingDays.data);
    }

    const {settings} = this.state;
    let newSettings = null;
    if (this.props.scheduleSettings.status !== FULFILLED && scheduleSettings.status === FULFILLED) {
      const {daysPerWeek, startWeekOn, workStartsAt, workEndsAt} = scheduleSettings.data;

      newSettings = Object.assign({}, settings, {daysPerWeek, startWeekOn, workStartsAt, workEndsAt});
    }

    if (this.props.sessionsNew.status !== FULFILLED && sessionsNew.status === FULFILLED) {
      newSettings = (newSettings) ? newSettings : settings;
      const sessions = sessionsNew.data.map(session => {
        const {id, defaultSessionLength, bufferBetweenSession, overridePricing} = session;
        return {
          id,
          defaultSessionLength,
          bufferBetweenSession,
          overridePricing
        };
      });
      let defaultSession = this.getDefaultSession(sessionsNew.data);
      defaultSession = (defaultSession) ? defaultSession : sessionsNew.data[0];
      newSettings = Object.assign({}, newSettings, {sessions, defaultSessionId: defaultSession.id});
    }
    if (newSettings) {
      this.handleSchedulerSettingsDataChange(newSettings);
    }
  }

  handleSaveButtonClicked() {
    const {validation, weeks, settings} = this.state;
    const {selectedProfile} = this.props;
    if (validation.valid === true) {
      this.props.ispSaveWorkingDays({profileId: this.props.selectedProfile.id}, weeks);
      this.props.updateScheduleSettings(selectedProfile.id, settings.sportId, settings);
      this.props.onCancel();
    } else {
      this.setState({
        submitted: true
      });
    }
  }

  handleChangeSport(e) {
    const {selectedProfile} = this.props;
    const id = e.target.value;

    this.handleSchedulerSettingsDataChange({
      sportId: (id === DROP_DOWN_OPTION_SELECT) ? null : id,
      defaultSessionId: null,
      sessions: []
    });
    if (id !== DROP_DOWN_OPTION_SELECT) {
      this.props.fetchNewSessions({profileID: selectedProfile.id, sportID: id});
    }
  }

  handleChangeSession(e) {
    const id = e.currentTarget.dataset.id;

    this.handleSchedulerSettingsDataChange({
      defaultSessionId: id
    });
  }

  handleChangeSessionData(index, sessionData) {
    const {sessions} = this.state.settings;
    let sessionList = immutableList(sessions);
    const oldSession = sessionList.get(index);
    const newSession = Object.assign({}, oldSession, sessionData);
    sessionList = sessionList.set(index, newSession);
    this.handleSchedulerSettingsDataChange({
      sessions: sessionList.toJS()
    });
  }

  handleChangeSessionOverridePricing(event) {
    const {value, dataset} = event.target;
    const {index} = dataset;
    this.handleChangeSessionData(index, {overridePricing: parseInt(value, 10)});
  }

  handleChangeDefaultSessionLength(event) {
    const {value, dataset} = event.target;
    const {index} = dataset;
    this.handleChangeSessionData(index, {defaultSessionLength: parseInt(value, 10)});
  }

  handleChangeSessionBuffer(event) {
    const {value, dataset} = event.target;
    const {index} = dataset;
    this.handleChangeSessionData(index, {bufferBetweenSession: parseInt(value, 10)});
  }

  isChecked(day) {
    const {weeks} = this.state;
    const dayData = weeks[day];
    if (dayData && dayData.startTime) {
      return true;
    }
    return false;
  }

  sortSessionsByName(session, session2) {
    return session.name > session2.name;
  }

  findElementById(array, id) {
    return array.find(element => {
      return element.id === id;
    });
  }

  getMinMax(data) {
    const value = Object.assign({}, appConstants.workingDaysSlider.defaultDayTimingInFloat);
    if (data && data.startTime) {
      value.min = getTimeValueInMinutes(data.startTime);
      value.max = getTimeValueInMinutes(data.endTime);
    }
    return value;
  }

  renderWeek() {
    return (
      appConstants.weekDays.map(day => this.renderDay(day))
    );
  }

  renderSportOptions(sport) {
    return (
      <option key={sport.id} value={sport.id}>{sport.name}</option>
    );
  }

  renderDay(day) {
    const {p} = this.props;
    const {weeks} = this.state;
    const dayData = weeks[day];
    const disabled = !(dayData && dayData.startTime);
    const value = this.getMinMax(dayData);
    return (
      <div key={day} className="cl-workinghour-outer">
        <div className="cl-workinghour-inner">
          <h4>{p.t('WeekDays.' + day)}</h4>
        </div>
        <div className="cl-workinghour-inner">
          <input id={day} type="checkbox" value={day} checked={this.isChecked(day)} onChange={this.handleWeekDayCheckboxChange}/>
          <label htmlFor={day}/>
        </div>
        <div className="cl-workinghour-inner">
          <InputRange
            draggableTrack
            maxValue={appConstants.workingDaysSlider.maxValue}
            minValue={appConstants.workingDaysSlider.minValue}
            onChange={this.handleRangeChange(day)}
            value={value}
            name={day}
            step={appConstants.workingDaysSlider.stepSize}
            disabled={disabled}
            formatLabel={formatTimeLabel}
          />
        </div>
      </div>
    );
  }

  renderSessionBufferOptions(buffer) {
    const {p} = this.props;
    return (
      <option key={buffer} value={buffer}>{p.t('SchedulerSettings.bufferTimeOptions', {minutes: buffer})}</option>
    );
  }

  renderSessionDetails(session, index) {
    const {p} = this.props;
    const {settings, validation, submitted} = this.state;
    let curSession = settings.sessions[index];

    curSession = (curSession) ? curSession : session;

    const {min, max, step} = appConstants.profileSession.buffer;

    const bufferOptions = [];
    for (let i = min; i <= max; i += step) {
      bufferOptions.push(i);
    }
    let sessionValidation = {
      defaultSessionLength: false,
      bufferBetweenSession: false,
      overridePricing: false
    };
    if (validation && validation.sessions && validation.sessions[index]) {
      sessionValidation = (validation.sessions[index]);
    }

    return (
      <div key={session.id} className="cl-sd-session-list">
        <div className="uk-width-large-4-10 uk-width-medium-1-4 wk-width-small-1-1">
          <div className="cl-schedule-drag-container">
            <div className="cl-schedule-drag-container-left" style={{background: session.color}}/>
            <div className="cl-schedule-drag-container-right">{session.name}, {session.ageGroup.description}</div>
          </div>
        </div>
        <div className="uk-width-large-2-10 uk-width-medium-1-4 wk-width-small-1-1">
          <div className={sessionValidation.defaultSessionLength === false && submitted ? 'field-holder error' : 'field-holder'}>
            <div className="uk-form-select">
              <input type="number" placeholder={p.t('SchedulerSettings.defaultSessionLengths')} value={curSession.defaultSessionLength} min={appConstants.profileSession.session.min} step={appConstants.profileSession.session.step} data-index={index} onChange={this.handleChangeDefaultSessionLength}/>
            </div>
            <span className="error-text">{this.props.p.t('SchedulerSettings.validation.defaultSessionLength', {minimum: appConstants.profileSession.session.min, step: appConstants.profileSession.session.step})}</span>
          </div>
        </div>
        <div className="uk-width-large-2-10 uk-width-medium-1-4 wk-width-small-1-1">
          <div className={sessionValidation.bufferBetweenSession === false && submitted ? 'field-holder error' : 'field-holder'}>
            <div className="uk-button uk-form-select uk-active" data-uk-form-select>
              <span className="cl-sd-modal-selected-option"> {p.t('SchedulerSettings.bufferTimeOptions', {minutes: curSession.bufferBetweenSession})} </span>
              <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
              </svg>
              <select value={curSession.bufferBetweenSession} onChange={this.handleChangeSessionBuffer} data-index={index}>
                {
                  bufferOptions.map(this.renderSessionBufferOptions)
                }
              </select>
            </div>
            <span className="error-text">{this.props.p.t('SchedulerSettings.validation.bufferBetweenSession')}</span>
          </div>
        </div>
        <div className="uk-width-large-2-10 uk-width-medium-1-4 wk-width-small-1-1">
          <div className={sessionValidation.overridePricing === false && submitted ? 'field-holder error' : 'field-holder'}>
            <div className="uk-form-select dollardiv">
              <span className="dollar">$</span>
              <input type="number" placeholder={p.t('SchedulerSettings.plcSingleSessionPrice')} value={curSession.overridePricing} min={0} data-index={index} className="uk-form-width-small field-required" onChange={this.handleChangeSessionOverridePricing}/>
              <span className="error-text">{this.props.p.t('SchedulerSettings.validation.overridePricing')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {p, sports, sessionsNew} = this.props;

    let sessionName = '';
    const {submitted, settings, validation} = this.state;
    let sessionColor = '#F15E23';

    const {sportId} = settings;
    const session = this.findElementById(this.props.sessionsNew.data, settings.defaultSessionId);
    if (notNull(session)) {
      sessionName = session.name + ', ' + session.ageGroup.description;
      sessionColor = session.color;
    }

    const sport = this.findElementById(this.props.sports, settings.sportId);

    const sportsName = notNull(sport) ? sport.name : '';

    return (
      <div id="scheduler-setting-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-two">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb30">
            <h2>{p.t('SchedulerSettings.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid ">
              <div className="uk-width-1-1">
                <div className="cl-sd-border-top"/>
                <div className="uk-accordion" data-uk-accordion>
                  <h3 className="uk-accordion-title">{p.t('SchedulerSettings.selectWorkingDaysAndHours')}</h3>
                  <div className="uk-accordion-content">
                    <div className="uk-grid">
                      <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                        {
                          this.renderWeek()
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-width-1-1">
                <div className="cl-sd-border-top mt30"/>
              </div>

              <div className="uk-width-large-5-10 uk-width-medium-5-10 uk-width-small-1-1">
                <div className={validation.sportId === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label className="uk-form-label">{p.t('SchedulerSettings.selectYourSports')}</label>
                  <div className="uk-button uk-form-select uk-active" data-uk-form-select>
                    <span className="cl-sd-modal-selected-option"> {sportsName} </span>
                    <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                      <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                    </svg>
                    <select onChange={this.handleChangeSport} value={sportId ? sportId : DROP_DOWN_OPTION_SELECT}>
                      <option value={DROP_DOWN_OPTION_SELECT}>{p.t('ScheduleASession.selectSport')}</option>
                      {
                        sports.map(this.renderSportOptions)
                      }
                    </select>
                  </div>
                  <span className="error-text">{p.t('ScheduleASession.validation.sport')}</span>
                </div>
              </div>
              <div className="uk-width-large-5-10 uk-width-medium-5-10 uk-width-small-1-1">
                <div className={validation.defaultSessionId === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label className="uk-form-label">{p.t('SchedulerSettings.defaultSession')}</label>
                  <div className={this.state.dropdownClasses} data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
                    <button className="uk-button cl-sd-full-width">
                      <span className="event-color" style={{backgroundColor: sessionColor}}/>
                      <span className="event-text">{sessionName}</span>
                      <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                        <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                      </svg>
                    </button>
                    <div className="uk-dropdown">
                      <SessionDropDown onChange={this.handleChangeSession}/>
                    </div>
                  </div>
                  <span className="error-text">{p.t('SchedulerSettings.validation.defaultSessionId')}</span>
                </div>
              </div>
              <div className="uk-width-1-1">
                <div className="cl-sd-border-top mt30"/>
              </div>
              <div className="cl-sd-session-list uk-hidden-small">
                <div className="uk-width-4-10"/>
                <div className="uk-width-large-2-10 uk-width-medium-1-4 uk-width-small-5-10">
                  <label className="uk-form-label">{p.t('SchedulerSettings.defaultSessionLengths')}</label>
                </div>
                <div className="uk-large-width-2-10 uk-width-medium-1-4 uk-width-small-5-10">
                  <label className="uk-form-label">{p.t('SchedulerSettings.bufferBetweenSessions')}</label>
                </div>
                <div className="uk-large-width-2-10 uk-width-medium-1-4 uk-width-small-5-10">
                  <label className="uk-form-label">{p.t('SchedulerSettings.overridePricing')}</label>
                </div>
              </div>
              {sessionsNew.data.map(this.renderSessionDetails)}
              <div className="uk-width-1-1">
                <div className="cl-sd-border-top mt30"/>
              </div>

            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" onClick={this.handleSaveButtonClicked} className="uk-modal-close uk-close theme-orange-btn">{p.t('SaveButton.save')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('SchedulerSettings.cancel')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  static get propTypes() {
    return {
      onCancel: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      selectedProfile: PropTypes.object.isRequired,
      ispFetchWorkingDays: PropTypes.func.isRequired,
      ispSaveWorkingDays: PropTypes.func.isRequired,
      workingDays: PropTypes.object.isRequired,
      sports: PropTypes.array,
      fetchNewSessions: PropTypes.func.isRequired,
      sessionsNew: PropTypes.object.isRequired,
      updateScheduleSettings: PropTypes.func.isRequired,
      scheduleSettings: PropTypes.object.isRequired
    };
  }
}

SchedulerSettingModal.defaultProps = {
  sports: []
};

const mapStateToProps = state => {
  const {months, sports, sessionsNew, userProfiles, scheduleSettings, workingDays} = state;
  return {
    months,
    sports,
    sessionsNew,
    selectedProfile: userProfiles.selectedProfile,
    scheduleSettings,
    workingDays
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewSessions: userID => dispatch(fetchNewSessions(userID)),
    ispFetchWorkingDays: params => dispatch(ispFetchWorkingDays(params)),
    ispSaveWorkingDays: (params, data) => dispatch(ispSaveWorkingDays(params, data)),
    updateScheduleSettings: (profileID, sportId, data) => dispatch(updateScheduleSettings(profileID, sportId, data))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(SchedulerSettingModal));
