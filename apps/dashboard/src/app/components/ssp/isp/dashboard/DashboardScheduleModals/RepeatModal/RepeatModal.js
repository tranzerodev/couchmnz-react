import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import Calendar from 'react-calendar';
import moment from 'moment';
import {Set as immutableSet} from 'immutable';

import appConstants from '../../../../../../constants/appConstants';
import {ispFetchWorkingDays, ispRepeatSession} from '../../../../../../actions';
import {FULFILLED, PENDING} from '../../../../../../constants/ActionTypes';
import validateRepeatSession from '../../../../../../validators/ssp/isp/repeatSession';

const RepeatSessionConstants = appConstants.RepeatSession;

class RepeatModal extends Component {
  constructor(props) {
    super(props);
    const {scheduledSession} = this.props;
    const repeatSession = {
      frequency: RepeatSessionConstants.frequency.daily,
      endRepeat: RepeatSessionConstants.endRepeatType.onDate,
      endRepeatTime: scheduledSession.endTime,
      days: []
    };

    const validation = validateRepeatSession(repeatSession);
    this.state = {
      repeatSession,
      validation,
      submitted: false
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSessionRepeatFrequencyChange = this.handleSessionRepeatFrequencyChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChangeEndRepeat = this.handleChangeEndRepeat.bind(this);
    this.renderRepeatWeeks = this.renderRepeatWeeks.bind(this);
    this.renderWeekDay = this.renderWeekDay.bind(this);
    this.handleChangeSelectWeekDay = this.handleChangeSelectWeekDay.bind(this);
    this.handleChangeRepeatsessionDataChange = this.handleChangeRepeatsessionDataChange.bind(this);
    this.handleSubmitRepeatSession = this.handleSubmitRepeatSession.bind(this);
  }

  componentDidMount() {
    if (this.props.workingDays.status !== FULFILLED && this.props.workingDays.status !== PENDING) {
      this.props.ispFetchWorkingDays({profileId: this.props.selectedProfile.id});
    }
  }

  handleChangeRepeatsessionDataChange(newData) {
    const {repeatSession} = this.state;
    const newRepeatSession = Object.assign({}, repeatSession, newData);
    const validation = validateRepeatSession(newRepeatSession);
    this.setState({
      repeatSession: newRepeatSession,
      validation
    });
  }

  handleDateChange(date) {
    const dateString = moment(date).format(appConstants.schedules.ISO_DATE_FORMAT);
    this.handleChangeRepeatsessionDataChange({endRepeatTime: dateString});
  }
  handleCancelClick() {
    this.props.onCancel();
  }

  handleSessionRepeatFrequencyChange(event) {
    const {value} = event.target;
    this.handleChangeRepeatsessionDataChange({
      frequency: value
    });
  }

  handleChangeSelectWeekDay(event) {
    const {checked, value} = event.target;
    const {days} = this.state.repeatSession;
    let daysSet = immutableSet(days);
    if (checked === true) {
      daysSet = daysSet.add(value);
    } else {
      daysSet = daysSet.remove(value);
    }
    this.handleChangeRepeatsessionDataChange({
      days: daysSet.toJS()
    });
  }

  handleSubmitRepeatSession() {
    const {validation, repeatSession} = this.state;
    if (validation.valid === true) {
      const {frequency, days, endRepeat, endRepeatTime} = repeatSession;
      const {selectedProfile, scheduledSession} = this.props;
      this.props.ispRepeatSession(selectedProfile.id, scheduledSession.id, {
        frequency,
        days: (frequency === RepeatSessionConstants.frequency.weekly) ? days : [],
        endRepeat,
        endRepeatTime: (endRepeat === RepeatSessionConstants.endRepeatType.onDate) ? endRepeatTime : null
      });
      this.props.onCancel();
    } else {
      this.setState({
        submitted: true
      });
    }
  }

  renderWeekDay(weekDay) {
    const {p, workingDays} = this.props;
    const {days} = this.state.repeatSession;
    const workingDay = workingDays.data[weekDay];
    const isWorkingDay = Boolean(workingDay && workingDay.startTime && workingDay.endTime);
    const isChecked = days.includes(weekDay);
    const disabledClass = (isWorkingDay === true) ? 'calender-ck' : 'calender-ck disabled';
    return (
      <div key={weekDay}>
        <label className={disabledClass}>
          {isWorkingDay === true ? <input type="checkbox" checked={isChecked} value={weekDay} onChange={this.handleChangeSelectWeekDay}/> : ''}
          <span className="checkmark"/>
          <span className="cl-day">{p.t('RepeatSession.weekDays.' + weekDay)}</span>
        </label>
      </div>
    );
  }

  renderRepeatWeeks() {
    const {weekDays} = appConstants;
    return (
      <div className="cl-sd-week">
        {
          weekDays.map(this.renderWeekDay)
        }
      </div>
    );
  }

  handleChangeEndRepeat(event) {
    const {value} = event.target;
    this.handleChangeRepeatsessionDataChange({
      endRepeat: value
    });
  }

  render() {
    const {p, scheduledSession} = this.props;
    const {validation, repeatSession, submitted} = this.state;
    const {endRepeatTime, frequency, endRepeat} = repeatSession;
    const endDate = moment(endRepeatTime, appConstants.schedules.ISO_DATE_FORMAT).toDate();

    const minimumDate = moment(scheduledSession.endTime, appConstants.schedules.ISO_DATE_FORMAT).toDate();
    return (
      <div id="repeat-session-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-three">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb60">
            <h2>{p.t('RepeatSession.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-1-1">
                <div className="uk-form">
                  <label className="uk-form-label">{p.t('RepeatSession.frequency')}</label>
                  <div className="cl-sd-radio">
                    <div className={validation.frequency === false && submitted ? 'field-holder error' : 'field-holder'}>
                      <div className="uk-grid mb30">
                        <div className="uk-width-5-10">
                          <input type="radio" id="frequencyDaily" onChange={this.handleSessionRepeatFrequencyChange} value={RepeatSessionConstants.frequency.daily} checked={frequency === RepeatSessionConstants.frequency.daily} name="frequency"/>
                          <label htmlFor="frequencyDaily">{p.t('RepeatSession.daily')}</label>
                        </div>
                        <div className="uk-width-5-10">
                          <input type="radio" id="frequencyWeekly" onChange={this.handleSessionRepeatFrequencyChange} value={RepeatSessionConstants.frequency.weekly} checked={frequency === RepeatSessionConstants.frequency.weekly} name="frequency"/>
                          <label htmlFor="frequencyWeekly">{p.t('RepeatSession.weekly')}</label>
                        </div>
                      </div>
                      <span className="error-text">{p.t('RepeatSession.validation.frequency')}</span>
                    </div>
                  </div>
                  <div className="uk-grid cl-sd-view-2 cl-box mb30" style={{display: frequency === RepeatSessionConstants.frequency.weekly ? 'block' : 'none'}}>
                    <div className={validation.days === false && submitted ? 'field-holder error' : 'field-holder'}>
                      <div className="uk-width-1-1" >
                        {
                          this.renderRepeatWeeks()
                        }
                      </div>
                      <span className="error-text">{p.t('RepeatSession.validation.days')}</span>
                    </div>
                  </div>
                  <div className="uk-grid cl-sd-view-2 cl-box" >

                    <div className="uk-width-large-5-10">
                      <div className={validation.endRepeat === false && submitted ? 'field-holder error' : 'field-holder'}>
                        <label className="uk-form-label">{p.t('RepeatSession.endRepeat')}</label>
                        <div className="uk-button uk-form-select uk-active" data-uk-form-select>
                          <span className="cl-sd-modal-selected-option">{p.t('RepeatSession.' + endRepeat)}</span>
                          <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                            <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                          </svg>
                          <select value={endRepeat} onChange={this.handleChangeEndRepeat}>
                            <option value={RepeatSessionConstants.endRepeatType.onDate}>{p.t('RepeatSession.onDate')}</option>
                            {/* <option value={RepeatSessionConstants.endRepeatType.forever}>{p.t('RepeatSession.forever')}</option> */}
                          </select>
                        </div>
                      </div>
                      <span className="error-text">{p.t('RepeatSession.validation.endRepeat')}</span>
                    </div>
                    <div className="uk-width-1-1 mt30" style={{display: endRepeat === RepeatSessionConstants.endRepeatType.onDate ? 'block' : 'none'}}>
                      <div className={validation.endRepeatTime === false && submitted ? 'field-holder error' : 'field-holder'}>
                        <Calendar
                          onChange={this.handleDateChange}
                          value={endDate}
                          className="grid-calender-body"
                          minDate={minimumDate}
                        />
                        <span className="error-text">{p.t('RepeatSession.validation.endRepeatTime')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" className="uk-modal-close uk-close theme-orange-btn" onClick={this.handleSubmitRepeatSession}>{p.t('RepeatSession.yes')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('RepeatSession.cancel')}</button>
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
      workingDays: PropTypes.object.isRequired,
      ispFetchWorkingDays: PropTypes.func.isRequired,
      ispRepeatSession: PropTypes.func.isRequired,
      scheduledSession: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {workingDays, userProfiles} = state;
  return {
    selectedProfile: userProfiles.selectedProfile,
    workingDays
  };
};

const mapDispatchToProps = dispatch => {
  return {

    ispFetchWorkingDays: profileIdData => dispatch(ispFetchWorkingDays(profileIdData)),
    ispRepeatSession: (profileID, scheduledSessionId, data) => dispatch(ispRepeatSession(profileID, scheduledSessionId, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(RepeatModal));
