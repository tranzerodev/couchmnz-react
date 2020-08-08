import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import QueryString from 'query-string';
import {Set as set} from 'immutable';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

import appConstants from '../../../../../constants/appConstants';
import DashboardBookingItem from './DashboardBookingItem';
import {fetchNewSessions} from '../../../../../actions';
import AutoSuggetion from '../../../../common/AutoSuggetion';
import SessionBookingActions from '../SessionBookingActions';
import Modal from '../../../../common/Modal';
import SSPCancelFutureSessions from '../DashboardScheduleModals/SSPCancelFutureSessions/SSPCancelFutureSessions';
import ReportAthleteModal from '../DashboardScheduleModals/ReportAthleteModal/ReportAthleteModal';

const convertToArray = value => {
  if (value) {
    if (Array.isArray(value)) {
      return (value);
    }
    return ([value]);
  }
  return ([]);
};

const manageBookingConstants = appConstants.manageBookings;
const {momentJSConstants} = appConstants;
/* eslint react/no-deprecated:0  */
class DashboardManageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      athleteName: null,
      booking: null,
      action: null,
      cancelFutureSessionBooking: null,
      isOpenCancelFutureSessionModal: false,
      reportAthleteBooking: null,
      isOpenReportAthleteModal: false
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.findElementById = this.findElementById.bind(this);
    this.handleChangeSport = this.handleChangeSport.bind(this);
    this.handleChangeMultipleSession = this.handleChangeMultipleSession.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.updateQueryParams = this.updateQueryParams.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderSportOptions = this.renderSportOptions.bind(this);
    this.setQueryFilterToState = this.setQueryFilterToState.bind(this);
    this.renderSessionOptions = this.renderSessionOptions.bind(this);
    this.renderEndDateFilter = this.renderEndDateFilter.bind(this);
    this.handleOnTrainedAthleteChange = this.handleOnTrainedAthleteChange.bind(this);
    this.handleAthleteSelectionChange = this.handleAthleteSelectionChange.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.handleManageBookingAction = this.handleManageBookingAction.bind(this);
    this.handleClearBookingAction = this.handleClearBookingAction.bind(this);
    this.renderManageBookingItems = this.renderManageBookingItems.bind(this);
    this.handleCloseCancelFutureSessionModal = this.handleCloseCancelFutureSessionModal.bind(this);
    this.handleOnCancelFutureSession = this.handleOnCancelFutureSession.bind(this);
    this.handleOnReportAthlete = this.handleOnReportAthlete.bind(this);
    this.handleOnCloseReportAthleteModal = this.handleOnCloseReportAthleteModal.bind(this);
  }
  componentDidMount() {
    const {sports, userProfiles} = this.props;
    this.setQueryFilterToState(this.props);
    const defaultSport = sports[0];
    const defaultId = defaultSport.id;
    this.props.fetchNewSessions({profileID: userProfiles.selectedProfile.id, sportID: defaultId});
  }

  setQueryFilterToState(props) {
    const {query, trainedAthletes} = props;
    const athleteId = query[manageBookingConstants.queryFilters.athleteId];
    if (athleteId) {
      const athlete = trainedAthletes.find(athleteItem => athleteItem.id === athleteId);
      this.setState({
        athleteName: (athlete) ? athlete.name : null
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setQueryFilterToState(nextProps);
  }
  handleCancelClick() {
    this.props.onCancel();
  }

  handlePageClick(data) {
    console.log('data > ', data);
    const selectedPage = data.selected;
    const newQueryParam = {
      [manageBookingConstants.queryFilters.page]: (selectedPage > 0) ? selectedPage : undefined
    };
    this.updateQueryParams(newQueryParam);
  }

  updateQueryParams(newParams) {
    const {history, query} = this.props;
    const {location} = history;
    const {pathname} = location;
    const updatedQuerObj = Object.assign({}, query, newParams);
    const queryFilter = QueryString.stringify(updatedQuerObj);
    history.push({
      pathname,
      search: queryFilter
    });
  }

  // Week
  handleEndDateChange(event) {
    const {dataset} = event.target;
    const endDateType = dataset.value;
    const {endDateFilter} = manageBookingConstants;
    let endDate = null;
    if (endDateType === endDateFilter.thisWeek) {
      endDate = moment().endOf(momentJSConstants.WEEK);
    } else if (endDateType === endDateFilter.thisMonth) {
      endDate = moment().endOf(momentJSConstants.MONTH);
    } else if (endDateType === endDateFilter.nextMonth) {
      endDate = moment().add(1, momentJSConstants.MONTH).endOf(momentJSConstants.MONTH);
    }

    const newQueryParam = {
      [manageBookingConstants.queryFilters.endDate]: (endDate) ? endDate.format(appConstants.schedules.ISO_DATE_FORMAT) : undefined
    };
    this.updateQueryParams(newQueryParam);
  }

  // Sport
  handleChangeSport(event) {
    const {value} = event.currentTarget.dataset;
    const newQueryParam = {
      [manageBookingConstants.queryFilters.sportId]: (value) ? value : undefined
    };
    this.updateQueryParams(newQueryParam);
  }
  // Session
  handleChangeMultipleSession(event) {
    const {value, checked} = event.target;
    const {query} = this.props;
    const sessionList = convertToArray(query[manageBookingConstants.queryFilters.sessionId]);
    let sessionsSet = set(sessionList);
    if (checked === true) {
      sessionsSet = sessionsSet.add(value);
    } else {
      sessionsSet = sessionsSet.remove(value);
    }

    const newSessionList = sessionsSet.toJS();

    const newQueryParam = {
      [manageBookingConstants.queryFilters.sessionId]: (newSessionList.length > 0) ? newSessionList : undefined
    };

    this.updateQueryParams(newQueryParam);
  }
  findElementById(array, id) {
    return array.find(element => {
      return element.id === id;
    });
  }

  handleAthleteSelectionChange(event, {suggestion}) {
    const athleteId = suggestion.id;
    const newQueryParam = {
      [manageBookingConstants.queryFilters.athleteId]: (athleteId) ? athleteId : undefined
    };

    this.updateQueryParams(newQueryParam);
  }

  handleOnTrainedAthleteChange(e, {newValue}) {
    if (typeof newValue === 'string') {
      this.setState({
        athleteName: newValue
      });
      if (newValue.trim().length === 0) {
        const newQueryParam = {
          [manageBookingConstants.queryFilters.athleteId]: undefined
        };

        this.updateQueryParams(newQueryParam);
      }
    }
  }

  renderSportOptions(sport, index) {
    return (
      <li key={index}>
        <a data-value={sport.id} onClick={this.handleChangeSport}>
          {sport.name}
          <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293">
            <path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/>
          </svg>
        </a>
      </li>
    );
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

  handleOnCancelFutureSession(booking) {
    this.setState({
      cancelFutureSessionBooking: booking,
      isOpenCancelFutureSessionModal: true
    });
  }

  handleOnReportAthlete(booking) {
    this.setState({
      isOpenReportAthleteModal: true,
      reportAthleteBooking: booking
    });
  }

  handleOnCloseReportAthleteModal() {
    this.setState({
      isOpenReportAthleteModal: false
    });
  }

  renderManageBookingItems(manageBookingItem, index) {
    return (
      <DashboardBookingItem key={index} manageBooking={manageBookingItem} onBookingAction={this.handleManageBookingAction} onCancelFutureSession={this.handleOnCancelFutureSession} onReportAthlete={this.handleOnReportAthlete}/>
    );
  }

  renderSessionOptions(session) {
    const {query} = this.props;
    const sessionList = convertToArray(query[manageBookingConstants.queryFilters.sessionId]);
    const isChecked = sessionList.includes(session.id);
    return (
      <li key={session.id} data-id={session.id}>
        <label className="container-ck bold-font-family">
          <span className="event-color" style={{backgroundColor: session.color}}/>
          <span className="event-text">{session.name}</span>
          <input type="checkbox" value={session.id} checked={isChecked} onChange={this.handleChangeMultipleSession}/>
          <span className="checkmark"/>
        </label>
      </li>
    );
  }

  renderPagination() {
    const {query, p, manageBookingsTotal} = this.props;
    const page = query[manageBookingConstants.queryFilters.page];
    const pageTotal = Math.ceil(manageBookingsTotal / manageBookingConstants.pageLimit);
    const pageNumber = (page) ? parseInt(page, 10) : 1;
    return (
      <div className="cl-pagination pad-t-30">
        <ReactPaginate
          forcePage={pageNumber - 1}
          disableInitialCallback
          previousLabel={p.t('ManageBooking.paginatePrev')}
          nextLabel={p.t('ManageBooking.paginateNext')}
          breakLabel={<a>...</a>}
          breakClassName={'break-me'}
          pageCount={pageTotal}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          disabledClassName={'uk-hidden'}
          containerClassName={'uk-pagination uk-pagination-left'}
          activeClassName={'uk-active'}
        />
      </div>
    );
  }
  renderEndDateFilter() {
    const {p, query} = this.props;
    const {queryFilters} = manageBookingConstants;
    const endDateQuerySting = query[queryFilters.endDate];
    let endDateType = p.t('ManageBooking.all');
    const currentDate = moment();
    if (endDateQuerySting) {
      const endDate = moment(endDateQuerySting, appConstants.schedules.ISO_DATE_FORMAT);
      if (endDate.isSame(currentDate, momentJSConstants.WEEK)) {
        endDateType = p.t('ManageBooking.thisWeek');
      } else if (endDate.isSame(currentDate, momentJSConstants.WEEK)) {
        endDateType = p.t('ManageBooking.thisMonth');
      } else if (endDate.isSame(currentDate.add(1, momentJSConstants.WEEK), momentJSConstants.WEEK)) {
        endDateType = p.t('ManageBooking.nextMonth');
      }
    }

    return (
      <div className="cl-mb-filtter-column">
        <div className="uk-button-dropdown theme-dropdown" data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
          <button className="uk-button">
            <span className="btn-text">{endDateType}</span>
            <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
              <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
            </svg>
          </button>
          <div className="uk-dropdown uk-dropdown-autoflip uk-dropdown-bottom">
            <ul>
              <li>
                <a onClick={this.handleEndDateChange} data-value={manageBookingConstants.endDateFilter.forever}>{p.t('ManageBooking.all')}
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293">
                    <path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/>
                  </svg>
                </a>
              </li>
              <li>
                <a onClick={this.handleEndDateChange} data-value={manageBookingConstants.endDateFilter.thisWeek}>{p.t('ManageBooking.thisWeek')}
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293">
                    <path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/>
                  </svg>
                </a>
              </li>
              <li>
                <a onClick={this.handleEndDateChange} data-value={manageBookingConstants.endDateFilter.thisMonth} >{p.t('ManageBooking.thisMonth')}
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293">
                    <path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/>
                  </svg>
                </a>
              </li>
              <li>
                <a onClick={this.handleEndDateChange} data-value={manageBookingConstants.endDateFilter.nextMonth} >{p.t('ManageBooking.nextMonth')}
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293">
                    <path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {p, sports, manageBookings, sessionsNew, trainedAthletes, query, userProfiles} = this.props;
    const {athleteName} = this.state;
    const sportId = query[manageBookingConstants.queryFilters.sportId];
    const sport = sports.find(item => item.id === sportId);
    const sportsName = (sport) ? sport.name : p.t('ManageBooking.sportNamePlaceholder');

    const trainedAthleteAutoSuggestInputProps = {
      value: (athleteName) ? athleteName : '',
      onChange: this.handleOnTrainedAthleteChange,
      placeholder: p.t('ManageBooking.athletePlaceHolder')
    };

    return (
      <div className="booking-wrapper">
        <div className="cl-manage-booking-section">
          <div className="cl-manage-boking-filtter mt40">
            <div className="cl-mb-filtter-column cl-mb-1-13">
              <span>{p.t('ManageBooking.filterBy')}</span>
            </div>

            <div className="cl-mb-filtter-column cl-mb-1-7">
              <div className="uk-button-dropdown theme-dropdown uk-margin-remove" data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
                <button className="uk-button">
                  <span className="btn-text">{sportsName}</span>
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                    <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                  </svg>
                </button>
                <div className="uk-dropdown uk-dropdown-autoflip uk-dropdown-bottom">
                  <ul>
                    {
                      sports.map(this.renderSportOptions)
                    }
                  </ul>
                </div>

              </div>
            </div>
            <div className="cl-mb-filtter-column">
              <div className="uk-button-dropdown theme-dropdown uk-margin-remove" data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
                <button className="uk-button">
                  <span className="btn-text">{p.t('ManageBooking.allSessions')}</span>
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                    <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                  </svg>
                </button>

                <div className="uk-dropdown">
                  <ul className="uk-nav uk-nav-dropdown uk-text-left">
                    {
                      sessionsNew.map(this.renderSessionOptions)
                    }
                  </ul>
                </div>
              </div>
            </div>
            {
              this.renderEndDateFilter()
            }
            <div className="cl-mb-filtter-column uk-margin-remove">
              <AutoSuggetion
                list={trainedAthletes}
                inputProps={trainedAthleteAutoSuggestInputProps}
                onSelectSuggetion={this.handleAthleteSelectionChange}
              />
            </div>
          </div>
          <div className="cl-manage-booking-listing-holder">
            {
              manageBookings.map(this.renderManageBookingItems)
            }
          </div>
          {
            this.renderPagination()
          }
        </div>
        <SessionBookingActions
          booking={this.state.booking}
          action={this.state.action}
          onClose={this.handleClearBookingAction}
          selectedProfile={userProfiles.selectedProfile}
        />
        <Modal isModalOpen={this.state.isOpenCancelFutureSessionModal}>
          <SSPCancelFutureSessions session={this.state.cancelFutureSessionBooking} onClose={this.handleCloseCancelFutureSessionModal}/>
        </Modal>
        <Modal isModalOpen={this.state.isOpenReportAthleteModal}>
          <ReportAthleteModal session={this.state.reportAthleteBooking} onClose={this.handleOnCloseReportAthleteModal}/>
        </Modal>

      </div>

    );
  }

  static get propTypes() {
    return {
      onCancel: PropTypes.func,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      manageBookings: PropTypes.array,
      sessionsNew: PropTypes.array,
      history: PropTypes.object.isRequired,
      query: PropTypes.object.isRequired,
      sports: PropTypes.array,
      fetchNewSessions: PropTypes.func.isRequired,
      userProfiles: PropTypes.object.isRequired,
      trainedAthletes: PropTypes.array,
      manageBookingsTotal: PropTypes.number
    };
  }
}
DashboardManageBooking.defaultProps = {
  manageBookingsTotal: 0,
  manageBookings: [],
  trainedAthletes: [],
  sports: [],
  sessionsNew: [],
  onCancel: () => {}
};
const mapStateToProps = state => {
  const {sessionsNew, userProfiles, sport, profile, trainedAthletes, manageBookings, router} = state;
  return {
    sessionsNew: sessionsNew.data,
    userProfiles,
    sport,
    sports: profile.data.summary.sports,
    manageBookings: manageBookings.data,
    manageBookingsTotal: manageBookings.total,
    trainedAthletes: trainedAthletes.data,
    query: router.query
  };
};

const mapDispatchToState = dispatch => {
  return {
    fetchNewSessions: profileSportId => dispatch(fetchNewSessions(profileSportId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToState)(translate(DashboardManageBooking)));
