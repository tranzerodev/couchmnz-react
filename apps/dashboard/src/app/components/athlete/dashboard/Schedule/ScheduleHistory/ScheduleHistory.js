import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import QueryString from 'query-string';
import pathToRegExp from 'path-to-regexp';

import ScheduleHistoryItem from './ScheduleHistoryItem';
import appConstants from '../../../../../constants/appConstants';
import {DASHBOARD_ATHLETE_SCHEDULER_HISTORY, DASHBOARD, DASHBOARD_ATHLETE_SCHEDULE} from '../../../../../constants/pathConstants';
import ReportInstructorModal from '../ReportInstructorModal';
import RequestRefundModal from '../RequestRefundModal';
import CancelFutureSessionModal from '../CancelFutureSessions';
import SeeOnMapModal from '../SeeOnMapModal';

import {fetchAthleteFutureSessions, fetchVolumeDiscounts} from '../../../../../actions/index';
import {getProfileId} from '../../../../../middlewares/athlete/schedulerUtils';
import {FULFILLED} from '../../../../../constants/ActionTypes';

const {from, to, page, sortBy, order} = appConstants.sessionHistory.queryFilters;

const dateFormat = appConstants.schedulerNavigationDateFormat;

class ScheduleHistory extends Component {
  constructor(props) {
    super(props);
    this.renderHistoryItems = this.renderHistoryItems.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderDateRange = this.renderDateRange.bind(this);
    this.renderInMonths = this.renderInMonths.bind(this);
    this.renderInYears = this.renderInYears.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.applyChangedFilters = this.applyChangedFilters.bind(this);
    this.renderSortBy = this.renderSortBy.bind(this);
    this.handleSortBySelect = this.handleSortBySelect.bind(this);
    this.getSelectedSortBy = this.getSelectedSortBy.bind(this);
    this.getSelectedDateRange = this.getSelectedDateRange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReportModalClose = this.handleReportModalClose.bind(this);
    this.handleReportModalOpen = this.handleReportModalOpen.bind(this);
    this.rendeReportInstructorModal = this.rendeReportInstructorModal.bind(this);
    this.renderRequestRefundModal = this.renderRequestRefundModal.bind(this);
    this.handleRequestRefundModalOpen = this.handleRequestRefundModalOpen.bind(this);
    this.handleRequestRefundModalClose = this.handleRequestRefundModalClose.bind(this);
    this.handleCancelationModalClose = this.handleCancelationModalClose.bind(this);
    this.handleCancelationModalOpen = this.handleCancelationModalOpen.bind(this);
    this.handleSeeOnMapModalClose = this.handleSeeOnMapModalClose.bind(this);
    this.handleSeeOnMapModalModalOpen = this.handleSeeOnMapModalModalOpen.bind(this);
    this.renderSeeMapModal = this.renderSeeMapModal.bind(this);
    this.getUrlWithProfileType = this.getUrlWithProfileType.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);

