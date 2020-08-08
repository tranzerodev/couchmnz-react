import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import TopContent from '../ISPRegFlowTopContent';
import Modal from './Modal';
import FinishLaterLink from '../../../../common/FinishLaterLink';

import {
  addPicture,
  updatePicture,
  clearPicture,
  sspSubmitEvents
} from '../../../../../actions';
import DragAndDropCalendar from '../../../../ssp/isp/common/DragAndDrop/DragAndDrop';
import {REGISTRATION_ISP_SESSIONS, REGISTRATION_ISP_BUSINESS_MODAL} from '../../../../../constants/pathConstants';
/* Import config from '../../config'; */

class ISPRegistration8Class extends Component {
  constructor() {
    super();
    this.handleNav = this.handleNav.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleFinishLater = this.handleFinishLater.bind(this);
    this.state = {
      visible: 'none',
      visibleSpeciality: 'none',
      modal: <div/>,
      trySubmit: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleFinishLater() {
    this.setState({modal: <Modal handleCloseModal={this.handleCloseModal} handleNext={this.handleNext} submitForm={this.props.sspSubmitEvents}/>});
  }
  handleCloseModal() {
    this.setState({modal: <div/>});
  }
  handleNav() {
    this.setState({trySubmit: true});
    this.props.sspSubmitEvents({status: true});
    // If (this.props.sspValidation.events.valid) {
    //   this.props.history.push(REGISTRATION_ISP_BUSINESS_MODAL);
    // }
  }
  handleBack() {
    this.props.history.push(REGISTRATION_ISP_SESSIONS);
  }
  onViewChange(flag) {
    this.setState({showDragAndContent: flag});
  }

  componentWillUpdate(nextProps, nextState) {
    const curSspValidEvents = nextProps.sspValidation.events;
    const {trySubmit} = nextState;
    if ((curSspValidEvents.valid) && curSspValidEvents.submitted && (trySubmit)) {
      this.props.history.push(REGISTRATION_ISP_BUSINESS_MODAL);
    }
  }

  render() {
    return (
      <div>
        {this.state.modal}
        <TopContent step={8}/>
        {/* START STEP SECTION */}
        <section className="stepSection stepSectionNxt">
          <div className="wrapper mb30">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <a onClick={this.handleBack} className="back">
                    <svg className="cl-icon-back-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="7348.966 -314.516 17.534 11.033">
                      <g data-name="Group 118" transform="translate(7302 -512.5)">
                        <path data-name="Path 35" className="cl-icon-back-arrow-1" d="M0,0,4.749,5,3.795,6,0,10" transform="translate(52.749 208.5) rotate(180)"/>
                        <line data-name="Line 9" className="cl-icon-back-arrow-1" x2="16" transform="translate(48.5 203.5)"/>
                      </g>
                    </svg>
                    {this.props.p.t('ISPRegistration8.back')}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <div className="calendarInfo">
                  <h1 className="uk-padding-remove">{this.props.p.t('ISPRegistration8.calendarAvailability')}</h1>
                  <p className="mb50">{this.props.p.t('ISPRegistration8.message')}</p>
                  <div className="uk-grid ">
                    <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                      <div className="calendarContent">
                        <div className={this.props.sspValidation.events.valid === false && this.props.sspValidation.events.submitted ? 'field-holder error' : 'field-holder'}>
                          <p className="mb45">{this.props.p.t('ISPRegistration8.sessionsMessage')}</p>
                          <span className="error-text">{this.props.p.t('ISPRegistration8.validation_messages.events')}</span>
                        </div>
                        <DragAndDropCalendar views={['week']} onViewChange={this.onViewChange}/>
                        <div className="uk-text-right">
                          {/* <a>{this.props.p.t('ISPRegistration8.syncWithCalendar')}</a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2">
                    {/* <a className="prev">{this.props.p.t('ISPRegistration8.preview')} <span>{this.props.p.t('ISPRegistration8.page')}</span></a> */}
                  </div>
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2 mnone"/>
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2">
                    <div className="nxtAlign">
                      <a onClick={this.handleNav} className="general_btn">{this.props.p.t('ISPRegistration8.' + this.props.buttonText)}</a>
                    </div>
                  </div>
                  <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1">
                    <div className="finishDivSec">
                      <FinishLaterLink/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  static get propTypes() {
    return {
      history: PropTypes.object,
      buttonText: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}

ISPRegistration8Class.defaultProps = {
  history: {},
  buttonText: 'Next'
};

const mapStateToProps = state => {
  const {profilePicture, images, sessions, events, sspValidation} = state;
  return {
    profilePicture,
    images,
    sessions,
    events,
    sspValidation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPicture: picture => dispatch(addPicture(picture)),
    updatePicture: picture => dispatch(updatePicture(picture)),
    clearPicture: () => dispatch(clearPicture()),
    sspSubmitEvents: data => dispatch(sspSubmitEvents(data))
  };
};

const Registration4 = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration8Class);
export default translate(Registration4);
