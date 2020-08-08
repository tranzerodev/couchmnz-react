import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import EventItem from './SessionSlots/EventItem';
import SeeOnMapModal from './SeeOnMapModal';
import ConfirmationModal from '../../../common/ConfirmationModal';
import {athleteScheduleSession, athleteRescheduleSession, athleteFetchSessionsCount} from '../../../../actions/index';
import {FULFILLED, REJECTED, PENDING} from '../../../../constants/ActionTypes';
import {getProfileId} from '../../../../middlewares/athlete/schedulerUtils';
import {isRescheduleError} from '../../../../validators/athlete/common/scheduler.js';

class EventCalender extends Component {
  constructor(props) {
    super(props);
    this.renderEventItems = this.renderEventItems.bind(this);
    this.handleSeeOnMapModalClose = this.handleSeeOnMapModalClose.bind(this);
    this.handleSeeOnMapModalModalOpen = this.handleSeeOnMapModalModalOpen.bind(this);
    this.handleScheduleConfirmationModalClose = this.handleScheduleConfirmationModalClose.bind(this);
    this.handleScheduleConfirmationModalOpen = this.handleScheduleConfirmationModalOpen.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.renderSeeMapModal = this.renderSeeMapModal.bind(this);
    this.renderScheduleConfirmationModal = this.renderScheduleConfirmationModal.bind(this);
    this.handleScheduleError = this.handleScheduleError.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);

