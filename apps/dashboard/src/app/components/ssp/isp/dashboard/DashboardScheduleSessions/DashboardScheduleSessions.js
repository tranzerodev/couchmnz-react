import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import QueryString from 'query-string';
import Datetime from 'react-datetime';
import moment from 'moment';

import Modal from '../../../../common/Modal';
import ScheduleASession from '../DashboardScheduleModals/ScheduleASession';
import CancelSessionModal from '../DashboardScheduleModals/CancelSessionModal';
import ChangeLocationModal from '../DashboardScheduleModals/ChangeLocationModal';
import InviteAthleteModal from '../DashboardScheduleModals/InviteAthleteModal';
import OveridePriceModal from '../DashboardScheduleModals/OveridePriceModal';
import OveridePositionsModal from '../DashboardScheduleModals/OveridePositionsModal';
import RemoveSessionModal from '../DashboardScheduleModals/RemoveSessionModal';
import RepeatModal from '../DashboardScheduleModals/RepeatModal';
import ReScheduleModal from '../DashboardScheduleModals/ReScheduleModal';
import SchedulerSettingModal from '../DashboardScheduleModals/SchedulerSettingModal';
import SessionBufferModal from '../DashboardScheduleModals/SessionBufferModal';
import SessionNotesModal from '../DashboardScheduleModals/SessionNotesModal';
import CalendarModal from '../DashboardScheduleModals/CalenderModal';
import DeleteQuaterModal from '../DashboardScheduleModals/DeleteQuaterModal';
import OverrideGroupSizeModal from '../DashboardScheduleModals/OverrideGroupSizeModal';
import OverrideOpenPositionsModal from '../DashboardScheduleModals/OverrideOpenPositionsModal';
import getProfilePagesCompletionStatus from '../../../../../validators/ssp/isp/registration/getProfileCompletionStatus';
import SessionCalendarDnD from '../../../../common/Scheduler/SessionCalendarDnD';
import CustomToolbar from '../../../../common/Scheduler/CustomToolbar';
import ScheduledSessionItem from '../ScheduledSessionItem';
import { gearIcon, calendarIcon } from '../../../../../utils/svg'

import {
  fetchNewSessions, fetchCurrentSport
} from '../../../../../actions';

import appConstants from '../../../../../constants/appConstants';
import {DASHBOARD_MANAGE_SPORT_SESSIONS_ADD} from '../../../../../constants/pathConstants';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import {getProfileStatus} from '../../../../../validators/ssp/isp/registration/registrationPageStatus';
import getSportsDataFilledStatus from '../../../../../validators/ssp/isp/common/getCurrentSportStatus';
import {getSportsCompletionStatus} from '../../../../../validators/ssp/isp/common/completedServiceProfile';
import {isNonEmptyArray, notNull} from '../../../../../validators/common/util';
import {parseUrlTemplate} from '../../../../../utils/urlHelper';
import {VIEW_SSP_PROFILE_SPORT} from '../../../../../constants/WebConstants';

