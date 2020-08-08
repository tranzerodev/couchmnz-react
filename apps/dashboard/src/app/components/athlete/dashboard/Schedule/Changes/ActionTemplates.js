import React from 'react';
import moment from 'moment';
import appConstants from '../../../../../constants/appConstants';
const {reasonNames, actionTypes, sessionEvents} = appConstants;

export function profileMismatch(data, t, action, bookingId) {
  return (
    <div className={bookingId}>
      <div className="scheduler-sessionChangeInstruction">
        {t('ActionTemplate.profile_mismatch.description')}
      </div>
      <div className="scheduler-sessionChangeCta">
        <a onClick={action} data-type={actionTypes.seeRecomandations} className="uk-button theme-orange-btn">
          <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Button/Propose-New-Time" transform="translate(-7.000000, -6.000000)">
                <g id="RescheduleSession-white" transform="translate(7.000000, 6.000000)">
                  <g>
                    <path d="M16.3861993,3.85624155 L15.6912427,4.84550936 C14.301454,2.61184673 11.8243628,1.125 9,1.125 C4.6507576,1.125 1.125,4.6507576 1.125,9 C1.125,13.3492424 4.6507576,16.875 9,16.875 C12.1925659,16.875 14.9414128,14.9752127 16.1777122,12.2444665 L17.2138049,12.684224 C15.8061006,15.8177995 12.6578904,18 9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C12.0579925,0 14.7597724,1.52512732 16.3861993,3.85624155 Z" id="Combined-Shape" fill="#FFFFFF"/>
                    <polyline id="Path-14" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(10.687500, 7.312500) scale(-1, 1) translate(-10.687500, -7.312500) " points="12.375 3.375 12.375 8.79206071 9 11.25"/>
                    <polyline id="Path-16" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(15.144253, 3.810987) rotate(-205.000000) translate(-15.144253, -3.810987) " points="12.7817527 5.01546763 15.1266797 2.57348672 17.5067525 5.04848678"/>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          {t('ActionTemplate.profile_mismatch.see_recommendations')}
        </a>
      </div>
    </div>
  );
}

export function scheduleConflict(data, t, action, {offerTerminology, bookingId}) {
  return (
    <div className={'scheduler-sessionChangeCta ' + bookingId}>
      <a onClick={action} data-type={actionTypes.proposeNewTime} className="uk-button theme-orange-btn" data-uk-toggle="{target:'.scheduler-sessionItemType--toggle', cls:'scheduler-sessionItemType--active'}">
        <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Button/Propose-New-Time" transform="translate(-7.000000, -6.000000)">
              <g id="RescheduleSession-white" transform="translate(7.000000, 6.000000)">
                <g>
                  <path d="M16.3861993,3.85624155 L15.6912427,4.84550936 C14.301454,2.61184673 11.8243628,1.125 9,1.125 C4.6507576,1.125 1.125,4.6507576 1.125,9 C1.125,13.3492424 4.6507576,16.875 9,16.875 C12.1925659,16.875 14.9414128,14.9752127 16.1777122,12.2444665 L17.2138049,12.684224 C15.8061006,15.8177995 12.6578904,18 9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C12.0579925,0 14.7597724,1.52512732 16.3861993,3.85624155 Z" id="Combined-Shape" fill="#FFFFFF"/>
                  <polyline id="Path-14" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(10.687500, 7.312500) scale(-1, 1) translate(-10.687500, -7.312500) " points="12.375 3.375 12.375 8.79206071 9 11.25"/>
                  <polyline id="Path-16" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(15.144253, 3.810987) rotate(-205.000000) translate(-15.144253, -3.810987) " points="12.7817527 5.01546763 15.1266797 2.57348672 17.5067525 5.04848678"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('ActionTemplate.schedule_conflict.propose_new_time')}
      </a>
      <a onClick={action} data-type={actionTypes.cancelSession} className="uk-button theme-gray-btn">
        <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="NOCT-Exploration_1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="09-02-Changes-to-manage-Expand" transform="translate(-341.000000, -490.000000)" stroke="#FFFFFF">
              <g id="Declined-by-coach--propose-new-time" transform="translate(58.000000, 358.000000)">
                <g id="Group-Copy-3" transform="translate(267.000000, 126.000000)">
                  <g id="Group-39-Copy" transform="translate(16.000000, 6.000000)">
                    <g id="CancelSession-White">
                      <g>
                        <circle id="Oval-5" cx="9" cy="9" r="8.5"/>
                        <g id="Group-37" transform="translate(9.000000, 9.000000) rotate(45.000000) translate(-9.000000, -9.000000) translate(5.000000, 5.000000)" strokeLinecap="square">
                          <path d="M4,-3.15303339e-14 L4,8" id="Line"/>
                          <path d="M8,4 L2.87769808e-13,4" id="Line-Copy-14"/>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('ActionTemplate.schedule_conflict.cancel_session', {offerTerminology: offerTerminology.singular})}
      </a>
    </div>
  );
}

