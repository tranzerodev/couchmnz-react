import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchRewardsHistory, filterChangeRewardHistory} from '../../../../../actions';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import config from '../../../../../config';
import {PENDING, FULFILLED} from '../../../../../constants/ActionTypes';
import {PulseLoader} from 'react-spinners';

class History extends Component {
  constructor() {
    super();
    this.handleSeeMore = this.handleSeeMore.bind(this);
    this.getRewardsHistory = this.getRewardsHistory.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleOnChangeFilter = this.handleOnChangeFilter.bind(this);
    this.fetchOnChangeFilter = this.fetchOnChangeFilter.bind(this);
    this.state = {params: {startIndex: 1,
      endIndex: 6,
      filter: ['all'],
      userID: ''
    },
    all: true,
    referrals: true,
    sessionComplete: true,
    loading: false
    };
  }
  componentDidMount() {
    this.getRewardsHistory(this.props);
  }
  handleSeeMore() {
    const newParams = this.state.params;
    newParams.startIndex = newParams.endIndex + 1;
    newParams.endIndex += 6;
    this.setState({params: newParams});
    this.props.fetchRewardsHistory(this.state.params);
  }
  componentWillReceiveProps(nextProps) {
    this.getRewardsHistory(nextProps);
  }
  getRewardsHistory(nextProps) {
    if (nextProps.profile.status === FULFILLED) {
      const newParams = this.state.params;
      newParams.userID = nextProps.profile.data.profile.id;
      this.setState({params: newParams});
      if (nextProps.rewardsHistory.status !== PENDING && nextProps.rewardsHistory.status !== FULFILLED) {
        this.props.fetchRewardsHistory(this.state.params);
      }
    }
    if (nextProps.rewardsHistory.status === PENDING) {
      this.setState({loading: true});
    }
    if (nextProps.rewardsHistory.status === FULFILLED) {
      this.setState({loading: false});
    }
  }
  handleSelectAll(e) {
    const status = e.target.checked;
    this.setState({all: status,
      referrals: status,
      sessionComplete: status});
    let filter = this.state.params.filter;
    if (status === true) {
      filter = [e.target.name, config.rewardsHistoryFilters.REFERRALS, config.rewardsHistoryFilters.SESSIONS_COMPLETED];
    } else {
      filter = [];
    }
    const params = this.state.params;
    params.filter = filter;
    this.setState({params});
    this.fetchOnChangeFilter();
  }
  handleOnChangeFilter(e) {
    const status = e.target.checked;
    this.setState({[e.target.name]: status});
    const params = this.state.params;
    if (status === false) {
      const filter = params.filter;
      if (filter.includes(config.rewardsHistoryFilters.ALL)) {
        const index = filter.indexOf(config.rewardsHistoryFilters.ALL);
        filter.splice(index, 1);
        this.setState({all: false});
        params.filter = filter;
      }
      if (filter.includes(e.target.name)) {
        const index = filter.indexOf(e.target.name);
        filter.splice(index, 1);
      }
    } else {
      params.filter.push(e.target.name);
      if (params.filter.length > 1) {
        this.setState({all: true});
      }
    }
    this.setState({params});
    this.fetchOnChangeFilter();
  }
  fetchOnChangeFilter() {
    const params = this.state.params;
    params.startIndex = 1;
    params.endIndex = 6;
    this.setState({params});
    this.props.filterChangeRewardHistory(this.state.params);
  }
  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
          <div className="rewardhistory">
            <h3>{this.props.p.t('History.reward_history')}</h3>
            <div className="rewardFilter">
              <input className="optioncheckbox" name={config.rewardsHistoryFilters.ALL} id="training1" type="checkbox" checked={this.state.all} onChange={this.handleSelectAll}/>
              <label htmlFor="training1" >{this.props.p.t('rewardsHistoryFilters.' + config.rewardsHistoryFilters.ALL)} <span>{ this.props.rewardsHistory && this.props.rewardsHistory.data && this.props.rewardsHistory.data.total ? this.props.rewardsHistory.data.total : 0}</span></label>
              <input className="optioncheckbox" name={config.rewardsHistoryFilters.REFERRALS} id="training2" type="checkbox" checked={this.state.referrals} onChange={this.handleOnChangeFilter}/>
              <label htmlFor="training2">{this.props.p.t('rewardsHistoryFilters.' + config.rewardsHistoryFilters.REFERRALS)} <span>{this.props.rewardsHistory && this.props.rewardsHistory.data && this.props.rewardsHistory.data.referralTotal ? this.props.rewardsHistory.data.referralTotal : 0}</span></label>
              <input className="optioncheckbox" id="training3" type="checkbox" name={config.rewardsHistoryFilters.SESSIONS_COMPLETED} checked={this.state.sessionComplete} onChange={this.handleOnChangeFilter}/>
              <label htmlFor="training3">{this.props.p.t('rewardsHistoryFilters.' + config.rewardsHistoryFilters.SESSIONS_COMPLETED)} <span>{this.props.rewardsHistory && this.props.rewardsHistory.data && this.props.rewardsHistory.data.completeSessionTotal ? this.props.rewardsHistory.data.completeSessionTotal : 0 }</span></label>
            </div>
            <div className="customtable">
              <ul>
                <li className="tableHeading">{this.props.p.t('History.type')}</li>
                <li className="tableHeading">{this.props.p.t('History.details')}</li>
                <li className="tableHeading">{this.props.p.t('History.date')}</li>
                <li className="tableHeading">{this.props.p.t('History.status')}</li>
              </ul>
              {this.props.rewardsHistory && this.props.rewardsHistory.data && this.props.rewardsHistory.data.history && this.props.rewardsHistory.data.history.length && this.props.rewardsHistory.data.history.map((reward, i) => {
                const count = i;
                return (
                  <ul key={count}>
                    <li className="highlight">{reward.rewardType}</li>
                    <li>{reward.email} {reward.profileType ? '(' + reward.profileType + ')' : ''}</li>
                    <li>{reward.date}</li>
                    <li>{reward.status}</li>
                  </ul>
                );
              }
              )}
            </div>
            <div className="cl-loader">
              <PulseLoader loading={this.state.loading} size={10}/>
            </div>
            { this.props.rewardsHistory.data && this.props.rewardsHistory.data.history && this.props.rewardsHistory.data.history.length < this.props.rewardsHistory.data.total &&
            <div className="seeDiv">
              <a onClick={this.handleSeeMore}>{this.props.p.t('History.see_more')}</a>
            </div> }
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      profile: PropTypes.object,
      rewardsHistory: PropTypes.object,
      fetchRewardsHistory: PropTypes.func.isRequired,
      filterChangeRewardHistory: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}
History.defaultProps = {
  rewardsHistory: {},
  profile: {data: {}, status: PENDING}
};
const mapStateToProps = state => {
  const {profile, rewardsHistory} = state;
  return {
    profile,
    rewardsHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRewardsHistory: params => dispatch(fetchRewardsHistory(params)),
    filterChangeRewardHistory: params => dispatch(filterChangeRewardHistory(params))
  };
};
export default translate(connect(mapStateToProps, mapDispatchToProps)(History));
