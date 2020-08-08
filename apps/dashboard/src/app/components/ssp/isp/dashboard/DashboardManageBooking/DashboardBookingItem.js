import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import pathToRegexp from 'path-to-regexp';
import AthleteProfileDetailsCard from '../AthleteProfileDetailsCard';
import SessionTimeLines from '../SessionTimeLines';

import {Link, withRouter} from 'react-router-dom';
import {DASHBOARD_SESSION_DETAILS, PATH_VARIABLE_PACKAGE_ID, PATH_VARIABLE_ATHLETE_ID, DASHBOARD_ACCOUNT_EARNING_DETAILS} from '../../../../../constants/pathConstants';
import appConstants from '../../../../../constants/appConstants';

class DashboardBookingItem extends Component {
  constructor(props) {
    super(props);
    this.getOrderDetailLink = this.getOrderDetailLink.bind(this);
    this.handleOnCancelFutureSession = this.handleOnCancelFutureSession.bind(this);
    this.handleOnReportAthlete = this.handleOnReportAthlete.bind(this);
    this.renderOptionMenus = this.renderOptionMenus.bind(this);
    this.renderTakeAction = this.renderTakeAction.bind(this);
  }
  getOrderDetailLink() {
    const {manageBooking} = this.props;
    const orderDetailLink = {
      pathname: DASHBOARD_ACCOUNT_EARNING_DETAILS,
      state: {orderId: manageBooking.order.id}
    };
    return orderDetailLink;
  }

  handleOnCancelFutureSession() {
    const {manageBooking} = this.props;
    this.props.onCancelFutureSession(manageBooking);
  }

  handleOnReportAthlete() {
    const {manageBooking} = this.props;
    this.props.onReportAthlete(manageBooking);
  }

