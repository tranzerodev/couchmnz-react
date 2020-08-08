import React from 'react';
import moment from 'moment';
import appConstants from '../../../../../constants/appConstants';

const {sessionEventActions} = appConstants;
/* eslint react/prop-types:0 */
function scheduled({data, t, isActiveEvent, booking, index}, eventActionCallback) {
  const {trainingStartTime, trainingEndTime, location} = data;
  const {canCancel, canReSchedule} = booking;
  if (isActiveEvent === true) {
    return (
      <div key={index} className="cl-md-session-list cl-md-session-active">
        <div className="uk-grid">
          <div className="uk-width-large-6-10">
            <span className="cl-md-session-info">{t('ISPSessionTemplates.SCHEDULED')}</span>
            <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, trainingStartTime, trainingEndTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
          </div>
          <div className="uk-width-large-4-10 uk-text-center">
            {canReSchedule === appConstants.yes && <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.RESCHEDULE} onClick={eventActionCallback}>{t('ISPSessionTemplates.reschedule')}</button>}
            {canCancel === appConstants.yes && <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.CANCEL} onClick={eventActionCallback}>{t('ISPSessionTemplates.cancel')}</button>}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div key={index} className="cl-md-session-list">
      <span className="cl-md-session-info">{t('ISPSessionTemplates.SCHEDULED')}</span>
      <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, trainingStartTime, trainingEndTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
    </div>
  );
}

