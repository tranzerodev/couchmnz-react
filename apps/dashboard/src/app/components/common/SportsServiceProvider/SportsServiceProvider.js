import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProfile, clearProfile, setNewProfile, postNewProfile} from '../../../actions';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {SSP_OTHERS, SSP_FITNESS_BUSINESS, SSP_CAMP, SSP_COACH} from '../../../constants/assetsPaths';
import config from '../../../config';
import {FULFILLED, PENDING} from '../../../constants/ActionTypes';
import {COMING_SOON_SCC, COMING_SOON_TF, COMING_SOON_OSP, REGISTRATION, REGISTRATION_BUSINESS_MODEL} from '../../../constants/pathConstants';
import {ClipLoader} from 'react-spinners';

class SportsServiceProviderClass extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {profile: undefined};
  }

  handleClick() {
    const {profile} = this.state;
    // Temporary block
    if (
      profile === 'camp'
    ) {
      this.props.history.push(COMING_SOON_SCC);
      return;
    } else if (profile === 'business') {
      this.props.history.push(COMING_SOON_TF);
      return;
    } else if (profile === 'service-provider') {
      this.props.history.push(COMING_SOON_OSP);
      return;
    }
    this.props.setNewProfile(profile);

    this.props.postNewProfile({profileType: profile});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.status !== FULFILLED && this.props.profile.status === FULFILLED) {
      this.props.history.push(REGISTRATION_BUSINESS_MODEL);
    }
  }

  handleChange(e) {
    this.setState({profile: e.target.value});
  }

  render() {
    const loading = this.props.userProfiles.status === PENDING;
    return (
      <section className="stepSection ssp-regflow-1o">
        <div className="uk-container uk-container-center">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
              <h1 className="uk-text-center">{this.props.p.t('SportsServiceProvider.welcomeMessage')}</h1>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="stepContent">
                <input id="question4" name="question" type="radio" value={config.userTypes.ssp.sspSubTypes.ISP} onChange={this.handleChange}/>
                <label htmlFor="question4">
                  <span className="radioImgHolder">
                    <svg className="cl-icon-ssp-coach" xmlns="http://www.w3.org/2000/svg" viewBox="470.462 1354.31 62.695 83.038">
                      <g data-name="Group 13" transform="translate(-3700 382)">
                        <g data-name="Coach,-Trainer,-Instructor" transform="translate(4171 973)">
                          <path className="cl-icon-ssp-coach-1" d="M5.989,16.971s1.635-7.309,6.685-12.14S25.6,0,25.6,0s5.181,4.282,6.669,8.883A67.159,67.159,0,0,1,34.49,18.75l-28.555.087Z"/>
                          <path className="cl-icon-ssp-coach-1" d="M28.686,0s4.909,5.533,5.88,8.114A59.914,59.914,0,0,1,36.4,16.8a47.45,47.45,0,0,1,4.63-4.67A20.573,20.573,0,0,1,44.388,10.7s-.978-4.975-4.481-7.278S28.686,0,28.686,0Z"/>
                          <path className="cl-icon-ssp-coach-1" d="M38.578,18.1a28.641,28.641,0,0,1,4.461-3.96,39.961,39.961,0,0,1,4.146-2.389l13.639.381a2.144,2.144,0,0,1,.468,2.793c-.887,1.832-1.009,3.121-2.347,3.121S38.578,18.1,38.578,18.1Z"/>
                          <path className="cl-icon-ssp-coach-2" d="M6.436,19.351S4.416,25.4,5.08,30.224,7.536,37.5,8.148,40.263a43.2,43.2,0,0,1,.739,5.084c.056.62,20.8,6.424,20.8,6.424s-1.141-4.341-.1-5.694,8.207-.918,9.777-1.778a10.4,10.4,0,0,0,4.526-4.886c1.8-3.99,2.026-9.407,2.371-11.544a47.825,47.825,0,0,0,.03-9.268"/>
                          <path className="cl-icon-ssp-coach-2" d="M6.09,50.91a27.9,27.9,0,0,0-3.978,6.26C1.062,59.947,0,67.153,0,67.153s9.222,6.832,19.663,8.2,24.86-3.225,24.86-3.225-3.89-6.266-6.306-9.846a47.288,47.288,0,0,0-6.975-7.5Z"/>
                          <path className="cl-icon-ssp-coach-1" d="M8.814,45.857l-2.54,4.849s23.943,7.818,27.532,8.022-4.09-6.692-4.09-6.692Z"/>
                          <g transform="translate(26.025 51.018)">
                            <g>
                              <ellipse data-name="Ellipse 13" className="cl-icon-ssp-coach-3" cx="15.827" cy="15.665" rx="15.827" ry="15.665" transform="translate(0 0)"/>
                              <ellipse data-name="Ellipse 14" className="cl-icon-ssp-coach-4" cx="15.327" cy="15.165" rx="15.327" ry="15.165" transform="translate(0.5 0.5)"/>
                            </g>
                            <g transform="translate(5.552 6.456)">
                              <path className="cl-icon-ssp-coach-1" d="M1.906,9.857H8.62s-1.05,6.917,5.161,6.917a5.341,5.341,0,0,0,5.748-5.4,4.709,4.709,0,0,0-2.434-4.148C15.1,6.082,12.013,6.5,12.013,6.5L11.979,7.88H10.253L8.371,6.122,0,5.976Z"/>
                              <g>
                                <path data-name="Path 31" className="cl-icon-ssp-coach-5" d="M5.07,6.052V9.877H1.914L.01,6.052Z"/>
                                <path data-name="Path 32" className="cl-icon-ssp-coach-6" d="M4.57,6.552H.817L2.224,9.377H4.57Z"/>
                              </g>
                              <path className="cl-icon-ssp-coach-2" d="M13.732,14.658A3.733,3.733,0,0,0,15.816,14a4.946,4.946,0,0,0,1.325-2"/>
                              <path className="cl-icon-ssp-coach-2" d="M11.567,4.15l1.655-3.3"/>
                              <path data-name="Line" className="cl-icon-ssp-coach-2" d="M9.716,4.15V.461"/>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <h2>{this.props.p.t('SportsServiceProvider.user1')}</h2>
                  <p>{this.props.p.t('SportsServiceProvider.userDescription1')}</p>
                </label>
              </div>
            </div>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="stepContent">
                <input id="question5" name="question" type="radio" value={config.userTypes.ssp.sspSubTypes.CAMP} onChange={this.handleChange}/>
                <label htmlFor="question5">
                  <span className="radioImgHolder">
                    <svg className="cl-icon-ssp-camp" xmlns="http://www.w3.org/2000/svg" viewBox="761.314 1352.325 91.35 88.455">
                      <g data-name="Group 14" transform="translate(-3688.511 380.489)">
                        <g transform="translate(4450 972)">
                          <g>
                            <path data-name="Path 9" className="cl-icon-ssp-camp-1" d="M7,87.76c-.475.271-.655.1-.4-.39L45.671,13.149c.256-.486.457-.44.45.11l-.279,21.06a5.8,5.8,0,0,1-.413,1.9S38.67,51.853,31.14,65.3,7,87.76,7,87.76Z"/>
                            <path data-name="Path 10" className="cl-icon-ssp-camp-2" d="M7.373,86.972q.259-.15.561-.329c.943-.561,1.993-1.219,3.126-1.971a80.363,80.363,0,0,0,9.489-7.349A49.84,49.84,0,0,0,30.7,65.054q1.34-2.391,2.718-5c2.779-5.255,5.54-10.888,8.157-16.52.916-1.972,1.748-3.8,2.481-5.445.257-.575.482-1.085.675-1.525.116-.264.195-.445.236-.541a5.317,5.317,0,0,0,.371-1.71l.264-19.968Z"/>
                          </g>
                          <g>
                            <path data-name="Path 11" className="cl-icon-ssp-camp-1" d="M45.849-87.76c-.475-.271-.655-.1-.4.39L84.525-13.149c.256.486.457.44.45-.11L84.7-34.32a5.8,5.8,0,0,0-.414-1.9S77.524-51.853,69.994-65.3,45.849-87.76,45.849-87.76Z" transform="translate(129.977) rotate(180)"/>
                            <path data-name="Path 12" className="cl-icon-ssp-camp-2" d="M46.227-86.972q.259.15.561.329c.943.561,1.993,1.219,3.126,1.971A80.363,80.363,0,0,1,59.4-77.323a49.841,49.841,0,0,1,10.156,12.27q1.339,2.391,2.718,5c2.779,5.255,5.54,10.888,8.157,16.52.916,1.972,1.748,3.8,2.481,5.445.257.575.482,1.085.675,1.525.116.264.195.445.236.541a5.317,5.317,0,0,1,.371,1.71l.264,19.968Z" transform="translate(129.977) rotate(180)"/>
                          </g>
                          <path className="cl-icon-ssp-camp-3" d="M48.567,19.938,38.343.511"/>
                          <path className="cl-icon-ssp-camp-3" d="M52.657-19.938,42.433-.511" transform="translate(95.09) rotate(180)"/>
                          <path data-name="Line" className="cl-icon-ssp-camp-3" d="M45.5,13.8V87.485"/>
                          <path data-name="Line" className="cl-icon-ssp-camp-3" d="M6.646,87.421H83.74"/>
                          <path data-name="Line" className="cl-icon-ssp-camp-3" d="M84.354,87.421,90.489,77.2"/>
                          <path className="cl-icon-ssp-camp-3" d="M.511-87.421,6.646-77.2" transform="translate(7.157) rotate(180)"/>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <h2>{this.props.p.t('SportsServiceProvider.user2')}</h2>
                  <p>{this.props.p.t('SportsServiceProvider.userDescription2')}</p>
                </label>
              </div>
            </div>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="stepContent">
                <input id="question6" name="question" type="radio" value={config.userTypes.ssp.sspSubTypes.BUSINESS} onChange={this.handleChange}/>
                <label htmlFor="question6">
                  <span className="radioImgHolder">
                    <svg className="cl-icon-ssp-fitness-business" xmlns="http://www.w3.org/2000/svg" viewBox="1061.995 1353 102.05 86">
                      <g data-name="Group 15" transform="translate(-3654.56 386)">
                        <g transform="translate(4716 967)">
                          <g transform="translate(32)">
                            <g>
                              <rect data-name="Rectangle 23" className="cl-icon-ssp-fitness-business-1" width="40" height="19.286" rx="3"/>
                              <rect data-name="Rectangle 24" className="cl-icon-ssp-fitness-business-2" width="39" height="18.286" rx="3" transform="translate(0.5 0.5)"/>
                            </g>
                            <path className="cl-icon-ssp-fitness-business-3" d="M20,18.8v7.714"/>
                            <g transform="translate(6.829 4.821)">
                              <rect className="cl-icon-ssp-fitness-business-4" width="19.638" height="2.893" transform="translate(3.43 3.235)"/>
                              <g transform="translate(18.159)">
                                <rect className="cl-icon-ssp-fitness-business-4" width="2.927" height="9.705" rx="1.463"/>
                                <rect data-name="Rectangle-14" className="cl-icon-ssp-fitness-business-4" width="2.927" height="6.821" rx="1.463" transform="translate(2.927 1.442)"/>
                                <rect data-name="Rectangle-14" className="cl-icon-ssp-fitness-business-4" width="2.927" height="4.08" rx="1.463" transform="translate(5.854 2.812)"/>
                              </g>
                              <g>
                                <rect className="cl-icon-ssp-fitness-business-4" width="2.927" height="9.705" rx="1.463" transform="translate(6.231)"/>
                                <rect className="cl-icon-ssp-fitness-business-4" width="2.927" height="6.835" rx="1.463" transform="translate(3.304 1.435)"/>
                                <rect className="cl-icon-ssp-fitness-business-4" width="2.927" height="3.834" rx="1.463" transform="translate(0.378 2.935)"/>
                              </g>
                            </g>
                          </g>
                          <g transform="translate(0 24)">
                            <g>
                              <rect data-name="Rectangle 25" className="cl-icon-ssp-fitness-business-5" width="97.251" height="62" rx="3" transform="translate(2.943)"/>
                              <rect data-name="Rectangle 26" className="cl-icon-ssp-fitness-business-6" width="96.251" height="61" rx="3" transform="translate(3.443 0.5)"/>
                            </g>
                            <g data-name="Rectangle-9">
                              <path data-name="Path 13" className="cl-icon-ssp-fitness-business-5" d="M43.407,38.425a3,3,0,0,1,3.006-3h10.91a3,3,0,0,1,3.006,3V62H43.407Z"/>
                              <path data-name="Path 14" className="cl-icon-ssp-fitness-business-7" d="M43.907,61.5H59.829V38.425a2.5,2.5,0,0,0-2.506-2.5H46.413a2.5,2.5,0,0,0-2.506,2.5Z"/>
                            </g>
                            <g>
                              <rect data-name="Rectangle 27" className="cl-icon-ssp-fitness-business-5" width="15.45" height="9.595" rx="2" transform="translate(14.714 10.333)"/>
                              <rect data-name="Rectangle 28" className="cl-icon-ssp-fitness-business-6" width="14.45" height="8.595" rx="2" transform="translate(15.214 10.833)"/>
                            </g>
                            <g>
                              <rect data-name="Rectangle 29" className="cl-icon-ssp-fitness-business-1" width="16.921" height="9.595" rx="2" transform="translate(43.407 10.333)"/>
                              <rect data-name="Rectangle 30" className="cl-icon-ssp-fitness-business-2" width="15.921" height="8.595" rx="2" transform="translate(43.907 10.833)"/>
                            </g>
                            <g>
                              <rect data-name="Rectangle 31" className="cl-icon-ssp-fitness-business-5" width="15.45" height="9.595" rx="2" transform="translate(72.1 10.333)"/>
                              <rect data-name="Rectangle 32" className="cl-icon-ssp-fitness-business-6" width="14.45" height="8.595" rx="2" transform="translate(72.6 10.833)"/>
                            </g>
                            <g data-name="Rectangle-6">
                              <rect data-name="Rectangle 33" className="cl-icon-ssp-fitness-business-1" width="15.45" height="9.595" rx="2" transform="translate(14.714 36.167)"/>
                              <rect data-name="Rectangle 34" className="cl-icon-ssp-fitness-business-2" width="14.45" height="8.595" rx="2" transform="translate(15.214 36.667)"/>
                            </g>
                            <g data-name="Rectangle-6-Copy-3">
                              <rect data-name="Rectangle 35" className="cl-icon-ssp-fitness-business-1" width="15.45" height="9.595" rx="2" transform="translate(72.1 36.167)"/>
                              <rect data-name="Rectangle 36" className="cl-icon-ssp-fitness-business-2" width="14.45" height="8.595" rx="2" transform="translate(72.6 36.667)"/>
                            </g>
                            <path className="cl-icon-ssp-fitness-business-3" d="M3.278,29.155H99.859"/>
                            <path className="cl-icon-ssp-fitness-business-3" d="M3.679,59.786H43.407"/>
                            <path className="cl-icon-ssp-fitness-business-3" d="M60.329,59.786H99.321"/>
                            <g>
                              <path data-name="Path 15" className="cl-icon-ssp-fitness-business-5" d="M.781,1.716A2.9,2.9,0,0,1,3.3,0H99.862a2.905,2.905,0,0,1,2.518,1.716l.1.259a1.173,1.173,0,0,1-1.174,1.716H1.854A1.171,1.171,0,0,1,.679,1.975Z"/>
                              <path data-name="Path 16" className="cl-icon-ssp-fitness-business-7" d="M1.246,1.9l-.1.259c-.243.621.04,1.034.709,1.034h99.453c.664,0,.95-.416.708-1.034l-.1-.259A2.408,2.408,0,0,0,99.862.5H3.3A2.407,2.407,0,0,0,1.246,1.9Z"/>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <h2>{this.props.p.t('SportsServiceProvider.user3')}</h2>
                  <p>{this.props.p.t('SportsServiceProvider.userDescription3')}</p>
                </label>
              </div>
            </div>
            <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="stepContent">
                <input id="question7" name="question" type="radio" value={config.userTypes.ssp.sspSubTypes.SERVICE_PROVIDER} onChange={this.handleChange}/>
                <label htmlFor="question7">
                  <span className="radioImgHolder">
                    <svg className="cl-icon-ssp-other" xmlns="http://www.w3.org/2000/svg" viewBox="1354 1361 129.511 71.51">
                      <g data-name="Group 16" transform="translate(-3625 381)">
                        <g transform="translate(4979 980)">
                          <g transform="translate(15.184)">
                            <g>
                              <rect data-name="Rectangle 39" className="cl-icon-ssp-other-1" width="71.454" height="71.51" rx="10"/>
                              <rect data-name="Rectangle 40" className="cl-icon-ssp-other-2" width="70.454" height="70.51" rx="10" transform="translate(0.5 0.5)"/>
                            </g>
                            <g>
                              <path data-name="Path 17" className="cl-icon-ssp-other-1" d="M10.718,12.842a3,3,0,0,1,3-3.009H57.739a3,3,0,0,1,3,3.009v3.695a6.7,6.7,0,0,1-6.707,6.7h-36.6a6.71,6.71,0,0,1-6.707-6.7Z"/>
                              <path data-name="Path 18" className="cl-icon-ssp-other-3" d="M11.218,12.842v3.695a6.21,6.21,0,0,0,6.207,6.2h36.6a6.2,6.2,0,0,0,6.207-6.2V12.842a2.5,2.5,0,0,0-2.5-2.509H13.716A2.5,2.5,0,0,0,11.218,12.842Z"/>
                            </g>
                          </g>
                          <g transform="translate(64.309 20.559)">
                            <g>
                              <rect data-name="Rectangle 41" className="cl-icon-ssp-other-1" width="65.202" height="44.694" rx="6" transform="translate(0 6.257)"/>
                              <rect data-name="Rectangle 42" className="cl-icon-ssp-other-2" width="64.202" height="43.694" rx="6" transform="translate(0.5 6.757)"/>
                            </g>
                            <g>
                              <ellipse data-name="Ellipse 9" className="cl-icon-ssp-other-4" cx="8.932" cy="8.939" rx="8.932" ry="8.939" transform="translate(24.116 19.665)"/>
                              <ellipse data-name="Ellipse 10" className="cl-icon-ssp-other-5" cx="8.432" cy="8.439" rx="8.432" ry="8.439" transform="translate(24.616 20.165)"/>
                            </g>
                            <g transform="translate(28.582 24.135)">
                              <path className="cl-icon-ssp-other-6" d="M4.466,0V8.939"/>
                              <path className="cl-icon-ssp-other-6" d="M8.932,4.469H0"/>
                            </g>
                            <path className="cl-icon-ssp-other-7" d="M25.009,5.99V3a3,3,0,0,1,3-3h9.746a3,3,0,0,1,3,3v3"/>
                          </g>
                          <g transform="translate(0 14.302)">
                            <g>
                              <path data-name="Path 19" className="cl-icon-ssp-other-1" d="M0,19.157A12,12,0,0,1,12,7.151H31.763a12.008,12.008,0,0,1,12,12.006v34.06a4,4,0,0,1-4,3.991H4a3.992,3.992,0,0,1-4-3.991Z"/>
                              <path data-name="Path 20" className="cl-icon-ssp-other-3" d="M.5,19.157v34.06A3.492,3.492,0,0,0,4,56.708H39.766a3.5,3.5,0,0,0,3.5-3.491V19.157a11.508,11.508,0,0,0-11.5-11.506H12A11.5,11.5,0,0,0,.5,19.157Z"/>
                            </g>
                            <g>
                              <path data-name="Path 21" className="cl-icon-ssp-other-1" d="M0,15.152a8,8,0,0,1,8-8H35.764a8,8,0,0,1,8,8V53.217a4,4,0,0,1-4,3.991H4a3.992,3.992,0,0,1-4-3.991Z"/>
                              <path data-name="Path 22" className="cl-icon-ssp-other-3" d="M.5,15.152V53.217A3.492,3.492,0,0,0,4,56.708H39.766a3.5,3.5,0,0,0,3.5-3.491V15.152a7.5,7.5,0,0,0-7.5-7.5H8A7.5,7.5,0,0,0,.5,15.152Z"/>
                            </g>
                            <g>
                              <path data-name="Path 23" className="cl-icon-ssp-other-1" d="M9.16,3a3,3,0,0,1,2.994-3H31.612a3,3,0,0,1,2.994,3V8.173H9.16Z"/>
                              <path id="Path_24" data-name="Path 24" className="cl-icon-ssp-other-3" d="M9.66,7.673H34.106V3A2.5,2.5,0,0,0,31.612.5H12.154A2.5,2.5,0,0,0,9.66,3Z"/>
                            </g>
                            <g>
                              <path data-name="Path 25" className="cl-icon-ssp-other-4" d="M9.16,3a3,3,0,0,1,2.994-3H31.612a3,3,0,0,1,2.994,3V8.173H9.16Z"/>
                              <path data-name="Path 26" className="cl-icon-ssp-other-8" d="M9.66,7.673H34.106V3A2.5,2.5,0,0,0,31.612.5H12.154A2.5,2.5,0,0,0,9.66,3Z"/>
                            </g>
                            <rect className="cl-icon-ssp-other-4" width="27.481" height="8.173" rx="2" transform="translate(8.142 36.777)"/>
                            <g transform="translate(12.338 17.367)">
                              <g>
                                <g transform="translate(7.267 -7.129) rotate(42)">
                                  <path data-name="Path 27" className="cl-icon-ssp-other-4" d="M12.919,11.527s2.56-2.519,2.56-5.626S12.919.274,12.919.274s-2.56,2.519-2.56,5.626S12.919,11.527,12.919,11.527Z"/>
                                  <path data-name="Path 28" className="cl-icon-ssp-other-8" d="M12.919,10.783l.018-.021a10.288,10.288,0,0,0,.839-1.15,7.047,7.047,0,0,0,1.2-3.712,7.047,7.047,0,0,0-1.2-3.712,10.28,10.28,0,0,0-.839-1.15l-.018-.021-.018.021a10.28,10.28,0,0,0-.839,1.15,7.048,7.048,0,0,0-1.2,3.712,7.048,7.048,0,0,0,1.2,3.712,10.288,10.288,0,0,0,.839,1.15Z"/>
                                </g>
                                <g>
                                  <path data-name="Path 29" className="cl-icon-ssp-other-4" d="M5.668-13.734A7.631,7.631,0,0,1,7.831-8.981,7.631,7.631,0,0,1,5.668-4.229,7.631,7.631,0,0,1,3.506-8.981,7.631,7.631,0,0,1,5.668-13.734Z" transform="matrix(-0.743, 0.669, -0.669, -0.743, 3.871, -1.486)"/>
                                  <path data-name="Path 30" className="cl-icon-ssp-other-9" d="M5.668-12.985a8.621,8.621,0,0,1,.658.909,5.878,5.878,0,0,1,1,3.094,5.878,5.878,0,0,1-1,3.094,8.614,8.614,0,0,1-.658.909,8.616,8.616,0,0,1-.658-.909,5.878,5.878,0,0,1-1-3.094,5.878,5.878,0,0,1,1-3.094A8.624,8.624,0,0,1,5.668-12.985Z" transform="matrix(-0.743, 0.669, -0.669, -0.743, 3.871, -1.486)"/>
                                </g>
                                <path className="cl-icon-ssp-other-7" d="M9.286,15.012a3.635,3.635,0,0,1-.778-2.381,5.566,5.566,0,0,1,.82-2.781"/>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <h2>{this.props.p.t('SportsServiceProvider.user4')}</h2>
                  <p>{this.props.p.t('SportsServiceProvider.userDescription4')}</p>
                </label>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
              <p className="uk-text-center note"><strong>{this.props.p.t('SportsServiceProvider.note')}</strong> {this.props.p.t('SportsServiceProvider.message')}</p>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-2">
              <Link to="profile" className="back btm-back">{this.props.p.t('SportsServiceProvider.back')}</Link>
            </div>
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-2 uk-text-right">
              <a className="general_btn" onClick={this.handleClick}>{this.props.p.t('SportsServiceProvider.next')}</a>
            </div>
          </div>
        </div>
        <div className={loading ? 'overlayLoader' : ''}>
          <ClipLoader loading={loading} size={30}/>
        </div>
      </section>

    );
  }

  static get propTypes() {
    return {
      history: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      setNewProfile: PropTypes.func.isRequired,
      postNewProfile: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired
    };
  }
}

SportsServiceProviderClass.defaultProps = {
  history: {}
};

const mapStateToProps = state => {
  const {profile, newProfile, userProfiles} = state;
  return {profile, newProfile, userProfiles};
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: subProfile => dispatch(updateProfile({subProfile})),
    clearProfile: () => dispatch(clearProfile()),
    setNewProfile: type => dispatch(setNewProfile(type)),
    postNewProfile: params => dispatch(postNewProfile(params))
  };
};

const SportsServiceProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(SportsServiceProviderClass);
export default translate(SportsServiceProvider);