export function waitingForAthleteReply(data, t, action, {bookingId}) {
  return (
    <div className={'scheduler-sessionChangeCta ' + bookingId}>
      <a onClick={action} data-type={actionTypes.accept} className="uk-button theme-orange-btn" data-uk-toggle="{target:'.scheduler-sessionItemType--toggle', cls:'scheduler-sessionItemType--active'}">
        <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Button/Propose-New-Time" transform="translate(-7.000000, -6.000000)">
              <g id="RescheduleSession-white" transform="translate(7.000000, 6.000000)">
                <g>
                  <path d="M16.3861993,3.85624155 L15.6912427,4.84550936 C14.301454,2.61184673 11.8243628,1.125 9,1.125 C4.6507576,1.125 1.125,4.6507576 1.125,9 C1.125,13.3492424 4.6507576,16.875 9,16.875 C12.1925659,16.875 14.9414128,14.9752127 16.1777122,12.2444665 L17.2138049,12.684224 C15.8061006,15.8177995 12.6578904,18 9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C12.0579925,0 14.7597724,1.52512732 16.3861993,3.85624155 Z" id="Combined-Shape" fill="#FFFFFF"/>
                  <polyline id="Path-14" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(10.687500, 7.312500) scale(-1, 1) translate(-10.687500, -7.312500) " points="12.375 3.375 12.375 8.79206071 9 11.25"/>
                  <polyline id="Path-16" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(15.144253, 3.810987) rotate(-205.000000) translate(-15.144253, -3.810987) " points="12.7817527 5.01546763 15.1266797 2.57348672 17.5067525 5.04848678"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('ActionTemplate.reschedule_by_ssp.accept_session')}
      </a>
      <a onClick={action} data-type={actionTypes.reject} className="uk-button theme-gray-btn">
        <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="NOCT-Exploration_1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="09-02-Changes-to-manage-Expand" transform="translate(-341.000000, -490.000000)" stroke="#FFFFFF">
              <g id="Declined-by-coach--propose-new-time" transform="translate(58.000000, 358.000000)">
                <g id="Group-Copy-3" transform="translate(267.000000, 126.000000)">
                  <g id="Group-39-Copy" transform="translate(16.000000, 6.000000)">
                    <g id="CancelSession-White">
                      <g>
                        <circle id="Oval-5" cx="9" cy="9" r="8.5"/>
                        <g id="Group-37" transform="translate(9.000000, 9.000000) rotate(45.000000) translate(-9.000000, -9.000000) translate(5.000000, 5.000000)" strokeLinecap="square">
                          <path d="M4,-3.15303339e-14 L4,8" id="Line"/>
                          <path d="M8,4 L2.87769808e-13,4" id="Line-Copy-14"/>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('ActionTemplate.reschedule_by_ssp.cancel_session')}
      </a>
      <a onClick={action} data-type={actionTypes.proposeNewTime} className="uk-button theme-orange-btn" data-uk-toggle="{target:'.scheduler-sessionItemType--toggle', cls:'scheduler-sessionItemType--active'}">
        <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Button/Propose-New-Time" transform="translate(-7.000000, -6.000000)">
              <g id="RescheduleSession-white" transform="translate(7.000000, 6.000000)">
                <g>
                  <path d="M16.3861993,3.85624155 L15.6912427,4.84550936 C14.301454,2.61184673 11.8243628,1.125 9,1.125 C4.6507576,1.125 1.125,4.6507576 1.125,9 C1.125,13.3492424 4.6507576,16.875 9,16.875 C12.1925659,16.875 14.9414128,14.9752127 16.1777122,12.2444665 L17.2138049,12.684224 C15.8061006,15.8177995 12.6578904,18 9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C12.0579925,0 14.7597724,1.52512732 16.3861993,3.85624155 Z" id="Combined-Shape" fill="#FFFFFF"/>
                  <polyline id="Path-14" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(10.687500, 7.312500) scale(-1, 1) translate(-10.687500, -7.312500) " points="12.375 3.375 12.375 8.79206071 9 11.25"/>
                  <polyline id="Path-16" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" transform="translate(15.144253, 3.810987) rotate(-205.000000) translate(-15.144253, -3.810987) " points="12.7817527 5.01546763 15.1266797 2.57348672 17.5067525 5.04848678"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('ActionTemplate.schedule_conflict.propose_new_time')}
      </a>
    </div>
  );
}

