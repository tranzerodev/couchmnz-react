import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import pathToRegExp from 'path-to-regexp';

import config from '../../../../../config';
import appConstants from '../../../../../constants/appConstants';
import {
  DASHBOARD_ATHLETE_ACCOUNT_ORDER_DETAILS,
  DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS,
  DASHBOARD,
  DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED_ORDER_ITEM_ID
} from '../../../../../constants/pathConstants';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';
import {renderTimelineTemplate} from '../TimelineTemplates';

class PackageItem extends Component {
  constructor(props) {
    super(props);
    this.renderStatus = this.renderStatus.bind(this);
    this.renderScheduleButton = this.renderScheduleButton.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.renderWrteReviewButton = this.renderWrteReviewButton.bind(this);
    this.renderScheduledOn = this.renderScheduledOn.bind(this);
    this.renderRating = this.renderRating.bind(this);
    this.renderTrainingType = this.renderTrainingType.bind(this);
    this.renderViewDetails = this.renderViewDetails.bind(this);
    this.renderTimeline = this.renderTimeline.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
    this.handleReportInstructor = this.handleReportInstructor.bind(this);
    this.handleCancelFutureSessions = this.handleCancelFutureSessions.bind(this);
    this.handleViewAllOrder = this.handleViewAllOrder.bind(this);
    this.handleRequestReschedule = this.handleRequestReschedule.bind(this);
    this.handleSeeOnMapClick = this.handleSeeOnMapClick.bind(this);
    this.renderTrainingAddress = this.renderTrainingAddress.bind(this);
    this.getUrlWithProfileType = this.getUrlWithProfileType.bind(this);
  }

