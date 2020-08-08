import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import RewardLevel from '../DashboardRewardLevel';

class UpperHeader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className="dashboardUpper">
        <div className="uk-container uk-container-center">
          <div className="uk-grid">
            <div className="uk-width-xlarge-6-10 uk-width-large-6-10 uk-width-medium-1-1 uk-width-small-1-1">
              <h1>{this.props.p.t('UpperHeader.my_rewards_points')}</h1>
              <div className="tableDiv">
                <div className="lCol">
                  <div className="rewardsbg">
                    <h4>{this.props.rewardStats.rewardsPoints}</h4>
                    <p>{this.props.p.t('UpperHeader.points')}</p>
                  </div>
                </div>
                <div className="rCol">
                  <p><strong>{this.props.rewardsPoints.pointsPerUnit} Points = ${this.props.rewardsPoints.priceUnit}</strong></p>
                  <p>{this.props.p.t('UpperHeader.use_your_credit_to_get_discount_on_merchandise')}</p>
                  <a>{this.props.p.t('UpperHeader.redeem_points')}</a>
                </div>
              </div>
            </div>
            <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1"/>
            <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1">
              <div className="levelOuter">
                <RewardLevel/>
                <a>{this.props.p.t('UpperHeader.know_more')}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  static get propTypes() {
    return {
      rewardsPoints: PropTypes.object,
      rewardStats: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}
UpperHeader.defaultProps = {
  rewardStats: {},
  rewardsPoints: {}
};
export default translate(UpperHeader);
