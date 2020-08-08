import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import { downArrow } from '../../../../../utils/svg'
import appConstants from '../../../../../constants/appConstants';

const {apiBooleanFlags} = appConstants;

class ScheduledSessionItem extends Component {
  constructor(props) {
    super(props);
    this.renderSessionOptionMenu = this.renderSessionOptionMenu.bind(this);

    this.handleOnSelectRescheduleSession = this.handleOnSelectRescheduleSession.bind(this);

    this.handleOnSelectInviteAthlete = this.handleOnSelectInviteAthlete.bind(this);

    this.handleOnSelectChangeLocation = this.handleOnSelectChangeLocation.bind(this);

    this.handleOnSelectSessionNotes = this.handleOnSelectSessionNotes.bind(this);

    this.handleOnSelectOverridePrice = this.handleOnSelectOverridePrice.bind(this);

    this.handleOnSelectOverrideGroupSize = this.handleOnSelectOverrideGroupSize.bind(this);

    this.handleOnSelectSessionBuffer = this.handleOnSelectSessionBuffer.bind(this);

    this.handleOnSelectOverrideOpenPositions = this.handleOnSelectOverrideOpenPositions.bind(this);

    this.handleOnSelectRepeat = this.handleOnSelectRepeat.bind(this);

    this.handleOnSelectRemoveSession = this.handleOnSelectRemoveSession.bind(this);

    this.handleOnSelectCancelSession = this.handleOnSelectCancelSession.bind(this);
  }

  handleOnSelectRescheduleSession() {
    const {scheduledSession} = this.props;
    this.props.onSelectRescheduleSession(scheduledSession);
  }
  handleOnSelectInviteAthlete() {
    const {scheduledSession} = this.props;
    this.props.onSelectInviteAthlete(scheduledSession);
  }
  handleOnSelectChangeLocation() {
    const {scheduledSession} = this.props;
    this.props.onSelectChangeLocation(scheduledSession);
  }
  handleOnSelectSessionNotes() {
    const {scheduledSession} = this.props;
    this.props.onSelectSessionNotes(scheduledSession);
  }
  handleOnSelectOverridePrice() {
    const {scheduledSession} = this.props;
    this.props.onSelectOverridePrice(scheduledSession);
  }
  handleOnSelectOverrideGroupSize() {
    const {scheduledSession} = this.props;
    this.props.onSelectOverrideGroupSize(scheduledSession);
  }
  handleOnSelectSessionBuffer() {
    const {scheduledSession} = this.props;
    this.props.onSelectSessionBuffer(scheduledSession);
  }
  handleOnSelectOverrideOpenPositions() {
    const {scheduledSession} = this.props;
    this.props.onSelectOverrideOpenPositions(scheduledSession);
  }
  handleOnSelectRepeat() {
    const {scheduledSession} = this.props;
    this.props.onSelectRepeat(scheduledSession);
  }
  handleOnSelectRemoveSession() {
    const {scheduledSession} = this.props;
    this.props.onSelectRemoveSession(scheduledSession);
  }
  handleOnSelectCancelSession() {
    const {scheduledSession} = this.props;
    this.props.onSelectCancelSession(scheduledSession);
  }

