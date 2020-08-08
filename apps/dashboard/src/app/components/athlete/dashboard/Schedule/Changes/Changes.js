import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import QueryString from 'query-string';

import {fetchScheduleChanges, fetchAthleteAvailableSlots, postAthleteBookingAction, athleteFetchSessionsCount} from '../../../../../actions/index';
import ChangeEventItem from './ChangeEventItem.js';
import NavigationBar from '../../../../common/SchedulerNavigation';
import appConstants from '../../../../../constants/appConstants';
import EventCalender from '../EventCalender';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import CancelSessionModal from '../CancelSessionModal';
import {getProfileId} from '../../../../../middlewares/athlete/schedulerUtils';
import ConfirmationModal from '../../../../common/ConfirmationModal';

const dateFormate = appConstants.schedulerNavigationDateFormat;

class AthleteScheduleChanges extends Component {
  constructor(props) {
    super(props);
    this.renderChanges = this.renderChanges.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.renderCalender = this.renderCalender.bind(this);
    this.renderNavigationBar = this.renderNavigationBar.bind(this);
    this.handleProposeNewTime = this.handleProposeNewTime.bind(this);
    this.handleFetchAvailableSlots = this.handleFetchAvailableSlots.bind(this);
    this.renderInstructionContent = this.renderInstructionContent.bind(this);
    this.rendeCancelSessionModal = this.rendeCancelSessionModal.bind(this);
    this.handleCancelSessionModalOpen = this.handleCancelSessionModalOpen.bind(this);
    this.handleCancelSessionModalClose = this.handleCancelSessionModalClose.bind(this);
    this.renderActionConfirmationModal = this.renderActionConfirmationModal.bind(this);
    this.handleActions = this.handleActions.bind(this);
    this.handleActionConfirmationModalOpen = this.handleActionConfirmationModalOpen.bind(this);
    this.handleActionConfirmationModalClose = this.handleActionConfirmationModalClose.bind(this);
    this.handleRescheduleFullfilled = this.handleRescheduleFullfilled.bind(this);
    this.fetchScheduleChanges = this.fetchScheduleChanges.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.handleActionError = this.handleActionError.bind(this);

    this.state = {
      date: moment().format(dateFormate),
      change: {},
      displayAvailableSlots: false,
      isCancelSessionModalOpen: false,
      isActionConfirmationModalOpen: false,
      actionData: null,
      actionType: null,
      error: undefined
    };
  }

  componentDidMount() {
    this.fetchScheduleChanges();
  }

