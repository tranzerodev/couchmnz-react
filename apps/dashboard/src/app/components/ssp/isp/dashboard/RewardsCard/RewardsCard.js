import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class RewardCard extends Component {
  render() {
    return (
      <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="dashboardContent dashboardContent2">
          <h4>{this.props.p.t('RewardCard.rewards')}</h4>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
              <h3><span>{this.props.reward.rewardsPoints ? this.props.reward.rewardsPoints : 0}</span></h3>
              <p>{this.props.p.t('RewardCard.rewards_points')}</p>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
              <h3>{this.props.reward.invitationSent ? this.props.reward.invitationSent : 0}</h3>
              <p>{this.props.p.t('RewardCard.invitation_sent')}</p>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
              <h3>{this.props.reward.invitationExpected ? this.props.reward.invitationExpected : 0}</h3>
              <p>{this.props.p.t('RewardCard.invitation_accepted')}</p>
            </div>
          </div>
          <div className="uk-grid mt15">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              {/* <NavLink to={DASHBOARD_REWARDS}>{this.props.p.t('RewardCard.manage')}</NavLink> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      reward: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}

RewardCard.defaultProps = {
  reward: {}
};
export default translate(RewardCard);

