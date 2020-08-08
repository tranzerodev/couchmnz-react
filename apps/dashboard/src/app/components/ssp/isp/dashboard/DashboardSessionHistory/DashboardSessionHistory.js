import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import AutoSuggetion from '../../../../common/AutoSuggetion';
import QueryString from 'query-string';
import appConstants from '../../../../../constants/appConstants';
import ReactPaginate from 'react-paginate';

import {
  fetchSessionHistory
} from '../../../../../actions';
import DashboardHistoryItem from './DashboardHistoryItem';
import SessionBookingActions from '../SessionBookingActions/SessionBookingActions';
import Modal from '../../../../common/Modal';
import SSPCancelFutureSessions from '../DashboardScheduleModals/SSPCancelFutureSessions/SSPCancelFutureSessions';
import ReportAthleteModal from '../DashboardScheduleModals/ReportAthleteModal/ReportAthleteModal';

const ispSessionHistoryConstants = appConstants.ISPSessionHistory;
/* eslint react/no-deprecated:0  */
class DashboardSessionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      athleteName: null,
      booking: null,
      action: null,
      cancelFutureSessionBooking: null,
      isOpenCancelFutureSessionModal: false,
      reportAthleteBooking: null,
      isOpenReportAthleteModal: false,
      dropdownClasses: 'uk-button-dropdown theme-dropdown'
    };
    this.findElementById = this.findElementById.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.renderSportOptions = this.renderSportOptions.bind(this);
    this.handleChangeSport = this.handleChangeSport.bind(this);
    this.handleOnTrainedAthleteChange = this.handleOnTrainedAthleteChange.bind(this);
    this.handleAthleteSelectionChange = this.handleAthleteSelectionChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.renderSorter = this.renderSorter.bind(this);
    this.renderNumOfDaysFilter = this.renderNumOfDaysFilter.bind(this);
    this.renderStatusFilterItem = this.renderStatusFilterItem.bind(this);
    this.renderSessionHistorytems = this.renderSessionHistorytems.bind(this);
    this.handleCloseCancelFutureSessionModal = this.handleCloseCancelFutureSessionModal.bind(this);
    this.handleOnCancelFutureSession = this.handleOnCancelFutureSession.bind(this);
    this.handleOnReportAthlete = this.handleOnReportAthlete.bind(this);
    this.handleOnCloseReportAthleteModal = this.handleOnCloseReportAthleteModal.bind(this);
    this.changeDropdownState = this.changeDropdownState.bind(this);
  }

  componentDidMount() {
    this.setQueryFilterToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setQueryFilterToState(nextProps);
  }

  setQueryFilterToState(props) {
    const {query, trainedAthletes} = props;
    const athleteId = query[ispSessionHistoryConstants.queryFilters.athleteId];
    if (athleteId) {
      const athlete = trainedAthletes.find(athleteItem => athleteItem.id === athleteId);
      this.setState({
        athleteName: (athlete) ? athlete.name : null
      });
    }
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

  changeDropdownState() {
    this.setState({
      dropdownClasses: 'uk-button-dropdown theme-dropdown uk-dropdown-close'
    });
  }
  // Sport
  handleChangeSport(event) {
    this.changeDropdownState();
    const {value} = event.currentTarget.dataset;
    const newQueryParam = {
      [ispSessionHistoryConstants.queryFilters.sportId]: (value) ? value : undefined
    };
    this.updateQueryParams(newQueryParam);
  }

  // Days
  handleDaysChange(event) {
    this.changeDropdownState();
    const {dataset} = event.target;
    const days = dataset.value;
    const newQueryParam = {
      [ispSessionHistoryConstants.queryFilters.numOfDays]: (days && days > 0) ? days : undefined
    };

    this.updateQueryParams(newQueryParam);
  }
  // Sort
  handleSortChange(event) {
    this.changeDropdownState();
    const {dataset} = event.target;
    const value = dataset.value;
    const newQueryParam = {
      [ispSessionHistoryConstants.queryFilters.sortBy]: (value === ispSessionHistoryConstants.sorters.ALPHABETICAL) ? value : undefined
    };

    this.updateQueryParams(newQueryParam);
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

  handleOnTrainedAthleteChange(e, {newValue}) {
    this.changeDropdownState();
    if (typeof newValue === 'string') {
      this.setState({
        athleteName: newValue
      });
      if (newValue.trim().length === 0) {
        const newQueryParam = {
          [ispSessionHistoryConstants.queryFilters.athleteId]: undefined
        };

        this.updateQueryParams(newQueryParam);
      }
    }
  }

  handlePageClick(data) {
    const selectedPage = data.selected;
    const newQueryParam = {
      [ispSessionHistoryConstants.queryFilters.page]: (selectedPage > 0) ? selectedPage : undefined
    };
    this.updateQueryParams(newQueryParam);
  }

  handleAthleteSelectionChange(event, {suggestion}) {
    const athleteId = suggestion.id;
    const newQueryParam = {
      [ispSessionHistoryConstants.queryFilters.athleteId]: (athleteId) ? athleteId : undefined
    };

    this.updateQueryParams(newQueryParam);
  }

  // Status
  handleStatusChange(event) {
    this.changeDropdownState();
    const {dataset} = event.target;
    const status = dataset.value;
    const newQueryParam = {
      [ispSessionHistoryConstants.queryFilters.status]: (status) ? status : undefined
    };

    this.updateQueryParams(newQueryParam);
  }
  findElementById(array, id) {
    return array.find(element => {
      return element.id === id;
    });
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

  renderSorter() {
    const {p, query} = this.props;
    const sortby = query[ispSessionHistoryConstants.queryFilters.sortBy];
    const sorterName = (sortby === ispSessionHistoryConstants.sorters.ALPHABETICAL) ? p.t('SessionHistory.sorters.alphabetical') : p.t('SessionHistory.sorters.mostRecent');
    return (
      <div className="cl-mb-filtter-column cl-sh-1-5">
        <div className={this.state.dropdownClasses} data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
          <button className="uk-button">
            <span className="btn-text">{sorterName}</span>
            <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
              <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
            </svg>
          </button>
          <div className="uk-dropdown uk-dropdown-autoflip uk-dropdown-bottom">
            <ul>
              <li>
                <a onClick={this.handleSortChange} data-value={ispSessionHistoryConstants.sorters.MOST_RECENT}>{p.t('SessionHistory.sorters.mostRecent')}
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293">
                    <path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/>
                  </svg>
                </a>
              </li>
              <li>
                <a onClick={this.handleSortChange} data-value={ispSessionHistoryConstants.sorters.ALPHABETICAL}>{p.t('SessionHistory.sorters.alphabetical')}
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

  renderNumOfDaysFilter(item) {
    const {p} = this.props;
    return (
      <li key={item}>
        <a onClick={this.handleDaysChange} data-value={item}>{p.t('SessionHistory.lastNumDays', {numDays: item})}
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

  renderPagination() {
    const {query, p, sessionHistory} = this.props;
    const page = query[ispSessionHistoryConstants.queryFilters.page];
    const pageTotal = Math.ceil(sessionHistory.total / ispSessionHistoryConstants.pageLimit);
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

  renderSessionHistorytems(sessionHistory) {
    return (
      <DashboardHistoryItem key={sessionHistory.id} sessionHistory={sessionHistory} onBookingAction={this.handleManageBookingAction} onCancelFutureSession={this.handleOnCancelFutureSession} onReportAthlete={this.handleOnReportAthlete}/>
    );
  }

  renderStatusFilterItem(item) {
    const {p} = this.props;
    return (
      <li key={item}>
        <a onClick={this.handleStatusChange} data-value={item}>
          {p.t('SessionHistory.' + item)}
          <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293">
            <path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/>
          </svg>
        </a>
      </li>
    );
  }

  render() {
    const {p, sessionHistory, query, sports, trainedAthletes, userProfiles} = this.props;
    const totalsessions = sessionHistory.total;
    const {athleteName} = this.state;
    const sportId = query[ispSessionHistoryConstants.queryFilters.sportId];
    const sport = sports.find(item => item.id === sportId);
    const sportsName = (sport) ? sport.name : p.t('ManageBooking.sportNamePlaceholder');

    const numOfDays = query[ispSessionHistoryConstants.queryFilters.numOfDays];
    const status = query[ispSessionHistoryConstants.queryFilters.status];
    const statusName = status ? p.t('SessionHistory.' + status) : p.t('SessionHistory.status');

    const trainedAthleteAutoSuggestInputProps = {
      value: (athleteName) ? athleteName : '',
      onChange: this.handleOnTrainedAthleteChange,
      placeholder: p.t('ManageBooking.athletePlaceHolder')
    };

    return (
      <div className="booking-wrapper">
        <div className="cl-manage-booking-section">
          <div className="cl-manage-boking-filtter mt40">
            <div className="cl-mb-filtter-column cl-mb-1-13 cl-session-history-column">
              <span>{p.t('SessionHistory.numSessionCompletedIn', {totalsessions})}</span>
            </div>
            {
              this.renderSorter()
            }
            <div className="cl-mb-filtter-column cl-mb-1-7">
              <div className={`${this.state.dropdownClasses} uk-margin-remove`} data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
                <button className="uk-button">
                  <span className="btn-text">{p.t('SessionHistory.lastNumDays', {numDays: (numOfDays && numOfDays > 0) ? numOfDays : 90})}</span>
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                    <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                  </svg>
                </button>
                <div className="uk-dropdown">
                  <ul className="uk-nav uk-nav-dropdown uk-text-left">

                    {
                      ispSessionHistoryConstants.numOfDays.map(this.renderNumOfDaysFilter)
                    }

                  </ul>
                </div>
              </div>
            </div>

            <div className="cl-mb-filtter-column cl-sh-1-5">
              <div className={this.state.dropdownClasses} data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
                <button className="uk-button">
                  <span className="btn-text">{sportsName}</span>
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                    <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                  </svg>
                </button>
                <div className="uk-dropdown uk-dropdown-autoflip uk-dropdown-bottom">
                  <ul>
                  <li>
                    <a onClick={this.handleChangeSport}>
                      {p.t('SessionHistory.all')}
                      <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293">
                        <path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/>
                      </svg>
                    </a>
                  </li>                  
                    {
                      sports.map(this.renderSportOptions)
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className="cl-mb-filtter-column cl-sh-1-5">
              <AutoSuggetion
                list={trainedAthletes}
                inputProps={trainedAthleteAutoSuggestInputProps}
                onSelectSuggetion={this.handleAthleteSelectionChange}
              />

            </div>
            <div className="cl-mb-filtter-column cl-sh-1-8  uk-margin-remove">
              <div className={this.state.dropdownClasses} data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
                <button className="uk-button">
                  <span className="btn-text">{statusName}</span>
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                    <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                  </svg>
                </button>
                <div className="uk-dropdown uk-dropdown-autoflip uk-dropdown-bottom">
                  <ul>
                    {
                      ispSessionHistoryConstants.statusFilter.map(this.renderStatusFilterItem)
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <DashboardHistoryItems/> */}
          <div className="cl-manage-booking-listing-holder">
            {
              sessionHistory.data.map(this.renderSessionHistorytems)
            }
          </div>
          {this.props.sessionHistory && sessionHistory.total > 0 &&
            this.renderPagination()
          }
        </div>
        <SessionBookingActions
          selectedProfile={userProfiles.selectedProfile}
          booking={this.state.booking}
          action={this.state.action}
          onClose={this.handleClearBookingAction}
        />
        <SessionBookingActions booking={this.state.booking} action={this.state.action} onClose={this.handleClearBookingAction}/>
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
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      sessionHistory: PropTypes.object,
      history: PropTypes.object.isRequired,
      query: PropTypes.object.isRequired,
      sports: PropTypes.array,
      trainedAthletes: PropTypes.array,
      userProfiles: PropTypes.object.isRequired
    };
  }
}

DashboardSessionHistory.defaultProps = {
  sessionHistory: {data: [], totat: 0},
  sports: [],
  trainedAthletes: []
};
const mapStateToProps = state => {
  const {sessionsNew, profile, userProfiles, sport, router, trainedAthletes, sessionHistory} = state;
  return {
    sessionsNew,
    userProfiles,
    sport,
    sports: profile.data.summary.sports,
    trainedAthletes: trainedAthletes.data,
    sessionHistory,
    query: router.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSessionHistory: url => dispatch(fetchSessionHistory(url))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(DashboardSessionHistory)));
