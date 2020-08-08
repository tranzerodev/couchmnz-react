import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom'
import SmallList from './sessP3List';
import translate from 'redux-polyglot/translate';
import PropTypes from 'prop-types';
import FiltSelect from './sessFiltSelectR1';
import FilterSelect from './sessFilterSelect';
import { DASHBOARD_SHOPPING_CART } from '../../constants/pathConstants'
import {fetchSSPSessions, createShoppingCart, updateShoppingCartItems} from '../../actions/index';
import QueryString from 'query-string';
import appConstants from '../../constants/appConstants';
import {getShoppingCartId, saveSchedules} from '../../utils/shoppingCart';
import {isAuthenticated} from '../../../auth/auth';
import {FULFILLED} from '../../constants/ActionTypes';
import config from '../../config'
import DatePicker from './DatePicker';
import isSameDay from '../../utils/isSameday';
import {isFutureDates} from '../../utils/datePicker';

const {shoppingCart} = appConstants;
const {actions} = shoppingCart;

function noneHighlight() {
  return false;
}

/* eslint react/no-deprecated:0 */
class FindASession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterVisible: true,
      activeDate: new Date(),
      selected: {
        location: [],
        service: [],
        facility: [],
        skills: [],
        ageGroups: [],
        genders: []
      },
      headerState: '',
      showBody: true,
      sessionArray: {},
      loading: true,
      sspID: '',
      WeekStart: 0,
      weekStartDate: 0,
      weekEndDate: 0,
      currMonth: 0,
      currYear: 0,
      selectedSessionList: [],
      sessionFilteredList: props.sessionFilteredList ? props.sessionFilteredList : [],
      sessionList: []

    };
    
    /* End of State-Def */
    /* Date Parameters for date conversion since it has excess info
     */
    this.dateParams = {
      days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthEndsSY: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthEndsLY: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthBrief: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      monthDesc: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };

    this.weekSchedule = {};
    this.handleNonScriptLink = this.handleNonScriptLink.bind(this);
    this.handleAccord = this.handleAccord.bind(this);
    this.handleFilterParamSubmit = this.handleFilterParamSubmit.bind(this);
    this.getFlatArray = this.getFlatArray.bind(this);
    this.handleFiltVis = this.handleFiltVis.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleTimeSlot = this.handleTimeSlot.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.disabledDatesThisMonth = this.disabledDatesThisMonth.bind(this);
    this.consolidateSessionDates = this.consolidateSessionDates.bind(this);
    this.handleCartHandover = this.handleCartHandover.bind(this);
    this.buildQuery = this.buildQuery.bind(this);
    this.handleScheduleSelect = this.handleScheduleSelect.bind(this);
    this.handleAddtoCart = this.handleAddtoCart.bind(this);
    this.renderShoppingCartIcon = this.renderShoppingCartIcon.bind(this);
    this.handleVolumeDiscounSelect = this.handleVolumeDiscounSelect.bind(this);
    this.isDayHighlighted = this.isDayHighlighted.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.renderDatePicker = this.renderDatePicker.bind(this);
    this.filterSessionOnSelectedDate = this.filterSessionOnSelectedDate.bind(this);
    this.handleCartVisibility = this.handleCartVisibility.bind(this);
    this.findSSP = this.findSSP.bind(this);
  }
  static get propTypes() {
    return {
      sessions: PropTypes.array,
      booked: PropTypes.object,
      instUSP: PropTypes.string,
      sessionFilteredList: PropTypes.array,
      sessionCalledAs: PropTypes.string,
      onFilterUpdate: PropTypes.func,
      onClick: PropTypes.func,
      onSelect: PropTypes.func,
      sessionStatus: PropTypes.string,
      filters: PropTypes.object.isRequired,
      fetchSSPSessions: PropTypes.func.isRequired,
      nickname: PropTypes.string.isRequired,
      sportID: PropTypes.string.isRequired,
      sspID: PropTypes.string.isRequired,
      sspData: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      offerTerminology: PropTypes.string.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      createShoppingCart: PropTypes.func.isRequired,
      updateShoppingCartItems: PropTypes.func.isRequired,
      cartItems: PropTypes.array.isRequired,
      onLogIn: PropTypes.func.isRequired,
      userInfo: PropTypes.object.isRequired,
      handleToggleSidePanel: PropTypes.func.isRequired
    };
  }

  handleDateSelect(value) {
    const date = value.toDate();
    this.setState({activeDate: date});
  }

  handleMonthChange(value) {
    const {selected} = this.state;
    const date = value.toDate();
    // this.setState({activeDate: date});
    const queryString = this.buildQuery(selected, date);
    this.props.fetchSSPSessions(this.props.nickname, this.props.sportID, queryString);
  }

  isDayHighlighted(day) {
    const {sessionFilteredList} = this.props;
    
    return sessionFilteredList.some(session =>
      isSameDay(day, moment(session.sessionTime.start)));
      
    
  }

  filterSessionOnSelectedDate(session) {
    const {activeDate} = this.state;
    const { minimumNoticeTime } = this.props
    
    let sameDay = isSameDay(moment(session.sessionTime.start), moment(activeDate))
    
    if ( sameDay && moment().add(minimumNoticeTime, 'hours') > moment(session.sessionTime.start)) {
      sameDay = false
    }
    return sameDay
  }

  /* Mobile Screen dimensions filtermenu toggle */
  handleFiltVis(event) {
    event.preventDefault();
    const newState = !this.state.filterVisible;
    this.setState({filterVisible: newState});
  }
  /* Prevent clicking of a link from calling a page */
  handleNonScriptLink(event) {
    event.preventDefault();
  }

  /* Initiate the Component */
  componentDidMount() {
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.setState({activeDate: today});
    this.setState({currMonth: this.state.activeDate.getMonth()});
    this.setState({currYear: this.state.activeDate.getFullYear()});
    this.setState({sessionFilteredList: this.props.sessionFilteredList});
    this.handleRefresh();

    this.props.fetchSSPSessions(this.props.nickname, this.props.sportID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({sessionFilteredList: nextProps.sessionFilteredList, timeFilter: ''});
    }
  }

  disabledDatesThisMonth(sessionArray) {
    console.log('For Dates:' + sessionArray);
  }
  /* YTD - List of Dates for the react-calendar component */
  consolidateSessionDates(sessionArray) {
    console.log('For Dates:' + sessionArray);
  }
  /* For More than one option within the ordered list */

  getFlatArray(tgtArray, recArray) {
    if (tgtArray.indexOf(recArray) === -1) {
      tgtArray.push(recArray);
    }
  }

  handleFilterParamSubmit(newState, name) {
    const selected = Object.assign({}, this.state.selected);
    selected[name] = Object.assign([], newState);
    this.setState({selected});
    const {activeDate} = this.state;
    const queryString = this.buildQuery(selected, activeDate);
    this.props.fetchSSPSessions(this.props.nickname, this.props.sportID, queryString);
  }

  /* ---------------------------------------------------------------------
  Display the current week at the top scrolling through the activity chart
  ----------------------------------------------------------------------- */
  /* Accordion Style expand and collapse on clicking the header */
  handleAccord(event) {
    event.preventDefault();
    if (this.state.showBody === true) {
      this.setState({headerState: 'open', showBody: false});
    } else {
      this.setState({headerState: '', showBody: true});
    }
  }
  /* Time Slot Filter Function */
  handleTimeSlot(event) {
    const {value} = event.target;
    this.setState({timeFilter: value});
    const {activeDate} = this.state;
    const start24 = moment(activeDate.toISOString());
    const end24 = moment(activeDate.toISOString());
    if (value === 'M') {
      start24.set({hour: 0, minute: 0, second: 0});
      end24.set({hour: 11, minute: 59, second: 59});
    } else if (value === 'A') {
      start24.set({hour: 12, minute: 0, second: 0});
      end24.set({hour: 16, minute: 59, second: 59});
    } else if (value === 'E') {
      start24.set({hour: 17, minute: 0, second: 0});
      end24.set({hour: 23, minute: 59, second: 59});
    }
    const outputArray = [];
    const inputArray = this.props.sessionFilteredList;
    for (let count = 0; count < inputArray.length; count++) {
      if ((moment(inputArray[count].sessionTime.start).isSameOrAfter(start24)) &&
      (moment(inputArray[count].sessionTime.start).isSameOrBefore(end24))) {
        outputArray.push(inputArray[count]);
      }
    }
    this.setState({sessionFilteredList: outputArray});
  }
  handleRefresh() {
    this.setState({sessionFilteredList: this.props.sessionFilteredList});
  }

  /* Action on Add to Cart */
  handleCartHandover() {
    const sessionBookList = this.state.selectedSessionList;
    this.props.onSelect(...sessionBookList);
  }

  buildQuery(selected, date) {
    const {eventQueries} = appConstants;
    // Const dateWithoutTime = moment(date.toISOString()).utc().startOf('day');
    const queryString = {
      [eventQueries.location]: selected.location.length > 0 ? selected.location.join(',') : undefined,
      [eventQueries.service]: selected.service.length > 0 ? selected.service.join(',') : undefined,
      [eventQueries.facility]: selected.facility.length > 0 ? selected.facility.join(',') : undefined,
      [eventQueries.gender]: selected.genders.length > 0 ? selected.genders.join(',') : undefined,
      [eventQueries.ageGroup]: selected.ageGroups.length > 0 ? selected.ageGroups.join(',') : undefined,
      [eventQueries.skill]: selected.skills.length > 0 ? selected.skills.join(',') : undefined,
      [eventQueries.date]: date.toISOString()
    };
    return '?' + QueryString.stringify(queryString, {encode: false, strict: false});
  }

  handleAddtoCart() {
    const {selectedSessionList} = this.state;
    if (selectedSessionList.length) {
      if (isAuthenticated()) {
        const cartId = getShoppingCartId();
        if (cartId) {
          this.props.updateShoppingCartItems(
            {
              action: actions.add,
              data: selectedSessionList
            }, cartId);
        } else {
          this.props.createShoppingCart({eventIds: selectedSessionList});
        }
      } else {
        saveSchedules(selectedSessionList);
        this.props.onLogIn();
      }
      this.setState({selectedSessionList: []});
    }
  }

  handleScheduleSelect(scheduleId, isChecked, startTime) {
    const selectedSessionList = Object.assign([], this.state.selectedSessionList);
    if (isChecked) {
      const schedule = {
        eventId: scheduleId,
        qty: 1,
        startTime
      };
      selectedSessionList.push(schedule);
    } else {
      const index = selectedSessionList.findIndex(schedule => schedule.eventId === scheduleId);
      if (index > -1) {
        selectedSessionList.splice(index, 1);
      }
    }
    this.setState({selectedSessionList});
  }

  handleVolumeDiscounSelect(scheduleId, qty, startTime) {
    const selectedSessionList = Object.assign([], this.state.selectedSessionList);
    const index = selectedSessionList.findIndex(schedule => schedule.eventId === scheduleId);
    if (index > -1) {
      selectedSessionList[index].qty = qty;
    } else {
      const schedule = {
        eventId: scheduleId,
        qty,
        startTime
      };
      selectedSessionList.push(schedule);
    }
    this.setState({selectedSessionList});
  }

  renderShoppingCartIcon() {
    const {userInfo, cartItems, nickname} = this.props;
    const order = cartItems.find(order => order.nickname === nickname);
    const cartItemCount = order && order.orderItems.length ? order.orderItems.length : 0;
    if (userInfo.status === FULFILLED && isAuthenticated() && cartItemCount > 0) {
      return (
        <a onClick={this.props.handleToggleSidePanel} className="sidebarOnOff" >
          {cartItemCount > 0 && <span className="notification-number">{cartItemCount}</span> }
          <svg id="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="-1476 701 26 26">
            <path
              id="Union_2"
              data-name="Union 2"
              className="cls-1"
              d="M19.381,25.049h-.017a3.251,3.251,0,0,1,0-4.595,3.249,3.249,0,0,1,4.594,4.595,3.23,3.23,0,0,1-4.577,0ZM20.9,21.986a1.063,1.063,0,0,0-.317.757,1.082,1.082,0,0,0,1.092,1.091,1.064,1.064,0,0,0,.757-.317h.018a1.173,1.173,0,0,0,.3-.775,1.127,1.127,0,0,0-.3-.757h-.018a1.062,1.062,0,0,0-.757-.317A1.1,1.1,0,0,0,20.9,21.986ZM6.372,25.049a3.232,3.232,0,0,1-.951-2.306,3.28,3.28,0,0,1,.933-2.289h.017a3.23,3.23,0,0,1,4.577,0h.017a3.249,3.249,0,0,1-4.594,4.595Zm1.214-2.306a1.092,1.092,0,0,0,.3.775H7.9a1.064,1.064,0,0,0,.757.317,1.082,1.082,0,0,0,1.092-1.091,1.064,1.064,0,0,0-.317-.757,1.106,1.106,0,0,0-.775-.317,1.062,1.062,0,0,0-.757.317H7.886A1.05,1.05,0,0,0,7.587,22.743Zm1.866-4.331a3.171,3.171,0,0,1-2.13-.809,3.207,3.207,0,0,1-1.091-2.025L4.594,3.1a1.107,1.107,0,0,0-.369-.669L4.19,2.394a1.137,1.137,0,0,0-.669-.229H1.074A1.082,1.082,0,0,1,0,1.074,1.067,1.067,0,0,1,1.074,0H3.521A3.273,3.273,0,0,1,5.58.739L5.668.81A3.269,3.269,0,0,1,6.742,2.834l.334,2.588H24.908A1.082,1.082,0,0,1,26,6.5a1.048,1.048,0,0,1-.035.247l-1.813,9.118a3.232,3.232,0,0,1-1.127,1.813,3.271,3.271,0,0,1-2.06.739C17.163,18.343,13.273,18.413,9.453,18.413Zm11.512-2.165A1.024,1.024,0,0,0,21.652,16a.972.972,0,0,0,.37-.6l1.567-7.816H7.358l1.021,7.728a1.108,1.108,0,0,0,.37.669,1.085,1.085,0,0,0,.7.264c2.558,0,5.125-.016,7.683-.016Q19.055,16.232,20.965,16.248Z"
              transform="translate(-1476 701)"
            />
          </svg>
        </a>
      );
    }
  }

  renderDatePicker() {
    const {activeDate} = this.state;
    const {sessionStatus} = this.props;
    const isDayHighlightedCheck = sessionStatus === FULFILLED ? this.isDayHighlighted : noneHighlight;
    return (
      <DatePicker
        date={moment(activeDate)}
        onChange={this.handleDateSelect}
        isDayHighlighted={isDayHighlightedCheck}
        onNextMonthClick={this.handleMonthChange}
        onPrevMonthClick={this.handleMonthChange}
        isDayBlocked={isFutureDates}
      />
    );
  }

  handleCartVisibility() {
    const {userProfiles} = this.props;
    if (userProfiles.status === FULFILLED) {
      const {data} = userProfiles;
      const isSameUser = data.findIndex(this.findSSP);
      return isSameUser < 0;
    }
    return true;
  }

  findSSP(profile) {
    const {sspID} = this.props;
    return profile.id === sspID && profile.type === appConstants.userProfileTypes.ISP;
  }

  render() {
    const {filters} = this.props;
    console.log('filters: ', filters);
    const {selected, timeFilter} = this.state;
    const {location, service, facility, skills, ageGroups, genders} = selected;
    const shouldShowCart = this.handleCartVisibility();
    const {p} = this.props;
    return (
      <div id="find-a-session" className="sec-session custom-accordian-con">
        <div className="sub-heading">
          <h2 className={this.state.headerState} onClick={this.handleAccord}>{p.t('SSPProfile.findSession.heading', {sessionName: this.props.sessionCalledAs ? this.props.sessionCalledAs.singular : ''})}</h2>
          <div className="calender-cta">
            <ul data-uk-switcher="{connect:'#calender-tab-content'}">
              {this.renderShoppingCartIcon()}
            </ul>
          </div>
          <div className="clear-both"/>
          <p>{this.props.instUSP}</p>
        </div>
        <div className="content-find-a-session" style={(this.state.showBody ? {display: 'block'} : {display: 'none'})}>
          <ul id="calender-tab-content" className="uk-nav uk-nav-dropdown uk-text-left">
            <li>
              <div className="calender-grid-view">
                {/*  <div className="uk-grid"> */}
                <div className="grid-calender-con-outer">
                  <div className="grid-calender-con equalHeightDiv" >
                    <div className="grid-calender-heading">
                      <span className="step-no">1</span>
                      {p.t('SSPProfile.findSession.preference')}
                    </div>
                    {filters &&
                    <div className="grid-calender-body">
                      <FiltSelect
                        containerClassName="filtter-row"
                        heading={p.t('SSPProfile.findSession.filters.location')}
                        filterOptions={filters.locations}
                        selectedOption={location}
                        onSubmit={this.handleFilterParamSubmit}
                        
                        type="location"
                      />
                      <FilterSelect
                        containerClassName="filtter-row"
                        heading={p.t('SSPProfile.findSession.filters.service')}
                        filterOptions={filters.services}
                        selectedOption={service}
                        onSubmit={this.handleFilterParamSubmit}
                        allOption={p.t('SSPProfile.allValues.optionAll')}
                        type="service"
                      />
                      <FilterSelect
                        containerClassName="filtter-row"
                        heading={p.t('SSPProfile.findSession.filters.facility')}
                        filterOptions={filters.facilities}
                        selectedOption={facility}
                        onSubmit={this.handleFilterParamSubmit}
                        allOption={p.t('SSPProfile.allValues.optionAll')}
                        type="facility"
                      />
                      <FilterSelect
                        containerClassName="filtter-row"
                        heading={p.t('SSPProfile.findSession.filters.skill')}
                        filterOptions={filters.skillLevels}
                        selectedOption={skills}
                        onSubmit={this.handleFilterParamSubmit}
                        allOption={p.t('SSPProfile.allValues.optionAll')}
                        type="skills"
                      />
                      <FilterSelect
                        containerClassName="filtter-row"
                        heading={p.t('SSPProfile.findSession.filters.age')}
                        filterOptions={filters.ageGroups}
                        selectedOption={ageGroups}
                        onSubmit={this.handleFilterParamSubmit}
                        allOption={p.t('SSPProfile.allValues.optionAll')}
                        type="ageGroups"
                      />
                      <FilterSelect
                        containerClassName="filtter-row"
                        heading={p.t('SSPProfile.findSession.filters.gender')}
                        filterOptions={filters.genders}
                        selectedOption={genders}
                        onSubmit={this.handleFilterParamSubmit}
                        allOption={p.t('SSPProfile.allValues.optionAll')}
                        type="genders"
                      />
                    </div>
                    }
                  </div>
                </div>
                <div className="grid-calender-con-outer">
                  <div className="grid-calender-con equalHeightDiv">
                    <div className="grid-calender-heading">
                      <span className="step-no">2</span>
                      {p.t('SSPProfile.findSession.date')}
                    </div>
                    <div className="grid-calender-body">
                      {
                        this.renderDatePicker()
                      }
                      <p className="calender-hint">
                        {p.t('SSPProfile.findSession.dateDesc')} <span className="themeOrangeText">{p.t('SSPProfile.findSession.dateColor')}</span> {p.t('SSPProfile.findSession.dateEndDesc')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid-calender-con-outer">
                  <div className="grid-calender-con equalHeightDiv">
                    <div className="grid-calender-heading">
                      <span className="step-no">3</span>
                      {p.t('SSPProfile.findSession.selectSession', {sessionName: this.props.sessionCalledAs ? this.props.sessionCalledAs.plural : ''})}
                    </div>
                    <div className="selected-date">
                      <span className="clickedDay">{this.dateParams.weekdays[this.state.activeDate.getDay()]}</span>
                      <span className="clickedDate">{this.dateParams.monthDesc[this.state.activeDate.getMonth()]} {this.state.activeDate.getDate()}, {this.state.activeDate.getFullYear()}</span>
                    </div>
                    <div className="grid-calender-body">
                      <div className="event-time">
                        <input className="" id="spr1" type="radio" name="gen" onClick={this.handleTimeSlot} value="M" checked={timeFilter === 'M'}/>
                        <label htmlFor="spr1">{p.t('SSPProfile.findSession.morning')}</label>
                        <input className="" id="spr2" type="radio" name="gen" onClick={this.handleTimeSlot} value="A" checked={timeFilter === 'A'}/>
                        <label htmlFor="spr2">{p.t('SSPProfile.findSession.afternoon')}</label>
                        <input className="" id="spr3" type="radio" name="gen" onClick={this.handleTimeSlot} value="E" checked={timeFilter === 'E'}/>
                        <label htmlFor="spr3">{p.t('SSPProfile.findSession.evening')}</label>
                      </div>
                      <div className="cal-grid-event-list">
                        <SmallList
                          offerTerminology={this.props.offerTerminology}
                          sessionList={this.state.sessionFilteredList.filter(this.filterSessionOnSelectedDate)}
                          selected={this.state.selectedSessionList}
                          onSelect={this.handleScheduleSelect}
                          sessionFilterStatus={this.props.sessionStatus}
                          onVolumeDiscountSelect={this.handleVolumeDiscounSelect}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="cal-list-footer">
                    <div className="btn-red">
                      {shouldShowCart &&
                      <a onClick={this.handleAddtoCart}>{p.t('SSPProfile.add_to_cart')}</a>}
                    </div>
                    <div className="btn-msg">
                      {/* Change to Process to check out for now*/}
                      {/* <a onClick={this.handleCartHandover}>{p.t('SSPProfile.findSession.contactButton')}</a> */}
                      {isAuthenticated() && shouldShowCart && this.props.cartItems && this.props.cartItems.length > 0 &&
                      <a href={config.dashboardShoppingCart}>{p.t('SSPProfile.proceedToCheckout')}</a>}
                    </div>
                  </div>
                </div>
              </div>
              {/*  </div>  */}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {viewssp, shoppingCart, auth, userProfiles} = state;
  const {sspData} = viewssp;
  const {sspSessions} = viewssp;
  const {cartData} = shoppingCart;
  const {userInfo} = auth;
  return {
    minimumNoticeTime: viewssp.sspData.data.minimum_notice_time,
    filters: sspData.data.sessionFilters,
    offerTerminology: sspData.data.trainingTerm,
    sessionStatus: sspSessions.status,
    cartItems: cartData.data.cartItems,
    userInfo,
    userProfiles,
    sspID: sspData && sspData.data ? sspData.data.sspID : '',
    nickname: sspData && sspData.data ? sspData.data.nickname : ''
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSSPSessions: (nickname, sportID, sspSessionQueryString) => dispatch(fetchSSPSessions(nickname, sportID, sspSessionQueryString)),
    createShoppingCart: data => dispatch(createShoppingCart(data)),
    updateShoppingCartItems: (data, cartId) => dispatch(updateShoppingCartItems(data, cartId))
  };
};

export default translate(connect(mapStateToProps, mapDispatchToProps)(FindASession));