function reserved({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format(t('ISPSessionTemplates.COMPLETED.completedTimeFormat'));

  if (isActiveEvent === true) {
    return (
      <div key={index} className="cl-md-session-list cl-md-session-active">
        <div className="uk-grid">
          <div className="uk-width-large-6-10">
            {/* <span className="cl-md-session-info">{t('ISPSessionTemplates.RESERVED')}</span>
            <span className="cl-md-session-date cl-md-dark-red-text">{dateTimeString}</span> */}
            <span className="cl-md-session-info">{t('ISPSessionTemplates.RESERVED')} {dateTimeString}</span>
          </div>
          <div className="uk-width-large-4-10 uk-text-center">
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.ACCEPT} onClick={eventActionCallback}>{t('ISPSessionTemplates.accept')}</button>
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.REJECT} onClick={eventActionCallback}>{t('ISPSessionTemplates.reject')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={index} className="cl-md-session-list">
      <span className="cl-md-session-info">{t('ISPSessionTemplates.RESERVED')} {dateTimeString}</span>
      {/* <span className="sl-md-session-date"></span> */}
    </div>
  );
}

function completed({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format('dddd, h:mm A, D MMMM YYYY');

  if (isActiveEvent === true) {
    return (
      <div key={index} className="cl-md-session-list cl-md-session-active">
        <div className="uk-grid">
          <div className="uk-width-large-6-10">
            <span className="cl-md-session-info">{t('ISPSessionTemplates.COMPLETED.sessionCompletedOn')}</span>
            <span className="sl-md-session-date">{dateTimeString}</span>
          </div>
          <div className="uk-width-large-4-10 uk-text-center"/>
        </div>
      </div>
    );
  }
  return (
    <div key={index} className="cl-md-session-list">
      <span className="cl-md-session-info">{t('ISPSessionTemplates.COMPLETED.sessionCompletedOn')}</span>
      <span className="sl-md-session-date">{dateTimeString}</span>
    </div>
  );
}

function paymentAccrued({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format(t('ISPSessionTemplates.COMPLETED.completedTimeFormat'));

  if (isActiveEvent === true) {
    return (
      <div key={index} className="cl-md-session-list cl-md-session-active">
        <div className="uk-grid">
          <div className="uk-width-large-6-10">
            <span className="cl-md-session-info">{t('ISPSessionTemplates.PAYMENT_ACCRUED')}</span>
            <span className="sl-md-session-date">{dateTimeString}</span>
          </div>
          <div className="uk-width-large-4-10 uk-text-center"/>
        </div>
      </div>
    );
  }
  return (
    <div key={index} className="cl-md-session-list">
      <span className="cl-md-session-info">{t('ISPSessionTemplates.PAYMENT_ACCRUED')}</span>
      <span className="sl-md-session-date">{dateTimeString}</span>
    </div>
  );
}

export function getFormattedTrainingDateTime(translate, startTime, endTime) {
  const trainingStartTimeMoment = moment(startTime, appConstants.schedules.ISO_DATE_FORMAT);
  const dayOfWeek = trainingStartTimeMoment.format('dddd');
  const startTimeString = trainingStartTimeMoment.format('h:mma');
  const endTimeString = moment(endTime, appConstants.schedules.ISO_DATE_FORMAT).format('h:mma');
  const dateString = trainingStartTimeMoment.format('D MMM YYYY');
  return translate('ISPSessionTemplates.trainingTime', {dayOfWeek, startTime: startTimeString, endTime: endTimeString, dateString});
}

function rescheduleBySSP({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp, startTime, endTime, location} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const timeStampDateString = timeStampMoment.format(t('ISPSessionTemplates.timeStampFormat'));

  if (isActiveEvent === true) {
    return (
      <div key={index} className="cl-md-session-list cl-md-session-active">
        <div className="uk-grid">
          <div className="uk-width-large-6-10">
            <span className="cl-md-session-info">{t('ISPSessionTemplates.RESCHEDULED_BY_SSP', {dateString: timeStampDateString})}</span>
            <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, startTime, endTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
          </div>
          <div className="uk-width-large-4-10 uk-text-center">
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.RESCHEDULE} onClick={eventActionCallback}>{t('ISPSessionTemplates.reschedule')}</button>
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.CANCEL} onClick={eventActionCallback}>{t('ISPSessionTemplates.cancel')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={index} className="cl-md-session-list">
      <span className="cl-md-session-info">{t('ISPSessionTemplates.RESCHEDULED_BY_SSP', {dateString: timeStampDateString})}</span>
      <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, startTime, endTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
    </div>
  );
}

function rescheduledByAthlete({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp, startTime, endTime, location} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const timeStampDateString = timeStampMoment.format(t('ISPSessionTemplates.timeStampFormat'));

  if (isActiveEvent === true) {
    return (
      <div key={index} className="cl-md-session-list cl-md-session-active">
        <div className="uk-grid">
          <div className="uk-width-large-6-10">
            <span className="cl-md-session-info">{t('ISPSessionTemplates.RESCHEDULED_BY_ATHLETE', {dateString: timeStampDateString})}</span>
            <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, startTime, endTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
          </div>
          <div className="uk-width-large-4-10 uk-text-center">
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.RESCHEDULE} onClick={eventActionCallback}>{t('ISPSessionTemplates.reschedule')}</button>
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.CANCEL} onClick={eventActionCallback}>{t('ISPSessionTemplates.cancel')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={index} className="cl-md-session-list">
      <span className="cl-md-session-info">{t('ISPSessionTemplates.RESCHEDULED_BY_ATHLETE', {dateString: timeStampDateString})}</span>
      <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, startTime, endTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
    </div>
  );
}

function acceptRecheduleRequest({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format(t('ISPSessionTemplates.COMPLETED.completedTimeFormat'));
  return (
    <div key={index} className={'cl-md-session-list ' + ((isActiveEvent === true) ? 'cl-md-session-active' : '')}>
      <span className="cl-md-session-info">{t('ISPSessionTemplates.ACCEPTED.sessionRescheduleRequestAccept')}</span>
      <span className="sl-md-session-date">{dateTimeString}</span>
    </div>
  );
}

function rescheduleRejectedBySSP({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp, reason} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format(t('ISPSessionTemplates.COMPLETED.completedTimeFormat'));
  return (
    <div key={index} className={'cl-md-session-list ' + ((isActiveEvent === true) ? 'cl-md-session-active' : '')}>
      <span className="cl-md-session-info">{t('ISPSessionTemplates.RESCHEDULED_REJECTED_BY_SSP', {reason})}</span>
      <span className="sl-md-session-date">{dateTimeString}</span>
    </div>
  );
}

function rescheduleRejectedByAthlete({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp, reason} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format(t('ISPSessionTemplates.COMPLETED.completedTimeFormat'));
  return (
    <div key={index} className={'cl-md-session-list ' + ((isActiveEvent === true) ? 'cl-md-session-active' : '')}>
      <span className="cl-md-session-info">{t('ISPSessionTemplates.RESCHEDULED_REJECTED_BY_ATHLETE', {reason})}</span>
      <span className="sl-md-session-date">{dateTimeString}</span>
    </div>
  );
}

function cancelledByAthlete({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp, reason} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format(t('ISPSessionTemplates.COMPLETED.completedTimeFormat'));
  return (
    <div key={index} className={'cl-md-session-list ' + ((isActiveEvent === true) ? 'cl-md-session-active' : '')}>
      <span className="cl-md-session-info">{t('ISPSessionTemplates.CANCELLED_BY_ATHLETE', {reason})}</span>
      <span className="sl-md-session-date">{dateTimeString}</span>
    </div>
  );
}

function cancelledBySSP({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp, reason} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format(t('ISPSessionTemplates.COMPLETED.completedTimeFormat'));
  return (
    <div key={index} className={'cl-md-session-list ' + ((isActiveEvent === true) ? 'cl-md-session-active' : '')}>
      <span className="cl-md-session-info">{t('ISPSessionTemplates.CANCELLED_BY_SSP', {reason})}</span>
      <span className="sl-md-session-date">{dateTimeString}</span>
    </div>
  );
}

function scheduleAwaitedByAthlete({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp, location, startTime, endTime} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format(t('ISPSessionTemplates.COMPLETED.completedTimeFormat'));

  if (isActiveEvent === true) {
    return (
      <div key={index} className="cl-md-session-list cl-md-session-active">
        <div className="uk-grid">
          <div className="uk-width-large-6-10">
            <span className="cl-md-session-info">{t('ISPSessionTemplates.SCHEDULE_AWAITED_BY_ATHLETE')} {dateTimeString})</span>
            <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, startTime, endTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
          </div>
          <div className="uk-width-large-4-10 uk-text-center">
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.ACCEPT} onClick={eventActionCallback}>{t('ISPSessionTemplates.accept')}</button>
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.REJECT} onClick={eventActionCallback}>{t('ISPSessionTemplates.reject')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={index} className="cl-md-session-list">
      <span className="cl-md-session-info">{t('ISPSessionTemplates.SCHEDULE_AWAITED_BY_ATHLETE')} {dateTimeString})</span>
      <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, startTime, endTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
    </div>
  );
}

function rescheduleAwaitedByAthlete({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp, startTime, endTime, reason, location} = data;
  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format(t('ISPSessionTemplates.COMPLETED.completedTimeFormat'));

  if (isActiveEvent === true) {
    return (
      <div key={index} className="cl-md-session-list cl-md-session-active">
        <div className="uk-grid">
          <div className="uk-width-large-6-10">
            <span className="cl-md-session-info">{t('ISPSessionTemplates.RESCHEDULE_AWAITED_BY_ATHLETE_ON', {dateString: dateTimeString})} {reason ? t('ISPSessionTemplates.FOR_REASON', {reason}) : null}</span>
            <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, startTime, endTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
          </div>
          <div className="uk-width-large-4-10 uk-text-center">
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.ACCEPT} onClick={eventActionCallback}>{t('ISPSessionTemplates.accept')}</button>
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.REJECT} onClick={eventActionCallback}>{t('ISPSessionTemplates.reject')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={index} className="cl-md-session-list">
      <span className="cl-md-session-info">{t('ISPSessionTemplates.RESCHEDULE_AWAITED_BY_ATHLETE_ON', {dateString: dateTimeString})} {reason ? t('ISPSessionTemplates.FOR_REASON', {reason}) : null}</span>
      <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, startTime, endTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
    </div>
  );
}

function rescheduleAwaitedBySSP({data, t, isActiveEvent, index}, eventActionCallback) {
  const {timestamp, startTime, endTime, reason, location} = data;

  const timeStampMoment = moment(timestamp, appConstants.schedules.ISO_DATE_FORMAT);
  const dateTimeString = timeStampMoment.format(t('ISPSessionTemplates.COMPLETED.completedTimeFormat'));

  if (isActiveEvent === true) {
    return (
      <div key={index} className="cl-md-session-list cl-md-session-active">
        <div className="uk-grid">
          <div className="uk-width-large-6-10">
            <span className="cl-md-session-info">{t('ISPSessionTemplates.RESCHEDULE_AWAITED_BY_SSP', {dateString: dateTimeString, reason})}</span>
            <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, startTime, endTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
          </div>
          <div className="uk-width-large-4-10 uk-text-center">
            {/* <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.ACCEPT} onClick={eventActionCallback}>{t('ISPSessionTemplates.accept')}</button>
            <button className="uk-button btn-turquoise-t4 mt20" data-action={sessionEventActions.REJECT} onClick={eventActionCallback}>{t('ISPSessionTemplates.reject')}</button> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={index} className="cl-md-session-list">
      <span className="cl-md-session-info">{t('ISPSessionTemplates.RESCHEDULE_AWAITED_BY_SSP', {dateString: dateTimeString, reason})}</span>
      <span className="sl-md-session-date">{getFormattedTrainingDateTime(t, startTime, endTime)} {location && location.address ? t('ISPSessionTemplates.AT_LOCATION', {locations: location.address}) : null}</span>
    </div>
  );
}

export default function ispSessionTemplates({data, t, isActiveEvent, booking, index}, eventActionCallback) {
  const {sessionEvents} = appConstants;
  switch (data.type) {
    case sessionEvents.reserved: {
      return reserved({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.scheduleAwaitedByAthlete: {
      return scheduleAwaitedByAthlete({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.scheduled: {
      return scheduled({data, t, isActiveEvent, booking, index}, eventActionCallback);
    }
    case sessionEvents.completed: {
      return completed({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.rescheduledBySsp: {
      return rescheduleBySSP({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.rescheduledByAthlete: {
      return rescheduledByAthlete({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.rescheduledAcceptedByAthlete: {
      return acceptRecheduleRequest({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.rescheduledRejectedBySSP: {
      return rescheduleRejectedBySSP({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.rescheduledRejectedByAthlete: {
      return rescheduleRejectedByAthlete({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.cancelledByAthlete: {
      return cancelledByAthlete({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.cancelledBySSP: {
      return cancelledBySSP({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.rescheduleAwaitedByAthlete: {
      return rescheduleAwaitedByAthlete({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.rescheduleAwaitedBySSP: {
      return rescheduleAwaitedBySSP({data, t, isActiveEvent, index}, eventActionCallback);
    }
    case sessionEvents.paymentAccrued: {
      return paymentAccrued({data, t, isActiveEvent, index}, eventActionCallback);
    }
    default: {
      return null;
    }
  }
}
