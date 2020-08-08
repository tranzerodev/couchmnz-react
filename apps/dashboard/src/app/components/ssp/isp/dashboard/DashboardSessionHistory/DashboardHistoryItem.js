import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import AthleteProfileDetailsCard from '../AthleteProfileDetailsCard';
import appConstants from '../../../../../constants/appConstants';
import SessionTimeLines from '../SessionTimeLines/SessionTimeLines';
import {Link, withRouter} from 'react-router-dom';
import {DASHBOARD_ACCOUNT_EARNING_DETAILS} from '../../../../../constants/pathConstants';

class DashboardHistoryItem extends Component {
  constructor(props) {
    super(props);
    this.getOrderDetailLink = this.getOrderDetailLink.bind(this);
    this.handleOnCancelFutureSession = this.handleOnCancelFutureSession.bind(this);
    this.handleOnReportAthlete = this.handleOnReportAthlete.bind(this);
    this.renderOptionMenus = this.renderOptionMenus.bind(this);
  }

  getOrderDetailLink() {
    const {sessionHistory} = this.props;
    const orderDetailLink = {
      pathname: DASHBOARD_ACCOUNT_EARNING_DETAILS,
      state: {orderId: sessionHistory.order.id}
    };
    return orderDetailLink;
  }

  handleOnCancelFutureSession() {
    const {sessionHistory} = this.props;
    this.props.onCancelFutureSession(sessionHistory);
  }

  handleOnReportAthlete() {
    const {sessionHistory} = this.props;
    this.props.onReportAthlete(sessionHistory);
  }