    this.state = {
      session: {},
      isReportInstructorModalOpen: false,
      isRequestRefundModalOpen: false,
      isCancelationModalOpen: false,
      trainingLocation: {},
      isSeeOnMapModalOpen: false
    };
  }

  getUrlWithProfileType(url) {
    const {selectedProfile} = this.props;
    if (selectedProfile) {
      const toPath = pathToRegExp.compile(url);
      return toPath({profileType: selectedProfile.type});
    }
    return DASHBOARD;
  }

  handlePageClick(data) {
    const filterItems = {
      [page]: data.selected + 1
    };
    this.applyChangedFilters(filterItems);
  }

  handleDateRangeChange(e) {
    const {dataset} = e.currentTarget;
    const filterItems = {
      [from]: dataset.from,
      [to]: dataset.to
    };
    this.applyChangedFilters(filterItems);
  }

  handleSortBySelect(e) {
    const {dataset} = e.currentTarget;
    const filterItems = {
      [sortBy]: dataset.sortby,
      [order]: dataset.order
    };
    this.applyChangedFilters(filterItems);
  }

  applyChangedFilters(filterItems) {
    const {history, query} = this.props;
    const updatedFilters = Object.assign({}, query, filterItems);
    const url = this.getUrlWithProfileType(DASHBOARD_ATHLETE_SCHEDULER_HISTORY);
    if (url) {
      const search = QueryString.stringify(updatedFilters);
      history.push({
        pathname: url,
        search
      });
    }
  }

  handleRequestRefundModalOpen(session) {
    this.setState({isRequestRefundModalOpen: true, session});
  }

  handleRequestRefundModalClose() {
    this.setState({isRequestRefundModalOpen: false});
  }

  getSelectedSortBy() {
    const {query} = this.props;
    const sortByValue = query[sortBy] ? query[sortBy] : appConstants.sessionHistory.sort[0].sortBy;
    const orderValue = query[order] ? query[order] : appConstants.sessionHistory.sort[0].order;
    return appConstants.sessionHistory.sort.find(obj => obj.order === orderValue && obj.sortBy === sortByValue);
  }

  getSelectedDateRange() {
    const {query} = this.props;
    const fromValue = query[from] ? query[from] : moment().format(dateFormat);
    const toValue = query[from] ? query[to] : moment().add(3, 'M').format(dateFormat);

    const difference = Math.abs(moment(fromValue).diff(toValue, 'month', false));
    if (difference >= 11 && moment(toValue).year() === moment(fromValue).year()) {
      return moment(toValue).year();
    }
    return this.props.p.t('ScheduleHistory.month', {numberOfMonths: difference});
  }

  handleBack(e) {
    e.preventDefault();
    const {history} = this.props;
    if (history.action === 'PUSH') {
      history.goBack();
    } else {
      const url = this.getUrlWithProfileType(DASHBOARD_ATHLETE_SCHEDULE);
      history.push(url);
    }
  }

  handleReportModalClose() {
    this.setState({isReportInstructorModalOpen: false});
  }

  handleReportModalOpen(session) {
    this.setState({isReportInstructorModalOpen: true, session});
  }

  handleCancelationModalClose() {
    this.setState({isCancelationModalOpen: false, session: {}});
  }

  handleCancelationModalOpen(session) {
    const {selectedProfile} = this.props;
    const profileId = getProfileId(selectedProfile);
    if (profileId) {
      this.props.fetchAthleteFutureSessions({
        orderId: session.order.id,
        sessionId: session.sessionId,
        profileId,
        profileType: selectedProfile.type});
      this.props.fetchVolumeDiscounts({
        profileId: session.ssp.id,
        profileType: selectedProfile.type,
        sportId: session.sport.id,
        trainingTypeId: session.trainingType.id
      });
    }
    this.setState({isCancelationModalOpen: true, session});
  }

  handleSeeOnMapModalModalOpen(trainingLocation) {
    this.setState({isSeeOnMapModalOpen: true, trainingLocation});
  }

  handleSeeOnMapModalClose() {
    this.setState({isSeeOnMapModalOpen: false, trainingLocation: {}});
  }

  renderHistoryItems() {
    const {sessions} = this.props.scheduleSessionHistory.data;
    if (sessions && sessions.length) {
      return sessions.map(session =>
        (
          <ScheduleHistoryItem
            key={session.orderItem.id}
            session={session}
            onReportInstructor={this.handleReportModalOpen}
            onRequestRefund={this.handleRequestRefundModalOpen}
            onCancelationModalOpen={this.handleCancelationModalOpen}
            onSeeOnMap={this.handleSeeOnMapModalModalOpen}
            selectedProfileType={this.props.selectedProfile.type}
          />
        )
      );
    }
  }

  rendeReportInstructorModal() {
    const {isReportInstructorModalOpen, session} = this.state;
    if (isReportInstructorModalOpen) {
      return (
        <ReportInstructorModal
          isModalOpen={isReportInstructorModalOpen}
          onClose={this.handleReportModalClose}
          session={session}
        />
      );
    }
  }

  renderDateRange() {
    return (
      <ul>
        {this.renderInMonths()}
        {this.renderInYears()}
      </ul>
    );
  }

  renderInMonths() {
    const {p} = this.props;
    return Array.apply(null, {length: appConstants.sessionHistory.monthRangeCount}).map((value, index) =>
      (
        <li
          key={value}
        >
          <a
            data-to={moment().format(dateFormat)}
            data-from={moment().subtract(appConstants.sessionHistory.monthRangeCount * (index + 1), 'M').format(dateFormat)}
            onClick={this.handleDateRangeChange}
          >{p.t('ScheduleHistory.month', {
              numberOfMonths: appConstants.sessionHistory.monthRangeCount * (index + 1)
            })}
          </a>
        </li>
      )
    );
  }

  renderInYears() {
    return Array.apply(null, {length: appConstants.sessionHistory.yearRangeCount}).map((value, index) =>
      (
        <li
          key={value}
        >
          <a
            data-from={moment().subtract(index, 'year').set('M', 0).startOf('month').format(dateFormat)}
            data-to={moment().subtract(index, 'year').set('M', 11).endOf('month').format(dateFormat)}
            onClick={this.handleDateRangeChange}
          >{moment().subtract(index, 'year').year()}
          </a>
        </li>
      )
    );
  }

  renderSortBy() {
    const {p} = this.props;
    const {t} = p;
    return (
      <ul>
        {appConstants.sessionHistory.sort.map(object =>
          (
            <li key={object.order + object.sortBy}>
              <a
                data-sortby={object.sortBy}
                data-order={object.order}
                onClick={this.handleSortBySelect}
              >{t('ScheduleHistory.sort.' + object.textKey)}
              </a>
            </li>
          )
        )}

      </ul>
    );
  }

  renderRequestRefundModal() {
    const {isRequestRefundModalOpen} = this.state;
    if (isRequestRefundModalOpen) {
      return (
        <RequestRefundModal
          isModalOpen={isRequestRefundModalOpen}
          onClose={this.handleRequestRefundModalClose}
          session={this.state.session}
        />
      );
    }
  }

  renderCancelationModal() {
    const {session, isCancelationModalOpen} = this.state;
    if (isCancelationModalOpen) {
      return (
        <CancelFutureSessionModal
          isModalOpen={isCancelationModalOpen}
          onClose={this.handleCancelationModalClose}
          session={session}
        />
      );
    }
  }

  renderSeeMapModal() {
    const {trainingLocation, isSeeOnMapModalOpen} = this.state;
    if (isSeeOnMapModalOpen) {
      return (
        <SeeOnMapModal
          isModalOpen={isSeeOnMapModalOpen}
          onClose={this.handleSeeOnMapModalClose}
          trainingLocation={trainingLocation}
        />
      );
    }
  }

  renderEmpty() {
    const {scheduleSessionHistory} = this.props;
    if (scheduleSessionHistory.status === FULFILLED && scheduleSessionHistory.data.total <= 0) {
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
            <p>{this.props.p.t('ScheduleHistory.empty')}</p>
          </div>
        </div>
      );
    }
  }

  render() {
    const {p, scheduleSessionHistory, query} = this.props;
    const {t} = p;
    const sortByObject = this.getSelectedSortBy();

    const pageNumber = (query[page]) ? parseInt(query[page], 10) : 0;

    const pageCount = parseInt((scheduleSessionHistory.data.total / appConstants.sessionHistory.pageLimit), 10);

    return (
      <div className="scheduler-wrapper">
        <div className="scheduler-navigationHeader">
          <div className="scheduler-navigationLink">
            <a onClick={this.handleBack}><i className="uk-icon-long-arrow-left"/> {t('ScheduleHistory.back')}</a>
          </div>
          <div className="scheduler-navigationContent">
            {t('ScheduleHistory.session_history')}
          </div>
        </div>
        <div className="scheduler-historyFilter">
          <div className="scheduler-historyFilterColumn">
            {t('ScheduleHistory.sort_by')}:
            <div className="uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
              <button className="uk-button">
                {sortByObject ? t('ScheduleHistory.sort.' + sortByObject.textKey) : ''}
                <i className="cl-icon cl-icon-down"/>
              </button>
              <div className="uk-dropdown cl-arrow-dropdown">
                {this.renderSortBy()}
              </div>
            </div>
          </div>
          <div className="scheduler-historyFilterColumn">
            {t('ScheduleHistory.bookings_in',
              {total: scheduleSessionHistory.data.total}
            )}:
            <div className="uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
              <button className="uk-button">{this.getSelectedDateRange()} <i className="cl-icon cl-icon-down"/></button>
              <div className="uk-dropdown cl-arrow-dropdown">
                {this.renderDateRange()}
              </div>
            </div>
          </div>
        </div>
        <div className="scheduler-calendar">
          <div className="scheduler-calendarContainer">
            <div className="scheduler-calendarListView">
              {this.renderHistoryItems()}
              {this.renderEmpty()}
            </div>
            {
              Boolean(scheduleSessionHistory.status === FULFILLED && scheduleSessionHistory.data.total > 0 && pageCount > 1) && (
                <div className="scheduler-paging">
                  <div className="scheduler-pagingContainer">
                    <ReactPaginate
                      previousLabel={<span><i className="uk-icon uk-icon-long-arrow-left"/> {t('ScheduleHistory.previous')}</span>}
                      nextLabel={<span>{t('ScheduleHistory.next')} <i className="uk-icon uk-icon-long-arrow-right"/></span>}
                      breakLabel={<a>...</a>}
                      breakClassName={'break-me'}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={'uk-pagination uk-pagination-lef'}
                      activeClassName={'active'}
                      disabledClassName={'uk-hidden'}
                      previousLinkClassName="scheduler-pagingPrev"
                      nextLinkClassName="scheduler-pagingNext"
                      forcePage={(pageNumber - 1)}
                    />
                  </div>
                </div>
              )
            }
          </div>
        </div>
        {
          this.rendeReportInstructorModal()
        }
        {
          this.renderRequestRefundModal()
        }
        {
          this.renderCancelationModal()
        }
        {
          this.renderSeeMapModal()
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      history: PropTypes.object.isRequired,
      scheduleSessionHistory: PropTypes.object.isRequired,
      query: PropTypes.object.isRequired,
      fetchAthleteFutureSessions: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      fetchVolumeDiscounts: PropTypes.func.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAthleteFutureSessions: params => dispatch(fetchAthleteFutureSessions(params)),
    fetchVolumeDiscounts: params => dispatch(fetchVolumeDiscounts(params))
  };
};

const mapStateToProps = state => {
  const {athlete, router, userProfiles} = state;
  const {scheduleSessionHistory} = athlete;
  const {selectedProfile} = userProfiles;
  const {query} = router;
  return {
    scheduleSessionHistory,
    query,
    selectedProfile
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(ScheduleHistory)));
