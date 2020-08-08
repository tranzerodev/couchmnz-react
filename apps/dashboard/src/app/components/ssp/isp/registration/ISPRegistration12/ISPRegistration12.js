import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import FinishLaterLink from '../../../../common/FinishLaterLink';

import {
  addPicture,
  updatePicture,
  clearPicture
} from '../../../../../actions';
import Modal from './Modal';
import {REGISTRATION_ISP_PAYOUT_DETAILS, REGISTRATION_ISP_ACCOUNT_DETAILS} from '../../../../../constants/pathConstants';

class ISPRegistration12Class extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    /* This.handleAddSpeciality = this.handleAddSpeciality.bind(this); */
    this.handleNav = this.handleNav.bind(this);
    this.handleVideoNav = this.handleVideoNav.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleCropped = this.handleCropped.bind(this);
    this.handleProfilePicture = this.handleProfilePicture.bind(this);
    this.handleCroppedPhoto = this.handleCroppedPhoto.bind(this);
    this.handleActionPhotos = this.handleActionPhotos.bind(this);
    this.handleActionVideos = this.handleActionVideos.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleFinishLater = this.handleFinishLater.bind(this);
    this.state = {
      filteredSports: [],
      sportsQuery: '',
      visible: 'none',
      visibleSpeciality: 'none',
      actionVideo: false,
      actionVideoVisibility: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleSelect(e) {
    this.setState({
      visible: 'none',
      visibleAddSpeciality: 'block',
      sportsQuery: e.currentTarget.textContent
    });
  }
  handleClick(/* E */) {
    /* Console.log(e.target.value); */
  }
  handleChange(e) {
    if (e.target.value === '') {
      this.setState({
        visible: 'none',
        sportsQuery: ''
      });
      return;
    }
    const filteredSports = this.props.sports.filter(sport => sport.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
    /* Console.log('filteredSports', filteredSports); */
    this.setState({
      filteredSports,
      visible: filteredSports.length > 0 ? 'block' : 'none',
      sportsQuery: e.target.value
    });
  }
  /* HandleAddSpeciality(e) {
    this.setState({
      visibleAddSpeciality: 'none',
      visibleSpeciality: 'block'
    })
  } */
  handleDone() {

  }
  handleNav() {
    this.props.history.push(REGISTRATION_ISP_PAYOUT_DETAILS);
  }
  handleVideoNav() {
    /* Console.log('handleVideoNav'); */
    this.setState({
      actionVideo: !this.state.actionVideo,
      actionVideoVisibility: !this.state.actionVideoVisibility
    });
  }
  handleBack() {
    this.props.history.push(REGISTRATION_ISP_ACCOUNT_DETAILS);
  }
  handleCropped(cropped) {
    this.cropped = cropped;
  }
  handleProfilePicture() {
    this.props.history.push('profilePicture');
  }
  handleCroppedPhoto(cropped) {
    this.cropped = cropped;
  }
  handleActionPhotos() {
    this.props.history.push('image');
  }
  handleActionVideos() {
    this.props.history.push('videos');
  }
  handleFinishLater() {
    this.setState({modal: <Modal handleCloseModal={this.handleCloseModal} handleNext={this.handleNext} submitForm={this.props.sspSubmitEvents}/>});
  }
  handleCloseModal() {
    this.setState({modal: <div/>});
  }
  render() {
    return (
      <div>
        {this.state.modal}
        <div className>
          <section className="profileType">
            <div className="wrapper">
              <div className="uk-container-fluid uk-container-center">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1  uk-width-small-1-1">
                    <div className="profileTypeInfo">
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
                      <h5>{this.props.p.t('ISPRegistration12.createProfile')}</h5>
                      <h2>{this.props.p.t('ISPRegistration12.title')}</h2>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1  uk-width-small-1-1">
                    <div className="processProgress">
                      <ul>
                        <li className="complete">
                          <span>
                            <svg className="tick-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 8">
                              <path fill="none" fillRule="evenodd" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 3.793l2.095 2.794L9.38 1"/>
                            </svg>
                          </span>
                          <div/>
                          <p>{this.props.p.t('ISPRegistration12.buildYour')}<br/> {this.props.p.t('ISPRegistration12.profile')}</p>
                        </li>
                        <li className="complete">
                          <span>
                            <svg className="tick-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 8">
                              <path fill="none" fillRule="evenodd" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 3.793l2.095 2.794L9.38 1"/>
                            </svg>
                          </span>
                          <div/>
                          <p>{this.props.p.t('ISPRegistration12.defineTraining')}<br/> {this.props.p.t('ISPRegistration12.sessions')}</p>
                        </li>
                        <li className="processing">
                          <span/>
                          <div>
                            <ul className="buildStep uk-dotnav">
                              <li><a className="complete"/></li>
                              <li><a className="complete"/></li>
                              <li><a className="complete"/></li>
                              <li><a className="current"/></li>
                            </ul>
                          </div>
                          <p>{this.props.p.t('ISPRegistration12.completeYour')} <br/>{this.props.p.t('ISPRegistration12.account')}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* END PROFILE TYPE SECTION */}
          {/* START back SECTION */}
          <div className="top-back-sec">
            <div className="wrapper">
              <div className="uk-container-fluid uk-container-center">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                    <a onClick={this.handleBack} className="back">
                      <svg className="cl-icon-back-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="7348.966 -314.516 17.534 11.033">
                        <g data-name="Group 118" transform="translate(7302 -512.5)">
                          <path data-name="Path 35" className="cl-icon-back-arrow-1" d="M0,0,4.749,5,3.795,6,0,10" transform="translate(52.749 208.5) rotate(180)"/>
                          <line data-name="Line 9" className="cl-icon-back-arrow-1" x2={16} transform="translate(48.5 203.5)"/>
                        </g>
                      </svg>
                      {this.props.p.t('ISPRegistration12.back')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end back SECTION */}
          {/* START STEP SECTION */}
          <section className="stepSection stepSectionNxt ssp-regflow-1o">
            <div className="uk-container uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                  <h1 className="uk-padding-remove">{this.props.p.t('ISPRegistration12.header')}</h1>
                  <p>{this.props.p.t('ISPRegistration12.message1')}</p>
                  <p>{this.props.p.t('ISPRegistration12.message2')}</p>
                </div>
              </div>
              <div className="uk-grid">
                {/* <div class="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2">

                          </div> */}
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2 mnone"/>
                <div className="uk-width-xlarge-2-4 uk-width-large-2-4 uk-width-medium-1-3  uk-width-small-1-1">
                  <div className="nxtAlign">
                    <a onClick={this.handleNav} className="general_btn" data-uk-toggle>{/* this.props.p.t('ISPRegistration12.' + this.props.buttonText) */'CONTINUE TO ACCOUNT DETAILS'}</a>
                  </div>
                </div>
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="finishDivSec">
                    <FinishLaterLink/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      sports: PropTypes.array,
      history: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}

ISPRegistration12Class.defaultProps = {
  sports: [],
  history: {}
};

const mapStateToProps = state => {
  const {profilePicture, images} = state;
  return {
    profilePicture,
    images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPicture: picture => dispatch(addPicture(picture)),
    updatePicture: picture => dispatch(updatePicture(picture)),
    clearPicture: () => dispatch(clearPicture())
  };
};

const Registration4 = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration12Class);
export default translate(Registration4);
