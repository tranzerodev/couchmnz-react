import React from 'react';
import moment from 'moment';

import appConstants from '../../../../constants/appConstants';
import {parseUrlTemplate} from '../../../../utils/urlHelper';
import config from '../../../../config';
const {sessionEvents} = appConstants;

export function commonTemplate(data, t) {
  const date = moment(data.timestamp);
  return (
    <p>
      <strong>{t('TimelineTemplating.eventTypes.' + data.type)} </strong>
      {date.format('DD[-]MMM[,] YYYY')} {t('TimelineTemplating.at')} {date.format('hh:mm A')}
    </p>
  );
}

export function reScheduledBySSP(data, t) {
  const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: data.nickName, sportID: data.sportId});
  const date = moment(data.timestamp);
  return (
    <p>
      <strong>{t('TimelineTemplating.eventTypes.' + data.type)} </strong>
      {t('TimelineTemplating.by')}
      <a href={coachUrl} target="_blank"> {data.name} </a>
      {date.format('DD[-]MMM[,] YYYY')} {t('TimelineTemplating.at')} {date.format('hh:mm A')}
    </p>
  );
}

export function rescheduledByAthlete(data, t) {
  const date = moment(data.timestamp);
  return (
    <p>
      <strong>{t('TimelineTemplating.eventTypes.' + data.type)} </strong>
      {t('TimelineTemplating.by')}
      <a> {t('TimelineTemplating.you')} </a>
      {date.format('DD[-]MMM[,] YYYY')} {t('TimelineTemplating.at')} {date.format('hh:mm A')}
    </p>
  );
}

export function reviewGiven(data, t) {
  return (
    <p>
      <strong>{t('TimelineTemplating.eventTypes.' + data.type)} </strong>
      {data.review.description}
    </p>
  );
}

export function renderTimelineTemplate(data, t) {
  if (data.type === sessionEvents.booked || data.type === sessionEvents.completed || data.type === sessionEvents.scheduled) {
    return commonTemplate(data, t);
  } else if (data.type === sessionEvents.rescheduledBySsp) {
    return reScheduledBySSP(data, t);
  } else if (data.type === sessionEvents.rescheduledByAthlete) {
    return rescheduledByAthlete(data, t);
  } else if (data.type === sessionEvents.reviewGiven) {
    return reviewGiven(data, t);
  } else if (data.type === sessionEvents.scheduleAwaitedByAthlete) {
    return rescheduledByAthlete(data, t);
  } else if (data.type === sessionEvents.rescheduleAwaitedByAthlete || data.type === sessionEvents.cancelledByAthlete) {
    return rescheduledByAthlete(data, t);
  } else if (data.type === sessionEvents.rescheduleAwaitedBySsp || data.type === sessionEvents.cancelledBySsp) {
    return reScheduledBySSP(data, t);
  }
  return commonTemplate(data, t);
}
