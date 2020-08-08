import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import OrderList from './OrderList';
import DatePicker from '../../../../common/DatePicker';
import moment from 'moment';
import appConstants from '../../../../../constants/appConstants';
import QueryString from 'query-string';
import {DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST} from '../../../../../constants/pathConstants';
import {getDefaultOrderHistoryFilters} from '../../../../../utils/orderHistory';

const dateFormat = appConstants.orderHistoryDateFormat;
const fromMonthSub = appConstants.defaultFromMonthSub;

function isValidDate(current) {
  const today = moment();
  return current.isBefore(today);
}

class HistoryList extends Component {
  constructor(props) {
    super(props);
    this.handleFromClick = this.handleFromClick.bind(this);
    this.handleToClick = this.handleToClick.bind(this);
    this.onFromDateChange = this.onFromDateChange.bind(this);
    this.onToDateChange = this.onToDateChange.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.state = {
      selectedOrderStatus: '',
      isFromDatePickerOpen: false,
      fromDate: moment().subtract(fromMonthSub, 'months').format('ll'),
      isToDatePickerOpen: false,
      toDate: moment().format('ll'),
      orderStatusSelected: {},
      filter: getDefaultOrderHistoryFilters(),
      search: ''
    };
  }
  componentDidMount() {
    const status = appConstants.defaultOrderStatus;
    this.setState({selectedOrderStatus: status});
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
    console.log('Filter Value :: ', filter);
    const {history, query} = this.props;
    const updatedFilters = Object.assign({}, query, filter);
    const url = DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST;
    if (url) {
      const search = QueryString.stringify(updatedFilters);
      history.push({
        pathname: DASHBOARD_PARENT_ACCOUNT_ORDER_HISTORY_LIST,
        search
      });
    }
  }
  renderDropDown() {
    const dropdownList = appConstants.orderOptions;
    const {selectedOrderStatus} = this.state;
    console.log('Default OrderStatus : ', selectedOrderStatus);
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

  render() {
    const {fromDate, toDate} = this.state;

    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="cl-sd-trainingLocationInner cl-sd-order-history">
          <div className="uk-grid">
            <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-6-10 uk-width-small-6-10">
              <h1>{this.props.p.t('OrderHistory.order_history')}</h1>
            </div>
            <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-4-10 uk-width-small-4-10">
              <div className="cl-sd-exportBtnOuter" data-uk-dropdown="{mode:'click'}">
                <a href="#" className="link">{this.props.p.t('OrderHistory.export')}<svg className="cl-icon-arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="-759.531 -5139.53 11.063 6.591"><g transform="translate(-962.105 -6007)"><path data-name="Path 148" className="cl-icon-arrow-down-1" d="M-17914.895-2197l5,5,5-5" transform="translate(18118 3065)"/></g></svg>
                </a>
                <ul className="uk-dropdown">
                  <li>
                    <a href="#">PDF<span className="cl-sd-icon"><svg className="cl-icon-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-804.53 -5141.531 6.591 11.063"><g transform="translate(-1001.605 -5996.5)"><path data-name="Path 149" className="cl-icon-arrow-right-1" d="M-17914.895-2197l5,5,5-5" transform="translate(2394.606 -17049.395) rotate(-90)"/></g></svg></span>
                    </a>
                  </li>
                  <li>
                    <a href="#">Excels<span className="cl-sd-icon"><svg className="cl-icon-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-804.53 -5141.531 6.591 11.063"><g transform="translate(-1001.605 -5996.5)"><path data-name="Path 149" className="cl-icon-arrow-right-1" d="M-17914.895-2197l5,5,5-5" transform="translate(2394.606 -17049.395) rotate(-90)"/></g></svg></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="cl-sd-searchOuter">
            <div className="field-holder">
              <input type="text" name="search" placeholder="Search by order ID, session or SSP name" onChange={this.handleSearchChange}/>
              <span className="cl-sd-searchIcon">
                <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                  <path fill="#666666" d="M23.891,20.858l-4.691-4.693c0.838-1.486,1.356-3.178,1.356-5.004c0-5.667-4.611-10.277-10.278-10.277C4.61,0.884,0,5.494,0,11.161c0,5.668,4.61,10.28,10.278,10.28c2.511,0,4.783-0.94,6.572-2.441l4.45,4.451L23.891,20.858zM2.541,11.161c0-4.266,3.471-7.736,7.737-7.736c4.266,0,7.736,3.471,7.736,7.736c0,4.268-3.47,7.738-7.736,7.738C6.011,18.898,2.541,15.429,2.541,11.161z"/>
                </svg>
              </span>
              <button type="submit" onClick={this.handleSearchSubmit}>Search</button>
              <span className="error-text">Sample error message goes here</span>
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
                    <DatePicker
                      defaultValue={moment().format(dateFormat)}
                      isValidDate={isValidDate}
                      handleChange={this.onFromDateChange}
                      date={fromDate}
                      isOpen={this.state.isFromDatePickerOpen}
                    />
                  </a>
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
                      <DatePicker
                        defaultValue={moment().format(dateFormat)}
                        isValidDate={isValidDate}
                        handleChange={this.onToDateChange}
                        date={toDate}
                        isOpen={this.state.isToDatePickerOpen}
                      />
                    </a>
                  </span>
                </span>
              </div>
            </div>
            <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-2 uk-width-small-1-1">
              <div data-uk-dropdown="{mode:'click'}" className="cl-sd-status-dropdown">
                <label>Athlete:</label>
                <a href="#">All<svg className="cl-icon-arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="-759.531 -5139.53 11.063 6.591"><g transform="translate(-962.105 -6007)"><path data-name="Path 148" className="cl-icon-arrow-down-1" d="M-17914.895-2197l5,5,5-5" transform="translate(18118 3065)"/></g></svg>
                </a>
                <ul className="uk-dropdown cl-sd-checkboxlist">
                  <li>
                    <input className="" id="athlete1" type="checkbox"/>
                    <label htmlFor="athlete1">All</label>
                  </li>
                  <li>
                    <input className="" id="athlete2" type="checkbox"/>
                    <label htmlFor="athlete2">Barry Johnson</label>
                  </li>
                  <li>
                    <div className="tableDiv">
                      <div className="lCol">
                        <a href="#" className="general_btn">See Order</a>
                      </div>
                      <div className="rCol">
                        <a href="#">Cancel</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <OrderList/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      history: PropTypes.object.isRequired,
      query: PropTypes.object
    };
  }
}
HistoryList.defaultProps = {
  query: {}
};
const mapDispatchToProps = dispatch => {
  return {
  };
};
const mapStateToProps = state => {
  console.log('STATE : :', state);
  const {router} = state;
  const {query} = router;
  return {
    query
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(HistoryList)));
