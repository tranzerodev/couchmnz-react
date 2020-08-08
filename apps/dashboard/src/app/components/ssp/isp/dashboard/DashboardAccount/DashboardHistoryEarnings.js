import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {withRouter, Link} from 'react-router-dom';
import {fetchEarningsList} from '../../../../../actions';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import constants from '../../../../../constants/appConstants';
import moment from 'moment';
import PayoutHistoryHeader from './PayoutHistoryHeader';
import QueryString from 'query-string';
import {DASHBOARD_ACCOUNT_EARNING_DETAILS, DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS} from '../../../../../constants/pathConstants';
import appConstants from '../../../../../constants/appConstants';
import DatePicker from '../../../../common/DatePicker';
import {fetchISPTrainedAthletes} from '../../../../../actions';
import ReactPaginate from 'react-paginate';
import config from '../../../../../config';

const dateFormat = appConstants.orderHistoryDateFormat;
const fromMonthSub = appConstants.defaultFromMonthSub;

function isValidDate(current) {
  const today = moment();
  return current.isBefore(today);
}

class DashboardHistoryEarning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrderStatus: 'A',
      isFromDatePickerOpen: false,
      fromDate: moment().subtract(fromMonthSub, 'months').format('ll'),
      isToDatePickerOpen: false,
      toDate: moment().format('ll'),
      orderStatusSelected: {},
      filter: {
        from: moment().subtract(fromMonthSub, 'months').format(),
        to: moment().format(),
        filter: appConstants.defaultOrderStatus,
        page: appConstants.defaultPage
      },
      selectedAll: true,
      search: '',
      displayName: config.OrderFilter.defaultName,
      athletes: []
    };
    this.getClassName = this.getClassName.bind(this);
    this.renderEarningList = this.renderEarningList.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleEnterPressed = this.handleEnterPressed.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleFromClick = this.handleFromClick.bind(this);
    this.handleToClick = this.handleToClick.bind(this);
    this.onFromDateChange = this.onFromDateChange.bind(this);
    this.onToDateChange = this.onToDateChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.isValidToDate = this.isValidToDate.bind(this);
    this.renderAthleteDropDown = this.renderAthleteDropDown.bind(this);
    this.isExistingItem = this.isExistingItem.bind(this);
    this.handleItemSearch = this.handleItemSearch.bind(this);
    this.handleAthletes = this.handleAthletes.bind(this);
    this.handleSubmitChecked = this.handleSubmitChecked.bind(this);
    this.handleAll = this.handleAll.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handledefaultSelected = this.handledefaultSelected.bind(this);
    this.setInitialAthletes = this.setInitialAthletes.bind(this);
  }

  componentDidMount() {
    const {trainedAthletes} = this.props;
    if (this.props.profile.status === FULFILLED) {
      const profileID = this.props.profile.data.profile.id;
      this.setState({profileID});
      if (this.props.fetchEarningsList.status !== FULFILLED && this.props.fetchEarningsList.status !== PENDING && this.props.fetchEarningsList.status !== REJECTED) {
        this.props.fetchEarningsList(profileID);
      }
      if (trainedAthletes.status !== FULFILLED && trainedAthletes.status !== PENDING) {
        this.props.fetchISPTrainedAthletes(profileID);
      }
      if (this.props.trainedAthletes.status === FULFILLED) {
        this.setInitialAthletes();
      }
    }
  }

  renderEarningList(earning) {
    const priceUnit = this.props.earnings.priceUnit;
    return (
      <div key={earning.id} className="cl-sd-order-historySecOuter">
        <div className="cl-sd-order-historySecInner cl-sd-date">
          <h2>
            <span> {moment(earning.bookingDate).format('MMM')}</span> {moment(earning.bookingDate).date()} <span>{moment(earning.bookingDate).year()}</span>
          </h2>
        </div>
        <div className="cl-sd-order-historySecInner">
          <h4><Link to={this.getLocation(earning.id)} > {earning.name}  </Link></h4>
          <p><Link to={this.getLocation(earning.id)} > Order ID: {earning.number} <i className="fa fa-circle"/> Athlete: {earning.athlete.name}</Link>
          </p>
        </div>
        <div className="cl-sd-order-historySecInner">
          <h2 className="cl-sd-price">{priceUnit}{earning.amountPaid}</h2>
          <h5 className={this.getClassName(earning.status)}>{this.props.p.t('OrderHistory.status.' + earning.status)}</h5>
        </div>
      </div>
    );
  }
  getClassName(status) {
    let className;
    switch (status.toUpperCase()) {
      case constants.orderStatus.PAID:
        className = 'cl-sd-green';
        break;
      case constants.orderStatus.IN_PROGRESS :
        className = 'cl-sd-orange';
        break;
      case constants.orderStatus.DISPUTED :
        className = 'cl-sd-red';
        break;
      case constants.orderStatus.FAILED:
        className = 'cl-sd-red';
        break;
      default :
        className = 'cl-sd-green';
    }
    return className;
  }

  getLocation(orderId) {
    return {
      pathname: DASHBOARD_ACCOUNT_EARNING_DETAILS,
      state: {orderId}
    };
  }
  handleAthletes(e) {
    console.log('Called Handle Function');
    const trainedAthlete = this.handleItemSearch(this.props.trainedAthletes.data, e.target.value);
    this.setState({selectedAll: false});
    const {athletes} = this.state;

    if (e.target.checked === true) {
      athletes.push(trainedAthlete);
      this.setState({displayName: config.OrderFilter.custom});
    } else {
      const id = trainedAthlete.id;
      const index = athletes.findIndex(item => item.id === id);
      if (index > -1) {
        athletes.splice(index, 1);
        this.setState({displayName: config.OrderFilter.custom});
      }
    }
    this.setState({athletes});
    if (this.state.athletes.length === this.props.trainedAthletes.data.length) {
      this.setState({selectedAll: true});
    } else {
      this.setState({selectedAll: false});
    }
  }
  setInitialAthletes() {
    console.log('called Initial Athletes');
    const {athletes} = this.state;
    let newAthlete = [];
    const selectedAll = true;
    this.setState({displayName: config.OrderFilter.defaultName});
    newAthlete = [].concat(athletes, this.props.trainedAthletes.data);
    this.setState({athletes: newAthlete, selectedAll});
  }
  handleAll(e) {
    const {athletes} = this.state;
    let newAthlete = [];
    let selectedAll = false;
    if (e.target.checked === true) {
      this.setState({displayName: config.OrderFilter.defaultName});
      newAthlete = [].concat(athletes, this.props.trainedAthletes.data);
      selectedAll = true;
    }
    this.setState({athletes: newAthlete, selectedAll});
  }
  handleItemSearch(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return Object.assign({}, array[i]);
      }
    }
    return undefined;
  }
  handleSearchChange(e) {
    e.preventDefault();
    const {filter} = this.state;
    const newFilterData = Object.assign({}, filter, {
      search: e.target.value
    });
    this.setState({filter: newFilterData});
  }
  handleSearchSubmit() {
    this.applyChangedFilters();
  }
  applyChangedFilters() {
    const {filter} = this.state;
    const {history, query} = this.props;
    const updatedFilters = Object.assign({}, query, filter);
    const url = DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS;
    if (url) {
      const search = QueryString.stringify(updatedFilters);
      history.push({
        pathname: DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS,
        search
      });
    }
  }
  handleEnterPressed(event) {
    const code = event.keyCode || event.which;
    if (code === 13) {
      this.handleSearchSubmit();
    }
  }
  renderDropDown() {
    const dropdownList = appConstants.orderOptions;
    const {selectedOrderStatus} = this.state;
    return (
      <div data-uk-dropdown="{mode:'click'}" className="cl-sd-status-dropdown">
        <label>Status:</label>
        <a value={selectedOrderStatus}>{this.props.p.t('OrderHistory.status.' + selectedOrderStatus)}<svg className="cl-icon-arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="-759.531 -5139.53 11.063 6.591"><g transform="translate(-962.105 -6007)"><path data-name="Path 148" className="cl-icon-arrow-down-1" d="M-17914.895-2197l5,5,5-5" transform="translate(18118 3065)"/></g></svg>
        </a>
        <ul className="uk-dropdown">
          {
            dropdownList.map(item =>
              (
                <li key={item}>
                  <a onClick={this.handleStatusChange} value={item}>{this.props.p.t('OrderHistory.status.' + item)} <span className="cl-sd-icon"><svg className="cl-icon-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-804.53 -5141.531 6.591 11.063"><g transform="translate(-1001.605 -5996.5)"> <path data-name="Path 149" className="cl-icon-arrow-right-1" d="M-17914.895-2197l5,5,5-5" transform="translate(2394.606 -17049.395) rotate(-90)"/></g></svg></span>
                  </a>
                </li>
              )
            )
          }
        </ul>
      </div>
    );
  }
  isValidToDate(current) {
    const today = moment();
    return current.isBetween(this.state.filter.from, today);
  }
  handlePageClick(page) {
    const pageNo = page.selected + 1;
    console.log('Page No :: ', page.selected);
    const {filter} = this.state;
    const newFilterData = Object.assign({}, filter, {
      page: pageNo
    });
    this.setState({filter: newFilterData}, () => {
      this.applyChangedFilters();
    });
  }
  applyDefaultParams() {
    this.applyChangedFilters();
  }
  handleFromClick() {
    const isFromDatePickerOpen = !this.state.isFromDatePickerOpen;
    this.setState({isFromDatePickerOpen});
  }
  handleToClick() {
    const isToDatePickerOpen = !this.state.isToDatePickerOpen;
    this.setState({isToDatePickerOpen});
  }
  onFromDateChange(date) {
    this.handleFromClick();
    this.setState({fromDate: date.format('ll')});
    const {filter} = this.state;
    const newFilterData = Object.assign({}, filter, {
      from: date.format()
    });
    this.setState({filter: newFilterData}, () => {
      this.applyChangedFilters();
    });
  }
  onToDateChange(date) {
    this.handleToClick();
    this.setState({toDate: date.format('ll')});
    const {filter} = this.state;
    const newFilterData = Object.assign({}, filter, {
      to: date.format()
    });
    this.setState({filter: newFilterData}, () => {
      this.applyChangedFilters();
    });
  }
  handleStatusChange(event) {
    // Get status value and save in filter state
    const value = event.currentTarget.getAttribute('value');

    const {filter} = this.state;
    const newFilterData = Object.assign({}, filter, {
      filter: value
    });
    this.setState({filter: newFilterData}, () => {
      this.applyChangedFilters();
    });
    this.setState({selectedOrderStatus: value});
  }

  isExistingItem(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return true;
      }
    }
    return false;
  }
  handleSubmitChecked() {
    const {athletes} = this.state;
    const profileIds = [];
    for (let i = 0; i < athletes.length; i++) {
      profileIds.push(athletes[i].id);
    }
    const {filter} = this.state;
    const newFilterData = Object.assign({}, filter, {
      profileIds: profileIds.join()
    });
    this.setState({filter: newFilterData}, () => {
      this.applyChangedFilters();
    });
  }

  handledefaultSelected() {
    console.log('Called Default Selected');
    this.setState({athletes: this.props.trainedAthletes.data});
  }

  renderAthleteDropDown() {
    const {trainedAthletes} = this.props;
    if (trainedAthletes.data.length > 0) {
      return (
        <div data-uk-dropdown="{mode:'click'}" className="cl-sd-status-dropdown">
          <label>Athlete:</label>
          <a href="#">{this.state.displayName}<svg className="cl-icon-arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="-759.531 -5139.53 11.063 6.591"><g transform="translate(-962.105 -6007)"><path data-name="Path 148" className="cl-icon-arrow-down-1" d="M-17914.895-2197l5,5,5-5" transform="translate(18118 3065)"/></g></svg>
          </a>
          <ul className="uk-dropdown cl-sd-checkboxlist">
            <li>
              <input className="" id="all" type="checkbox" value="all" onChange={this.handleAll} checked={this.state.selectedAll}/>
              <label htmlFor="all">All</label>
            </li>
            {
              trainedAthletes.data.map(athlete => {
                return (
                  <li key={athlete.id}>
                    <input
                      value={athlete.id}
                      className=""
                      onChange={this.handleAthletes}
                      id={athlete.id}
                      type="checkbox"
                      checked={this.isExistingItem(this.state.athletes, athlete.id)}
                    />
                    <label htmlFor={athlete.id}>{athlete.name}</label>
                  </li>
                );
              })
            }
            <li>
              <div className="tableDiv">
                <div className="lCol">
                  <a onClick={this.handleSubmitChecked} className="general_btn">See Order</a>
                </div>
                <div className="rCol"/>
              </div>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  }
  render() {
    const earningsList = this.props.earnings.data;
    console.log('Earnings :: ', earningsList);
    const {fromDate, toDate} = this.state;
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="cl-sd-trainingLocationInner cl-sd-order-history">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <h1>{this.props.p.t('PayoutHistory.heading')}</h1>
            </div>
          </div>
          <PayoutHistoryHeader/>
          <div className="cl-sd-searchOuter">
            <div className="field-holder">
              <input type="text" name="search" placeholder="Search by order ID, session or SSP name" onChange={this.handleSearchChange} onKeyPress={this.handleEnterPressed}/>
              <span className="cl-sd-searchIcon">
                <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                  <path fill="#666666" d="M23.891,20.858l-4.691-4.693c0.838-1.486,1.356-3.178,1.356-5.004c0-5.667-4.611-10.277-10.278-10.277C4.61,0.884,0,5.494,0,11.161c0,5.668,4.61,10.28,10.278,10.28c2.511,0,4.783-0.94,6.572-2.441l4.45,4.451L23.891,20.858zM2.541,11.161c0-4.266,3.471-7.736,7.737-7.736c4.266,0,7.736,3.471,7.736,7.736c0,4.268-3.47,7.738-7.736,7.738C6.011,18.898,2.541,15.429,2.541,11.161z"/>
                </svg>
              </span>
              <button type="submit" onClick={this.handleSearchSubmit}>Search</button>
            </div>
          </div>
          <div className="uk-grid" >
            <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-2 uk-width-small-1-1">
              {this.renderDropDown()}
            </div>

            <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-2 uk-width-small-1-1">
              <div data-uk-dropdown="{mode:'click'}" className="cl-sd-status-dropdown">
                <label>From:</label>
                <span>
                  <a onClick={this.handleFromClick}>
                    {fromDate}
                  </a>
                  <DatePicker
                    defaultValue={moment().subtract(fromMonthSub, 'months').format(dateFormat)}
                    isValidDate={isValidDate}
                    handleChange={this.onFromDateChange}
                    date={fromDate}
                    isOpen={this.state.isFromDatePickerOpen}
                  />

                </span>
              </div>
            </div>
            <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-2 uk-width-small-1-1">
              <div data-uk-dropdown="{mode:'click'}" className="cl-sd-status-dropdown">
                <label>To:</label>
                <span>
                  <span>
                    <a onClick={this.handleToClick}>
                      {toDate}
                    </a>
                    <DatePicker
                      defaultValue={moment().format(dateFormat)}
                      isValidDate={this.isValidToDate}
                      handleChange={this.onToDateChange}
                      date={toDate}
                      isOpen={this.state.isToDatePickerOpen}
                    />
                  </span>
                </span>
              </div>
            </div>
            {this.renderAthleteDropDown()}
          </div>
        </div>
        <div className="cl-sd-order-historySec">
          {earningsList.map(this.renderEarningList)}
          <div className="scheduler-paging">
            <div className="scheduler-pagingContainer">
              <ReactPaginate
                previousLabel={<span><i className="uk-icon uk-icon-long-arrow-left"/> Previous</span>}
                nextLabel={<span>Next <i className="uk-icon uk-icon-long-arrow-right"/></span>}
                breakLabel={<a>...</a>}
                breakClassName={'break-me'}
                pageCount={this.props.earnings.total / 5}
                marginPagesDisplayed={10}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'uk-pagination uk-pagination-lef'}
                activeClassName={'active'}
                previousLinkClassName="scheduler-pagingPrev"
                nextLinkClassName="scheduler-pagingNext"
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      fetchEarningsList: PropTypes.func.isRequired,
      earnings: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      query: PropTypes.object,
      fetchISPTrainedAthletes: PropTypes.func.isRequired,
      trainedAthletes: PropTypes.object.isRequired
    };
  }
}
DashboardHistoryEarning.defaultProps = {
  query: {}
};

const mapStateToProps = state => {
  const {profile, earnings, router, trainedAthletes} = state;
  const {query} = router;
  console.log('State :: ', state);
  return {
    profile,
    earnings,
    query,
    trainedAthletes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEarningsList: profileID => dispatch(fetchEarningsList({profileID})),
    fetchISPTrainedAthletes: profileID => dispatch(fetchISPTrainedAthletes(profileID))
  };
};
export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(DashboardHistoryEarning)));