  componentDidUpdate(prevProps) {
    const {p, selectedProfile} = this.props;
    if (prevProps.sessionAvailableSlots.status === PENDING && this.props.sessionAvailableSlots.status === FULFILLED) {
      const element = document.getElementById('SSPCalender');
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});
      }
    }
    if (prevProps.scheduleChanges.actionStatus === PENDING) {
      if (this.props.scheduleChanges.actionStatus === FULFILLED) {     
        this.handleActionConfirmationModalClose();
        this.props.athleteFetchSessionsCount({profileId: selectedProfile.id, profileType: selectedProfile.type});
      } else if (this.props.scheduleChanges.actionStatus === REJECTED) {
        this.handleActionError(p.t('AthleteScheduleChanges.actionError'));
      }
    }
    const {rescheduleSessionStatus} = this.props;
    if (prevProps.rescheduleSessionStatus === PENDING && rescheduleSessionStatus === FULFILLED) {
      this.handleRescheduleFullfilled();
    }
  }

  handleActionError(error) {
    this.setState({error});
  }

  handleRescheduleFullfilled() {
    this.setState({displayAvailableSlots: false});
    this.fetchScheduleChanges();
  }

  fetchScheduleChanges() {
    const {selectedProfile} = this.props;
    const profileId = getProfileId(selectedProfile);
    if (profileId) {
      this.props.fetchScheduleChanges({profileId, profileType: selectedProfile.type});
    }
  }

  handleDateChange(date) {
    this.setState({date: date.format(dateFormate)});
    this.handleFetchAvailableSlots(this.state.change, date.format(appConstants.schedules.ISO_DATE_FORMAT));
  }

  handleProposeNewTime(change) {
    this.setState({change, displayAvailableSlots: true});
    this.handleFetchAvailableSlots(change, moment().toISOString());
  }

  handleFetchAvailableSlots(change, date) {
    const {selectedProfile} = this.props;

    const profileId = getProfileId(selectedProfile);
    this.props.fetchAthleteAvailableSlots({
      profileId,
      orderItemId: change.package.id,
      profileType: selectedProfile.type}, date);
  }

  handleCancelSessionModalOpen(change) {
    this.setState({change, isCancelSessionModalOpen: true, displayAvailableSlots: false});
  }

  handleCancelSessionModalClose() {
    this.setState({change: {}, isCancelSessionModalOpen: false});
  }

  handleActions() {
    const {selectedProfile} = this.props;
    const {actionData, actionType} = this.state;
    if (actionType) {
      this.props.postAthleteBookingAction(selectedProfile.type, selectedProfile.id, actionData.bookingId, {
        action: actionType
      });
    }
  }

  handleActionConfirmationModalOpen(actionType, data) {
    this.setState({actionData: data, actionType, isActionConfirmationModalOpen: true});
  }

  handleActionConfirmationModalClose() {
    this.setState({actionData: null, actionType: null, isActionConfirmationModalOpen: false, error: undefined});
  }

  renderInstructionContent(displayAvailableSlots) {
    const {p} = this.props;
    const {t} = p;
    const {change} = this.state;
    if (displayAvailableSlots) {
      return (
        <div className="scheduler-instructionContent" id="SSPCalender">
          <p><strong>{t('AthleteScheduleChanges.instruction_p1', {coachName: change.ssp.name})}</strong></p>
          <p>{t('AthleteScheduleChanges.instruction_p2',
            {
              offerTerminology: change.offerTerminology.singular,
              offerTerminologyPlural: change.offerTerminology.plural
            })}
          </p>
        </div>
      );
    }
  }

  renderChanges() {
    const changes = this.props.scheduleChanges.data;
    return (
      changes.map(change =>
        (
          <ChangeEventItem
            key={change.bookingId}
            change={change}
            onProposeNewTime={this.handleProposeNewTime}
            onCancelSession={this.handleCancelSessionModalOpen}
            onAction={this.handleActionConfirmationModalOpen}
          />
        )
      )
    );
  }

  renderNavigationBar(displayAvailableSlots) {
    if (displayAvailableSlots) {
      return (
        <div className="scheduler-calendarHeader">
          <NavigationBar
            date={this.state.date}
            onDateChange={this.handleDateChange}
          />
        </div>
      );
    }
  }

  renderCalender(displayAvailableSlots) {
    const {sessionAvailableSlots} = this.props;
    const {change} = this.state;
    if (displayAvailableSlots) {
      const scheduleId = change && change.scheduleId ? change.scheduleId : null;
      return (
        <EventCalender
          sessionAvailableSlots={sessionAvailableSlots}
          scheduleId={scheduleId}
        />
      );
    }
  }

  rendeCancelSessionModal() {
    const {isCancelSessionModalOpen, change} = this.state;
    if (isCancelSessionModalOpen) {
      return (
        <CancelSessionModal
          isModalOpen={isCancelSessionModalOpen}
          onClose={this.handleCancelSessionModalClose}
          session={change}
        />
      );
    }
  }

  renderActionConfirmationModal() {
    const {isActionConfirmationModalOpen, actionType, error} = this.state;
    const {p} = this.props;
    if (isActionConfirmationModalOpen) {
      const heading = p.t('Actions.headings.' + actionType);
      const message = p.t('Actions.messages.' + actionType);
      return (
        <ConfirmationModal
          isModalOpen={isActionConfirmationModalOpen}
          heading={heading}
          description={message}
          onOk={this.handleActions}
          onCancel={this.handleActionConfirmationModalClose}
          error={error}
          okButtonLabel={p.t('ShoppingCart.deleteComfirmationYes')}
          cancelButtonLabel={p.t('ShoppingCart.deleteComfirmationNo')}
        />
      );
    }
  }

  renderEmpty() {
    const {scheduleChanges} = this.props;
    if (scheduleChanges.status === FULFILLED && scheduleChanges.data.length <= 0) {
      return (
        <div className="scheduler-unscheduledSessionsContainer">
          <div className="scheduler-emptySessionContainer">
            <p>
              <svg viewBox="0 0 90 92" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="NOCT-Exploration_1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.25">
                  <g id="08-03-Unscheduled-Empty-State" transform="translate(-420.000000, -465.000000)" fill="#000000" fillRule="nonzero">
                    <g id="noun_1016924_cc" transform="translate(420.000000, 464.000000)">
                      <g id="Group" transform="translate(0.000000, 0.637820)">
                        <path d="M20.999999,0.36216 C20.447699,0.36216 19.999999,0.80986 19.999999,1.36216 L19.999999,13.45596 C17.165199,13.93056 14.999999,16.39716 14.999999,19.36216 C14.999999,22.66406 17.698099,25.36216 20.999999,25.36216 C24.301899,25.36216 26.999999,22.66406 26.999999,19.36216 C26.999999,16.39716 24.834799,13.93056 21.999999,13.45596 L21.999999,1.36216 C21.999999,0.80986 21.552299,0.36216 20.999999,0.36216 Z M58.999999,0.36216 C58.447699,0.36216 57.999999,0.80986 57.999999,1.36216 L57.999999,13.45596 C55.165199,13.93056 52.999999,16.39716 52.999999,19.36216 C52.999999,22.66406 55.698099,25.36216 58.999999,25.36216 C62.301899,25.36216 64.999999,22.66406 64.999999,19.36216 C64.999999,16.39716 62.834799,13.93056 59.999999,13.45596 L59.999999,1.36216 C59.999999,0.80986 59.552299,0.36216 58.999999,0.36216 Z M9.031199,6.36216 C4.047699,6.36216 -9.99999999e-07,10.41006 -9.99999999e-07,15.39336 L-9.99999999e-07,75.331 C-9.99999999e-07,80.3142 4.047699,84.3622 9.031199,84.3622 L61.749999,84.3622 C64.268099,89.1184 69.252999,92.3622 74.999999,92.3622 C83.272399,92.3622 90.000001,85.6346 90.000001,77.3622 C90.000001,70.8399 85.823999,65.2987 79.999999,63.2372 L79.999999,15.39336 C79.999999,10.41006 75.952099,6.36216 70.968799,6.36216 L64.999999,6.36216 C64.471699,6.35516 63.985799,6.83379 63.985799,7.36216 C63.985799,7.89053 64.471699,8.36963 64.999999,8.36216 L70.968799,8.36216 C74.876899,8.36216 77.999999,11.48536 77.999999,15.39336 L77.999999,30.36216 L1.999999,30.36216 L1.999999,15.39336 C1.999999,11.48536 5.122999,8.36216 9.031199,8.36216 L14.999999,8.36216 C15.528299,8.36916 16.014199,7.89053 16.014199,7.36216 C16.014199,6.83379 15.528299,6.35469 14.999999,6.36216 L9.031199,6.36216 Z M26.999999,6.36216 C26.447699,6.36216 25.999999,6.80986 25.999999,7.36216 C25.999999,7.91446 26.447699,8.36216 26.999999,8.36216 L52.999999,8.36216 C53.552299,8.36216 53.999999,7.91446 53.999999,7.36216 C53.999999,6.80986 53.552299,6.36216 52.999999,6.36216 L26.999999,6.36216 Z M20.999999,15.36216 C23.220999,15.36216 24.999999,17.14116 24.999999,19.36216 C24.999999,21.58316 23.220999,23.36216 20.999999,23.36216 C18.778999,23.36216 16.999999,21.58316 16.999999,19.36216 C16.999999,17.14116 18.778999,15.36216 20.999999,15.36216 Z M58.999999,15.36216 C61.220999,15.36216 62.999999,17.14116 62.999999,19.36216 C62.999999,21.58316 61.220999,23.36216 58.999999,23.36216 C56.778999,23.36216 54.999999,21.58316 54.999999,19.36216 C54.999999,17.14116 56.778999,15.36216 58.999999,15.36216 Z M1.999999,32.36216 L77.999999,32.36216 L77.999999,62.6747 C77.033499,62.4785 76.023599,62.3622 74.999999,62.3622 C66.727599,62.3622 59.999999,69.0898 59.999999,77.3622 C59.999999,79.1123 60.321799,80.7994 60.874999,82.3622 L9.031199,82.3622 C5.122999,82.3622 1.999999,79.2389 1.999999,75.331 L1.999999,32.36216 Z M74.999999,64.3622 C82.191599,64.3622 88.000001,70.1706 88.000001,77.3622 C88.000001,84.5537 82.191599,90.3622 74.999999,90.3622 C67.808499,90.3622 61.999999,84.5537 61.999999,77.3622 C61.999999,70.1706 67.808499,64.3622 74.999999,64.3622 Z M81.812499,72.3622 C81.571899,72.3982 81.367799,72.5173 81.218799,72.7372 L73.812499,81.9872 L67.593799,77.5497 C67.168299,77.2388 66.498399,77.3431 66.187499,77.7684 C65.876699,78.1939 65.980799,78.8639 66.406199,79.1747 L73.406199,84.1747 C73.818899,84.4764 74.464299,84.3883 74.781199,83.9872 L82.781199,73.9872 C83.093799,73.5519 83.141999,72.9927 82.593799,72.5497 C82.330199,72.3746 82.053099,72.3265 81.812499,72.3622 Z" id="Shape"/>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </p>
            <p>{this.props.p.t('AthleteScheduleChanges.empty')}</p>
          </div>
        </div>
      );
    }
  }

  render() {
    const {displayAvailableSlots} = this.state;
    return (
      <div className="scheduler-sessionChangesContainer">
        {this.renderChanges()}
        {this.renderEmpty()}
        <div className="scheduler-changeTypeContainer scheduler-sessionItemType--toggle">
          {this.renderInstructionContent(displayAvailableSlots)}
          <div className="scheduler-calendar">
            {this.renderNavigationBar(displayAvailableSlots)}
            {this.renderCalender(displayAvailableSlots)}
          </div>
        </div>
        {this.rendeCancelSessionModal()}
        {this.renderActionConfirmationModal()}
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      fetchScheduleChanges: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      scheduleChanges: PropTypes.object.isRequired,
      sessionAvailableSlots: PropTypes.object.isRequired,
      fetchAthleteAvailableSlots: PropTypes.func.isRequired,
      postAthleteBookingAction: PropTypes.func.isRequired,
      rescheduleSessionStatus: PropTypes.string.isRequired,
      athleteFetchSessionsCount: PropTypes.func.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchScheduleChanges: profileId => dispatch(fetchScheduleChanges(profileId)),
    fetchAthleteAvailableSlots: (params, query) => dispatch(fetchAthleteAvailableSlots(params, query)),
    postAthleteBookingAction: (profileType, profileId, bookingId, data) => dispatch(postAthleteBookingAction(profileType, profileId, bookingId, data)),
    athleteFetchSessionsCount: params => dispatch(athleteFetchSessionsCount(params))
  };
};

const mapStateToProps = state => {
  const {userProfiles, athlete} = state;
  const {selectedProfile} = userProfiles;
  const {scheduleChanges, sessionAvailableSlots, rescheduleSession} = athlete;
  return {
    selectedProfile,
    scheduleChanges,
    sessionAvailableSlots,
    rescheduleSessionStatus: rescheduleSession.status

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(AthleteScheduleChanges)));
