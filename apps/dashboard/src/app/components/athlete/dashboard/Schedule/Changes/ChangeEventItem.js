import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import {getChangeTypeSvg} from './SessionChangeTypeSvg';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';
import config from '../../../../../config';
import {renderActionsHeadingTemplate} from './ActionHeadingTemplates.js';
import {renderActionTemplate} from './ActionTemplates';
import appConstants from '../../../../../constants/appConstants';
import {getTrimmedQueryParam} from '../../../../../utils/sspSearchUtils.js';
const {actionTypes} = appConstants;

function getMapLatLongString(lat, lng) {
  if (lat && lng) {
    return (`${lat},${lng}`);
  }
  return null;
}

class AthleteChangeEventItem extends Component {
  constructor(props) {
    super(props);
    this.handleActions = this.handleActions.bind(this);
    this.handleSeeRecomandations = this.handleSeeRecomandations.bind(this);
    this.handleProposeNewTime = this.handleProposeNewTime.bind(this);
  }

  handleSeeRecomandations() {
    const {change} = this.props;
    const {location} = change.trainingLocation;
    const url = parseUrlTemplate(config.searchUrl, {sportName: getTrimmedQueryParam(change.sport.name),
      latlng: getMapLatLongString(location.lat, location.lon)});
    window.open(url, '_blank');
  }

  handleProposeNewTime() {
    const {change} = this.props;
    this.props.onProposeNewTime(change);
  }

  handleActions(e) {
    const actionType = e.currentTarget.getAttribute('data-type');
    if (actionType === actionTypes.seeRecomandations) {
      this.handleSeeRecomandations();
    } else if (actionType === actionTypes.proposeNewTime) {
      this.handleProposeNewTime();
    } else if (actionType === actionTypes.cancelSession) {
      this.props.onCancelSession(this.props.change);
    } else if (actionType === actionTypes.accept || actionType === actionTypes.reject) {
      this.props.onAction(actionType, this.props.change);
    }
  }

  render() {
    const {change, p} = this.props;
    const {ssp, order, sport, startTime, endTime, trainingLocation, lastEvent} = change;
    const {t} = p;
    const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: ssp.nickName, sportID: sport.id});
    return (
      <div className="scheduler-sessionChangesItem scheduler-sessionItemType--toggle">
        <div className="" data-uk-toggle={'{target:\'.' + change.bookingId + '\'}'}>
          <span className="scheduler-sessionChangesItemIndicator">
            <i className={'uk-icon uk-icon-angle-right ' + change.bookingId}/>
            <i className={'uk-icon uk-icon-angle-down uk-hidden ' + change.bookingId}/>
          </span>
          <div className="scheduler-sessionChangeType">
            {getChangeTypeSvg(lastEvent.reasonName)}
          </div>
          <div className="scheduler-sessionChangeDetails">
            <div className="scheduler-sessionBookingInfo">
              <div className="sessionChangeColumn sessionChangeColumn--medium">
                <strong>{t('AthleteChangeEventItem.original_booking')}</strong>
              </div>
              <div className="sessionChangeColumn sessionChangeColumn--xlarge">
                {ssp.title && <span><a href={coachUrl} target="_blank" rel="noopener noreferrer"><strong>{ssp.title}</strong></a></span>}
                <span><a href={coachUrl} target="_blank" rel="noopener noreferrer"><strong> {ssp.name}</strong></a></span>
              </div>
            </div>
            <div className="scheduler-sessionBookingSchedule">
              <div className="sessionChangeColumn sessionChangeColumn--medium">
                {moment(startTime).format('ddd[,] DD MMM')}
              </div>
              <div className="sessionChangeColumn sessionChangeColumn--medium">
                {startTime ? (moment(startTime).format('hh:mm A')) : ''} - {endTime ? (moment(endTime).format('hh:mm A')) : ''}
              </div>
              <div className="sessionChangeColumn sessionChangeColumn--large">
                {trainingLocation.address}
              </div>
              <div className="sessionChangeColumn sessionChangeColumn--tiny">
                {moment(order.bookingDate).fromNow()}
              </div>
            </div>
          </div>
        </div>
        <div className="scheduler-sessionChangeActions">
          {renderActionsHeadingTemplate(lastEvent, t)}
          <div className="scheduler-sessionChangeActionsTimestamp">
            {moment(lastEvent.timestamp).fromNow()}
          </div>
          {renderActionTemplate(lastEvent, t, this.handleActions, change)}
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      change: PropTypes.object.isRequired,
      onProposeNewTime: PropTypes.func.isRequired,
      onCancelSession: PropTypes.func.isRequired,
      onAction: PropTypes.func.isRequired
    };
  }
}

export default translate(AthleteChangeEventItem);
