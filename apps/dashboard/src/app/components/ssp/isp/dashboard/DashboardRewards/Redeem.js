import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class Redeem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
          <div className="redeemPoint">
            <h3>{this.props.p.t('Redeem.how_to_redeem')}</h3>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1">
                <p>{this.props.p.t('Redeem.you_can_redemm_points')}</p>
                <ul>
                  <li><i className="fa fa-angle-right"/> {this.props.p.t('Redeem.in_cash')}</li>
                  <li><i className="fa fa-angle-right"/> {this.props.p.t('Redeem.as_a_discount')}</li>
                </ul>
                <p>{this.props.p.t('Redeem.in_the_future')}</p>
              </div>
              <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1 rewardspt">
                <div className="rewardsbg">
                  <h4>{this.props.rewardStats.rewardsPoints}</h4>
                  <p>{this.props.p.t('Redeem.points')}</p>
                </div>
                <p><strong>{this.props.rewards.pointsPerUnit} {this.props.p.t('Redeem.points')} = ${this.props.rewards.priceUnit}</strong></p>
                <p>{this.props.p.t('Redeem.use_your_credit_to_get_discount_on_merchandise')}</p>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1 uk-text-center">
                <a>{this.props.p.t('Redeem.i_want_to_redeem_my_point')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      rewardStats: PropTypes.object,
      rewards: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}
Redeem.defaultProps = {
  rewardStats: {},
  rewards: {}
};
export default translate(Redeem);
