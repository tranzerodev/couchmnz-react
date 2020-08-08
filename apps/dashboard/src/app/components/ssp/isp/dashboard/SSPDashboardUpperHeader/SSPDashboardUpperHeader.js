import React, {Component} from 'react';
import RewardLevel from '../DashboardRewardLevel';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {NavLink} from 'react-router-dom';
import {DASHBOARD_REWARDS} from '../../../../../constants/pathConstants';

class SSPDashboardUpperHeader extends Component {
  render() {
    return (
      <section className="dashboardUpper">
        <div className="uk-container uk-container-center">
          <div className="uk-grid">
            <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-1-1 uk-width-small-1-1">
              <h4>{this.props.p.t('SSPDashboardUpperHeader.welcome')}</h4>
              <h3>{((this.props.profile.profile && this.props.profile.profile.firstName) ? this.props.profile.profile.firstName : '') + ' ' + ((this.props.profile.profile && this.props.profile.profile.lastName) ? this.props.profile.profile.lastName : '')}</h3>
              <p>{ (this.props.profile && this.props.profile.trainingPreferences && this.props.profile.trainingPreferences[0] && this.props.profile.trainingPreferences[0].name) ? this.props.profile.trainingPreferences[0].name : ' ' }, {(this.props.profile && this.props.profile.summary && this.props.profile.summary.sports[0]) ? this.props.profile.summary.sports[0].name : ' '}</p>
              {/* <div className="uk-grid">
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
                  <ul className="rating1">
                    {this.props.rating.map((n, i) => {
                      const count = i;
                      if (n >= 1) {
                        return <li key={count}><i className="fa fa-star"/></li>;
                      } else if (n > 0) {
                        return <li key={count}><i className="fa fa-star-half-o"/></li>;
                      }
                      return <li key={count}><i className="fa fa-star-o"/></li>;
                    })}
                  </ul>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
                  <p>{this.props.review.reviewsReceived} {this.props.p.t('SSPDashboardUpperHeader.reviews')}</p>
                </div>
                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
                  <p>{this.props.reward.rewardsPoints} {this.props.p.t('SSPDashboardUpperHeader.reward_points')}</p>
                </div>
                  </div> */}
            </div>
            <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1"/>
            <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1">
              <div className="levelOuter">
                <RewardLevel/>
                <NavLink to={DASHBOARD_REWARDS}>{this.props.p.t('SSPDashboardUpperHeader.know_more')}</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  static get propTypes() {
    return {
      profile: PropTypes.object,
      rating: PropTypes.array,
      review: PropTypes.object,
      reward: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}

SSPDashboardUpperHeader.defaultProps = {
  rating: [0, 0, 0, 0, 0],
  review: {},
  reward: {},
  profile: {}
};

export default translate(SSPDashboardUpperHeader);