    this.state = {
      isSeeOnMapModalOpen: false,
      isScheduleConfirmationModalOpen: false,
      event: {},
      scheduleError: undefined
    };
  }

  componentDidUpdate(prevProps) {
    const {rescheduleSession, p, scheduleSession, selectedProfile} = this.props;
    if (prevProps.scheduleSession.status === PENDING) {
      if (scheduleSession.status === FULFILLED) {
        this.handleScheduleConfirmationModalClose();
        this.props.athleteFetchSessionsCount({profileId: selectedProfile.id, profileType: selectedProfile.type});
      } else if (scheduleSession.status === REJECTED) {
        let errorMessage = p.t('EventCalender.ScheduleConfirmationModal.rescheduleError');
        if (isRescheduleError(scheduleSession.responseCode)) {
          errorMessage = p.t('ScheduleErrorCodes.' + scheduleSession.responseCode);
        }
        this.handleScheduleError(errorMessage);
      }
    }
    if (prevProps.rescheduleSession.status === PENDING) {
      if (rescheduleSession.status === FULFILLED) {
        this.handleScheduleConfirmationModalClose();
      } else if (rescheduleSession.status === REJECTED) {
        let errorMessage = p.t('EventCalender.ScheduleConfirmationModal.scheduleError');
        if (isRescheduleError(rescheduleSession.responseCode)) {
          errorMessage = p.t('ScheduleErrorCodes.' + rescheduleSession.responseCode);
        }
        this.handleScheduleError(errorMessage);
      }
    }
  }

  handleScheduleError(error) {
    this.setState({scheduleError: error});
  }

  handleSeeOnMapModalModalOpen() {
    this.setState({isSeeOnMapModalOpen: true});
  }

  handleSeeOnMapModalClose() {
    this.setState({isSeeOnMapModalOpen: false});
  }

  handleScheduleConfirmationModalClose() {
    this.setState({isScheduleConfirmationModalOpen: false, event: {}, scheduleError: undefined});
  }

  handleScheduleConfirmationModalOpen(event) {
    this.setState({isScheduleConfirmationModalOpen: true, event});
  }

  handleSchedule() {
    const {event} = this.state;
    const {selectedProfile, sessionAvailableSlots, scheduleId} = this.props;
    const {orderItemId} = sessionAvailableSlots.data;
    const profileId = getProfileId(selectedProfile);
    if (profileId) {
      if (scheduleId) {
        this.props.athleteRescheduleSession({
          orderItemId,
          profileId,
          scheduleId,
          eventId: event.eventId,
          profileType: selectedProfile.type
        });
      } else {
        this.props.athleteScheduleSession({
          orderItemId,
          profileId,
          eventId: event.eventId,
          profileType: selectedProfile.type
        });
      }
    }
  }

  renderEventItems() {
    const {sessionAvailableSlots} = this.props;
    const {
      skillLevel,
      sport,
      ageGroup,
      ssp,
      gender,
      events,
      color,
      trainingType,
      trainingLocation,
      sessionId,
      packageId
    } = sessionAvailableSlots.data;
    if (events.length) {
      return (
        events.map(event =>
          (
            <EventItem
              key={event.eventId}
              skillLevel={skillLevel}
              sport={sport}
              ageGroup={ageGroup}
              ssp={ssp}
              gender={gender}
              color={color}
              trainingType={trainingType}
              trainingLocation={trainingLocation}
              event={event}
              sessionId={sessionId}
              packageId={packageId}
              onSeeOnMap={this.handleSeeOnMapModalModalOpen}
              onSchedule={this.handleScheduleConfirmationModalOpen}
            />
          )
        )
      );
    } else if (sessionAvailableSlots.status === FULFILLED) {
      return this.renderEmpty();
    }
  }

  renderSeeMapModal() {
    const {isSeeOnMapModalOpen} = this.state;
    const {sessionAvailableSlots} = this.props;
    if (isSeeOnMapModalOpen) {
      return (
        <SeeOnMapModal
          isModalOpen={isSeeOnMapModalOpen}
          onClose={this.handleSeeOnMapModalClose}
          trainingLocation={sessionAvailableSlots.data.trainingLocation}
        />
      );
    }
  }

  renderScheduleConfirmationModal() {
    const {isScheduleConfirmationModalOpen, event, scheduleError} = this.state;
    const {p} = this.props;
    if (isScheduleConfirmationModalOpen) {
      const startTime = moment(event.startTime).format('hh:mm A');
      const endTime = moment(event.endTime).format('hh:mm A');
      const date = moment(event.startTime).format('DD MMM YYYY');
      const description = p.t('EventCalender.ScheduleConfirmationModal.description', {date, startTime, endTime});
      return (
        <ConfirmationModal
          isModalOpen={isScheduleConfirmationModalOpen}
          heading={p.t('EventCalender.ScheduleConfirmationModal.heading')}
          description={description}
          okButtonLabel={p.t('EventCalender.ScheduleConfirmationModal.schedule')}
          onOk={this.handleSchedule}
          onCancel={this.handleScheduleConfirmationModalClose}
          error={scheduleError}
        />
      );
    }
  }

  renderEmpty() {
    return (
      <div className="scheduler-unscheduledSessionsContainer">
        <div className="scheduler-emptySessionContainer">
          <p>
            <svg viewBox="0 0 90 92" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="NOCT-Exploration_1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.25">
                <g id="08-03-Unscheduled-Empty-State" transform="translate(-420.000000, -465.000000)" fill="#000000" fillRule="nonzero">
                  <g id="noun_1016924_cc" trselectedProfileansform="translate(420.000000, 464.000000)">
                    <g id="Group" transform="translate(0.000000, 0.637820)">
                      <path d="M20.999999,0.36216 C20.447699,0.36216 19.999999,0.80986 19.999999,1.36216 L19.999999,13.45596 C17.165199,13.93056 14.999999,16.39716 14.999999,19.36216 C14.999999,22.66406 17.698099,25.36216 20.999999,25.36216 C24.301899,25.36216 26.999999,22.66406 26.999999,19.36216 C26.999999,16.39716 24.834799,13.93056 21.999999,13.45596 L21.999999,1.36216 C21.999999,0.80986 21.552299,0.36216 20.999999,0.36216 Z M58.999999,0.36216 C58.447699,0.36216 57.999999,0.80986 57.999999,1.36216 L57.999999,13.45596 C55.165199,13.93056 52.999999,16.39716 52.999999,19.36216 C52.999999,22.66406 55.698099,25.36216 58.999999,25.36216 C62.301899,25.36216 64.999999,22.66406 64.999999,19.36216 C64.999999,16.39716 62.834799,13.93056 59.999999,13.45596 L59.999999,1.36216 C59.999999,0.80986 59.552299,0.36216 58.999999,0.36216 Z M9.031199,6.36216 C4.047699,6.36216 -9.99999999e-07,10.41006 -9.99999999e-07,15.39336 L-9.99999999e-07,75.331 C-9.99999999e-07,80.3142 4.047699,84.3622 9.031199,84.3622 L61.749999,84.3622 C64.268099,89.1184 69.252999,92.3622 74.999999,92.3622 C83.272399,92.3622 90.000001,85.6346 90.000001,77.3622 C90.000001,70.8399 85.823999,65.2987 79.999999,63.2372 L79.999999,15.39336 C79.999999,10.41006 75.952099,6.36216 70.968799,6.36216 L64.999999,6.36216 C64.471699,6.35516 63.985799,6.83379 63.985799,7.36216 C63.985799,7.89053 64.471699,8.36963 64.999999,8.36216 L70.968799,8.36216 C74.876899,8.36216 77.999999,11.48536 77.999999,15.39336 L77.999999,30.36216 L1.999999,30.36216 L1.999999,15.39336 C1.999999,11.48536 5.122999,8.36216 9.031199,8.36216 L14.999999,8.36216 C15.528299,8.36916 16.014199,7.89053 16.014199,7.36216 C16.014199,6.83379 15.528299,6.35469 14.999999,6.36216 L9.031199,6.36216 Z M26.999999,6.36216 C26.447699,6.36216 25.999999,6.80986 25.999999,7.36216 C25.999999,7.91446 26.447699,8.36216 26.999999,8.36216 L52.999999,8.36216 C53.552299,8.36216 53.999999,7.91446 53.999999,7.36216 C53.999999,6.80986 53.552299,6.36216 52.999999,6.36216 L26.999999,6.36216 Z M20.999999,15.36216 C23.220999,15.36216 24.999999,17.14116 24.999999,19.36216 C24.999999,21.58316 23.220999,23.36216 20.999999,23.36216 C18.778999,23.36216 16.999999,21.58316 16.999999,19.36216 C16.999999,17.14116 18.778999,15.36216 20.999999,15.36216 Z M58.999999,15.36216 C61.220999,15.36216 62.999999,17.14116 62.999999,19.36216 C62.999999,21.58316 61.220999,23.36216 58.999999,23.36216 C56.778999,23.36216 54.999999,21.58316 54.999999,19.36216 C54.999999,17.14116 56.778999,15.36216 58.999999,15.36216 Z M1.999999,32.36216 L77.999999,32.36216 L77.999999,62.6747 C77.033499,62.4785 76.023599,62.3622 74.999999,62.3622 C66.727599,62.3622 59.999999,69.0898 59.999999,77.3622 C59.999999,79.1123 60.321799,80.7994 60.874999,82.3622 L9.031199,82.3622 C5.122999,82.3622 1.999999,79.2389 1.999999,75.331 L1.999999,32.36216 Z M74.999999,64.3622 C82.191599,64.3622 88.000001,70.1706 88.000001,77.3622 C88.000001,84.5537 82.191599,90.3622 74.999999,90.3622 C67.808499,90.3622 61.999999,84.5537 61.999999,77.3622 C61.999999,70.1706 67.808499,64.3622 74.999999,64.3622 Z M81.812499,72.3622 C81.571899,72.3982 81.367799,72.5173 81.218799,72.7372 L73.812499,81.9872 L67.593799,77.5497 C67.168299,77.2388 66.498399,77.3431 66.187499,77.7684 C65.876699,78.1939 65.980799,78.8639 66.406199,79.1747 L73.406199,84.1747 C73.818899,84.4764 74.464299,84.3883 74.781199,83.9872 L82.781199,73.9872 C83.093799,73.5519 83.141999,72.9927 82.593799,72.5497 C82.330199,72.3746 82.053099,72.3265 81.812499,72.3622 Z" id="Shape"/>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </p>
          <p>{this.props.p.t('EventCalender.empty')}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="scheduler-calendarContainer">
        <div className="scheduler-calendarWeekView">
          {this.renderEventItems()}
        </div>
        {
          this.renderSeeMapModal()
        }
        {
          this.renderScheduleConfirmationModal()
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sessionAvailableSlots: PropTypes.object.isRequired,
      athleteScheduleSession: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      scheduleSession: PropTypes.object.isRequired,
      scheduleId: PropTypes.string,
      athleteRescheduleSession: PropTypes.func.isRequired,
      rescheduleSession: PropTypes.object.isRequired,
      athleteFetchSessionsCount: PropTypes.func.isRequired
    };
  }
}

EventCalender.defaultProps = {
  scheduleId: null
};

const mapDispatchToProps = dispatch => {
  return {
    athleteScheduleSession: params => dispatch(athleteScheduleSession(params)),
    athleteRescheduleSession: params => dispatch(athleteRescheduleSession(params)),
    athleteFetchSessionsCount: params => dispatch(athleteFetchSessionsCount(params))
  };
};

const mapStateToProps = state => {
  const {userProfiles, athlete} = state;
  const {scheduleSession, rescheduleSession} = athlete;
  return {
    selectedProfile: userProfiles.selectedProfile,
    scheduleSession,
    rescheduleSession
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(EventCalender));