export function waitingForInstructorReply(data, t, trainingLocation, bookingId) {
  const date = moment(data.timestamp);
  const {startTime, endTime} = data;
  return (
    <div className={bookingId}>
      <div className="scheduler-sessionBookingSchedule">
        <div className="sessionChangeColumn sessionChangeColumn--medium">
          {date.format('ddd[,] DD MMM')}
        </div>
        <div className="sessionChangeColumn sessionChangeColumn--medium">
          {startTime ? moment(startTime).format('hh:mm A') : ''} - { endTime ? moment(endTime).format('hh:mm A') : ''}
        </div>
        <div className="sessionChangeColumn sessionChangeColumn--large">
          {trainingLocation.address}
        </div>
        <div className="sessionChangeColumn sessionChangeColumn--tiny">
          {date.fromNow()}
        </div>
      </div>
      <div className="scheduler-sessionChangeInstruction">
        <strong>{t('ActionTemplate.wating_for_response.status')}: {t('ActionTemplate.wating_for_response.waiting_for_reply')}</strong>
      </div>
    </div>
  );
}

export function renderActionTemplate(data, t, action, {sessionId, offerTerminology, trainingLocation, bookingId}) {
  console.log('data.type === sessionEvents.rescheduleAwaitedByAthlete', data.type);
  if (data.reasonName === reasonNames.profileMismatch) {
    return profileMismatch(data, t, action, bookingId);
  } else if (data.reasonName === reasonNames.scheduleConflict) {
    return scheduleConflict(data, t, action, {sessionId, offerTerminology, bookingId});
  // } else if (data.reasonName === reasonNames.rescheduledByAthleteWaitingForReply || data.reasonName === reasonNames.refundRequestWaitingForReply) {
  } else if (data.type === sessionEvents.rescheduleAwaitedByAthlete) {
    return waitingForInstructorReply(data, t, trainingLocation, bookingId);
  } else if (data.type === sessionEvents.rescheduleAwaitedBySsp) {
    return waitingForAthleteReply(data, t, action, {sessionId, bookingId});
  } else if (data.type === sessionEvents.scheduleAwaitedByAthlete || data.type === sessionEvents.reserved) {
    return waitingForInstructorReply(data, t, trainingLocation, bookingId);
  }
}
