import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {inviteUsers} from '../../../../../actions';
import SocialShare from './SocialShare';
import config from '../../../../../config';

class EarnReward extends Component {
  constructor() {
    super();
    this.handleReferAthleteEmailsChange = this.handleReferAthleteEmailsChange.bind(this);
    this.handleInviteAthlete = this.handleInviteAthlete.bind(this);
    this.handleReferSSPEmailsChange = this.handleReferSSPEmailsChange.bind(this);
    this.handleInviteSSP = this.handleInviteSSP.bind(this);
    this.validateEmails = this.validateEmails.bind(this);
    this.state = {
      referAthleteEmails: '',
      referSSPEmails: '',
      invalidAthleteEmail: undefined,
      invalidSSPEmail: undefined
    };
  }
  handleReferAthleteEmailsChange(e) {
    this.setState({referAthleteEmails: e.target.value});
    if (this.state.invalidAthleteEmail !== undefined) {
      this.setState({invalidAthleteEmail: undefined});
    }
  }
  handleInviteAthlete() {
    if (this.state.referAthleteEmails === undefined || this.state.referAthleteEmails === null || this.state.referAthleteEmails.trim() === '') {
      this.setState({referAthleteEmails: undefined});
    } else {
      const emails = this.state.referAthleteEmails.split(',');
      const validate = this.validateEmails(emails);
      if (validate === true) {
        this.props.inviteUsers({emails, type: 'athlete'}, {profileID: this.props.profile.data.profile.id});
      } else {
        this.setState({invalidAthleteEmail: validate});
      }
    }
  }
  handleReferSSPEmailsChange(e) {
    this.setState({referSSPEmails: e.target.value});
    if (this.state.invalidSSPEmail !== undefined) {
      this.setState({invalidSSPEmail: undefined});
    }
  }
  handleInviteSSP() {
    if (this.state.referSSPEmails === undefined || this.state.referSSPEmails === null || this.state.referSSPEmails.trim() === '') {
      this.setState({referSSPEmails: undefined});
    } else {
      const emails = this.state.referSSPEmails.split(',');
      const validate = this.validateEmails(emails);
      if (validate === true) {
        this.props.inviteUsers({emails, type: 'ssp'}, {profileID: this.props.profile.data.profile.id});
      } else {
        this.setState({invalidSSPEmail: validate});
      }
    }
  }
  validateEmails(emails) {
    for (let i = 0; i < emails.length; i++) {
      if (!config.RegExp.Email.test(emails[i].toLowerCase())) {
        return emails[i];
      }
    }
    return true;
  }
  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
          <ul className="referOuter uk-tab" data-uk-tab="connect:'#tab-content'">
            <li className="">
              <a href="">
                <div className="referInfo">
                  <div className="referDesktop">
                    <svg className="cl-icon-invite" xmlns="http://www.w3.org/2000/svg" viewBox="-2032 -1953 38 35">
                      <g transform="translate(-2032 -1953)">
                        <path className="cl-icon-invite-1" d="M32,6v8.649L19.242,22,6,14.4V6Z"/>
                        <path className="cl-icon-invite-2" d="M38,34.48h0V11.243h0l-.058-.058-.058-.058-.058-.058h0l-5.4-3.237V5.751a.548.548,0,0,0-.581-.578H27.716L19.291.087a.53.53,0,0,0-.581,0L10.168,5.173H5.752a.548.548,0,0,0-.581.578V8.006l-5,3.064h0a.057.057,0,0,0-.058.058l-.058.058L0,11.243H0V34.6c0,.058,0,.058.058.116v.058l.058.058h0c.058.058.116.058.174.116H.349c.058,0,.116.058.174.058h37.07c.058,0,.058,0,.116-.058.058,0,.058-.058.116-.058a.057.057,0,0,0,.058-.058l.058-.058v-.058c0-.058.058-.058.058-.116ZM36.838,12.514V33.324L20.046,21.936Zm-19,9.422L.93,33.324V12.514ZM35.56,33.844H2.266L18.942,22.572ZM5.055,9.335V13.5L1.511,11.532Zm20.394-4.22H12.318l6.566-3.931ZM31.2,6.272v8.093l-12.26,6.879L6.217,14.133V6.272ZM32.364,9.1l3.951,2.37-3.951,2.2ZM18.245,16.676l.465-1.1.058-.058c.058,0,.058,0,.058.058l.581,1.04,1.162.116a.057.057,0,0,1,.058.058v.058l-.813.867.232,1.156v.058h-.058l-1.046-.52-.988.578h-.116l-.058-.058.116-1.156-.813-.751s-.058-.058,0-.058a.057.057,0,0,0,.058-.058Zm9.239-6.127H9.645a.578.578,0,1,1,0-1.156h17.9a.548.548,0,0,1,.581.578A.6.6,0,0,1,27.483,10.549Zm0,2.948H9.645a.578.578,0,1,1,0-1.156h17.9a.548.548,0,0,1,.581.578A.6.6,0,0,1,27.483,13.5Z"/>
                      </g>
                    </svg>
                    <h5>{this.props.p.t('EarnRewards.refer_an_athlete')}</h5>
                    <h5><span> {this.props.rewards.athleteReferencePoints} {this.props.p.t('EarnRewards.points')}</span></h5>
                    <p> {this.props.p.t('EarnRewards.refer_an_athlete_desc')}</p>
                  </div>
                  <div className="referHeadMb">
                    <h5>{this.props.p.t('EarnRewards.refer_an_athlete')}</h5>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="referInfo">
                  <div className="referDesktop">
                    <svg className="cl-icon-invite" xmlns="http://www.w3.org/2000/svg" viewBox="-2032 -1953 38 35">
                      <g transform="translate(-2032 -1953)">
                        <path className="cl-icon-invite-1" d="M32,6v8.649L19.242,22,6,14.4V6Z"/>
                        <path className="cl-icon-invite-2" d="M38,34.48h0V11.243h0l-.058-.058-.058-.058-.058-.058h0l-5.4-3.237V5.751a.548.548,0,0,0-.581-.578H27.716L19.291.087a.53.53,0,0,0-.581,0L10.168,5.173H5.752a.548.548,0,0,0-.581.578V8.006l-5,3.064h0a.057.057,0,0,0-.058.058l-.058.058L0,11.243H0V34.6c0,.058,0,.058.058.116v.058l.058.058h0c.058.058.116.058.174.116H.349c.058,0,.116.058.174.058h37.07c.058,0,.058,0,.116-.058.058,0,.058-.058.116-.058a.057.057,0,0,0,.058-.058l.058-.058v-.058c0-.058.058-.058.058-.116ZM36.838,12.514V33.324L20.046,21.936Zm-19,9.422L.93,33.324V12.514ZM35.56,33.844H2.266L18.942,22.572ZM5.055,9.335V13.5L1.511,11.532Zm20.394-4.22H12.318l6.566-3.931ZM31.2,6.272v8.093l-12.26,6.879L6.217,14.133V6.272ZM32.364,9.1l3.951,2.37-3.951,2.2ZM18.245,16.676l.465-1.1.058-.058c.058,0,.058,0,.058.058l.581,1.04,1.162.116a.057.057,0,0,1,.058.058v.058l-.813.867.232,1.156v.058h-.058l-1.046-.52-.988.578h-.116l-.058-.058.116-1.156-.813-.751s-.058-.058,0-.058a.057.057,0,0,0,.058-.058Zm9.239-6.127H9.645a.578.578,0,1,1,0-1.156h17.9a.548.548,0,0,1,.581.578A.6.6,0,0,1,27.483,10.549Zm0,2.948H9.645a.578.578,0,1,1,0-1.156h17.9a.548.548,0,0,1,.581.578A.6.6,0,0,1,27.483,13.5Z"/>
                      </g>
                    </svg>
                    <h5>{this.props.p.t('EarnRewards.refer_an_ssp')}</h5>
                    <h5><span> {this.props.rewards.SSPReferencePoints} {this.props.p.t('EarnRewards.points')}</span></h5>
                    <p> {this.props.p.t('EarnRewards.refer_an_athlete_desc')}</p>
                  </div>
                  <div className="referHeadMb">
                    <h5>{this.props.p.t('EarnRewards.refer_an_ssp')}</h5>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="referInfo">
                  <div className="referDesktop">
                    <svg className="cl-icon-book" xmlns="http://www.w3.org/2000/svg" viewBox="-1537 -1944.624 36.5 35.268">
                      <defs>
                        <linearGradient x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                          <stop offset="0" stopColor="#fff" stopOpacity="0.502"/>
                          <stop offset="1" stopOpacity="0.502"/>
                        </linearGradient>
                      </defs>
                      <g transform="translate(-1537 -1945)">
                        <g>
                          <rect data-name="Rectangle 494" className="cl-icon-book-1" width="29" height="25.103" rx="2" transform="translate(0 5.02)"/>
                          <rect data-name="Rectangle 495" className="cl-icon-book-2" width="28" height="24.103" rx="2" transform="translate(0.5 5.52)"/>
                        </g>
                        <g data-name="Rectangle-2">
                          <rect data-name="Rectangle 496" className="cl-icon-book-1" width="29" height="25.103" rx="2" transform="translate(2 3.012)"/>
                          <rect data-name="Rectangle 497" className="cl-icon-book-2" width="28" height="24.103" rx="2" transform="translate(2.5 3.512)"/>
                        </g>
                        <ellipse className="cl-icon-book-3" cx="7" cy="7.029" rx="7" ry="7.029" transform="translate(22 21.086)"/>
                        <path className="cl-icon-book-4" d="M16.5,21.337l-3.233,1.707.617-3.615-2.615-2.56,3.614-.527L16.5,13.053l1.616,3.289,3.614.527-2.615,2.56.617,3.615Z"/>
                        <path className="cl-icon-book-5" d="M7.622.876v4.57"/>
                        <path data-name="Path-9" className="cl-icon-book-5" d="M26,.876v4.57"/>
                        <path data-name="Path-9" className="cl-icon-book-5" d="M20,.876v4.57"/>
                        <path data-name="Path-9" className="cl-icon-book-5" d="M14,.876v4.57"/>
                        <path className="cl-icon-book-6" d="M29.211,24.472v4.415l3.029,1.605"/>
                        <path className="cl-icon-book-7" d="M2.191,9.522H30.4"/>
                      </g>
                    </svg>
                    <h5>{this.props.p.t('EarnRewards.complete_a_session')}</h5>
                    <h5><span>{this.props.rewards.completeSessionPoints} {this.props.p.t('EarnRewards.points')}</span></h5>
                    <p> {this.props.p.t('EarnRewards.earn')} {this.props.rewards.completeSessionPoints} {this.props.p.t('EarnRewards.point_for_each_session')} </p>
                  </div>
                  <div className="referHeadMb">
                    <h5>{this.props.p.t('EarnRewards.complete_a_session')}</h5>
                  </div>
                </div>
              </a>
            </li>
            <li className="borderRight">
              <a href="">
                <div className="referInfo">
                  <div className="referDesktop">
                    <svg className="cl-icon-review" xmlns="http://www.w3.org/2000/svg" viewBox="-1293 -1944 36 37">
                      <g transform="translate(-1293 -1944)">
                        <path className="cl-icon-review-1" d="M34.8,27v7A1.8,1.8,0,0,1,33,35.8H23.4A1.8,1.8,0,0,1,21.6,34V27.934a.6.6,0,0,0-.227-.47L18.521,25.2H33A1.8,1.8,0,0,1,34.8,27Z"/>
                        <path data-name="Path" className="cl-icon-review-2" d="M29.714,28.167c.8,0,1.143.885,1.143,1.167,0,1.472-1.872,2.855-2.858,3.422-.985-.566-2.856-1.945-2.856-3.422,0-.281.344-1.167,1.133-1.167.551.072.834.5,1.321,1a.562.562,0,0,0,.807,0C28.89,28.668,29.242,28.23,29.714,28.167Z"/>
                        <path className="cl-icon-review-3" d="M31.8,0H4.67A4.459,4.459,0,0,0,0,4.2V31.8a.6.6,0,0,0,.6.6H20.4V34a3,3,0,0,0,3,3H33a3,3,0,0,0,3-3V27a3,3,0,0,0-3-3H28.8V15.6h6.6A.6.6,0,0,0,36,15V4.2A4.2,4.2,0,0,0,31.8,0Zm3,27v7A1.8,1.8,0,0,1,33,35.8H23.4A1.8,1.8,0,0,1,21.6,34V27.934a.6.6,0,0,0-.227-.47L18.521,25.2H33A1.8,1.8,0,0,1,34.8,27Zm-18-3a.6.6,0,0,0-.373,1.07L20.4,28.223V31.2H1.2V4.2a3.264,3.264,0,0,1,3.47-3H28.864c-.006.005-.011.012-.016.017-.047.047-.091.1-.136.146s-.095.1-.139.153-.082.107-.124.162-.083.106-.121.162-.074.119-.11.179-.071.111-.1.169-.064.128-.095.193-.059.116-.085.176-.052.139-.077.208-.047.118-.066.179c-.024.077-.041.156-.061.234-.014.057-.032.112-.044.17-.019.092-.031.187-.044.281-.007.046-.016.092-.021.139A4.1,4.1,0,0,0,27.6,4.2V24Zm18-9.6h-6V4.2a3,3,0,0,1,6,0Z"/>
                        <rect className="cl-icon-review-3" width="22" height="1" rx="0.5" transform="translate(4 5)"/>
                        <rect data-name="Rectangle-path" className="cl-icon-review-3" width="22" height="1" rx="0.5" transform="translate(4 9)"/>
                        <rect data-name="Rectangle-path" className="cl-icon-review-3" width="22" height="1" rx="0.5" transform="translate(4 13)"/>
                        <rect data-name="Rectangle-path" className="cl-icon-review-3" width="22" height="1" rx="0.5" transform="translate(4 17)"/>
                        <rect data-name="Rectangle-path" className="cl-icon-review-3" width="22" height="1" rx="0.5" transform="translate(4 21)"/>
                        <path data-name="Shape" className="cl-icon-review-3" d="M26.286,27A2.421,2.421,0,0,0,24,29.333c0,2.663,3.591,4.527,3.745,4.606a.564.564,0,0,0,.511,0C28.409,33.861,32,32,32,29.333A2.421,2.421,0,0,0,29.714,27,3.211,3.211,0,0,0,28,27.95,3.211,3.211,0,0,0,26.286,27Zm3.429,1.167c.8,0,1.143.885,1.143,1.167,0,1.472-1.872,2.855-2.858,3.422-.985-.566-2.856-1.945-2.856-3.422,0-.281.344-1.167,1.133-1.167.551.072.834.5,1.321,1a.562.562,0,0,0,.807,0C28.89,28.668,29.242,28.23,29.714,28.167Z"/>
                      </g>
                    </svg>
                    <h5>{this.props.p.t('EarnRewards.write_a_review')}</h5>
                    <h5><span>{this.props.rewards.writeReviewPoints} {this.props.p.t('EarnRewards.points')}</span></h5>
                    <p> {this.props.p.t('EarnRewards.earn')} {this.props.rewards.writeReviewPoints} {this.props.p.t('EarnRewards.point_for_each_review')}</p>
                  </div>
                  <div className="referHeadMb">
                    <h5>{this.props.p.t('EarnRewards.write_a_review')}</h5>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <ul className="referinfoContent uk-switcher" id="tab-content">
            <li>
              <div className="uk-grid">
                <div className="uk-width-xlarge-3-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1"/>
                <div className="uk-width-xlarge-4-10 uk-width-large-6-10 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="referMobile">
                    <svg id="icon_invite" xmlns="http://www.w3.org/2000/svg" viewBox="-2032 -1953 38 35">
                      <g id="Icon-Invite" transform="translate(-2032 -1953)">
                        <path id="Shape" className="cls-1" d="M32,6v8.649L19.242,22,6,14.4V6Z"/>
                        <path id="Combined-Shape" className="cls-2" d="M38,34.48h0V11.243h0l-.058-.058-.058-.058-.058-.058h0l-5.4-3.237V5.751a.548.548,0,0,0-.581-.578H27.716L19.291.087a.53.53,0,0,0-.581,0L10.168,5.173H5.752a.548.548,0,0,0-.581.578V8.006l-5,3.064h0a.057.057,0,0,0-.058.058l-.058.058L0,11.243H0V34.6c0,.058,0,.058.058.116v.058l.058.058h0c.058.058.116.058.174.116H.349c.058,0,.116.058.174.058h37.07c.058,0,.058,0,.116-.058.058,0,.058-.058.116-.058a.057.057,0,0,0,.058-.058l.058-.058v-.058c0-.058.058-.058.058-.116ZM36.838,12.514V33.324L20.046,21.936Zm-19,9.422L.93,33.324V12.514ZM35.56,33.844H2.266L18.942,22.572ZM5.055,9.335V13.5L1.511,11.532Zm20.394-4.22H12.318l6.566-3.931ZM31.2,6.272v8.093l-12.26,6.879L6.217,14.133V6.272ZM32.364,9.1l3.951,2.37-3.951,2.2ZM18.245,16.676l.465-1.1.058-.058c.058,0,.058,0,.058.058l.581,1.04,1.162.116a.057.057,0,0,1,.058.058v.058l-.813.867.232,1.156v.058h-.058l-1.046-.52-.988.578h-.116l-.058-.058.116-1.156-.813-.751s-.058-.058,0-.058a.057.057,0,0,0,.058-.058Zm9.239-6.127H9.645a.578.578,0,1,1,0-1.156h17.9a.548.548,0,0,1,.581.578A.6.6,0,0,1,27.483,10.549Zm0,2.948H9.645a.578.578,0,1,1,0-1.156h17.9a.548.548,0,0,1,.581.578A.6.6,0,0,1,27.483,13.5Z"/>
                      </g>
                    </svg>
                    <h5>{this.props.p.t('EarnRewards.refer_an_athlete')}</h5>
                    <h5><span>{this.props.rewards.athleteReferencePoints} {this.props.p.t('EarnRewards.points')}</span></h5>
                    <p>{this.props.p.t('EarnRewards.refer_an_athlete_desc')}</p>
                  </div>
                  <form>
                    <div className="tableDiv">
                      <div className="lCol">
                        <input type="text" name="referAthleteEmails" onChange={this.handleReferAthleteEmailsChange} placeholder={this.props.p.t('EarnRewards.enter_athlete_email')}/>
                      </div>
                      <div className="rCol">
                        <button onClick={this.handleInviteAthlete} type="button">{this.props.p.t('EarnRewards.invite')}</button>
                      </div>
                    </div>
                    {(this.state.invalidAthleteEmail || this.state.referAthleteEmails === undefined) &&
                      <div className="validationError">
                        <p>{(this.state.referAthleteEmails === undefined) ? this.props.p.t('EarnRewards.valiadtion_emails_required') : String(this.state.invalidAthleteEmail) + ' ' + this.props.p.t('EarnRewards.validation_emails_valid') }</p>
                      </div> }
                  </form>
                  <p>{this.props.p.t('EarnRewards.use_commas')}</p>
                  <h6><a>{this.props.p.t('EarnRewards.customize_your_message')}</a></h6>
                  <p>{this.props.p.t('EarnRewards.share_url')}</p>
                  <SocialShare/>
                </div>
              </div>
            </li>
            <li>
              <div className="uk-grid">
                <div className="uk-width-xlarge-3-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1"/>
                <div className="uk-width-xlarge-4-10 uk-width-large-6-10 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="referMobile">
                    <svg id="icon_invite" xmlns="http://www.w3.org/2000/svg" viewBox="-2032 -1953 38 35">
                      <g id="Icon-Invite" transform="translate(-2032 -1953)">
                        <path id="Shape" className="cls-1" d="M32,6v8.649L19.242,22,6,14.4V6Z"/>
                        <path id="Combined-Shape" className="cls-2" d="M38,34.48h0V11.243h0l-.058-.058-.058-.058-.058-.058h0l-5.4-3.237V5.751a.548.548,0,0,0-.581-.578H27.716L19.291.087a.53.53,0,0,0-.581,0L10.168,5.173H5.752a.548.548,0,0,0-.581.578V8.006l-5,3.064h0a.057.057,0,0,0-.058.058l-.058.058L0,11.243H0V34.6c0,.058,0,.058.058.116v.058l.058.058h0c.058.058.116.058.174.116H.349c.058,0,.116.058.174.058h37.07c.058,0,.058,0,.116-.058.058,0,.058-.058.116-.058a.057.057,0,0,0,.058-.058l.058-.058v-.058c0-.058.058-.058.058-.116ZM36.838,12.514V33.324L20.046,21.936Zm-19,9.422L.93,33.324V12.514ZM35.56,33.844H2.266L18.942,22.572ZM5.055,9.335V13.5L1.511,11.532Zm20.394-4.22H12.318l6.566-3.931ZM31.2,6.272v8.093l-12.26,6.879L6.217,14.133V6.272ZM32.364,9.1l3.951,2.37-3.951,2.2ZM18.245,16.676l.465-1.1.058-.058c.058,0,.058,0,.058.058l.581,1.04,1.162.116a.057.057,0,0,1,.058.058v.058l-.813.867.232,1.156v.058h-.058l-1.046-.52-.988.578h-.116l-.058-.058.116-1.156-.813-.751s-.058-.058,0-.058a.057.057,0,0,0,.058-.058Zm9.239-6.127H9.645a.578.578,0,1,1,0-1.156h17.9a.548.548,0,0,1,.581.578A.6.6,0,0,1,27.483,10.549Zm0,2.948H9.645a.578.578,0,1,1,0-1.156h17.9a.548.548,0,0,1,.581.578A.6.6,0,0,1,27.483,13.5Z"/>
                      </g>
                    </svg>
                    <h5>{this.props.p.t('EarnRewards.refer_an_ssp')}</h5>
                    <h5><span>{this.props.rewards.SSPReferencePoints} {this.props.p.t('EarnRewards.points')}</span></h5>
                    <p>{this.props.p.t('EarnRewards.refer_an_athlete_desc')}</p>
                  </div>
                  <form>
                    <div className="tableDiv">
                      <div className="lCol">
                        <input type="text" name="" onChange={this.handleReferSSPEmailsChange} placeholder={this.props.p.t('EarnRewards.enter_ssp_email')}/>
                      </div>
                      <div className="rCol">
                        <button type="button" onClick={this.handleInviteSSP} >{this.props.p.t('EarnRewards.invite')}</button>
                      </div>
                    </div>
                    {(this.state.invalidSSPEmail || this.state.referSSPEmails === undefined) &&
                      <div className="validationError">
                        <p>{(this.state.referSSPEmails === undefined) ? this.props.p.t('EarnRewards.valiadtion_emails_required') : String(this.state.invalidSSPEmail) + ' ' + this.props.p.t('EarnRewards.validation_emails_valid') }</p>
                      </div>
                    }
                  </form>
                  <p>{this.props.p.t('EarnRewards.use_commas')}</p>
                  <h6><a>{this.props.p.t('EarnRewards.customize_your_message')}</a></h6>
                  <p>{this.props.p.t('EarnRewards.share_url')}</p>
                  <SocialShare/>
                </div>
              </div>
            </li>
            <li>
              <div className="uk-grid">
                <div className="uk-width-xlarge-3-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1"/>
                <div className="uk-width-xlarge-4-10 uk-width-large-6-10 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="referMobile">
                    <svg id="icon-Book" xmlns="http://www.w3.org/2000/svg" viewBox="-1537 -1944.624 36.5 35.268">
                      <defs>
                        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                          <stop offset="0" stopColor="#fff" stopOpacity="0.502"/>
                          <stop offset="1" stopOpacity="0.502"/>
                        </linearGradient>
                      </defs>
                      <g id="Icon-Book" transform="translate(-1537 -1945)">
                        <g id="Rectangle-2">
                          <rect id="Rectangle_494" data-name="Rectangle 494" className="cls-1" width="29" height="25.103" rx="2" transform="translate(0 5.02)"/>
                          <rect id="Rectangle_495" data-name="Rectangle 495" className="cls-2" width="28" height="24.103" rx="2" transform="translate(0.5 5.52)"/>
                        </g>
                        <g id="Rectangle-2-2" data-name="Rectangle-2">
                          <rect id="Rectangle_496" data-name="Rectangle 496" className="cls-1" width="29" height="25.103" rx="2" transform="translate(2 3.012)"/>
                          <rect id="Rectangle_497" data-name="Rectangle 497" className="cls-2" width="28" height="24.103" rx="2" transform="translate(2.5 3.512)"/>
                        </g>
                        <ellipse id="Oval" className="cls-3" cx="7" cy="7.029" rx="7" ry="7.029" transform="translate(22 21.086)"/>
                        <path id="Star-2" className="cls-4" d="M16.5,21.337l-3.233,1.707.617-3.615-2.615-2.56,3.614-.527L16.5,13.053l1.616,3.289,3.614.527-2.615,2.56.617,3.615Z"/>
                        <path id="Path-9" className="cls-5" d="M7.622.876v4.57"/>
                        <path id="Path-9-2" data-name="Path-9" className="cls-5" d="M26,.876v4.57"/>
                        <path id="Path-9-3" data-name="Path-9" className="cls-5" d="M20,.876v4.57"/>
                        <path id="Path-9-4" data-name="Path-9" className="cls-5" d="M14,.876v4.57"/>
                        <path id="Path-12" className="cls-6" d="M29.211,24.472v4.415l3.029,1.605"/>
                        <path id="Path-6" className="cls-7" d="M2.191,9.522H30.4"/>
                      </g>
                    </svg>
                    <h5>{this.props.p.t('EarnRewards.complete_a_session')}</h5>
                    <h5><span>{this.props.rewards.completeSessionPoints} {this.props.p.t('EarnRewards.points')}</span></h5>
                    <p>{this.props.p.t('EarnRewards.earn')} {this.props.rewards.completeSessionPoints} {this.props.p.t('EarnRewards.point_for_each_session')}</p>
                  </div>
                  <p>{this.props.p.t('EarnRewards.session_complete_desc')}</p>
                </div>
              </div>
            </li>
            <li>
              <div className="uk-grid">
                <div className="uk-width-xlarge-3-10 uk-width-large-2-10 uk-width-medium-1-1 uk-width-small-1-1"/>
                <div className="uk-width-xlarge-4-10 uk-width-large-6-10 uk-width-medium-1-1 uk-width-small-1-1">
                  <div className="referMobile">
                    <svg id="icon-review" xmlns="http://www.w3.org/2000/svg" viewBox="-1293 -1944 36 37">
                      <g id="Review" transform="translate(-1293 -1944)">
                        <path id="Path" className="cls-1" d="M34.8,27v7A1.8,1.8,0,0,1,33,35.8H23.4A1.8,1.8,0,0,1,21.6,34V27.934a.6.6,0,0,0-.227-.47L18.521,25.2H33A1.8,1.8,0,0,1,34.8,27Z"/>
                        <path id="Path-2" data-name="Path" className="cls-2" d="M29.714,28.167c.8,0,1.143.885,1.143,1.167,0,1.472-1.872,2.855-2.858,3.422-.985-.566-2.856-1.945-2.856-3.422,0-.281.344-1.167,1.133-1.167.551.072.834.5,1.321,1a.562.562,0,0,0,.807,0C28.89,28.668,29.242,28.23,29.714,28.167Z"/>
                        <path id="Shape" className="cls-3" d="M31.8,0H4.67A4.459,4.459,0,0,0,0,4.2V31.8a.6.6,0,0,0,.6.6H20.4V34a3,3,0,0,0,3,3H33a3,3,0,0,0,3-3V27a3,3,0,0,0-3-3H28.8V15.6h6.6A.6.6,0,0,0,36,15V4.2A4.2,4.2,0,0,0,31.8,0Zm3,27v7A1.8,1.8,0,0,1,33,35.8H23.4A1.8,1.8,0,0,1,21.6,34V27.934a.6.6,0,0,0-.227-.47L18.521,25.2H33A1.8,1.8,0,0,1,34.8,27Zm-18-3a.6.6,0,0,0-.373,1.07L20.4,28.223V31.2H1.2V4.2a3.264,3.264,0,0,1,3.47-3H28.864c-.006.005-.011.012-.016.017-.047.047-.091.1-.136.146s-.095.1-.139.153-.082.107-.124.162-.083.106-.121.162-.074.119-.11.179-.071.111-.1.169-.064.128-.095.193-.059.116-.085.176-.052.139-.077.208-.047.118-.066.179c-.024.077-.041.156-.061.234-.014.057-.032.112-.044.17-.019.092-.031.187-.044.281-.007.046-.016.092-.021.139A4.1,4.1,0,0,0,27.6,4.2V24Zm18-9.6h-6V4.2a3,3,0,0,1,6,0Z"/>
                        <rect id="Rectangle-path" className="cls-3" width="22" height="1" rx="0.5" transform="translate(4 5)"/>
                        <rect id="Rectangle-path-2" data-name="Rectangle-path" className="cls-3" width="22" height="1" rx="0.5" transform="translate(4 9)"/>
                        <rect id="Rectangle-path-3" data-name="Rectangle-path" className="cls-3" width="22" height="1" rx="0.5" transform="translate(4 13)"/>
                        <rect id="Rectangle-path-4" data-name="Rectangle-path" className="cls-3" width="22" height="1" rx="0.5" transform="translate(4 17)"/>
                        <rect id="Rectangle-path-5" data-name="Rectangle-path" className="cls-3" width="22" height="1" rx="0.5" transform="translate(4 21)"/>
                        <path id="Shape-2" data-name="Shape" className="cls-3" d="M26.286,27A2.421,2.421,0,0,0,24,29.333c0,2.663,3.591,4.527,3.745,4.606a.564.564,0,0,0,.511,0C28.409,33.861,32,32,32,29.333A2.421,2.421,0,0,0,29.714,27,3.211,3.211,0,0,0,28,27.95,3.211,3.211,0,0,0,26.286,27Zm3.429,1.167c.8,0,1.143.885,1.143,1.167,0,1.472-1.872,2.855-2.858,3.422-.985-.566-2.856-1.945-2.856-3.422,0-.281.344-1.167,1.133-1.167.551.072.834.5,1.321,1a.562.562,0,0,0,.807,0C28.89,28.668,29.242,28.23,29.714,28.167Z"/>
                      </g>
                    </svg>
                    <h5>{this.props.p.t('EarnRewards.write_a_review')}</h5>
                    <h5><span>5 Points</span></h5>
                    <p> {this.props.p.t('EarnRewards.earn')} {this.props.rewards.writeReviewPoints} {this.props.p.t('EarnRewards.point_for_each_review')}</p>
                  </div>
                  <p>{this.props.p.t('EarnRewards.review_desc')}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      rewards: PropTypes.object,
      profile: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      inviteUsers: PropTypes.func.isRequired
    };
  }
}
EarnReward.defaultProps = {
  rewards: {}
};
const mapStateToProps = state => {
  const {profile} = state;
  return {
    profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    inviteUsers: (data, params) => dispatch(inviteUsers(data, params))
  };
};
export default translate(connect(mapStateToProps, mapDispatchToProps)(EarnReward));
