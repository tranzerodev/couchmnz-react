import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import moment from 'moment';
import Datetime from 'react-datetime';
import SessionDropDown from '../SessionDropDown/SessionDropDown';
import validateScheduleASession from '../../../../../../validators/ssp/isp/scheduleASession';
import {notNull} from '../../../../../../validators/common/util';
import appConstants from '../../../../../../constants/appConstants';
import {createNewSession, fetchNewSessions, fetchAvailableSessionTimeSlots, ispFetchWorkingDays} from '../../../../../../actions';
import {FULFILLED, PENDING, REJECTED} from '../../../../../../constants/ActionTypes';
import { rightArrow, modalCloseLink } from '../../../../../../utils/svg'

const yesterday = Datetime.moment().subtract(1, 'day');
const valid = function (current) {
  return current.isAfter(yesterday);
};

const formatTimeString = timeString => moment(timeString, 'HH:mm').format('hh:mm A') 

const getEndTimeSlots = (sessionTimeSlots, startTime, availableTill, endTime ) => {
  
  // need ot refactor better later
  const endAt = endTime > availableTill ? endTime : availableTill
  
  const endTimeSlots = sessionTimeSlots.data
        .filter(item => 
            item.availableForSession == true && 
            item.status.available == true && 
            item.timeFormat24Hour > startTime &&
            item.timeFormat24Hour <= endAt
            )
  return endTimeSlots
};

