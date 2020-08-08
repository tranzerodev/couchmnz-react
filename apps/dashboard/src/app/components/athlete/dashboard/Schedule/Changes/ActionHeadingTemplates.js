import React from 'react';
import moment from 'moment';

import appConstants from '../../../../../constants/appConstants';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';
import config from '../../../../../config';
const {reasonNames, sessionEvents} = appConstants;

export function profileMismatch(data, t) {
  const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: data.nickName, sportID: data.sportId});
  return (
    <div className="scheduler-sessionChangeActionsContent">
      <strong> {t('ActionsHeadingTemplate.action')}: {t('ActionsHeadingTemplate.declined_by')} <a href={coachUrl} target="_blank">{data.name}</a> ({t('ActionsHeadingTemplate.profile_mismatch')})</strong> ( {t('ActionsHeadingTemplate.not_charged')})
    </div>
  );
}

export function scheduleConflict(data, t) {
  const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: data.nickName, sportID: data.sportId});
  return (
    <div className="scheduler-sessionChangeActionsContent">
      <strong> {t('ActionsHeadingTemplate.action')}: {t('ActionsHeadingTemplate.declined_by')} <a href={coachUrl} target="_blank">{data.name}</a> ({t('ActionsHeadingTemplate.schedule_conflict')})</strong>
    </div>
  );
}

export function rescheduledByAthleteWaitingForReply(data, t) {
  return (
    <div className="scheduler-sessionChangeActionsContent">
      <strong>{t('ActionsHeadingTemplate.action')}: {t('ActionsHeadingTemplate.new_time_proposed_by')}<a> {t('ActionsHeadingTemplate.you')}</a>:</strong>
    </div>
  );
}

export function refundRequestWaitingForReply(data, t) {
  return (
    <div className="scheduler-sessionChangeActionsContent">
      <strong>{t('ActionsHeadingTemplate.action')}: {t('ActionsHeadingTemplate.requested_refund')}</strong>
    </div>
  );
}

export function rescheduledBySSPWaitingForReply(data, t) {
  const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: data.nickName, sportID: data.sportId});
  return (
    <div className="scheduler-sessionChangeActionsContent">
      <strong> {t('ActionsHeadingTemplate.action')}: {t('ActionsHeadingTemplate.new_time_proposed_by')} <a href={coachUrl} target="_blank" rel="noopener noreferrer">{data.name}</a></strong>
    </div>
  );
}

export function scheduledByAthleteWaitingForReply(data, t) {
  return (
    <div className="scheduler-sessionChangeActionsContent">
      <strong>{t('ActionsHeadingTemplate.action')}: {t('ActionsHeadingTemplate.scheduled_by')}<a> {t('ActionsHeadingTemplate.you')}</a>:</strong>
    </div>
  );
}

export function purchasedWaitingForReply(data, t) {
  return (
    <div className="scheduler-sessionChangeActionsContent">
      <strong>{t('ActionsHeadingTemplate.action')}: {t('ActionsHeadingTemplate.purchased')}</strong>
    </div>
  );
}

export function renderActionsHeadingTemplate(data, t) {
  if (data.reasonName === reasonNames.profileMismatch) {
    return profileMismatch(data, t);
  } else if (data.reasonName === reasonNames.scheduleConflict) {
    return scheduleConflict(data, t);
  } else if (data.type === sessionEvents.rescheduleAwaitedByAthlete) {
    return rescheduledByAthleteWaitingForReply(data, t);
  } else if (data.reasonName === reasonNames.refundRequestWaitingForReply) {
    return refundRequestWaitingForReply(data, t);
  } else if (data.type === sessionEvents.rescheduleAwaitedBySsp) {
    return rescheduledBySSPWaitingForReply(data, t);
  } else if (data.type === sessionEvents.scheduleAwaitedByAthlete) {
    return scheduledByAthleteWaitingForReply(data, t);
  } else if (data.type === sessionEvents.reserved) {
    return purchasedWaitingForReply(data, t);
  }
}
