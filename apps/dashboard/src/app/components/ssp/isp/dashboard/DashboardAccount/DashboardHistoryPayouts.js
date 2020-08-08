import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {fetchPayoutList} from '../../../../../actions';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import constants from '../../../../../constants/appConstants';
import moment from 'moment';
import PayoutHistoryHeader from './PayoutHistoryHeader';
import appConstants from '../../../../../constants/appConstants';
import {withRouter} from 'react-router-dom';
import QueryString from 'query-string';
import DatePicker from '../../../../common/DatePicker';
import ReactPaginate from 'react-paginate';
import {DASHBOARD_ACCOUNT_PAYOUT_HISTORY_PAYOUTS} from '../../../../../constants/pathConstants';

const dateFormat = appConstants.orderHistoryDateFormat;
const fromMonthSub = appConstants.defaultFromMonthSub;

function isValidDate(current) {
  const today = moment();
  return current.isBefore(today);
}

class DashboardHistoryPayouts extends Component {
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
      search: ''
    };
    this.getClassName = this.getClassName.bind(this);
    this.renderPayoutList = this.renderPayoutList.bind(this);
    this.handleFromClick = this.handleFromClick.bind(this);
    this.handleToClick = this.handleToClick.bind(this);
    this.onFromDateChange = this.onFromDateChange.bind(this);
    this.onToDateChange = this.onToDateChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.isValidToDate = this.isValidToDate.bind(this);
  }

  componentDidMount() {
    if (this.props.profile.status === FULFILLED) {
      const profileID = this.props.profile.data.profile.id;
      this.setState({profileID});
      if (this.props.fetchPayoutList.status !== FULFILLED && this.props.fetchPayoutList.status !== PENDING && this.props.fetchPayoutList.status !== REJECTED) {
        this.props.fetchPayoutList(profileID);
      }
    }
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
  renderPayoutList(payout) {
    const priceUnit = this.props.payouts.priceUnit;
    return (
      <div key={payout.transactionId} className="cl-sd-payout-detailsOuter">
        <div className="cl-sd-payout-detailsInner">
          <p>{moment(payout.date).format('ll')}</p>
        </div>
        <div className="cl-sd-payout-detailsInner">
          <p>{payout.transactionId}</p>
        </div>
        <div className="cl-sd-payout-detailsInner">
          <p>{priceUnit}{payout.withdrawlAmount}</p>
        </div>
        <div className="cl-sd-payout-detailsInner">
          <p>{priceUnit}{payout.balanceAmount}</p>
        </div>
        <div className="cl-sd-payout-detailsInner">
          <p className={this.getClassName(payout.status.toUpperCase())}>{this.props.p.t('OrderHistory.status.' + payout.status)}</p>
        </div>
      </div>

    );
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
    const url = DASHBOARD_ACCOUNT_PAYOUT_HISTORY_PAYOUTS;
    if (url) {
      const search = QueryString.stringify(updatedFilters);
      history.push({
        pathname: DASHBOARD_ACCOUNT_PAYOUT_HISTORY_PAYOUTS,
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

  render() {
    console.log('Payouts :: ', this.props.payouts);
    const payoutList = this.props.payouts.data;
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
          </div>
        </div>
        <div className="cl-sd-payout-details">
          <div className="cl-sd-payout-detailsOuter cl-sd-payout-detailsHead">
            <div className="cl-sd-payout-detailsInner">
              <p><span>Date</span></p>
            </div>
            <div className="cl-sd-payout-detailsInner">
              <p><span>Transaction ID</span></p>
            </div>
            <div className="cl-sd-payout-detailsInner">
              <p><span>Withdrawl Amount</span></p>
            </div>
            <div className="cl-sd-payout-detailsInner">
              <p><span>Balance Amount</span></p>
            </div>
            <div className="cl-sd-payout-detailsInner">
              <p><span>Status</span></p>
            </div>
          </div>
          {payoutList.map(this.renderPayoutList)}
          <div className="scheduler-paging">
            <div className="scheduler-pagingContainer">
              <ReactPaginate
                previousLabel={<span><i className="uk-icon uk-icon-long-arrow-left"/> Previous</span>}
                nextLabel={<span>Next <i className="uk-icon uk-icon-long-arrow-right"/></span>}
                breakLabel={<a>...</a>}
                breakClassName={'break-me'}
                pageCount={this.props.payouts.total / 5}
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
      fetchPayoutList: PropTypes.func.isRequired,
      payouts: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      query: PropTypes.object
    };
  }
}
DashboardHistoryPayouts.defaultProps = {
  query: {}
};

const mapStateToProps = state => {
  const {profile, payouts, router} = state;
  const {query} = router;
  return {
    profile,
    payouts,
    query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPayoutList: profileID => dispatch(fetchPayoutList({profileID}))
  };
};
export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(DashboardHistoryPayouts)));

