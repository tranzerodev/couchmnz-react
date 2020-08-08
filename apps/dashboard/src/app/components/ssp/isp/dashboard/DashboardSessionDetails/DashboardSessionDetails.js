import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import AthleteProfileDetailsCard from '../AthleteProfileDetailsCard';
import SessionTimeLines from '../SessionTimeLines/SessionTimeLines';
import SessionBookingActions from '../SessionBookingActions/SessionBookingActions';
import appConstants from '../../../../../constants/appConstants';
import {DASHBOARD_ACCOUNT_EARNING_DETAILS} from '../../../../../constants/pathConstants';
import Modal from '../../../../common/Modal';
import SSPCancelFutureSessions from '../DashboardScheduleModals/SSPCancelFutureSessions/SSPCancelFutureSessions';
import ReportAthleteModal from '../DashboardScheduleModals/ReportAthleteModal/ReportAthleteModal';

const {sessionEventActions} = appConstants;

class DashboardSessionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: null,
      action: null,
      isOpenCancelFutureSessionModal: false,
      isOpenReportAthleteModal: false
    };
    this.handleOnbackClick = this.handleOnbackClick.bind(this);
    this.renderSessions = this.renderSessions.bind(this);
    this.handleManageBookingAction = this.handleManageBookingAction.bind(this);
    this.handleClearBookingAction = this.handleClearBookingAction.bind(this);
    this.renderUnscheduledSession = this.renderUnscheduledSession.bind(this);
    this.renderOptionMenus = this.renderOptionMenus.bind(this);
    this.getOrderDetailLink = this.getOrderDetailLink.bind(this);
    this.handleOnCancelFutureSession = this.handleOnCancelFutureSession.bind(this);
    this.handleOnReportAthlete = this.handleOnReportAthlete.bind(this);
    this.handleCloseCancelFutureSessionModal = this.handleCloseCancelFutureSessionModal.bind(this);
    this.handleOnCloseReportAthleteModal = this.handleOnCloseReportAthleteModal.bind(this);
    this.handleSendReminder = this.handleSendReminder.bind(this);
  }

  getOrderDetailLink() {
    const {sessionDetails} = this.props;
    const orderDetailLink = {
      pathname: DASHBOARD_ACCOUNT_EARNING_DETAILS,
      state: {orderId: sessionDetails.packageDetails.id}
    };
    return orderDetailLink;
  }

  handleOnCancelFutureSession() {
    this.setState({
      isOpenCancelFutureSessionModal: true
    });
  }

  handleOnReportAthlete() {
    this.setState({
      isOpenReportAthleteModal: true
    });
  }

  handleOnbackClick() {
    this.props.history.goBack();
  }

  handleManageBookingAction(booking, action) {
    this.setState({
      booking, action
    });
  }

  handleClearBookingAction() {
    this.setState({
      booking: null,
      action: null
    });
  }

  handleCloseCancelFutureSessionModal() {
    this.setState({
      isOpenCancelFutureSessionModal: false
    });
  }

  handleOnCloseReportAthleteModal() {
    this.setState({
      isOpenReportAthleteModal: false
    });
  }
  handleSendReminder(event) {
    const {sessionDetails} = this.props;
    const {action, id} = event.target.dataset;
    const booking = sessionDetails.sessions.find(session => session.id === id);
    console.log('booking', booking, 'sessionId', id, 'action', action);
    if (booking) {
      this.handleManageBookingAction(booking, action);
    }
  }

  renderUnscheduledSession(session) {
    const {p} = this.props;
    return (
      <div key={session.id} className="cl-md-session-details">
        <div className="uk-container-center cl-md-view-session cl-md-custom-8-10 cl-md-border-top pt20">
          <h4>{session.name}</h4>
          <div className="">
            <div className="uk-grid">
              <div className="uk-width-6-10">
                <span>{p.t('ISPSessionTemplates.UNSCHEDULED')}</span>
              </div>
              <div className="uk-width-4-10 uk-text-right">
                <button
                  onClick={this.handleSendReminder}
                  data-action={sessionEventActions.REMIND_ATHLETE}
                  data-id={session.id}
                  className="uk-button btn-turquoise-t4"
                >
                  {p.t('ManageBooking.send_reminder')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSessions(session) {
    const {sessionEvents} = appConstants;
    if (session.status === sessionEvents.unscheduled) {
      return this.renderUnscheduledSession(session);
    }
    return (
      <SessionTimeLines key={session.id} events={session.events} sessionName={session.name} booking={session} onAction={this.handleManageBookingAction}/>
    );
  }

  renderOptionMenus() {
    const {sessionDetails, p} = this.props;
    const {canCancelFutureSessions, canReportAthlete} = sessionDetails;
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

  render() {
    const {sessionDetails, p, userProfiles} = this.props;
    if (sessionDetails === null) {
      return null;
    }

    const bookedOnTime = (moment(sessionDetails.sessions[0].order.date)).format(appConstants.manageBookings.bookedOn);

    const booking = {
      noOfPurchase: sessionDetails.packageDetails.noOfPurchase,
      athlete: sessionDetails.athlete,
      order: sessionDetails.packageDetails
    };
    return (
      <div className="active cl-manage-booking-section">
        <div className="cl-manage-booking-listing-holder">
          {/* Session Listing Start */}
          <div className="cl-manage-booking-listing">
            <div className="cl-manage-booking-listing-top">
              <div style={{background: '#7CCF5A', width: 10, display: 'table-cell'}}/>
              <div className="cl-md-width-70">
                <div className="cl-mb-athlete-pic">
                  <img src={sessionDetails.athlete.profileImage} alt={sessionDetails.athlete.name} title={sessionDetails.athlete.name} width="100%"/>
                </div>
                <div className="cl-mb-session-details mar-l-35">
                  <span className="cl-mb-booked-date">{p.t('ManageBooking.bookedOn')} {bookedOnTime} {p.t('ManageBooking.by')}</span>
                  <div className="cl-mb-athlete-name" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
                    <a >{sessionDetails.athlete.name}</a>
                    <AthleteProfileDetailsCard altheteProfile={sessionDetails.athlete}/>
                  </div>
                  <span className="cl-mb-athlete-details">{p.t('ManageBooking.genders.' + sessionDetails.athlete.gender)}, {sessionDetails.athlete.ageGroup.description}</span>
                </div>
              </div>
              <div className="cl-mb-session-action">
                <div className="cl-mb-session-action-left">
                  <div className="cl-mb-session-price-tag">

                    <div className="cl-mb-session-purchas-status">{p.t('ManageBooking.numPurchased', {qty: sessionDetails.packageDetails.noOfPurchase})}</div>
                    <div className="cl-mb-session-purchas-price">{ p.t('ManageBooking.priceWithUnit', {unit: sessionDetails.priceUnit, price: sessionDetails.packageDetails.totalPrice})}</div>
                  </div>
                  <a id="cl-back" className="cl-mb-view-all" onClick={this.handleOnbackClick}>
                    <svg className="cl-icon-back-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="7348.966 -314.516 17.534 11.033">
                      <g data-name="Group 118" transform="translate(7302 -512.5)">
                        <path data-name="Path 35" className="cl-icon-back-arrow-1" d="M0,0,4.749,5,3.795,6,0,10" transform="translate(52.749 208.5) rotate(180)"/>
                        <line data-name="Line 9" className="cl-icon-back-arrow-1" x2={16} transform="translate(48.5 203.5)"/>
                      </g>
                    </svg>
              Back
                  </a>
                </div>
                {
                  this.renderOptionMenus()
                }
              </div>
            </div>
            <div id="cl-manage-booking-all-session" className="cl-manage-booking-listing-bottom pb70">
              {
                sessionDetails.sessions.map(this.renderSessions)
              }
            </div>
          </div>
          {/* Session Listing End */}
        </div>
        <SessionBookingActions
          booking={this.state.booking}
          action={this.state.action}
          onClose={this.handleClearBookingAction}
          selectedProfile={userProfiles.selectedProfile}
        />
        <Modal isModalOpen={this.state.isOpenCancelFutureSessionModal}>
          <SSPCancelFutureSessions session={booking} onClose={this.handleCloseCancelFutureSessionModal}/>
        </Modal>
        <Modal isModalOpen={this.state.isOpenReportAthleteModal}>
          <ReportAthleteModal session={booking} onClose={this.handleOnCloseReportAthleteModal}/>
        </Modal>

      </div>

    );
  }

  static get propTypes() {
    return {
      history: PropTypes.object.isRequired,
      sessionDetails: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      userProfiles: PropTypes.object.isRequired
    };
  }
}
DashboardSessionDetails.defaultProps = {
  sessionDetails: null
};

const mapStateToProps = state => {
  const {months, userProfiles, sessionDetails} = state;
  return {
    months,
    userProfiles,
    sessionDetails: sessionDetails.data
  };
};

export default withRouter(connect(mapStateToProps)(translate(DashboardSessionDetails)));
