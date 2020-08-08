import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {ClipLoader} from 'react-spinners';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {PENDING} from '../../../constants/ActionTypes';
import config from '../../../config';

class Footer extends Component {
  render() {
    const {staticBaseURL} = config;
    const loading = Boolean(this.props.saveDataOnNext.status === PENDING || this.props.sportUpdateStatus === PENDING);
    return (
      <div>
        <footer>
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-1">
                  <h5>Athletes and Parents</h5>
                  <ul className="footer-menu">
                    <li><a href={staticBaseURL + '/coachlist-helps-you-crush-it'}>Coachlist Helps You Crush It</a></li>
                    <li><a href={staticBaseURL + '/safety-first'}>Safety First!</a></li>
                    <li><a href={staticBaseURL + '/coachlist-guarantee'}>CoachList Guarantee</a></li>
                    <li><a href={staticBaseURL + '/athlete-levels-and-points-system'}>Earn CoachBucks!</a></li>
                  </ul>
                </div>
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-1">
                  <h5>Coaches and Businesses</h5>
                  <ul className="footer-menu">
                    <li><a href={staticBaseURL + '/grow-with-coachlist'}>Grow Your Business With CoachList</a></li>
                    <li><a href={staticBaseURL + '/athlete-advisory-program'}>Become a Brand Ambassador</a></li>
                    <li><a href={staticBaseURL + '/get-featured'}>Get Featured on the Jumbotron</a></li>
                    <li><a href={staticBaseURL + '/developers'}>Integration API</a></li>
                  </ul>
                </div>
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-1">
                  <h5>The Company</h5>
                  <ul className="footer-menu">
                    <li><a href={staticBaseURL + '/team'}>Our Team</a></li>
                    <li><a href={staticBaseURL + '/about'}>About</a></li>
                    <li><a href={staticBaseURL + '/affiliate-network'}>Join our Affiliate Program</a></li>
                    <li><a href={staticBaseURL + '/careers'}>Fast-track Your Career</a></li>
                    <li><a href={staticBaseURL + '/contact-us'}>Contact Us</a></li>
                  </ul>
                </div>
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1">
                  <h5>Follow us</h5>
                  <ul className="footer-social">
                    <li>
                      <a target="_blank"><i className="uk-icon-facebook"/></a>
                    </li>
                    <li>
                      <a target="_blank"><i className="uk-icon-twitter"/></a>
                    </li>
                    <li>
                      <a target="_blank">
                        <i className="fa fa-snapchat-ghost" aria-hidden="true"/>
                      </a>
                    </li>
                    <li>
                      <a target="_blank"><i className="uk-icon-youtube-play"/></a>
                    </li>
                    <li>
                      <a target="_blank">
                        <i className="fa fa-google-plus" aria-hidden="true"/>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* END FOOTER SECTION */}
        {/* START FOOTER MIDDLE */}
        <section className="footerMiddle">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1  uk-width-small-1-1">
                  <h5>Subscribe to our newsletter</h5>
                  <form action method="POST" className="uk-form">
                    <input placeholder="Your email address" type="text" name="email"/>
                    <button type="button" className="uk-button"><i className="uk-icon-envelope-o"/></button>
                  </form>
                </div>
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1  uk-width-small-1-1 gift">
                  <div className="tableDiv">
                    <div className="lCol">
                      <svg id="giftImg" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" x={0} y={0} version="1.1" style={{shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd'}} viewBox="0  0 430 419" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="cl-gift-icon">
                          <path className="fil0" d="M4 97l72 0 0 7 -68 0 0 88 18 0 0 219 132 0 0 8 -140 0 0 -219 -18 0 0 -103 4 0zm351 0l75 0 0 103 -17 0 0 219 -141 0 0 -8 134 0 0 -219 16 0 0 -88 -68 0 0 -7 1 0z"/>
                          <path className="fil1" d="M254 96c2,-5 4,-6 7,-11 19,-28 29,-66 68,-66 35,0 33,52 -9,69 -22,9 -36,8 -66,8zm9 8l0 314 -96 0 0 -314 -72 0c-10,-9 -13,-7 -25,-21 -7,-9 -11,-18 -13,-33 -4,-26 15,-50 38,-50 38,0 50,8 72,43 10,15 26,53 48,53 22,0 38,-38 48,-53 23,-35 34,-43 72,-43 24,0 42,25 38,52 -3,14 -6,23 -14,32 -11,13 -12,10 -22,18 -3,3 0,0 -2,2l-72 0zm-186 -56c0,-19 3,-29 29,-29 23,0 38,25 49,41l21 36c-30,0 -44,1 -66,-8 -15,-6 -33,-21 -33,-40z"/>
                        </g>
                      </svg>
                    </div>
                    <div className="rCol">
                      <h5> <a href={staticBaseURL + '/referrals-wins'}>Join our referral program TODAY!</a></h5>
                      <p>You win, your friends win, everybody wins<br/> just by playing!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END FOOTER MIDDLE */}
        {/* START FOOTER LOWER */}
        <section className="footerLower">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1 copyright">
                  <ul>
                    <li>© 2018</li>
                    <li><a href="https://www.coachlist.com">CoachList.com</a></li>
                  </ul>
                </div>
                <div className="uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1">
                  <ul className="lastul">
                    <li><a href={staticBaseURL + '/terms'}>Terms of Service </a></li>
                    <li><a href={staticBaseURL + '/privacy'}> Privacy Policy</a></li>
                    <li>We are committed to your success</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className={loading ? 'overlayLoader' : ''}>
          <ClipLoader loading={loading} size={30}/>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  saveDataOnNext: PropTypes.object.isRequired,
  sportUpdateStatus: PropTypes.string.status
};

Footer.defaultProps = {

};

const mapStateToProps = state => {
  const {saveDataOnNext, currentSport} = state;
  return {
    saveDataOnNext,
    sportUpdateStatus: currentSport.status
  };
};

export default withRouter(connect(mapStateToProps)(Footer));