  renderOptionMenus() {
    const {p, sessionHistory} = this.props;
    const {canCancelFutureSessions, canReportAthlete} = sessionHistory;
    const {apiBooleanFlags} = appConstants;
    return (
      <div className="cl-mb-session-action-right">
        <div className="cl-md-action-btn" data-uk-dropdown="{mode:'click', pos:'bottom-right'}">
          <a >
            <i className="fa fa-circle" aria-hidden="true"/>&nbsp;
            <i className="fa fa-circle" aria-hidden="true"/>&nbsp;
            <i className="fa fa-circle" aria-hidden="true"/>&nbsp;
          </a>
          <div className="uk-dropdown cl-ssp-manage-booking-dropdown">
            <ul>
              <li><Link to={this.getOrderDetailLink()} >{p.t('SessionHistory.viewOrderDetail')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></Link></li>
              {(canReportAthlete === apiBooleanFlags.TRUE) ? <li><a onClick={this.handleOnReportAthlete}>{p.t('SessionHistory.reportAthlete')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a></li> : ''}
              {(canCancelFutureSessions === apiBooleanFlags.TRUE) ? <li><a onClick={this.handleOnCancelFutureSession}>{p.t('SessionHistory.cancelFutureSession')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a></li> : ''}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {p, sessionHistory} = this.props;
    const bookedOnTime = (moment(sessionHistory.order.date)).format(appConstants.manageBookings.bookedOn);
    let sessionScheduledTime = '';
    const sessionScheduledStartTime = (moment(sessionHistory.startTime)).format(appConstants.manageBookings.startTime);
    const sessionScheduledEndTime = (moment(sessionHistory.endTime)).format(appConstants.manageBookings.endTime);
    const sessionScheduledYear = (moment(sessionHistory.endTime)).format(appConstants.manageBookings.year);
    sessionScheduledTime = sessionScheduledStartTime + ' to ' + sessionScheduledEndTime + ' , ' + sessionScheduledYear;

    return (
      <div key={sessionHistory.id} className="cl-manage-booking-listing">
        <div className="cl-manage-booking-listing-top">
          <div style={{background: sessionHistory.color, width: 10, display: 'table-cell'}}/>
          <div className="cl-md-width-30">
            <div className="cl-mb-athlete-pic">
              <img src={sessionHistory.athlete.profileImage} alt={sessionHistory.athlete.name} title={sessionHistory.athlete.name} width="100%"/>
            </div>
            <div className="cl-mb-session-details">
              <span className="cl-mb-booked-date">{p.t('ManageBooking.bookedOn')} {bookedOnTime} {p.t('ManageBooking.by')}</span>
              <div className="cl-mb-athlete-name" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
                <a >{sessionHistory.athlete.name}</a>
                <AthleteProfileDetailsCard altheteProfile={sessionHistory.athlete}/>
              </div>
              <span className="cl-mb-athlete-details">{p.t('ManageBooking.genders.' + sessionHistory.athlete.gender)}, {sessionHistory.athlete.ageGroup.description}</span>
            </div>
          </div>
          <div className="cl-md-width-40">
            <span className="cl-mb-session-status">{p.t('ManageBooking.upcomming')} {sessionHistory.sessionName} {sessionHistory.sport.name}</span>
            <span className="cl-mb-session-date">{sessionHistory.startTime ? sessionScheduledTime : ''}</span>
            <span className="cl-mb-session-venu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7265 -1121 16 20.633" className="location-marker">
                <path id="Path_67" data-name="Path 67" className="cls-1" d="M4967.559,1353.175c-.309-.32-7.559-7.9-7.559-12.174a8,8,0,1,1,16,0c0,4.278-7.253,11.854-7.561,12.174l-.441.457ZM4961.223,1341c0,2.937,4.54,8.444,6.775,10.859,2.237-2.415,6.777-7.925,6.777-10.859a6.776,6.776,0,1,0-13.553,0Zm2.726-.177a4.051,4.051,0,1,1,4.051,4.051A4.055,4.055,0,0,1,4963.948,1340.824Zm1.223,0A2.828,2.828,0,1,0,4968,1338,2.832,2.832,0,0,0,4965.171,1340.824Z" transform="translate(-12225 -2454)"/>
              </svg>
              {sessionHistory.location.address}
            </span>
            <div className="cl-md-action-panel">
              <a data-uk-toggle={'{target:"#' + sessionHistory.id + 'cl-manage-booking-session-missed"}'}>{p.t('SessionHistory.viewBookingStatus')}
                <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                  <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="cl-mb-session-action">
            <div className="cl-mb-session-action-left">
              <div className="cl-mb-session-price-tag">
                <div className="cl-mb-session-purchas-status">{p.t('ManageBooking.numPurchased', {qty: sessionHistory.noOfPurchase})} </div>
                <div className="cl-mb-session-purchas-price">{ p.t('ManageBooking.priceWithUnit', {unit: sessionHistory.priceUnit, price: sessionHistory.totalPrice})}</div>
              </div>
            </div>
            {
              this.renderOptionMenus()
            }
          </div>
        </div>
        <div id={sessionHistory.id + 'cl-manage-booking-session-missed'} className="uk-hidden cl-manage-booking-listing-bottom cl-md-border-top">
          {/* <div className="cl-md-missing-alert">
            <div className="uk-container-center cl-alert-div cl-md-custom-8-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1505.008 -1530 14.016 13">
                <path id="Path_257" data-name="Path 257" className="cls-1" d="M8-1.258V-2.742a.249.249,0,0,0-.074-.184A.24.24,0,0,0,7.75-3H6.25a.24.24,0,0,0-.176.074A.249.249,0,0,0,6-2.742v1.484a.249.249,0,0,0,.074.184A.24.24,0,0,0,6.25-1h1.5a.24.24,0,0,0,.176-.074A.249.249,0,0,0,8-1.258ZM7.984-4.18l.141-3.586a.172.172,0,0,0-.078-.148A.3.3,0,0,0,7.859-8H6.141a.3.3,0,0,0-.188.086.187.187,0,0,0-.078.164l.133,3.57a.15.15,0,0,0,.078.129A.336.336,0,0,0,6.273-4H7.719A.318.318,0,0,0,7.9-4.051.174.174,0,0,0,7.984-4.18Zm-.109-7.3,6,11a.932.932,0,0,1-.016.984A.982.982,0,0,1,13.5.867.977.977,0,0,1,13,1H1A.977.977,0,0,1,.5.867.982.982,0,0,1,.141.508.932.932,0,0,1,.125-.477l6-11a1,1,0,0,1,.367-.383A.969.969,0,0,1,7-12a.969.969,0,0,1,.508.141A1,1,0,0,1,7.875-11.477Z" transform="translate(-1505 -1518)"/>
              </svg>
              <p>{p.t('SessionHistory.rescheduleDeclineWarningMessage')}</p>
            </div>
          </div> */}
          <SessionTimeLines events={sessionHistory.events} sessionName={sessionHistory.sessionName} booking={sessionHistory} onAction={this.props.onBookingAction}/>
        </div>
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      sessionHistory: PropTypes.object.isRequired,
      onBookingAction: PropTypes.func.isRequired,
      onCancelFutureSession: PropTypes.func.isRequired,
      onReportAthlete: PropTypes.func.isRequired
    };
  }
}

DashboardHistoryItem.defaultProps = {

};

export default withRouter(translate(DashboardHistoryItem));