const DROP_DOWN_OPTION_SELECT = 'DROP_DOWN_OPTION_SELECT';
/* eslint react/no-deprecated:0 */
class ScheduleASession extends Component {
  constructor(props) {
    super(props);
    const {sportId, selectedDate} = this.props;
    const session = {
      startDate: selectedDate,
      overridePricing: 0,
      startTime: null,
      endTime: null,
      startTimeIndex: null,
      sportId,
      sessionId: null,
      totalSlots: 0,
      minSize: 0,
      maxSize: 0
    };
    const validation = validateScheduleASession(session);
    this.state = {
      submitted: false,
      session,
      validation,
      isModified: false,
      dropdownClasses: 'uk-button-dropdown theme-dropdown',
      alertMessage: null
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

    this.handleChangeSport = this.handleChangeSport.bind(this);
    this.findElementById = this.findElementById.bind(this);
    this.handleChangeSession = this.handleChangeSession.bind(this);
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    this.handleSaveButtonClicked = this.handleSaveButtonClicked.bind(this);
    this.saveData = this.saveData.bind(this);
    this.handleChangeSessionData = this.handleChangeSessionData.bind(this);
    this.handleOverridePricing = this.handleOverridePricing.bind(this);
    this.handleChangeTotalSlots = this.handleChangeTotalSlots.bind(this);
    this.canEnableTotalSlots = this.canEnableTotalSlots.bind(this);
    this.renderSessionDateTime = this.renderSessionDateTime.bind(this);
    this.fetchAvailableSessionTimeSlots = this.fetchAvailableSessionTimeSlots.bind(this);
    this.alertMessage = this.alertMessage.bind(this)
    
    this.renderListTime = this.renderListTime.bind(this)
  }
  componentDidMount() {
    if (this.props.workingDays.status !== FULFILLED && this.props.workingDays.status !== PENDING) {
      this.props.ispFetchWorkingDays({profileId: this.props.selectedProfile.id});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.scheduledSessionStatus.status === PENDING && nextProps.scheduledSessionStatus.status === FULFILLED) {
      this.props.onCancel();
    }
    console.log('this.props.sessionTimeSlots.status', this.props)
    console.log('nextProps.sessionTimeSlots.status', nextProps)
    if ( nextProps.sessionTimeSlots.responseCode > 0 ) {
        //Todo translation
        console.log('this.props.sessionTimeSlots.length', nextProps.sessionTimeSlots.length)
        console.log('this.props.sessionTimeSlots', nextProps.sessionTimeSlots)
        this.alertMessage("No available time slot for selected date and session")
    }
  }

  fetchAvailableSessionTimeSlots(sportId, sessionId, startDate) {
    const {selectedProfile} = this.props;
    if (sportId && sessionId && startDate) {
      this.props.fetchAvailableSessionTimeSlots(selectedProfile.id, sportId, sessionId, startDate)
    }
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  handleChangeSessionData(data) {
    const {session} = this.state;
    const newSession = Object.assign({}, session, data);
    const validation = validateScheduleASession(newSession);
    
    let alertMessage = null
    //Sessoin Duration from startAt and endAt
    if ( newSession && newSession.endTime && newSession.startTime ) {
      const duration = moment
          .duration(moment(newSession.endTime, 'HH:mm')
          .diff(moment(newSession.startTime, 'HH:mm'))
          ).asMinutes()
          
      //Todo: Need to move to transation
      if ( duration < newSession.sessionLength ) {
        alertMessage = `Duration is less than ${newSession.sessionLength} minutes`
      }
    }
    
    this.setState({
      session: newSession,
      validation,
      isModified: true,
      dropdownClasses: 'uk-button-dropdown theme-dropdown uk-dropdown-close',
      alertMessage: alertMessage
    });
  }
  
  alertMessage(message) {
    this.setState({
      alertMessage: message
    })
  }
  
  handleSaveButtonClicked() {
    const {validation} = this.state;
    this.setState({
      submitted: true,
      isModified: false,
      validation
    });

    if (validation.valid) {
      this.saveData();
      // This.props.onCancel();
    }
  }

  saveData() {
    const {session} = this.state;
    const {selectedProfile, sessionsNew} = this.props;
    const {overridePricing} = session;
    const dateMoment = moment(session.startDate, appConstants.schedules.ISO_DATE_FORMAT);

    // Start time calculation
    let selectedStartTime = session.startTime;
    const selectedStartTimeArray = selectedStartTime.split(':');
    dateMoment.set({h: selectedStartTimeArray[0], m: selectedStartTimeArray[1]});
    selectedStartTime = dateMoment.format(appConstants.schedules.ISO_DATE_FORMAT);

    // End time calculation
    let selectedEndTime = session.endTime;
    const selectedEndTimeArray = selectedEndTime.split(':');
    dateMoment.set({h: selectedEndTimeArray[0], m: selectedEndTimeArray[1]});
    selectedEndTime = dateMoment.format(appConstants.schedules.ISO_DATE_FORMAT);

    // Session
    const selectedSessionId = session.sessionId;

    const selectedSession = sessionsNew.data.find(sessionNew => sessionNew.id == session.sessionId);

    const totalSlots = (this.canEnableTotalSlots(selectedSession) === true) ? session.totalSlots : null;

    const data = {
      date: selectedStartTime,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
      overridePricing,
      totalSlots
    };
    this.props.createNewSession(selectedProfile.id, selectedSessionId, data);
  }

  // Date
  handleDateChange(moment) {
    const startDate = moment.format(appConstants.schedules.ISO_DATE_FORMAT);
    this.handleChangeSessionData({
      startDate,
      startTime: null,
      endTime: null,
      startTimeIndex: null
    });

    const {sessionId, sportId} = this.state.session;
    this.fetchAvailableSessionTimeSlots(sportId, sessionId, startDate);
  }

  // Sport
  handleChangeSport(e) {
    const {selectedProfile,profile} = this.props;
    const id = e.target.value;
    this.handleChangeSessionData({
      sportId: (id === DROP_DOWN_OPTION_SELECT) ? null : id,
      sessionId: null
    });
    if (id !== DROP_DOWN_OPTION_SELECT) {
      this.props.fetchNewSessions({profileID: selectedProfile.id, sportID: id});
      if ( profile && profile.data && profile.data.summary && profile.data.summary.sports ) {
        const sport = profile.data.summary.sports
                        .find(sport => sport.id === id)
        this.props.changeSport(sport)
      }
    }

  }
  // Session
  handleChangeSession(e) {
    const id = e.currentTarget.dataset.id;
    const {sessionsNew} = this.props;
    const session = this.findElementById(sessionsNew.data, id);
    console.log('selectId', id)
    console.log('sessionsNew', sessionsNew)
    console.log('session', session)
    this.handleChangeSessionData({
      sessionId: id,
      totalSlots: (session.maxSize) ? session.maxSize : 0,
      minSize: (session.minSize) ? session.minSize : 0,
      maxSize: (session.maxSize) ? session.maxSize : 0,
      startTime: null,
      endTime: null,
      startTimeIndex: null,
      sessionLength: session.defaultSessionLength
    });
    const {sportId, startDate} = this.state.session;
    this.fetchAvailableSessionTimeSlots(sportId, id, startDate);
  }

  // Start time
  handleChangeStartTime(e) {
    const {value, availabletill} = e.currentTarget.dataset;
    const {sessionId} = this.state.session;
    const {sessionsNew} = this.props;
    // Find sessions object by element id to get session length
    const session = this.findElementById(sessionsNew.data, sessionId);
    const endTime = session && session.defaultSessionLength >= 0 ? 
                      moment(value, 'HH:mm')
                      .add(session.defaultSessionLength, 
                        appConstants.momentJSConstants.MINUTE)
                      .format("HH:mm") 
                        : null

    this.handleChangeSessionData({
      startTime: value,
      endTime: endTime,
      availableTill: availabletill
    }); 
  }

  canEnableTotalSlots(session) {
    const {p} = this.props;
    if (notNull(session)) {
      const trainingTypeName = session.trainingType.description;

      return (trainingTypeName == p.t('ScheduleASession.groupTraining') || trainingTypeName == p.t('ScheduleASession.teamTraining') || trainingTypeName == p.t('ScheduleASession.clinics'));
    }
    return false;
  }

  // End time
  handleChangeEndTime(e) {
    const value = e.currentTarget.dataset.value;
    this.handleChangeSessionData({
      endTime: value
    });
  }

  handleOverridePricing(e) {
    const {value} = e.target;
    const intValue = parseInt(value, 10);
    this.handleChangeSessionData({
      overridePricing: (intValue && intValue > 0) ? intValue : 0
    });
  }

  handleChangeTotalSlots(event) {
    const {value} = event.target;
    const intValue = parseInt(value, 10);
    this.handleChangeSessionData({
      totalSlots: (intValue && intValue > 0) ? intValue : 0
    });
  }

  findElementById(array, id) {
    return array.find(element => {
      return element.id == id;
    });
  }

  renderSportOptions(sport) {
    return (
      <option key={sport.id} id={sport.id} value={sport.id} >{sport.name}</option>
    );
  }
  
  renderListTime(time, onClick) {
    const {
      timeFormat24Hour, timeFormat12Hour, status
    } = time
    const { 
      availableTillFormat24Hour
    } = status
    return (
      <li 
        key={timeFormat24Hour} 
        data-id={timeFormat24Hour} 
        data-value={timeFormat24Hour}
        data-availableTill={availableTillFormat24Hour}
        className="uk-active" 
        onClick={onClick}>
          <a>{timeFormat12Hour}</a>
      </li>
    )
  }

  renderSessionDateTime() {
    const {p, sessionTimeSlots, workingDays} = this.props;
    const {submitted, validation, session} = this.state;

    const {startTime, endTime, startDate, availableTill} = session;

    const selectedStartDate = moment(startDate, appConstants.schedules.ISO_DATE_FORMAT);

    const selectedStartTime = notNull(startTime) ? formatTimeString(startTime) : p.t('ScheduleASession.selectStartTime');

    const selectedEndTime = notNull(endTime) ? formatTimeString(endTime) : p.t('ScheduleASession.selectEndTime');

    const availableStartTimeSlots = sessionTimeSlots && sessionTimeSlots.data ? 
          sessionTimeSlots.data.filter(item => item.availableForSession == true && item.status.businessHours == true ) : [] 

    const availableEndTimeSlots = sessionTimeSlots && sessionTimeSlots.data && startTime ? 
          getEndTimeSlots(sessionTimeSlots, startTime, availableTill, endTime ) : []

    const selectedWeekDay = selectedStartDate.format('ddd').toUpperCase();
    const workingDay = workingDays.data[selectedWeekDay];

    const isWorkingDay = Boolean(workingDay && workingDay.startTime && workingDay.endTime);
    
    return (
      <div className="uk-grid">
        <div className="uk-width-large-1-3 uk-width-medium-1-3">
          <div className={(validation.startDate === false && submitted) || (isWorkingDay === false) ? 'field-holder error' : 'field-holder'}>
            <label className="uk-form-label">{p.t('ScheduleASession.date')}</label>
            <div className="cl-sd-datepicker">
              <form className="uk-form">
                <Datetime
                  name="sessionDateFrom"
                  value={selectedStartDate}
                  onChange={this.handleDateChange}
                  dateFormat={p.t('DashboardSchedules.dateFormat')}
                  timeFormat={false}
                  closeOnSelect
                  isValidDate={valid}
                  className="cl-sd-datepicker"
                />
              </form>
              {rightArrow()}
            </div>
            <span className="error-text">{(isWorkingDay === false) ? p.t('ScheduleASession.validation.schedulerSettingsNotSet') : p.t('ScheduleASession.validation.date')}</span>
          </div>
        </div>
        <div className="uk-width-large-1-3 uk-width-medium-1-3">
          <div className={validation.startTime === false && submitted ? 'field-holder error' : 'field-holder'}>
            <label className="uk-form-label">{p.t('ScheduleASession.startTime')}</label>
            <div className={this.state.dropdownClasses} data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
              <button className="uk-button cl-sd-full-width">
                <span className="cl-sd-modal-selected-option"> {selectedStartTime} </span>
                {rightArrow()}
              </button>
              <div className="uk-dropdown uk-dropdown-small uk-dropdown-scrollable">
                <ul className="uk-nav uk-nav-dropdown uk-text-left">
                  {availableStartTimeSlots &&
                    availableStartTimeSlots.map(r => this.renderListTime(r,this.handleChangeStartTime)) 
                  }
                </ul>
              </div>
            </div>
            <span className="error-text">{p.t('ScheduleASession.validation.startTime')}</span>
          </div>
        </div>

        <div className="uk-width-large-1-3 uk-width-medium-1-3">
          <div className={validation.endTime.valid === false && submitted ? 'field-holder error' : 'field-holder'}>
            <label className="uk-form-label">{p.t('ScheduleASession.endTime')}</label>
            <div className={this.state.dropdownClasses} data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
              <button className="uk-button cl-sd-full-width">
                <span className="cl-sd-modal-selected-option"> {selectedEndTime} </span>
                {rightArrow()}
              </button>
              <div className="uk-dropdown uk-dropdown-small uk-dropdown-scrollable">
                <ul className="uk-nav uk-nav-dropdown uk-text-left">
                  {availableEndTimeSlots &&
                    availableEndTimeSlots.map(r => this.renderListTime(r,this.handleChangeEndTime))
                  }
                </ul>
              </div>
            </div>
            <span className="error-text">{(validation.endTime.required === false) ? p.t('ScheduleASession.validation.endTime') : p.t('ScheduleASession.validation.endTimeValid')}</span>
          </div>
        </div>
      </div>
    );
  }

  getSessionName(session) {
    return session.name + ', ' + session.trainingType.description + ', ' + session.ageGroup.description + ', ' + session.skillLevel.description;
  }

  render() {
    const {p, sports, sessionsNew, scheduledSessionStatus} = this.props;
    const {submitted, validation, isModified} = this.state;
    const {sessionId, sportId, overridePricing, totalSlots, minSize, maxSize} = this.state.session;
    let sessionName = p.t('ScheduleASession.selectSession');
    let sessionColor = '#F15E23';
    const session = this.findElementById(sessionsNew.data, sessionId);
    let defaultPricing = 0;

    const enableTotalSlots = this.canEnableTotalSlots(session);

    if (notNull(session)) {
      sessionName = this.getSessionName(session);
      sessionColor = session.color;
      defaultPricing = session.defaultPricing;
    }
    const sport = this.findElementById(sports, sportId);
    const sportsName = notNull(sport) ? sport.name : p.t('ScheduleASession.selectSport');

    return (
      <div id="schedule-a-session-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            {modalCloseLink()}
          </a>
          <div className="uk-modal-header mb60">
            <h2>{p.t('ScheduleASession.title')}</h2>
          </div>
          <div className="uk-modal-body">

            <div className="uk-grid">
              <div className="uk-width-1-1">
                <div className={validation.sportId === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label className="uk-form-label">{p.t('ScheduleASession.selectSport')}</label>
                  <div className="uk-button uk-form-select uk-active margin0 cl-sd-full-width" data-uk-form-select>
                    <span className="cl-sd-modal-selected-option"> {sportsName} </span>
                    {rightArrow()}
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
            </div>
            <div className="uk-grid">
              <div className="uk-width-1-1">
                <div className={validation.sessionId === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label className="uk-form-label">{p.t('ScheduleASession.session')}</label>
                  <div className={this.state.dropdownClasses} data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
                    <button className="uk-button cl-sd-full-width">
                      <span className="event-color" style={{backgroundColor: sessionColor}}/>
                      <span className="event-text">{sessionName}</span>
                      {rightArrow()}
                    </button>
                    <div className="uk-dropdown">
                      <SessionDropDown onChange={this.handleChangeSession}/>

                    </div>
                  </div>
                  <span className="error-text">{p.t('ScheduleASession.validation.session')}</span>
                </div>
              </div>
            </div>

            {
              this.renderSessionDateTime()
            }

            <div className="uk-grid">
              {/*  <div className="uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-2">
                <div className="field-holder">
                  <label className="uk-form-label">{p.t('ScheduleASession.overridePricing')}</label>
                  <div className="uk-form-select dollardiv">
                    <span className="dollar">$</span>
                    <input type="number" name="" placeholder={defaultPricing} className="uk-form-width-small field-required" onChange={this.handleOverridePricing} value={overridePricing > 0 ? overridePricing : ''}/>
                  </div>
                </div>
              </div> */}
              <div className="uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-2">
                <div className={validation.totalSlots === false && submitted ? 'field-holder error' : 'field-holder'} style={{display: (enableTotalSlots === true) ? 'block' : 'none'}}>
                  <label className="uk-form-label">{p.t('ScheduleASession.totalOpenPositions')}</label>
                  <input type="number" name="" min={minSize} max={maxSize} onChange={this.handleChangeTotalSlots} value={totalSlots}/>
                  <span className="error-text">{p.t('ScheduleASession.validation.totalSlots', {min: minSize, max: maxSize})}</span>
                </div>
              </div>
            </div>

            {
              scheduledSessionStatus.status === REJECTED && submitted && !isModified && (
                <div className="uk-grid">
                  <div className="uk-container-center">
                    <div className="cl-sd-alert-box">
                      <p>{p.t('ScheduleASession.validation.notSaved')}</p>
                    </div>
                  </div>
                </div>
              )
            }
            {this.state.alertMessage && <div className="uk-grid">
              <div className="uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="cl-sd-alert-box">{this.state.alertMessage}</div>
              </div>
            </div>}
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" disabled={isModified === false} onClick={this.handleSaveButtonClicked} className="uk-modal-close uk-close theme-orange-btn">{p.t('ScheduleASession.save')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('ScheduleASession.cancel')}</button>
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
      sports: PropTypes.array,
      sessionsNew: PropTypes.object,
      createNewSession: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      fetchNewSessions: PropTypes.func.isRequired,
      fetchAvailableSessionTimeSlots: PropTypes.func.isRequired,
      sessionTimeSlots: PropTypes.array,
      workingDays: PropTypes.object.isRequired,
      scheduledSessionStatus: PropTypes.object.isRequired,
      ispFetchWorkingDays: PropTypes.func.isRequired,
      selectedDate: PropTypes.string,
      sportId: PropTypes.string
    };
  }
}

ScheduleASession.defaultProps = {
  sports: [],
  sessionsNew: [],
  sessionTimeSlots: [],
  selectedDate: moment().format(appConstants.schedules.ISO_DATE_FORMAT),
  sportId: null
};

const mapStateToProps = state => {
  const {
    profile, months, sports, sessionsNew, userProfiles, 
    sessionTimeSlots, workingDays, scheduledSessionStatus
  } = state;
  return {
    profile,
    months,
    sports,
    sessionsNew,
    selectedProfile: userProfiles.selectedProfile,
    sessionTimeSlots: sessionTimeSlots.data,
    scheduledSessionStatus,
    workingDays
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewSession: (profileID, sessionID, data) => dispatch(createNewSession(profileID, sessionID, data)),
    fetchNewSessions: ({profileID, sportID}) => dispatch(fetchNewSessions({profileID, sportID})),
    fetchAvailableSessionTimeSlots: (profileID, sportId, sessionId, date) => dispatch(fetchAvailableSessionTimeSlots(profileID, sportId, sessionId, date)),
    ispFetchWorkingDays: profileIdData => dispatch(ispFetchWorkingDays(profileIdData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(ScheduleASession));
