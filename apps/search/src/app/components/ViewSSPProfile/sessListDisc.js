import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SessionLIRHS extends Component {
  static get propTypes() {
    return {
      // SessionID: PropTypes.string.isRequired,
      sessionRegRate: PropTypes.object,
      discountRate: PropTypes.object
    };
  }
  postDiscountRate(sessionRate, discountRate) {
    let sessionR = Number(sessionRate.rate);
    if (Number(discountRate.percent) > 100) {
      sessionR -= discountRate.amt;
    } else {
      sessionR = ((100 - Number(discountRate.percent)) / 100) * sessionR;
    }
    return (sessionR);
  }
  render() {
    // Console.log(this.props);
    return (
      <div className="uk-width-large-4-10 uk-width-medium-3-10 uk-width-1-1">
        <div className="offer-price-sec">
          <div className="ca-list-price">
            {this.props.sessionRegRate.currency}  {this.props.sessionRegRate.rate}
          </div>
          <div className="money-batch">
            <svg id="percent" data-name="Group 2371" xmlns="http://www.w3.org/2000/svg" viewBox="-5103.5 -18851.5 28.5 23">
              <g id="Group-56" transform="translate(-5103 -18851)">
                <path id="Page-1-Copy" className="cls-2" d="M22,11c0,1.306-2.887,2.029-3.358,3.165-.489,1.177,1.023,3.726.135,4.613s-3.435-.624-4.613-.136C13.029,19.113,12.306,22,11,22s-2.029-2.886-3.166-3.358c-1.177-.489-3.725,1.023-4.613.136s.624-3.436.136-4.613C2.887,13.029,0,12.307,0,11S2.887,8.971,3.358,7.835c.488-1.177-1.023-3.726-.135-4.613s3.435.624,4.613.136C8.971,2.887,9.694,0,11,0s2.028,2.886,3.165,3.358c1.177.488,3.725-1.023,4.613-.136s-.624,3.436-.136,4.613C19.113,8.971,22,9.694,22,11"/>
                <path id="_-copy" data-name="%-copy" className="cls-3" d="M6.229,6.5a1.787,1.787,0,0,1,.706-.7,2.117,2.117,0,0,1,1.048-.255A2.174,2.174,0,0,1,9.048,5.8a1.817,1.817,0,0,1,.718.7,1.96,1.96,0,0,1,.255.99,1.906,1.906,0,0,1-.255.973,1.829,1.829,0,0,1-.718.695,2.174,2.174,0,0,1-1.065.255,2.117,2.117,0,0,1-1.048-.255,1.8,1.8,0,0,1-.706-.695,1.941,1.941,0,0,1-.249-.973A2,2,0,0,1,6.229,6.5Zm5.923-.839h1.007L8.215,13.381h-1Zm-3.6,1.181a.766.766,0,0,0-.573-.232.729.729,0,0,0-.562.232.919.919,0,0,0-.214.648.88.88,0,0,0,.214.631.739.739,0,0,0,.562.226.777.777,0,0,0,.573-.226.853.853,0,0,0,.226-.631A.89.89,0,0,0,8.556,6.839Zm2.038,3.769a1.787,1.787,0,0,1,.706-.7,2.117,2.117,0,0,1,1.048-.255,2.141,2.141,0,0,1,1.059.255,1.828,1.828,0,0,1,.712.7,1.96,1.96,0,0,1,.255.99,1.906,1.906,0,0,1-.255.973,1.841,1.841,0,0,1-.712.695,2.141,2.141,0,0,1-1.059.255,2.117,2.117,0,0,1-1.048-.255,1.8,1.8,0,0,1-.706-.695,1.941,1.941,0,0,1-.249-.973A2,2,0,0,1,10.594,10.608Zm2.327.342a.767.767,0,0,0-.573-.232.729.729,0,0,0-.562.232.919.919,0,0,0-.214.648.877.877,0,0,0,.214.637.748.748,0,0,0,.562.22.772.772,0,0,0,.579-.226.866.866,0,0,0,.22-.631A.89.89,0,0,0,12.922,10.95Z" transform="translate(0.944 0.875)"/>
              </g>
            </svg>
            <span className="offer-price">Get this for {this.props.sessionRegRate.currency + this.postDiscountRate(this.props.sessionRegRate, this.props.discountRate)}!</span>
          </div>
          <a className="see-dis themeBlueText">See volume discount</a>
        </div>
      </div>
    );
  }
}

export default SessionLIRHS;
