import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import appConstants from '../../../../../../constants/appConstants';
import moment from 'moment';
import Datetime from 'react-datetime';
import {
  fetchReasons, fetchIspAvailableSessionSlots, ispRescheduleSession
} from '../../../../../../actions';
import {FULFILLED, PENDING} from '../../../../../../constants/ActionTypes';

import validateRescheduleSession from '../../../../../../validators/ssp/isp/rescheduleSession';

const sortReasonsByName = (reason, reason1) => {
  return reason.name > reason1.name;
};
const yesterday = Datetime.moment().subtract(1, 'day');
const valid = function (current) {
  return current.isAfter(yesterday);
};

const DROP_DOWN_OPTION_SELECT = 'DROP_DOWN_OPTION_SELECT';

class ReScheduleModal extends Component {
  constructor(props) {
    super(props);
    
    const reschedule = {
      startDate: props.scheduledSession && props.scheduledSession.rescheduleStartTime ? 
        moment(props.scheduledSession.rescheduleStartTime).format(appConstants.schedules.ISO_DATE_FORMAT) : 
        moment(props.scheduledSession.startTime).format(appConstants.schedules.ISO_DATE_FORMAT),
      sessionSlotIndex: props.scheduledSession && props.scheduledSession.rescheduleStartTime ? 0 : null,
      reasonId: null,
      message: ''
    };
    const {scheduledSession} = this.props;
    const validation = validateRescheduleSession(reschedule, scheduledSession);
    this.state = {
      submitted: false,
      reschedule,
      validation
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleRescheduleDataChange = this.handleRescheduleDataChange.bind(this);
    this.renderSessionSlot = this.renderSessionSlot.bind(this);
    this.handleSelectSessionSlot = this.handleSelectSessionSlot.bind(this);
    this.getSessionSlotOptionString = this.getSessionSlotOptionString.bind(this);
    this.handleRescheduleMessageChange = this.handleRescheduleMessageChange.bind(this);
    this.handleSubmitReschedule = this.handleSubmitReschedule.bind(this);
    this.renderRescheduleMessage = this.renderRescheduleMessage.bind(this);
  }

  getSessionSlotOptionString(sessionSlot, index) {
    const {p} = this.props;
    const {startTime, endTime} = sessionSlot;
    const startTimeString = moment(startTime, appConstants.schedules.ISO_DATE_FORMAT).format('h:mm A');
    const endTimeString = moment(endTime, appConstants.schedules.ISO_DATE_FORMAT).format('h:mm A');
    return (
      // P.t('ReSchedule.sessionSlotOptions', {number: index + 1, startTime: startTimeString, endTime: endTimeString})
      p.t('ReSchedule.sessionSlotOption', {number: index + 1, startTime: startTimeString, endTime: endTimeString})
    );
  }

  handleRescheduleDataChange(rescheduleData) {
    const {reschedule} = this.state;
    const newReschedule = Object.assign({}, reschedule, rescheduleData);
    const validation = validateRescheduleSession(newReschedule, this.props.scheduledSession);
    this.setState({
      reschedule: newReschedule,
      validation
    });
  }

  handleSelectSessionSlot(event) {
    const {value} = event.target;
    this.handleRescheduleDataChange({
      sessionSlotIndex: (value === DROP_DOWN_OPTION_SELECT) ? null : value
    });
  }

  handleRescheduleMessageChange(event) {
    const {value} = event.target;
    this.handleRescheduleDataChange({
      message: value
    });
  }

  componentDidMount() {
    const {selectedProfile, scheduledSession} = this.props;
    const dateString = this.state.reschedule.startDate ? 
      moment(this.state.reschedule.startDate).format(appConstants.schedules.ISO_DATE_FORMAT) :
      moment(scheduledSession.startTime).format(appConstants.schedules.ISO_DATE_FORMAT)
    this.props.fetchIspAvailableSessionSlots(selectedProfile.id, scheduledSession.id, dateString);
    if (this.props.reasons.status !== FULFILLED && this.props.reasons.status !== PENDING) {
      this.props.fetchReasons({event: appConstants.reasons.reschedule});
    }
  }
  handleCancelClick() {
    this.props.onCancel();
  }

  handleSubmitReschedule() {
    const {validation, reschedule} = this.state;
    const {selectedProfile, scheduledSession, sessionSlots} = this.props;
    if (validation.valid === true) {
      const {sessionSlotIndex, reasonId, message} = reschedule;
      let resceduleData = {}
      if ( sessionSlots && sessionSlots[sessionSlotIndex] ) {
        const {startTime} = sessionSlots[sessionSlotIndex];
        resceduleData = {
          startTime: startTime,
          reasonId,
          message
        };
      } else {
        resceduleData = {
          startTime: scheduledSession.rescheduleStartTime,
          reasonId,
          message
        };      
      }
 
      this.props.ispRescheduleSession(selectedProfile.id, scheduledSession.id, resceduleData);
      this.props.onCancel();
    } else {
      this.setState({submitted: true});
    }
  }
  // Date
  handleDateChange(moment) {
    const {selectedProfile, scheduledSession} = this.props;
    const dateString = moment.format(appConstants.schedules.ISO_DATE_FORMAT);
    this.handleRescheduleDataChange({
      startDate: dateString,
      sessionSlotIndex: null
    });
    this.props.fetchIspAvailableSessionSlots(selectedProfile.id, scheduledSession.id, dateString);
  }
  // Reason
  handleReasonChange(e) {
    const value = e.target.value;
    this.handleRescheduleDataChange({
      reasonId: (value === DROP_DOWN_OPTION_SELECT) ? null : value
    });
  }

  renderSessionSlot(sessionSlot, index) {
    const sessionSlotOptionString = this.getSessionSlotOptionString(sessionSlot, index);
    return (
      <option key={index} value={index}>{sessionSlotOptionString}</option>
    );
  }

  renderReasons(reason) {
    return (
      <option key={reason.id} id={reason.id} value={reason.id} >{reason.reason}</option>
    );
  }

  renderRescheduleMessage() {
    const {scheduledSession, p} = this.props;
    const {openSlots, totalSlots} = scheduledSession;
    if (openSlots !== totalSlots) {
      let sessionScheduledTime = '';
      const sessionScheduledStartTime = (moment(scheduledSession.startTime)).format(appConstants.scheduleSession.startTime);
      const sessionScheduledEndTime = (moment(scheduledSession.endTime)).format(appConstants.scheduleSession.endTime);
      const sessionScheduledYear = (moment(scheduledSession.endTime)).format(appConstants.scheduleSession.year);
      sessionScheduledTime = sessionScheduledStartTime + ' - ' + sessionScheduledEndTime + ' , ' + sessionScheduledYear;
      return (
        <div className="cl-sd-alert-box mb30">
          <p>
            {p.t('ReSchedule.message')} {sessionScheduledTime}
          </p>
        </div>
      );
    }
  }

  render() {
    const {p, scheduledSession, sessionSlots, reasons} = this.props;
    const {validation, reschedule, submitted} = this.state;
    const {sessionSlotIndex, reasonId, message} = reschedule;
    const {openSlots, totalSlots} = scheduledSession;

    const startDateMoment = this.state.reschedule.startDate ? 
      moment(this.state.reschedule.startDate, appConstants.schedules.ISO_DATE_FORMAT) :
      moment(scheduledSession.startTime, appConstants.schedules.ISO_DATE_FORMAT);
    
    let selectedSessionSlot = this.props.scheduledSession && this.props.scheduledSession.rescheduleStartTime ?
    `${moment(this.props.scheduledSession.rescheduleStartTime).format('h:mm A')} - ${moment(this.props.scheduledSession.rescheduleEndTime).format('h:mm A')}`
    : p.t('ReSchedule.selectASessionSlot')
    if (sessionSlotIndex && sessionSlots[sessionSlotIndex]) {
      selectedSessionSlot = this.getSessionSlotOptionString(sessionSlots[sessionSlotIndex], sessionSlotIndex);
    }

    const reasonItem = reasons.find(item => item.id === reasonId);
    const selectedReason = (reasonItem) ? reasonItem.reason : p.t('ReSchedule.selectAReason');
    const isBooked = openSlots !== totalSlots;
    const titleText = isBooked ? p.t('ReSchedule.title') : p.t('ReSchedule.edit_schedule');

    return (
      <div id="re-schedule-athlete" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-two">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb60">
            <h2>{titleText}</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-1-1">
                <div className="cl-sd-event-address mb30">
                  <h3>{scheduledSession.sessionName}</h3>
                  <span className="mb10">
                    {p.t('ReSchedule.trainingType', {trainingType: scheduledSession.trainingType.description})} <br/>
                    {p.t('ReSchedule.ageGroup', {ageGroup: scheduledSession.ageGroup.description})}<br/>
                    {p.t('ReSchedule.level', {level: scheduledSession.skillLevel.description})} <br/>
                    {scheduledSession.minSize > 1 && scheduledSession.maxSize > 1 && 
                    p.t('ReSchedule.groupSize', {min: scheduledSession.minSize, max: scheduledSession.maxSize})
                    }
                  </span>
                  <span>
                    {p.t('ReSchedule.location')} {scheduledSession.trainingLocation.name}
                  </span>
                  <span className="cl-sd-small-sub-heading"> 
                    {scheduledSession.trainingLocation.address}
                  </span>
                </div>
                <div className="cl-sd-event-address mb30">
                    <h3>{p.t('ReSchedule.currentlyScheduleOn')}</h3>
                    <span>
                        {moment(scheduledSession.startTime).format('LLLL')}
                    </span>
                    <span className="cl-sd-small-sub-heading">
                      {p.t('ReSchedule.availabilitySlot', {bookedSlots: scheduledSession.bookedSlots, totalSlots: scheduledSession.totalSlots})}
                    </span>
                </div>                  
              </div>
              <div className="uk-width-large-1-1">
                {
                  this.renderRescheduleMessage()
                }
              </div>
              <div className="uk-width-large-5-10 uk-width-medium-5-10 mb30">
                <div className={validation.startDate === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label className="uk-form-label">{p.t('ReSchedule.date')}</label>
                  <div className="cl-sd-datepicker">
                    <form className="uk-form">
                      <Datetime
                        name="sessionDateFrom"
                        value={startDateMoment}
                        onChange={this.handleDateChange}
                        dateFormat={p.t('DashboardSchedules.dateFormat')}
                        timeFormat={false}
                        closeOnSelect
                        isValidDate={valid}
                      />
                    </form>
                  </div>

                  <span className="error-text">{p.t('ReSchedule.validation.startDate')}</span>
                </div>
              </div>
              <div className="uk-width-large-5-10 uk-width-medium-5-10 mb-30">
                <div className={validation.sessionSlotIndex === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label className="uk-form-label">{p.t('ReSchedule.selectSession')}</label>
                  <div className="uk-button uk-form-select uk-active margin0" data-uk-form-select>
                    <span className="cl-sd-modal-selected-option">{selectedSessionSlot}</span>
                    <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                      <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                    </svg>
                    <select onChange={this.handleSelectSessionSlot} value={(sessionSlotIndex) ? sessionSlotIndex : DROP_DOWN_OPTION_SELECT}>
                      <option value={DROP_DOWN_OPTION_SELECT} >{p.t('ReSchedule.selectSessionSlot')}</option>
                      {
                        sessionSlots.map(this.renderSessionSlot)
                      }
                    </select>
                  </div>
                  <span className="error-text">{p.t('ReSchedule.validation.sessionSlot')}</span>
                </div>
              </div>
              {isBooked === true &&
              <div className="uk-width-large-5-10">
                <div className={validation.reasonId === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label className="uk-form-label" htmlFor>{p.t('ReSchedule.reasonForReSchedule')}</label>
                  <div className="uk-button uk-form-select uk-active margin0" data-uk-form-select>
                    <span className="cl-sd-modal-selected-option"> {selectedReason} </span>
                    <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                      <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                    </svg>
                    <select name="cl-select-role" id="cl-select-role" onChange={this.handleReasonChange} value={reasonId ? reasonId : DROP_DOWN_OPTION_SELECT}>
                      <option value={DROP_DOWN_OPTION_SELECT} >{p.t('ReSchedule.selectAReason')}</option>
                      {
                        reasons.sort(sortReasonsByName).map(this.renderReasons)
                      }
                    </select>
                  </div>
                  <span className="error-text">{p.t('ReSchedule.validation.reason')}</span>
                </div>
              </div>
              }
            </div>
            {isBooked === true &&
            <div className="uk-grid">
              <div className="uk-width-1-1">
                <div className={validation.reasonId === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <div className="uk-form-row">
                    <label className="uk-form-label">{p.t('ReSchedule.messageLabel')}</label>
                    <textarea className="cl-sd-textarea" cols rows={7} placeholder={p.t('ReSchedule.hint')} value={message} onChange={this.handleRescheduleMessageChange}/>
                  </div>
                  <span className="error-text">{p.t('ReSchedule.validation.message')}</span>
                </div>
              </div>
            </div>}
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" className="uk-modal-close uk-close theme-orange-btn" onClick={this.handleSubmitReschedule} >{p.t('ReSchedule.submit')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('ReSchedule.cancel')}</button>
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
      scheduledSession: PropTypes.object,
      fetchReasons: PropTypes.func,
      fetchIspAvailableSessionSlots: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      sessionSlots: PropTypes.array,
      reasons: PropTypes.array,
      ispRescheduleSession: PropTypes.func.isRequired
    };
  }
}

ReScheduleModal.defaultProps = {
  scheduledSession: {},
  sessionSlots: [],
  reasons: [],
  fetchReasons: () => { }
};

const mapStateToProps = state => {
  const {scheduledSessions, reasons, userProfiles, sessionSlots} = state;
  return {
    scheduledSessions,
    reasons: reasons.data,
    selectedProfile: userProfiles.selectedProfile,
    sessionSlots: sessionSlots.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReasons: event => dispatch(fetchReasons(event)),
    fetchIspAvailableSessionSlots: (profileID, scheduledSessionId, date) => dispatch(fetchIspAvailableSessionSlots(profileID, scheduledSessionId, date)),
    ispRescheduleSession: (profileID, sessionID, data) => dispatch(ispRescheduleSession(profileID, sessionID, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(ReScheduleModal));
