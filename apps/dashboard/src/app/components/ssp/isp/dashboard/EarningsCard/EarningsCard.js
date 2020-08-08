import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class EarningsCard extends Component {
  render() {
    return (
      <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="dashboardContent dashboardContent1">
          <h4>{this.props.p.t('EarningsCard.earnings')}</h4>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1">
              <h3>${this.props.earning.earningTillDate ? this.props.earning.earningTillDate : 0 }</h3>
              <p>{this.props.p.t('EarningsCard.till_date')}</p>
            </div>
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1">
              <h3>${this.props.earning.projected ? this.props.earning.projected : 0}</h3>
              <p>{this.props.p.t('EarningsCard.projected_in')} {this.props.earning.projectedDate}</p>
            </div>
          </div>
          <div className="uk-grid mt15">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              {/* <NavLink to={DASHBOARD_SSP}>{this.props.p.t('EarningsCard.see_revenue_report')}</NavLink> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      earning: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}
EarningsCard.defaultProps = {
  earning: {}
};

export default translate(EarningsCard);