  renderOptionMenus() {
    const {manageBooking, p} = this.props;
    const {canCancelFutureSessions, canReportAthlete} = manageBooking;
    const {apiBooleanFlags} = appConstants;
    return (
      <div className="cl-mb-session-action-right">
        <div className="cl-md-action-btn" data-uk-dropdown="{mode:'click', pos:'bottom-right'}">
          <a >
            <i className="fa fa-circle" aria-hidden="true"/>&nbsp;
            <i className="fa fa-circle" aria-hidden="true"/>&nbsp;
            <i className="fa fa-circle" aria-hidden="true"/>
          </a>
          <div className="uk-dropdown cl-ssp-manage-booking-dropdown">
            <ul>
              <li><Link to={this.getOrderDetailLink()} >{p.t('ManageBooking.viewOrderDetail')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></Link></li>
              {(canReportAthlete === apiBooleanFlags.TRUE) ? <li><a onClick={this.handleOnReportAthlete}>{p.t('ManageBooking.reportAthlete')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a></li> : ''}
              {(canCancelFutureSessions === apiBooleanFlags.TRUE) ? <li><a onClick={this.handleOnCancelFutureSession}>{p.t('ManageBooking.cancelFutureSession')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a></li> : ''}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderTakeAction() {
    const {p, manageBooking} = this.props;
    const {canTakeAction} = manageBooking;
    if (canTakeAction === appConstants.apiBooleanFlags.TRUE) {
      return (
        <button className="uk-button take-action-btn" data-uk-toggle={'{target:"#cl-manage-booking-session-missed' + manageBooking.id + '"}'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1253 -1581 9.12 8">

            <g id="if_weather_48_2682803" transform="translate(-1893 1896)">
              <path id="Path_255" data-name="Path 255" className="cls-1" d="M10.788,10.642,6.608,17.881a.382.382,0,0,0,.33.572H15.3a.382.382,0,0,0,.33-.572l-4.179-7.239a.382.382,0,0,0-.66,0Z" transform="translate(633.443 -3487.453)"/>
              <path id="Path_256" data-name="Path 256" className="cls-2" d="M29,29.863a.538.538,0,1,1,.538.538A.516.516,0,0,1,29,29.863Zm.2-.835-.136-2.688H30l-.131,2.688Z" transform="translate(615.024 -3500.493)"/>
            </g>
          </svg>
          {p.t('ManageBooking.takeAction')}
        </button>
      );
    }
    return null;
  }

  renderSpotDetails() {
    const {p, manageBooking} = this.props;
    const {totalPosition, noOfBookings} = manageBooking;
    if (totalPosition > 0) {
      return (totalPosition === noOfBookings) ? <span className="cl-md-dark-red-text">{p.t('ManageBooking.allSpotsFull', {totalSlots: totalPosition})}</span> : p.t('ManageBooking.spotsRemaining', {totalSlots: totalPosition, openSlot: totalPosition - noOfBookings});
    }
  }

  render() {
    const {p, manageBooking} = this.props;
    const bookedOnTime = (moment(manageBooking.order.date)).format(appConstants.manageBookings.bookedOn);
    let sessionScheduledTime = '';
    const sessionScheduledStartTime = (moment(manageBooking.startTime)).format(appConstants.manageBookings.startTime);
    const sessionScheduledEndTime = (moment(manageBooking.endTime)).format(appConstants.manageBookings.endTime);
    const sessionScheduledYear = (moment(manageBooking.endTime)).format(appConstants.manageBookings.year);
    sessionScheduledTime = sessionScheduledStartTime + ' to ' + sessionScheduledEndTime + ' , ' + sessionScheduledYear;

    const viewAllSession = pathToRegexp.compile(DASHBOARD_SESSION_DETAILS)({[PATH_VARIABLE_PACKAGE_ID]: manageBooking.packageId, [PATH_VARIABLE_ATHLETE_ID]: manageBooking.athlete.id});
    return (
      <div key={manageBooking.id} className="cl-manage-booking-listing">
        <div className="cl-manage-booking-listing-top">
          <div style={{background: manageBooking.color, width: 10, display: 'table-cell'}}/>
          <div className="cl-md-width-30">
            <div className="cl-mb-athlete-pic">
              <img src={manageBooking.athlete.profileImage} alt={manageBooking.athlete.name} title={manageBooking.athlete.name} width="100%"/>
            </div>
            <div className="cl-mb-session-details">
              <span className="cl-mb-booked-date">
                {manageBooking.startTime ? p.t('ManageBooking.bookedOn') : p.t('ManageBooking.purchasedOn')} 
                {' '} {bookedOnTime} {p.t('ManageBooking.by')}
              </span>
              <div className="cl-mb-athlete-name" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
                <a >{manageBooking.athlete.name}</a>
                <AthleteProfileDetailsCard altheteProfile={manageBooking.athlete}/>
              </div>
              <span className="cl-mb-athlete-details">{p.t('ManageBooking.genders.' + manageBooking.athlete.gender)}, {manageBooking.athlete.ageGroup.description}</span>
            </div>
          </div>
          <div className="cl-md-width-40">
            <span className="cl-mb-session-status">{p.t('ManageBooking.upcomming')} {manageBooking.sessionName} {manageBooking.sport.name}</span>
            <span className="cl-mb-session-date">{ manageBooking.startTime ? sessionScheduledTime : ''}</span>
            <span className="cl-mb-session-venu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7265 -1121 16 20.633" className="location-marker">
                <path id="Path_67" data-name="Path 67" className="cls-1" d="M4967.559,1353.175c-.309-.32-7.559-7.9-7.559-12.174a8,8,0,1,1,16,0c0,4.278-7.253,11.854-7.561,12.174l-.441.457ZM4961.223,1341c0,2.937,4.54,8.444,6.775,10.859,2.237-2.415,6.777-7.925,6.777-10.859a6.776,6.776,0,1,0-13.553,0Zm2.726-.177a4.051,4.051,0,1,1,4.051,4.051A4.055,4.055,0,0,1,4963.948,1340.824Zm1.223,0A2.828,2.828,0,1,0,4968,1338,2.832,2.832,0,0,0,4965.171,1340.824Z" transform="translate(-12225 -2454)"/>
              </svg>
              {manageBooking.location.address}, {this.renderSpotDetails()}
            </span>
            <div className="cl-md-action-panel">
              {/* this.renderTakeAction()
               <a data-uk-toggle={'{target:"#cl-manage-booking-session-missed' + manageBooking.id + '"}'}>{p.t('ManageBooking.viewSessionDetails')}
                <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                  <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                </svg>
              </a> */}
            </div>
          </div>
          <div className="cl-mb-session-action">
            <div className="cl-mb-session-action-left">
              <div className="cl-mb-session-price-tag">
                <div className="cl-mb-session-purchas-status"> {p.t('ManageBooking.numPurchased', {qty: manageBooking.noOfPurchase})}</div>
                <div className="cl-mb-session-purchas-price">{ p.t('ManageBooking.priceWithUnit', {unit: manageBooking.priceUnit, price: manageBooking.totalPrice})}</div>
              </div>
              {manageBooking.noOfPurchase > 1 ? <Link id="cl-view-all" className="cl-mb-view-all" to={viewAllSession}>{p.t('ManageBooking.viewAll')}</Link> : ''}
            </div>
            {
              this.renderOptionMenus()
            }
          </div>
        </div>
        <div id={'cl-manage-booking-session-missed' + manageBooking.id} className="cl-manage-booking-listing-bottom cl-md-border-top">
          <SessionTimeLines events={manageBooking.events} sessionName={manageBooking.sessionName} booking={manageBooking} onAction={this.props.onBookingAction}/>
        </div>

      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      manageBooking: PropTypes.object.isRequired,
      onBookingAction: PropTypes.func.isRequired,
      onCancelFutureSession: PropTypes.func.isRequired,
      onReportAthlete: PropTypes.func.isRequired
    };
  }
}

export default withRouter(translate(DashboardBookingItem));
