import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class ReviewsCard extends Component {
  render() {
    return (
      <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="dashboardContent dashboardContent2">
          <h4>{this.props.p.t('ReviewsCard.reviews')}</h4>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
              <h3>{this.props.review.reviewsReceived ? this.props.review.reviewsReceived : 0}</h3>
              <p>{this.props.p.t('ReviewsCard.reviews_received')}</p>
            </div>
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
              <p> {this.props.p.t('ReviewsCard.average_rating')} <strong>{this.props.review.averageRating ? this.props.review.averageRating : 0}</strong></p>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3 uk-width-small-1-1">
              <h3>{this.props.review.reviewsGiven ? this.props.review.reviewsGiven : 0}</h3>
              <p>{this.props.p.t('ReviewsCard.reviews_given')}</p>
            </div>
          </div>
          <div className="uk-grid mt15">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              {/* <NavLink to={DASHBOARD_SSP}>{this.props.p.t('ReviewsCard.manage')}</NavLink> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      rating: PropTypes.array,
      review: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}

ReviewsCard.defaultProps = {
  rating: [0, 0, 0, 0, 0],
  review: {}
};

export default translate(ReviewsCard);
