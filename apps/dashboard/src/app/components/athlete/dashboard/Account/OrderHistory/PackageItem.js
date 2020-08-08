import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class PackageItem extends Component {
  render() {
    const {orderPackage, p, priceUnit} = this.props;
    const {t} = p;
    return (
      <div className="cl-sd-trainingLocationInner">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
            <div className="interest_sec">
              <ul>
                <li className="highlight">{t('orderDetails.package.session_name')}</li>
                <li>{orderPackage.name}</li>
              </ul>
              <ul>
                <li className="highlight">{t('orderDetails.package.cost_per_session')}</li>
                <li>{priceUnit}{orderPackage.costPerSession}</li>
              </ul>
              <ul>
                <li className="highlight">{t('orderDetails.package.no_of_sessions')}</li>
                <li>{orderPackage.noOfSessions}</li>
              </ul>
              <ul>
                <li className="highlight">{t('orderDetails.package.total_cost', {noSessions: orderPackage.noOfSessions})}
                </li>
                <li>{priceUnit}{orderPackage.totalCost}</li>
              </ul>
              <ul>
                <li className="highlight">{t('orderDetails.package.vol_discount')}</li>
                <li>{orderPackage.volumeDiscount}</li>
              </ul>
              <ul>
                <li className="highlight">{t('orderDetails.package.coachbucks_discount')}</li>
                <li>{orderPackage.CoachBucksDiscount}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      orderPackage: PropTypes.object.isRequired
    };
  }
}

export default (withRouter(translate(PackageItem)));
