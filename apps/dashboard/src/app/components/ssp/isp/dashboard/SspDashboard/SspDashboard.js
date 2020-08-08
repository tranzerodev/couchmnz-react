import React, {Component} from 'react';

import DashboardContentTop from '../DashboardContentTop';
import SessionsCard from '../SessionsCard';
import EarningsCard from '../EarningsCard';
import ReviewsCard from '../ReviewsCard';
import RewardsCard from '../RewardsCard';
import DashboardContentTopModal from '../DashboardContentTopModal';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {
  fetchReviewStats,
  fetchEarningStats,
  fetchRewardsStats,
  fetchSessionStats,
  setRating
} from '../../../../../actions';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';

class SspDashboard extends Component {
  constructor() {
    super();
    this.state = {
      poster: true,
      modalIsOpen: false,
      reward: {},
      review: {},
      rating: [0, 0, 0, 0, 0],
      earning: {},
      session: {},
      profile: {}
    };
    this.loadData = this.loadData.bind(this);
    this.handleClosePoster = this.handleClosePoster.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
  }
  handleClosePoster(e) {
    e.preventDefault();
    this.setState({poster: false});
  }
  onOpenModal(e) {
    e.preventDefault();
    this.setState({modalIsOpen: true});
  }
  onCloseModal(e) {
    e.preventDefault();
    this.setState({
      modalIsOpen: false
    });
  }
  componentDidMount() {
    // This.loadData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    // This.loadData(nextProps);
    if (this.props.reviewStats.status === FULFILLED && this.props.reviewStats.data.averageRating > 0) {
      this.setRating(this.props);
    }
  }
  setRating(nextProps) {
    if (nextProps.rating.status === PENDING && nextProps.reviewStats.data.averageRating > 0) {
      this.props.setRating(nextProps.reviewStats.data.averageRating);
    }
  }
  loadData(nextProps) {
    if (nextProps.profile.status === FULFILLED) {
      if (nextProps.reviewStats.status !== FULFILLED && nextProps.reviewStats.status !== PENDING && nextProps.reviewStats.status !== REJECTED) {
        this.props.fetchReviewStats({profileID: nextProps.profile.data.profile.id});
      }
      if (nextProps.earningStats.status !== FULFILLED && nextProps.earningStats.status !== PENDING && nextProps.earningStats.status !== REJECTED) {
        this.props.fetchEarningStats({profileID: nextProps.profile.data.profile.id});
      }
      if (nextProps.rewardStats.status !== FULFILLED && nextProps.rewardStats.status !== PENDING && nextProps.rewardStats.status !== REJECTED) {
        this.props.fetchRewardsStats({profileID: nextProps.profile.data.profile.id});
      }
      if (nextProps.sessionStats.status !== FULFILLED && nextProps.sessionStats.status !== PENDING && nextProps.sessionStats.status !== REJECTED) {
        this.props.fetchSessionStats({profileID: nextProps.profile.data.profile.id});
      }
    }
    if (nextProps.reviewStats.status === FULFILLED && nextProps.reviewStats.data.averageRating > 0) {
      this.setRating(nextProps);
    }
  }

  render() {
    return (
      <div>
        <div className="dashboardSection">
          <div className="uk-container uk-container-center">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              { this.state.poster && <DashboardContentTop onClick={this.handleClosePoster} modalIsOpen={this.modalIsOpen} handleOpenModal={this.onOpenModal}/> }
              <div className="uk-grid">
                <SessionsCard session={this.props.sessionStats.data}/>
                <EarningsCard earning={this.props.earningStats.data}/>
                <ReviewsCard review={this.props.reviewStats.data} rating={this.props.rating.data}/>
                <RewardsCard reward={this.props.rewardStats.data}/>
              </div>
            </div>
          </div>
        </div>
        <DashboardContentTopModal modalIsOpen={this.state.modalIsOpen} handleCloseModal={this.onCloseModal}/>
      </div>
    );
  }
  static get propTypes() {
    return {
      reviewStats: PropTypes.object,
      rewardStats: PropTypes.object,
      sessionStats: PropTypes.object,
      earningStats: PropTypes.object,
      profile: PropTypes.object,
      rating: PropTypes.object.isRequired,
      fetchReviewStats: PropTypes.func.isRequired,
      fetchEarningStats: PropTypes.func.isRequired,
      fetchSessionStats: PropTypes.func.isRequired,
      fetchRewardsStats: PropTypes.func.isRequired,
      setRating: PropTypes.func.isRequired
    };
  }
}

SspDashboard.defaultProps = {
  reviewStats: {data: {}, status: null},
  rewardStats: {data: {}, status: null},
  sessionStats: {data: {}, status: null},
  earningStats: {data: {}, status: null},
  profile: {}
};
const mapStateToProps = state => {
  const {reviewStats, rewardStats, sessionStats, earningStats, profile, rating} = state;
  return {
    reviewStats, rewardStats, sessionStats, earningStats, profile, rating
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReviewStats: userID => dispatch(fetchReviewStats(userID)),
    fetchEarningStats: userID => dispatch(fetchEarningStats(userID)),
    fetchRewardsStats: userID => dispatch(fetchRewardsStats(userID)),
    fetchSessionStats: userID => dispatch(fetchSessionStats(userID)),
    setRating: averageRating => dispatch(setRating(averageRating))
  };
};

const DashboardHome = connect(mapStateToProps, mapDispatchToProps)(SspDashboard);
export default DashboardHome;
