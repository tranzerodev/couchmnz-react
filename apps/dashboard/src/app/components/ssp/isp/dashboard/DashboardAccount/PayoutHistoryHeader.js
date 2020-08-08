import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {NavLink, withRouter} from 'react-router-dom';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS, DASHBOARD_ACCOUNT_PAYOUT_HISTORY_PAYOUTS, DASHBOARD_ACCOUNT_PAYOUT_WITHDRAW} from '../../../../../constants/pathConstants';
import {fetchOrderSummary} from '../../../../../actions';
import moment from 'moment';
class PayoutHistoryHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleWithdraw = this.handleWithdraw.bind(this);
  }

  componentDidMount() {
    if (this.props.profile.status === FULFILLED) {
      const profileID = this.props.profile.data.profile.id;
      this.setState({profileID});
      if (this.props.fetchOrderSummary.status !== FULFILLED && this.props.fetchOrderSummary.status !== PENDING && this.props.fetchOrderSummary.status !== REJECTED) {
        this.props.fetchOrderSummary(profileID);
      }
    }
  }
  handleWithdraw() {
    this.props.history.push(DASHBOARD_ACCOUNT_PAYOUT_WITHDRAW);
  }

  render() {
    console.log('Payout Summary :: ', this.props.payoutSummary);
    const payoutSummary = this.props.payoutSummary.data;
    if (this.props.payoutSummary.status === FULFILLED) {
      return (
        <div className="cl-sd-order-history-price">
          <div className="uk-grid">
            <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-4-10 uk-width-small-1-2">
              <p>{this.props.p.t('PayoutHistory.currentBalance')}</p>
              <h1 className=""><span>{payoutSummary.priceUnit}</span>{payoutSummary.currentBalance}</h1>
              <a onClick={this.handleWithdraw} className="link">
                {this.props.p.t('PayoutHistory.withdraw')}
              </a>
            </div>
            <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-4-10 uk-width-small-1-2">
              <p>{this.props.p.t('PayoutHistory.lastPayout')}</p>
              <h1 className=""><span>{payoutSummary.priceUnit}</span>{payoutSummary.lastPayoutAmount}</h1>
              <p>{moment(payoutSummary.lastPayoutOn).format('LL')}</p>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <ul className="cl-sd-earringTab">
                <li>
                  <NavLink to={DASHBOARD_ACCOUNT_PAYOUT_HISTORY_EARNINGS} activeClassName="active">{this.props.p.t('PayoutHistory.earning')}</NavLink>
                </li>
                <li>
                  <NavLink to={DASHBOARD_ACCOUNT_PAYOUT_HISTORY_PAYOUTS} activeClassName="active">{this.props.p.t('PayoutHistory.payouts')}</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return (<div/>);
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      fetchOrderSummary: PropTypes.func.isRequired,
      payoutSummary: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {payoutSummary, profile} = state;
  return {
    payoutSummary,
    profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderSummary: profileID => dispatch(fetchOrderSummary({profileID}))
  };
};
export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(PayoutHistoryHeader)));

