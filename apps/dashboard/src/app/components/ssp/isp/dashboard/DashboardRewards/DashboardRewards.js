import React, {Component} from 'react';
import UpperHeader from './UpperHeader';
import EarnReward from './EarnReward';
import Level from './Level';
import History from './History';
import Redeem from './Redeem';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {
  fetchRewards,
  fetchRewardsStats
} from '../../../../../actions';
import translate from 'redux-polyglot/translate';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';

class DashboardRewards extends Component {
  constructor() {
    super();
    this.loadData = this.loadData.bind(this);
    this.state = {};
  }
  componentDidMount() {
    this.loadData(this.props);
  }
  loadData(nextProps) {
    if (nextProps.profile.status === FULFILLED) {
      if (nextProps.rewardStats.status !== FULFILLED && nextProps.rewardStats.status !== PENDING) {
        this.props.fetchRewardsStats({profileID: nextProps.profile.data.profile.id});
      }
      if (nextProps.rewardsPoints.status !== FULFILLED && nextProps.rewardsPoints.status !== PENDING) {
        this.props.fetchRewards({profileID: nextProps.profile.data.profile.id});
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps);
  }

  render() {
    return (
      <div>
        <UpperHeader rewardsPoints={this.props.rewardsPoints.data} rewardStats={this.props.rewardStats.data}/>
        <section className="dashboardSection">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                <div className="rewardInfo">
                  <h3>{this.props.p.t('DashboardRewards.three_ways_to_earn')}</h3>
                  <EarnReward rewards={this.props.rewardsPoints.data} rewardStats={this.props.rewardStats.data}/>
                  <Level rewardsPoints={this.props.rewardsPoints.data} rewardStats={this.props.rewardStats.data}/>
                  <History/>
                  <Redeem rewards={this.props.rewardsPoints.data} rewardStats={this.props.rewardStats.data}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  static get propTypes() {
    return {
      rewardsPoints: PropTypes.object,
      rewardStats: PropTypes.object,
      fetchRewards: PropTypes.func.isRequired,
      fetchRewardsStats: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}
DashboardRewards.defaultProps = {
  rewardsPoints: {data: {}, status: null},
  rewardStats: {data: {}, status: null}
};
const mapStateToProps = state => {
  const {profile, rewardsPoints, rewardStats} = state;
  return {
    profile,
    rewardsPoints,
    rewardStats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRewards: profileID => dispatch(fetchRewards(profileID)),
    fetchRewardsStats: profileID => dispatch(fetchRewardsStats(profileID))
  };
};

const Rewards = translate(connect(mapStateToProps, mapDispatchToProps)(DashboardRewards));
export default Rewards;