const valid = function (current) {
  return current.isSameOrAfter(moment(), 'day');
};
const {apiBooleanFlags} = appConstants;
const schedulesConstants = appConstants.schedules;
/* eslint react/no-deprecated:0 */
class DashboardScheduleSessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDragAndContent: true,
      isOpenNewScheduleASessionModal: false,
      isOpenNewSettingModal: false,
      isOpenRescheduleModal: false,
      isOpenCancelSessionModal: false,
      isOpenChangeLocationModal: false,
      isOpenInviteAthleteModal: false,
      isOpenOverridePriceModal: false,
      isOpenRemoveSessionModal: false,
      isOpenRepeatModal: false,
      isOpenNewhandleNewSchedularSettingeModalClose: false,
      isOpenSessionBufferModal: false,
      isOpenSessionNotesModal: false,
      isOpenCalendarModal: false,
      isOpenDeleteQuaterModal: false,
      isOpenOverrideOpenPositionsModal: false,
      isOpenOverrideGroupSizeModal: false,
      selectedSport: {},
      indexOfSelectedScheduledSession: null,
      selectedDate: moment().format(schedulesConstants.ISO_DATE_FORMAT),
      selectedScheduledSession: null,
      viewTab: 'list'
    };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.renderOptionMenu = this.renderOptionMenu.bind(this);
    this.renderSessions = this.renderSessions.bind(this);
    this.renderScheduleSessionItem = this.renderScheduleSessionItem.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNextDateButtonClick = this.handleNextDateButtonClick.bind(this);
    this.handlePreviousDateButtonClick = this.handlePreviousDateButtonClick.bind(this);

    this.handleNewScheduleASessionClick = this.handleNewScheduleASessionClick.bind(this);
    this.handleNewScheduleSessionModalClose = this.handleNewScheduleSessionModalClose.bind(this);

    this.handleSettingModalClick = this.handleSettingModalClick.bind(this);
    this.handleSettingModalClose = this.handleSettingModalClose.bind(this);

    this.handleRescheduleModalOpen = this.handleRescheduleModalOpen.bind(this);
    this.handleRescheduleModalClose = this.handleRescheduleModalClose.bind(this);

    this.handleCancelSessionModalOpen = this.handleCancelSessionModalOpen.bind(this);
    this.handleCancelSessionModalClose = this.handleCancelSessionModalClose.bind(this);

    this.handleChangeLocationModalOpen = this.handleChangeLocationModalOpen.bind(this);
    this.handleChangeLocationModalClose = this.handleChangeLocationModalClose.bind(this);

    this.handleInviteAthleteModalOpen = this.handleInviteAthleteModalOpen.bind(this);
    this.handleInviteAthleteModalClose = this.handleInviteAthleteModalClose.bind(this);

    this.handleOverridePriceModalOpen = this.handleOverridePriceModalOpen.bind(this);
    this.handleOverridePriceModalClose = this.handleOverridePriceModalClose.bind(this);

    this.handleRemoveSessionModalOpen = this.handleRemoveSessionModalOpen.bind(this);
    this.handleRemoveSessionModalClose = this.handleRemoveSessionModalClose.bind(this);

    this.handleRepeatModalOpen = this.handleRepeatModalOpen.bind(this);
    this.handleRepeatModalClose = this.handleRepeatModalClose.bind(this);

    this.handleSessionBufferModalOpen = this.handleSessionBufferModalOpen.bind(this);
    this.handleSessionBufferModalClose = this.handleSessionBufferModalClose.bind(this);

    this.handleSessionNotesModalOpen = this.handleSessionNotesModalOpen.bind(this);
    this.handleSessionNotesModalClose = this.handleSessionNotesModalClose.bind(this);

    this.handleCalenderModalOpen = this.handleCalenderModalOpen.bind(this);
    this.handleCalenderModalClose = this.handleCalenderModalClose.bind(this);

    this.handleDeleteQuaterModalOpen = this.handleDeleteQuaterModalOpen.bind(this);
    this.handleDeleteQuaterModalClose = this.handleDeleteQuaterModalClose.bind(this);

    this.handleOveridePositionModalOpen = this.handleOveridePositionModalOpen.bind(this);
    this.handleOveridePositionModalClose = this.handleOveridePositionModalClose.bind(this);

    this.handleChangeSport = this.handleChangeSport.bind(this);
    this.renderSportsMenu = this.renderSportsMenu.bind(this);
    this.handleTodayButtonCLicked = this.handleTodayButtonCLicked.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.handleOverrideOpenPositionsModalClose = this.handleOverrideOpenPositionsModalClose.bind(this);
    this.handleOverrideOpenPositionsModalOpen = this.handleOverrideOpenPositionsModalOpen.bind(this);
    this.handleOverrideGroupSizeModalOpen = this.handleOverrideGroupSizeModalOpen.bind(this);
    this.handleOverrideGroupSizeModalClose = this.handleOverrideGroupSizeModalClose.bind(this);
    this.renderSessionOptionModals = this.renderSessionOptionModals.bind(this);
    this.renderScheduledSessions = this.renderScheduledSessions.bind(this);
    this.renderUpcommingSession = this.renderUpcommingSession.bind(this);
    this.handleCreateSessionClick = this.handleCreateSessionClick.bind(this);
    this.renderPreviewProfile = this.renderPreviewProfile.bind(this);
    this.changeSport = this.changeSport.bind(this);
    this.handleView = this.handleView.bind(this);
  }
  componentDidMount() {
    const defaultSport = this.props.profile.data.summary.sports[0];
    const defaultId = defaultSport.id;
    this.props.fetchNewSessions({profileID: this.props.profile.data.profile.id, sportID: defaultId});
    const {query} = this.props;
    const queryDateString = query[schedulesConstants.queryFilters.date];
    this.setState({
      selectedSport: Object.assign({}, defaultSport),
      selectedDate: (queryDateString) ? queryDateString : moment().format(schedulesConstants.ISO_DATE_FORMAT)
    });
  }

  componentWillReceiveProps(nextProps) {
    const {query} = nextProps;
    const queryDateString = query[schedulesConstants.queryFilters.date];
    this.setState({
      selectedDate: (queryDateString) ? queryDateString : moment().format(schedulesConstants.ISO_DATE_FORMAT)
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentSport.status !== FULFILLED && this.props.currentSport.status === FULFILLED) {
      this.props.history.push(
        DASHBOARD_MANAGE_SPORT_SESSIONS_ADD + '?nb=1'
      );
    }
  }
  // Date
  updateDate(newMomentDate) {
    const {history} = this.props;
    const {location} = history;
    const {pathname} = location;
    const isToday = moment().isSame(newMomentDate, 'day');
    const momentDateString = newMomentDate.set({h: 0, m: 0}).format(schedulesConstants.ISO_DATE_FORMAT);
    const queryFilter = QueryString.stringify({
      [schedulesConstants.queryFilters.date]: (isToday === false) ? momentDateString : undefined
    });
    history.push({
      pathname,
      search: queryFilter
    });
  }

  handleDateChange(moment) {
    this.updateDate(moment);
  }
  handleNextDateButtonClick() {
    const currentDate = this.state.selectedDate;
    const nextDate = moment(currentDate, moment.ISO_8601).add(1, 'days');
    this.updateDate(nextDate);
  }
  handlePreviousDateButtonClick() {
    const todayDate = moment();
    const currentDate = this.state.selectedDate;
    if (todayDate.isBefore(currentDate)) {
      const previousDate = moment(currentDate, moment.ISO_8601).subtract(1, 'days');
      this.updateDate(previousDate);
    }
  }
  handleTodayButtonCLicked() {
    const todayDateObj = moment();
    this.updateDate(todayDateObj);
  }
  findElementById(array, id) {
    return array.find(element => {
      return element.id === id;
    });
  }

  // Sport
  handleChangeSport(e) {
    const id = e.currentTarget.dataset.id;
    if (id !== '1') {
      this.props.fetchNewSessions({profileID: this.props.profile.data.profile.id, sportID: id});
      const sport = this.findElementById(this.props.profile.data.summary.sports, id);
      this.setState({
        selectedSport: Object.assign({}, sport)
      });
    }
  }
  
  changeSport(sport) {
    this.setState({
      selectedSport: Object.assign({}, sport)
    });
  }

  handleViewChange(flag) {
    this.setState({showDragAndContent: flag});
  }

  // Session
  handleNewScheduleASessionClick() {
    this.setState({isOpenNewScheduleASessionModal: true});
  }
  handleNewScheduleSessionModalClose() {
    this.setState({isOpenNewScheduleASessionModal: false});
  }
  handleOveridePositionModalOpen(selectedScheduledSession) {
    this.setState({isOpenOveridePositionModal: true, selectedScheduledSession});
  }
  handleOveridePositionModalClose() {
    this.setState({isOpenOveridePositionModal: false});
  }
  // Setting
  handleSettingModalClick() {
    this.setState({isOpenNewSettingModal: true});
  }
  handleSettingModalClose() {
    this.setState({isOpenNewSettingModal: false});
  }
  // Re-schedule
  handleRescheduleModalOpen(selectedScheduledSession) {
    this.setState({isOpenRescheduleModal: true, selectedScheduledSession});
  }
  handleRescheduleModalClose() {
    this.setState({isOpenRescheduleModal: false});
  }
  // Cancel session
  handleCancelSessionModalOpen(selectedScheduledSession) {
    this.setState({isOpenCancelSessionModal: true, selectedScheduledSession});
  }
  handleCancelSessionModalClose() {
    this.setState({isOpenCancelSessionModal: false});
  }
  // Change location
  handleChangeLocationModalOpen(selectedScheduledSession) {
    this.setState({isOpenChangeLocationModal: true, selectedScheduledSession});
  }
  handleChangeLocationModalClose() {
    this.setState({isOpenChangeLocationModal: false});
  }
  // Invite athelete
  handleInviteAthleteModalOpen(selectedScheduledSession) {
    this.setState({isOpenInviteAthleteModal: true, selectedScheduledSession});
  }
  handleInviteAthleteModalClose() {
    this.setState({isOpenInviteAthleteModal: false});
  }
  // Overiride price
  handleOverridePriceModalOpen(selectedScheduledSession) {
    this.setState({isOpenOverridePriceModal: true, selectedScheduledSession});
  }
  handleOverridePriceModalClose() {
    this.setState({isOpenOverridePriceModal: false});
  }
  // Remove sessiob
  handleRemoveSessionModalOpen(selectedScheduledSession) {
    this.setState({isOpenRemoveSessionModal: true, selectedScheduledSession});
  }
  handleRemoveSessionModalClose() {
    this.setState({isOpenRemoveSessionModal: false});
  }

  // Repeat modal
  handleRepeatModalOpen(selectedScheduledSession) {
    this.setState({isOpenRepeatModal: true, selectedScheduledSession});
  }
  handleRepeatModalClose() {
    this.setState({isOpenRepeatModal: false});
  }

  // Session buffer
  handleSessionBufferModalOpen(selectedScheduledSession) {
    this.setState({isOpenSessionBufferModal: true, selectedScheduledSession});
  }

  handleOverrideOpenPositionsModalOpen(selectedScheduledSession) {
    this.setState({isOpenOverrideOpenPositionsModal: true, selectedScheduledSession});
  }

  handleOverrideGroupSizeModalOpen(selectedScheduledSession) {
    this.setState({isOpenOverrideGroupSizeModal: true, selectedScheduledSession});
  }

  handleOverrideGroupSizeModalClose() {
    this.setState({isOpenOverrideGroupSizeModal: false});
  }

  handleOverrideOpenPositionsModalClose() {
    this.setState({isOpenOverrideOpenPositionsModal: false});
  }

  handleSessionBufferModalClose() {
    this.setState({isOpenSessionBufferModal: false});
  }

  // Session notes
  handleSessionNotesModalOpen(selectedScheduledSession) {
    this.setState({isOpenSessionNotesModal: true, selectedScheduledSession});
  }
  handleSessionNotesModalClose() {
    this.setState({isOpenSessionNotesModal: false});
  }

  // Calender modal
  handleCalenderModalOpen() {
    this.setState({isOpenCalendarModal: true});
  }
  handleCalenderModalClose() {
    this.setState({isOpenCalendarModal: false});
  }

  // Delete quater modal
  handleDeleteQuaterModalOpen() {
    this.setState({isOpenDeleteQuaterModal: true});
  }
  handleDeleteQuaterModalClose() {
    this.setState({isOpenDeleteQuaterModal: false});
  }
  renderOptionMenu() {
    return (
      <div>
        <ul>
          <li><a onClick={this.handleCalenderModalOpen} data-uk-modal>Create New Calendar<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>
            <Modal isModalOpen={this.state.isOpenCalendarModal}>
              <CalendarModal onCancel={this.handleCalenderModalClose}/>
            </Modal>
          </li>
          <li><a onClick={this.handleCalenderModalOpen} data-uk-modal>Edit This Calendar<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>
            <Modal isModalOpen={this.state.isOpenCalendarModal}>
              <CalendarModal onCancel={this.handleCalenderModalClose}/>
            </Modal>
          </li>
          <li><a onClick={this.handleDeleteQuaterModalOpen} data-uk-modal>Delete This Calendar 1<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>
            <Modal isModalOpen={this.state.isOpenDeleteQuaterModal}>
              <DeleteQuaterModal onCancel={this.handleDeleteQuaterModalClose}/>
            </Modal>
          </li>
          <li><a onClick={this.handleDeleteQuaterModalOpen} data-uk-modal>Delete This Calendar 2<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a>
            <Modal isModalOpen={this.state.isOpenDeleteQuaterModal}>
              <DeleteQuaterModal onCancel={this.handleDeleteQuaterModalClose}/>
            </Modal>
          </li>
          <li><a target="_self">Make This Default Calendar<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a></li>
        </ul>
        <ul className="cl-schedule-dropdown-ul-2">
          <li><a >Quater 1<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a></li>
          <li><a >Quater 2<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a></li>
          <li><a >Quater 3<svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a></li>
          <li><a >Quater 4    <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg></a></li>
        </ul>
      </div>
    );
  }

  renderSessions(sessionsNew) {
    let DEFAULT = '';
    if (sessionsNew.isDefault === apiBooleanFlags.TRUE) {
      DEFAULT = 'DEFAULT,';
    }
    return (
      <div key={sessionsNew.id} className="uk-width-large-1-4 uk-width-medium-1-2">
        <div className="cl-schedule-drag-container">
          <div className="cl-schedule-drag-container-left" style={{background: sessionsNew.color}}/>

          <div className="cl-schedule-drag-container-right">{DEFAULT} {sessionsNew.name}, {sessionsNew.ageGroup.description}</div>

        </div>
      </div>
    );
  }

  /* eslint complexity:0 */
  renderSessionOptionModals() {
    const {
      selectedScheduledSession,
      isOpenRescheduleModal,
      isOpenInviteAthleteModal,
      isOpenChangeLocationModal,
      isOpenSessionNotesModal,
      isOpenOverridePriceModal,
      isOpenOverrideGroupSizeModal,
      isOpenSessionBufferModal,
      isOpenOverrideOpenPositionsModal,
      isOpenRepeatModal,
      isOpenRemoveSessionModal,
      isOpenCancelSessionModal
    } = this.state;

    return (
      <div>
        <Modal isModalOpen={isOpenRescheduleModal}>
          <ReScheduleModal onCancel={this.handleRescheduleModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>
        <Modal isModalOpen={isOpenInviteAthleteModal}>
          <InviteAthleteModal onCancel={this.handleInviteAthleteModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>
        <Modal isModalOpen={isOpenChangeLocationModal}>
          <ChangeLocationModal onCancel={this.handleChangeLocationModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>

        <Modal isModalOpen={isOpenSessionNotesModal}>
          <SessionNotesModal onCancel={this.handleSessionNotesModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>

        <Modal isModalOpen={isOpenOverridePriceModal}>
          <OveridePriceModal onCancel={this.handleOverridePriceModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>

        <Modal isModalOpen={isOpenOverrideGroupSizeModal}>
          <OverrideGroupSizeModal onCancel={this.handleOverrideGroupSizeModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>

        <Modal isModalOpen={isOpenSessionBufferModal}>
          <SessionBufferModal onCancel={this.handleSessionBufferModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>

        <Modal isModalOpen={isOpenOverrideOpenPositionsModal}>
          <OverrideOpenPositionsModal onCancel={this.handleOverrideOpenPositionsModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>

        <Modal isModalOpen={isOpenRepeatModal}>
          <RepeatModal onCancel={this.handleRepeatModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>

        <Modal isModalOpen={isOpenRemoveSessionModal}>
          <RemoveSessionModal onCancel={this.handleRemoveSessionModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>

        <Modal isModalOpen={isOpenCancelSessionModal}>
          <CancelSessionModal onCancel={this.handleCancelSessionModalClose} scheduledSession={selectedScheduledSession}/>
        </Modal>
      </div>
    );
  }
  /* eslint complexity:0 */

  renderScheduleSessionItem(scheduledSession) {
    return (
      <div key={scheduledSession.id}>
        <div className="cl-sd-add-session">
          <a onClick={this.handleNewScheduleASessionClick}/>
        </div>
        <ScheduledSessionItem
          scheduledSession={scheduledSession}
          onSelectRescheduleSession={this.handleRescheduleModalOpen}
          onSelectInviteAthlete={this.handleInviteAthleteModalOpen}
          onSelectChangeLocation={this.handleChangeLocationModalOpen}
          onSelectSessionNotes={this.handleSessionNotesModalOpen}
          onSelectOverridePrice={this.handleOverridePriceModalOpen}
          onSelectOverrideGroupSize={this.handleOverrideGroupSizeModalOpen}
          onSelectSessionBuffer={this.handleSessionBufferModalOpen}
          onSelectOverrideOpenPositions={this.handleOverrideOpenPositionsModalOpen}
          onSelectRepeat={this.handleRepeatModalOpen}
          onSelectRemoveSession={this.handleRemoveSessionModalOpen}
          onSelectCancelSession={this.handleCancelSessionModalOpen}
        />
      </div>
    );
  }

  renderScheduledSessions() {
    const {scheduledSessions, p} = this.props;
    const dateFormat = p.t('DashboardSchedules.noScheduledSessionsMsgDateFormat');
    const dateString = moment(this.state.selectedDate, appConstants.schedules.ISO_DATE_FORMAT).format(dateFormat);
    if (scheduledSessions.data.length > 0) {
      return (
        <div className="cl-schedule-listing">
          <div className="uk-grid">
            <div className="uk-width-1-1">
              <ul id="cl-schedule-tab-content" className="uk-switcher">
                <li className="uk-active">
                  <div className="calender-list-view">
                    {
                      scheduledSessions.data.map(this.renderScheduleSessionItem)
                    }
                  </div>
                </li>
                <li>
                  <div className="cl-sd-cal-view"/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="cl-sd-schedule-information">
        <h4>{p.t('DashboardSchedules.noScheduledSessionsMsg', {dateString})}</h4>
        <a onClick={this.handleNewScheduleASessionClick} >{p.t('DashboardSchedules.ClickHereToSchedule')}</a>
      </div>
    );
  }

  renderUpcommingSession() {
    const {scheduledSessions, p} = this.props;
    if (scheduledSessions.data.length === 0 && scheduledSessions.upcomming.length > 0) {
      return (
        <div className="calender-list-view cl-sd-upcoming-session">
          <div className="cl-sd-upcomingHead">
            <h4>{p.t('DashboardSchedules.upcommingSessions')}</h4>
          </div>
          <div className="uk-grid">
            <div className="uk-width-1-1">
              <ul id="cl-schedule-tab-content" className="uk-switcher">
                <li aria-hidden="false" className="uk-active">
                  <div className="calender-list-view">
                    {
                      scheduledSessions.upcomming.map(scheduledSession =>
                        (
                          <ScheduledSessionItem
                            key={scheduledSession.id}
                            showDate
                            scheduledSession={scheduledSession}
                            onSelectRescheduleSession={this.handleRescheduleModalOpen}
                            onSelectInviteAthlete={this.handleInviteAthleteModalOpen}
                            onSelectChangeLocation={this.handleChangeLocationModalOpen}
                            onSelectSessionNotes={this.handleSessionNotesModalOpen}
                            onSelectOverridePrice={this.handleOverridePriceModalOpen}
                            onSelectOverrideGroupSize={this.handleOverrideGroupSizeModalOpen}
                            onSelectSessionBuffer={this.handleSessionBufferModalOpen}
                            onSelectOverrideOpenPositions={this.handleOverrideOpenPositionsModalOpen}
                            onSelectRepeat={this.handleRepeatModalOpen}
                            onSelectRemoveSession={this.handleRemoveSessionModalOpen}
                            onSelectCancelSession={this.handleCancelSessionModalOpen}
                          />
                        ))
                    }
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  renderSportsMenu(sport) {
    return (
      <li key={sport.id} onClick={this.handleChangeSport} data-id={sport.id}><a>{sport.name}</a></li>
    );
  }

  renderPreviewProfile() {
    const {p, workingDays, profile, currentSport, sessions, scheduledSessions} = this.props;
    const profileStatus = getProfileStatus(profile, workingDays.data);
    const profileCompleted = getProfilePagesCompletionStatus(profileStatus);
    const sportStatus = getSportsDataFilledStatus(currentSport, sessions);
    const sportCompleted = getSportsCompletionStatus(sportStatus);
    const isSessionScheduled = Boolean(scheduledSessions.status === FULFILLED && (isNonEmptyArray(scheduledSessions.data) || isNonEmptyArray(scheduledSessions.upcomming)));

    if (profileCompleted && sportCompleted && isSessionScheduled) {
      const {nickName} = profile.data.profile;
      const sportID = currentSport.data.id;
      const url = parseUrlTemplate(VIEW_SSP_PROFILE_SPORT, {nickName, sportID});
      return (
        <div className="uk-grid" style={{marginTop: '60px'}}>
          <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
            <a className="general_btn" href={url}>{p.t('DashboardSchedules.previewProfile')}</a>
          </div>
          <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1"/>
        </div>
      );
    }
    return null;
  }
  handleCreateSessionClick() {
    const {selectedSport} = this.state;
    const {profile} = this.props.profile.data;
    this.props.fetchCurrentSport({profileID: profile.id, sportID: selectedSport.id});
  }
  
  handleView(e){
    if ( e == 'calendar' ) {
      moment.locale('en', {
          week: {
              dow: moment().isoWeekday()
          }
      })      
    } else {
      moment.locale('en', {
          week: {
              dow: 0
          }
      })      
    }
    this.setState({
      viewTab: e
    })
  }
  render() {
    const {sessionsNew, profile, p, scheduledSessions} = this.props;
    const selectedDate = moment(this.state.selectedDate, schedulesConstants.ISO_DATE_FORMAT);
    return (
      <div>
        <div className="cl-drag-schedule-section">
          <div className="uk-grid">
            <div className="uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-1 cl-sd-custom-large-3-10">
              <div className="cl-schedule-event-dp" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
                <a className="cl-schedule-event-name" target="_self">
                  {this.state.selectedSport.name}
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                    <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                  </svg>
                </a>
                <div className="uk-dropdown uk-dropdown-bottom schedule-event-dropdown ">
                  <ul>
                    {
                      profile.data.summary.sports.map(this.renderSportsMenu)
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className="uk-width-large-8-10 uk-width-medium-8-10 uk-width-small-1-1 cl-sd-custom-large-8-10">
              <p>{p.t('DashboardSchedules.scheduleSessionMessage2')}</p>
            </div>
          </div>
          <div className="uk-grid cl-schedule-sessions">
            {
              sessionsNew.data.map(this.renderSessions)
            }
          </div>
          <div className="cl-sd-session-type">
            <div className="cl-schedule-drag-container">
              <div className="cl-schedule-session-link">
                <a onClick={this.handleNewScheduleASessionClick} data-uk-modal>{p.t('DashboardSchedules.scheduleASession')}</a>
                <a onClick={this.handleCreateSessionClick} data-uk-modal>{p.t('DashboardSchedules.createASession')}</a>
                <Modal isModalOpen={this.state.isOpenNewScheduleASessionModal}>
                  <ScheduleASession onCancel={this.handleNewScheduleSessionModalClose} selectedDate={this.state.selectedDate} sportId={this.state.selectedSport.id} 
                    changeSport={this.changeSport} />
                </Modal>
              </div>
            </div>
          </div>
        </div>
        {this.state.viewTab == 'list' && 
        <div className="cl-schedule-date-selector">
          <div className="uk-grid">
            <div className="uk-width-large-5-10">
              <button onClick={this.handleTodayButtonCLicked} className="uk-button btn-turquoise-t2 uk-display-inline-block uk-vertical-align-top">{p.t('DashboardSchedules.today')}</button>
              <div className="calender-date-selector">
                <button onClick={this.handlePreviousDateButtonClick} className="uk-button no-border-right selected-date-right-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5417.5 3450 17 32">
                    <path id="Path-2" className="cls-1" d="M5,12.5l15.682,15L35,12.5" transform="translate(-5389 3446) rotate(90)"/>
                  </svg>
                </button>
                <Datetime
                  name="sessionDateFrom"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                  timeFormat={false}
                  dateFormat={p.t('DashboardSchedules.dateFormat')}
                  closeOnSelect
                  class="selected-date"
                  isValidDate={valid}
                />
                <button onClick={this.handleNextDateButtonClick} className="uk-button no-border-left selected-date-left-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5417.5 3450 17 32">
                    <path id="Path-2" className="cls-1" d="M5,12.5l15.682,15L35,12.5" transform="translate(-5429 3486) rotate(-90)"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="uk-width-large-5-10">
              <div className="calender-cta">
                <ul>
                  <li><a onClick={() => this.handleView('calendar')}>{calendarIcon()}</a></li>
                </ul>
                <a onClick={this.handleSettingModalClick} data-uk-modal className="cl-sd-setting">
                  {gearIcon()}
                </a>
              </div>
            </div>
          </div>
        </div>}
        <Modal isModalOpen={this.state.isOpenNewSettingModal}>
          <SchedulerSettingModal onCancel={this.handleSettingModalClose}/>
        </Modal>
        {this.state.viewTab == 'calendar' && 
          <SessionCalendarDnD schedulerSettingModal={this.handleSettingModalClick} handleView={this.handleView} p={p} />}
        {this.state.viewTab == 'list' && this.renderScheduledSessions() }
        {this.state.viewTab == 'list' && this.renderUpcommingSession() }
        {this.renderSessionOptionModals()}
        {/* this.renderPreviewProfile() */}
      </div>

    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      fetchNewSessions: PropTypes.func,
      sessionsNew: PropTypes.object,
      profile: PropTypes.object.isRequired,
      sports: PropTypes.array,
      currentSport: PropTypes.object.isRequired,
      scheduledSessions: PropTypes.object,
      history: PropTypes.object.isRequired,
      fetchCurrentSport: PropTypes.func.isRequired,
      workingDays: PropTypes.object.isRequired,
      sessions: PropTypes.object.isRequired,
      query: PropTypes.object.isRequired
    };
  }
}

DashboardScheduleSessions.defaultProps = {
  sessionsNew: {data: []},
  scheduledSessions: {data: []},
  fetchNewSessions: () => { },
  sports: []
};

const mapStateToProps = state => {
  const {
    sessionsNew, profile, userIDs, sport, workingDays, sessions, 
    scheduledSessions, router, currentSport, view
  } = state;
  return {
    sessionsNew,
    profile,
    currentSport,
    userIDs,
    sport,
    scheduledSessions,
    workingDays,
    sessions,
    query: router.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewSessions: userID => dispatch(fetchNewSessions(userID)),
    fetchCurrentSport: (profileID, sportID) => dispatch(fetchCurrentSport(profileID, sportID))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(DashboardScheduleSessions)));