  renderSessionOptionMenu() {
    const {p, scheduledSession} = this.props;
    const {
      canReschedule,
      canInviteAthletes,
      canChangeLocation,
      canOverridePricing,
      canOverrideGroupSize,
      canChangeBuffer,
      canOverridePositions,
      canRepeatSession,
      canRemoveSession,
      canCancelSession,
      openSlots,
      totalSlots
    } = scheduledSession;
    const allOptions = [canReschedule, canInviteAthletes, canChangeLocation, canOverridePricing, canOverrideGroupSize, canChangeBuffer, canOverridePositions, canRepeatSession, canRemoveSession, canCancelSession];
    const isAllOptionsDisabled = allOptions.every(option => option === apiBooleanFlags.FALSE);
    if (isAllOptionsDisabled === false) {
      const reScheduleText = openSlots === totalSlots ? p.t('DashboardSchedules.itemOptinMenu.edit') : p.t('DashboardSchedules.itemOptinMenu.reSchedule');
      return (
        <div className="uk-width-large-1-10 uk-width-medium-1-10 uk-width-1-1 cl-sd-event-action-btn">
          <div className="cl-sd-action-btn" data-uk-dropdown="{mode:'click', pos:'bottom-right'}">
            <a className="more">
            {/* <i className="fa fa-circle" aria-hidden="true"/>&nbsp;
              <i className="fa fa-circle" aria-hidden="true"/>&nbsp;
              <i className="fa fa-circle" aria-hidden="true"/> */}
              More 
                <span className="cl-sd-icon">
                  {downArrow()}
                </span>              
            </a>
            <div className="uk-dropdown cl-ssp-schedule-dropdown">
              <ul>
                {canReschedule === apiBooleanFlags.TRUE &&
                <li><a onClick={this.handleOnSelectRescheduleSession} >{reScheduleText}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>
                </li>
                }
                {canInviteAthletes === apiBooleanFlags.TRUE &&
                <li><a onClick={this.handleOnSelectInviteAthlete} >{p.t('DashboardSchedules.itemOptinMenu.inviteAthletes')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>

                </li>
                }
                {canChangeLocation === apiBooleanFlags.TRUE &&
                <li><a onClick={this.handleOnSelectChangeLocation} >{p.t('DashboardSchedules.itemOptinMenu.changeLocation')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>

                </li>
                }
                <li><a onClick={this.handleOnSelectSessionNotes} >{p.t('DashboardSchedules.itemOptinMenu.addNotes')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>

                </li>
                {canOverridePricing === apiBooleanFlags.TRUE &&
                <li><a onClick={this.handleOnSelectOverridePrice} >{p.t('DashboardSchedules.itemOptinMenu.overidePricing')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>

                </li>
                }

                {canOverrideGroupSize === apiBooleanFlags.TRUE &&
                <li><a onClick={this.handleOnSelectOverrideGroupSize} >{p.t('DashboardSchedules.itemOptinMenu.overrideGroupSize')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>

                </li>
                }

                {/*  <li><a >{p.t('DashboardSchedules.itemOptinMenu.viewBookings')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a></li> */}

                {canChangeBuffer === apiBooleanFlags.TRUE &&
                <li><a onClick={this.handleOnSelectSessionBuffer} >{p.t('DashboardSchedules.itemOptinMenu.buffer')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>

                </li>
                }
                {canOverridePositions === apiBooleanFlags.TRUE &&
                <li><a onClick={this.handleOnSelectOverrideOpenPositions} >{p.t('DashboardSchedules.itemOptinMenu.openPositions')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>

                </li>
                }
                {canRepeatSession === apiBooleanFlags.TRUE &&
                <li><a onClick={this.handleOnSelectRepeat} >{p.t('DashboardSchedules.itemOptinMenu.repeat')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>

                </li>
                }
                {canRemoveSession === apiBooleanFlags.TRUE &&
                <li><a onClick={this.handleOnSelectRemoveSession} >{p.t('DashboardSchedules.itemOptinMenu.remove')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>

                </li>
                }
                {canCancelSession === apiBooleanFlags.TRUE &&
                <li><a onClick={this.handleOnSelectCancelSession} >{p.t('DashboardSchedules.itemOptinMenu.cancel')}<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>

                </li>
                }
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {p, scheduledSession, showDate} = this.props;
    const genders = scheduledSession.genders;
    const genderStr = genders.map(gender => p.t('DashboardSchedules.genders.' + gender)).join(', ');

    let sessionScheduledTime = '';
    const sessionScheduledStartTime = (moment(scheduledSession.startTime)).format(appConstants.scheduleSession.startTime);
    const sessionScheduledEndTime = (moment(scheduledSession.endTime)).format(appConstants.scheduleSession.endTime);
    sessionScheduledTime = sessionScheduledStartTime + ' - ' + sessionScheduledEndTime;

    const dateString = (moment(scheduledSession.startTime)).format('ddd, MMM DD, YYYY');

    const {isRepeatedSession} = scheduledSession;

    return (

      <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around evevnt-column">
        <div className="uk-width-large-6-10 uk-width-medium-7-10 uk-width-1-1 hourly-event">
          <div style={{background: scheduledSession.color, width: 10, display: 'table-cell'}}/>
          <div className="event-holder">
            <span className="time-slot">{sessionScheduledTime}</span>
            {(showDate === true) ? <span className="date-slot">{dateString}</span> : ''}
            {(isRepeatedSession === apiBooleanFlags.TRUE) ? <span className="date-slot">{p.t('DashboardSchedules.repeatedSession')}</span> : ''}
          </div>
          <div className="event-place">
            <div>
              <span className="event-name">{scheduledSession.sessionName}</span>&nbsp;
              <span className="cl-sd-event-price"> {p.t('DashboardSchedules.eventPrice', {priceUnit: scheduledSession.priceUnit, price: scheduledSession.sessionPrice})}</span>
            </div>
            <div className="event-group">
              <span className="e-n">
                {scheduledSession.sport.name}
              </span>
              <span className="t-t">
                <i className="fa fa-stop" aria-hidden="true"/>
                <svg className="team-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-17433 -18026 18.824 11.711">
                  <path id="Mask" className="cls-1" d="M18.32,8.667a4.893,4.893,0,0,1-3.154.77V8.493a4.326,4.326,0,0,0-.724-2.463,3.122,3.122,0,0,0,2.8-.187,2.051,2.051,0,0,1,1.079,1.9ZM5.988,10a.48.48,0,0,0,.024-.148V8.493a3.685,3.685,0,0,1,.656-2.171,3.534,3.534,0,0,1,1.115-.855,4.039,4.039,0,0,0,4.434,0,3.522,3.522,0,0,1,1.188.952,3.708,3.708,0,0,1,.585,2.074V9.851a.484.484,0,0,0,.025.154A7.131,7.131,0,0,1,5.988,10ZM4.835,8.493v.946A4.953,4.953,0,0,1,1.68,8.666V7.74A2.022,2.022,0,0,1,2.761,5.849a3.126,3.126,0,0,0,2.781.186,4.329,4.329,0,0,0-.707,2.458ZM17.414,4.77h-.006a1.656,1.656,0,0,0,.144-.674,1.892,1.892,0,0,0-3.774,0,1.665,1.665,0,0,0,.144.675c-.005,0-.012,0-.017,0A3.887,3.887,0,0,0,13.455,5a5.092,5.092,0,0,0-1.06-.6,2.411,2.411,0,0,0,.37-1.265A2.731,2.731,0,0,0,9.31.633,2.645,2.645,0,0,0,7.351,2.4a2.45,2.45,0,0,0,.262,2A5.3,5.3,0,0,0,6.541,5a3.888,3.888,0,0,0-.448-.231h-.01a1.648,1.648,0,0,0,.145-.675A1.822,1.822,0,0,0,4.337,2.333a1.822,1.822,0,0,0-1.89,1.762,1.641,1.641,0,0,0,.148.681h-.01a3.086,3.086,0,0,0-2,2.963V8.769a.836.836,0,0,0,.407.7,6.089,6.089,0,0,0,3.9,1,.524.524,0,0,0,.174.188,8.973,8.973,0,0,0,4.942,1.61,8.918,8.918,0,0,0,4.922-1.6.524.524,0,0,0,.179-.2,6.165,6.165,0,0,0,3.894-.993.839.839,0,0,0,.406-.7V7.74a3.085,3.085,0,0,0-2-2.97Z" transform="translate(-17433.588 -18026.557)"/>
                </svg>
                {' ' + scheduledSession.trainingType.description}
              </span>
              <span className="g-a">
                <i className="fa fa-stop" aria-hidden="true"/>
                {genderStr}, {scheduledSession.skillLevel.description}
              </span>
            </div>
            <div className="cl-sd-event-status all-open">
              {p.t('DashboardSchedules.openPositions', {open: scheduledSession.openSlots, total: scheduledSession.totalSlots})}
            </div>
          </div>
        </div>
        <div className="uk-width-large-3-10 uk-width-medium-2-10 uk-width-1-1 cl-sd-event-details">
          <div className="coach-place">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7265 -1121 16 20.633" className="location-marker">
              <defs>
                <style/>
              </defs>
              <path id="Path_67" data-name="Path 67" className="cls-1" d="M4967.559,1353.175c-.309-.32-7.559-7.9-7.559-12.174a8,8,0,1,1,16,0c0,4.278-7.253,11.854-7.561,12.174l-.441.457ZM4961.223,1341c0,2.937,4.54,8.444,6.775,10.859,2.237-2.415,6.777-7.925,6.777-10.859a6.776,6.776,0,1,0-13.553,0Zm2.726-.177a4.051,4.051,0,1,1,4.051,4.051A4.055,4.055,0,0,1,4963.948,1340.824Zm1.223,0A2.828,2.828,0,1,0,4968,1338,2.832,2.832,0,0,0,4965.171,1340.824Z" transform="translate(-12225 -2454)"/>
            </svg>
            {scheduledSession.trainingLocation.address}
          </div>
        </div>
        {
          this.renderSessionOptionMenu()
        }

      </div>
    );
  }
}

ScheduledSessionItem.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  showDate: PropTypes.bool,
  scheduledSession: PropTypes.object.isRequired,
  onSelectRescheduleSession: PropTypes.func.isRequired,
  onSelectInviteAthlete: PropTypes.func.isRequired,
  onSelectChangeLocation: PropTypes.func.isRequired,
  onSelectSessionNotes: PropTypes.func.isRequired,
  onSelectOverridePrice: PropTypes.func.isRequired,
  onSelectOverrideGroupSize: PropTypes.func.isRequired,
  onSelectSessionBuffer: PropTypes.func.isRequired,
  onSelectOverrideOpenPositions: PropTypes.func.isRequired,
  onSelectRepeat: PropTypes.func.isRequired,
  onSelectRemoveSession: PropTypes.func.isRequired,
  onSelectCancelSession: PropTypes.func.isRequired
};

ScheduledSessionItem.defaultProps = {
  showDate: false
};

export default translate(ScheduledSessionItem);