  getUrlWithProfileType(url) {
    const {selectedProfileType} = this.props;
    if (selectedProfileType) {
      const toPath = pathToRegExp.compile(url);
      return toPath({profileType: selectedProfileType});
    }
    return DASHBOARD;
  }
  handleSchedule() {
    const {session, selectedProfileType} = this.props;
    if (session && session.orderItemId) {
      const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_SCHEDULER_UNSCHEDULED_ORDER_ITEM_ID);
      const path = toPath({orderItemId: session.orderItemId, profileType: selectedProfileType});
      this.props.history.push(path);
    }
  }

  handleCancelFutureSessions() {
    this.props.onCancelationModalOpen(this.props.session);
  }

  handleViewAllOrder() {
    const {order} = this.props;
    const editPath = {
      pathname: this.getUrlWithProfileType(DASHBOARD_ATHLETE_ACCOUNT_ORDER_DETAILS),
      state: {orderId: order.id}
    };
    this.props.history.push(editPath);
  }

  handleRequestReschedule() {
    const {session, selectedProfileType} = this.props;
    const toPath = pathToRegExp.compile(DASHBOARD_ATHLETE_SCHEDULER_AVAILABLE_SLOTS);
    const path = toPath({orderItemId: session.orderItemId, profileType: selectedProfileType, scheduleId: session.scheduleId});
    this.props.history.push(path);
  }

  renderStatus() {
    const {session} = this.props;
    if (session.canSchedule === appConstants.canSchedule.yes) {
      return this.renderScheduleButton();
    } else if (session.canWriteReview) {
      return this.renderWrteReviewButton();
    } else if (session.scheduledOn) {
      return this.renderScheduledOn(session.scheduledOn);
    } else if (session.rating) {
      return this.renderRating(session.rating);
    }
  }

  renderScheduleButton() {
    return (
      <div className="scheduler-sessionCta">
        <a onClick={this.handleSchedule} className="uk-button theme-orange-btn">{this.props.p.t('PackageItem.schedule')}</a>
      </div>
    );
  }

  renderWrteReviewButton() {
    return (
      <div className="scheduler-sessionCta"/>
    );
  }

  renderScheduledOn(date) {
    const scheduledOn = moment(date);
    return (
      <div className="scheduler-sessionTimestamp">
        {scheduledOn.format('DD[th] MMM[,] hh:mm A')}
      </div>
    );
  }

  renderRating(rating) {
    return (
      <div className="scheduler-sessionRatings">
        <span>
          {this.props.p.t('PackageItem.your_rating')}:
        </span>
        <span>
          {rating}
          <svg className="cl-icon-star-hover" xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
            <path data-name="Path 40" className="cl-icon-star-hover-1" d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z" transform="translate(-6835.539 -1121)"/>
          </svg>
        </span>
      </div>
    );
  }

  renderTrainingType() {
    const {session} = this.props;
    return (
      <i className={'cl-icon' + appConstants.trainingServicesIconMap[session.trainingType.name]}/>
    );
  }

  handleReportInstructor() {
    const {ssp} = this.props;
    this.props.onReportInstructor({ssp});
  }

  handleSeeOnMapClick() {
    const {trainingLocation} = this.props;
    this.props.onSeeOnMap(trainingLocation);
  }

  renderViewDetails() {
    const {session, p} = this.props;
    if (session.events && (session.events.length > 0)) {
      return (
        <a data-uk-toggle={'{target:\'.' + session.scheduleId + '\'}'}>
          <strong>{p.t('PackageItem.view_session_details')} </strong>
          <i className={'uk-icon-angle-down ' + session.scheduleId}/>
          <i className={'uk-icon-angle-up uk-hidden ' + session.scheduleId}/>
        </a>
      );
    }
    return null;
  }

  renderTimeline() {
    const {session, p} = this.props;
    if (session.events && (session.events.length > 0)) {
      return (
        <div className={'scheduler-listViewItemDetails ' + session.scheduleId + ' uk-hidden'}>
          <div className="scheduler-listViewItemDetailsContent">
            { session.events.map(item => {
              return renderTimelineTemplate(item, p.t);
            })
            }
          </div>
        </div>
      );
    }
    return null;
  }

  renderDropDown() {
    const {offerTerminology, p, session} = this.props;
    const {canReSchedule, canCancelFutureSessions, canReportInstructor} = session;
    const {yes} = appConstants.canRender;
    const canCancel = canCancelFutureSessions === yes;
    const canReport = canReportInstructor === yes;
    if (canReSchedule === appConstants.apiBooleanFlags.TRUE || canCancel || canReport) {
      return (
        <div className="scheduler-listViewItemOptions" data-uk-dropdown="{mode:'click', pos:'bottom-right'}">
          <a href="#" className=""><i className="cl-icon cl-icon--small cl-icon-msg-more"/></a>
          <div className="uk-dropdown cl-arrow-dropdown cl-arrow-dropdown--absright">
            <ul>
              {
                (canReSchedule === appConstants.apiBooleanFlags.TRUE) ?
                  <li>
                    <a onClick={this.handleRequestReschedule}>
                      {p.t('PackageItem.request_to_reschedule')}
                    </a>
                  </li> : ''
              }
              {canCancel &&
              <li>
                <a onClick={this.handleCancelFutureSessions}>
                  {p.t('PackageItem.cancel_future_sessions', {offerTerminology})}
                </a>
              </li>
              }
              {canReport &&
                <li><a onClick={this.handleReportInstructor}>{p.t('PackageItem.report_instructor')}</a></li>
              }
              <li><a onClick={this.handleViewAllOrder}>{p.t('PackageItem.view_order_details')} </a></li>
            </ul>
          </div>
        </div>
      );
    }
    return null;
  }

  renderTrainingAddress() {
    const {trainingLocation, p} = this.props;
    if (trainingLocation) {
      return (
        <p>
          <span>{trainingLocation.address} <a onClick={this.handleSeeOnMapClick}><strong>{p.t('PackageItem.see_on_map')}</strong></a></span>
        </p>
      );
    }
    return null;
  }

  render() {
    const {session, ssp, sport, skillLevel, ageGroup, p} = this.props;
    const {t} = p;
    const coachUrl = parseUrlTemplate(config.sspDeatilsPage, {nickname: ssp.nickName, sportID: sport.id});
    return (
      <div className="scheduler-listViewItem scheduler-listViewItem--large">
        <div className="uk-grid uk-grid-collapse uk-grid-match" data-uk-grid-match="{target:'.scheduler-listViewItemColumns'}">
          <div className="uk-width-medium-1-1 scheduler-listViewItemColumns">
            <div className="scheduler-listViewItemSessionInfo">
              <div className="scheduler-sessionName">
                { session.startTime ? moment(session.startTime).format('D MMM YYYY') : ''}
              </div>
              {session.startTime ?
                <div className="scheduler-sessionName">
                  { session.startTime ? moment(session.startTime).format('hh:mm A') : ''} - {session.endTime ? moment(session.endTime).format('hh:mm A') : ''}
                </div> :
                '' }
              <div className="scheduler-sessionStatus">
                {session.status}
              </div>
              {this.renderStatus()}
            </div>
            <div className="scheduler-listViewItemContent">
              <div className="scheduler-listViewItemProfilePic">
                <a href={coachUrl} target="_blank"><span className="cl-icon-profile"><img src={ssp.profileImage} alt={ssp.name}/></span></a>
              </div>
              <div className="scheduler-listViewItemDetail">
                <p>
                  <i className="cl-icon cl-icon-usergroup"/>
                  <span>
                    <strong>
                      {t('PackageItem.sessionDesc',
                        {
                          sessionLabel: session.sessionLabel,
                          sportName: sport.name
                        })}
                      <a href={coachUrl} target="_blank"> {ssp.name}</a>
                    </strong>
                  </span>
                </p>
                {
                  this.renderTrainingAddress()
                }
                <p>
                  {this.renderViewDetails()}
                </p>
              </div>
            </div>
          </div>
          {this.renderDropDown()}
        </div>
        {this.renderTimeline()}
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      session: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      ssp: PropTypes.object.isRequired,
      sport: PropTypes.object.isRequired,
      skillLevel: PropTypes.object.isRequired,
      ageGroup: PropTypes.object.isRequired,
      onReportInstructor: PropTypes.func.isRequired,
      onCancelationModalOpen: PropTypes.func.isRequired,
      offerTerminology: PropTypes.string.isRequired,
      order: PropTypes.object.isRequired,
      onSeeOnMap: PropTypes.func.isRequired,
      selectedProfileType: PropTypes.string.isRequired,
      trainingLocation: PropTypes.object.isRequired
    };
  }
}

export default withRouter(translate(PackageItem));
