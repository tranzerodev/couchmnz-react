import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import appConstants from '../../../../../../constants/appConstants';
import moment from 'moment';
import Datetime from 'react-datetime';
import {
  fetchReasons, fetchISPBookingScheduledSessions, sspBookingAction
} from '../../../../../../actions';

import validateRescheduleBooking from '../../../../../../validators/ssp/isp/rescheduleBooking';

const sortReasonsByName = (reason, reason1) => {
  return reason.name > reason1.name;
};
const yesterday = Datetime.moment().subtract(1, 'day');
const valid = function (current) {
  return current.isAfter(yesterday);
};

const DROP_DOWN_OPTION_SELECT = 'DROP_DOWN_OPTION_SELECT';

class RescheduleBookingModal extends Component {
  constructor(props) {
    super(props);

    const reschedule = {
      startDate: moment().format(appConstants.schedules.ISO_DATE_FORMAT),
      scheduleId: null,
      reasonId: null,
      message: ''
    };
    const validation = validateRescheduleBooking(reschedule);
    this.state = {
      reschedule,
      validation,
      submitted: false
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRescheduleDataChange = this.handleRescheduleDataChange.bind(this);
    this.handleRescheduleMessageChange = this.handleRescheduleMessageChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleSubmitReschedule = this.handleSubmitReschedule.bind(this);
    this.getSessionScheduleOptionString = this.getSessionScheduleOptionString.bind(this);
    this.renderSchedule = this.renderSchedule.bind(this);
    this.handleSelectSchedule = this.handleSelectSchedule.bind(this);
  }

  componentDidMount() {
    const {selectedProfile, booking} = this.props;
    const {startDate} = this.state.reschedule;
    this.props.fetchISPBookingScheduledSessions(selectedProfile.id, booking.id, startDate);
    this.props.fetchReasons({event: appConstants.reasons.reschedule});
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  handleRescheduleDataChange(rescheduleData) {
    const {reschedule} = this.state;
    const newReschedule = Object.assign({}, reschedule, rescheduleData);
    const validation = validateRescheduleBooking(newReschedule);
    this.setState({
      reschedule: newReschedule,
      validation
    });
  }
  renderReasons(reason) {
    return (
      <option key={reason.id} id={reason.id} value={reason.id} >{reason.reason}</option>
    );
  }

  handleDateChange(moment) {
    const {selectedProfile, booking} = this.props;
    const dateString = moment.format(appConstants.schedules.ISO_DATE_FORMAT);
    this.handleRescheduleDataChange({
      startDate: dateString,
      scheduleId: null
    });
    this.props.fetchISPBookingScheduledSessions(selectedProfile.id, booking.id, dateString);
  }

  handleRescheduleMessageChange(event) {
    const {value} = event.target;
    this.handleRescheduleDataChange({
      message: value
    });
  }

  // Reason
  handleReasonChange(e) {
    const value = e.target.value;
    this.handleRescheduleDataChange({
      reasonId: (value === DROP_DOWN_OPTION_SELECT) ? null : value
    });
  }

  handleSelectSchedule(event) {
    const {value} = event.target;
    this.handleRescheduleDataChange({
      scheduleId: (value === DROP_DOWN_OPTION_SELECT) ? null : value
    });
  }

  handleSubmitReschedule() {
    const {validation, reschedule} = this.state;
    const {selectedProfile, booking} = this.props;
    if (validation.valid === true) {
      const resceduleData = {
        action: appConstants.sessionEventActions.RESCHEDULE,
        payload: {
          scheduleId: reschedule.scheduleId,
          reasonCode: reschedule.reasonId,
          reasonMessage: reschedule.message
        }

      };
      this.props.sspBookingAction(selectedProfile.type, selectedProfile.id, booking.id, resceduleData);
    }
    this.setState({submitted: true});
  }

  getSessionScheduleOptionString(sessionSlot) {
    const {p} = this.props;
    const {startTime, endTime} = sessionSlot;
    const startTimeString = moment(startTime, appConstants.schedules.ISO_DATE_FORMAT).format('h.mm A');
    const endTimeString = moment(endTime, appConstants.schedules.ISO_DATE_FORMAT).format('h.mm A');
    return (
      p.t('RescheduleBooking.schedulOption', {startTime: startTimeString, endTime: endTimeString})
    );
  }

  renderSchedule(schedule, index) {
    const scheduleOptionString = this.getSessionScheduleOptionString(schedule);
    return (
      <option key={index} value={schedule.id}>{scheduleOptionString}</option>
    );
  }

  render() {
    const {p, reasons, bookingScheduledSession, error} = this.props;
    const {validation, submitted, reschedule} = this.state;
    const {startDate, scheduleId, reasonId, message} = reschedule;
    const startDateMoment = moment(startDate, appConstants.schedules.ISO_DATE_FORMAT);

    const reasonItem = reasons.find(item => item.id === reasonId);
    const selectedReason = (reasonItem) ? reasonItem.reason : p.t('ReSchedule.selectAReason');

    let selectedSchedule = p.t('RescheduleBooking.selectASchedule');

    const itemSchedule = bookingScheduledSession.find(item => item.id === scheduleId);

    if (scheduleId && itemSchedule) {
      selectedSchedule = this.getSessionScheduleOptionString(itemSchedule);
    }

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
            <h2>{p.t('RescheduleBooking.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
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
                <div className={validation.scheduleId === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <label className="uk-form-label">{p.t('RescheduleBooking.selectSchedule')}</label>
                  <div className="uk-button uk-form-select uk-active margin0" data-uk-form-select>
                    <span className="cl-sd-modal-selected-option">{selectedSchedule}</span>
                    <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                      <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                    </svg>
                    <select onChange={this.handleSelectSchedule} value={(scheduleId) ? scheduleId : DROP_DOWN_OPTION_SELECT}>
                      <option value={DROP_DOWN_OPTION_SELECT} >{p.t('RescheduleBooking.selectASchedule')}</option>
                      {
                        bookingScheduledSession.map(this.renderSchedule)
                      }
                    </select>
                  </div>
                  <span className="error-text">{p.t('RescheduleBooking.validation.schedule')}</span>
                </div>
              </div>
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
            </div>
            <div className="uk-grid">
              <div className="uk-width-1-1">
                <div className={validation.message === false && submitted ? 'field-holder error' : 'field-holder'}>
                  <div className="uk-form-row">
                    <label className="uk-form-label">{p.t('ReSchedule.messageLabel')}</label>
                    <textarea className="cl-sd-textarea" cols rows={7} placeholder={p.t('ReSchedule.hint')} value={message} onChange={this.handleRescheduleMessageChange}/>
                  </div>
                  <span className="error-text">{p.t('ReSchedule.validation.message')}</span>
                </div>
              </div>
            </div>
            <div className="uk-grid">
              {error &&
                <div className="uk-width-large-1-1">
                  <div className="cl-sd-alert-box mb30">
                    <p>
                      {error}
                    </p>
                  </div>
                </div>
              }
            </div>
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
}
RescheduleBookingModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  booking: PropTypes.object,
  fetchReasons: PropTypes.func.isRequired,
  selectedProfile: PropTypes.object.isRequired,
  fetchISPBookingScheduledSessions: PropTypes.func.isRequired,
  sspBookingAction: PropTypes.func.isRequired,
  reasons: PropTypes.array,
  bookingScheduledSession: PropTypes.array,
  error: PropTypes.string
};

RescheduleBookingModal.defaultProps = {
  reasons: [],
  bookingScheduledSession: [],
  booking: null,
  error: undefined
};

const mapStateToProps = state => {
  const {scheduledSessions, reasons, userProfiles, bookingScheduledSessions} = state;
  return {
    scheduledSessions,
    reasons: reasons.data,
    selectedProfile: userProfiles.selectedProfile,
    bookingScheduledSession: bookingScheduledSessions.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReasons: event => dispatch(fetchReasons(event)),
    fetchISPBookingScheduledSessions: (profileID, bookingId, date) => dispatch(fetchISPBookingScheduledSessions(profileID, bookingId, date)),
    sspBookingAction: (type, profileId, bookingId, data) => dispatch(sspBookingAction(type, profileId, bookingId, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(RescheduleBookingModal));
