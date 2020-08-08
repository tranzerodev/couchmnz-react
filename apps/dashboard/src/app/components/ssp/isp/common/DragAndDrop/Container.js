import React, {Component} from 'react';
import Toolbar from '../../../../../utils/react-big-calendar/Toolbar';
import Box from './Box';
import {connect} from 'react-redux';
import {
  setSessions,
  updateDefaultSession,
  updateOverrideSessionLength,
  updateOverrideBufferLength
} from '../../../../../actions';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {PENDING, REJECTED} from '../../../../../constants/ActionTypes';

class ContainerClass extends Component {
  constructor() {
    super();
    this.handleCalendarSettings = this.handleCalendarSettings.bind(this);
    this.getDefaultSession = this.getDefaultSession.bind(this);
    this.handleDefaultSession = this.handleDefaultSession.bind(this);
    this.handleCurrentEventSearch = this.handleCurrentEventSearch.bind(this);
    this.handleOverrideSessionLength = this.handleOverrideSessionLength.bind(this);
    this.handleOverrideBufferLength = this.handleOverrideBufferLength.bind(this);
    this.state = {
      showSettings: 'none'
    };
  }
  componentDidMount() {

  }
  handleCalendarSettings() {
    this.setState({
      showSettings: this.state.showSettings === 'none' ? 'block' : 'none'
    });
  }
  getDefaultSession() {
    return this.props.sessions.data.findIndex(session => session.defaultSession === 'Y');
  }
  handleCurrentEventSearch(id) {
    return this.props.events.data.findIndex(event => event.session.id === id);
  }
  handleOverrideSessionLength(e) {
    this.props.updateOverrideSessionLength({
      sessionID: e.target.name,
      overrideSessionLength: e.target.value
    });
  }
  handleOverrideBufferLength(e) {
    this.props.updateOverrideBufferLength({
      sessionID: e.target.name,
      overrideBufferLength: e.target.value
    });
  }
  handleDefaultSession(e) {
    this.props.updateDefaultSession(e.target.value);
  }
  render() {
    const index = this.getDefaultSession();
    const defaultSession = index >= 0 ? this.props.sessions.data[index] : {};
    return (
      this.props.sessions &&
        this.props.sessions.status !== PENDING &&
          this.props.sessions.status !== REJECTED &&
          (
            <div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-8-10 uk-width-small-1-1">
                  {this.props.showSessions &&
                  <div
                    data-uk-grid
                    style={{
                      clear: 'both',
                      display: 'block',
                      backgroundColor: 'white'
                    }}
                  >
                    <ul className="dragContent">
                      {
                        this.props.sessions.data.map((session, i) => {
                          return <li key={i}><Box name={session.name} session={session}/></li>;
                        })
                      }
                    </ul>
                  </div> }
                </div>
                <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10 uk-width-small-1-1">
                  <div className="calendarSettings">
                    {/* <a onClick={this.handleCalendarSettings}>
                  <svg className="cl-icon-calendar" xmlns="http://www.w3.org/2000/svg" viewBox="3231 -2096 44.429 40.285">
                    <g transform="translate(1454 -2405)">
                      <path data-name="Path 64" className="cl-icon-calendar-1" d="M-1450.749,2417a5.283,5.283,0,0,1-5.251-5.3V2387.3a5.346,5.346,0,0,1,.633-2.523,1.963,1.963,0,0,1,.425-.666,5.2,5.2,0,0,1,4.193-2.114H-1446v4.5a2.5,2.5,0,0,0,2.5,2.5,2.5,2.5,0,0,0,2.5-2.5V2382h13v4.5a2.5,2.5,0,0,0,2.5,2.5,2.5,2.5,0,0,0,2.5-2.5V2382h3.75a5.283,5.283,0,0,1,5.25,5.3V2411.7a5.283,5.283,0,0,1-5.25,5.3Zm-3.252-6.7a4.73,4.73,0,0,0,4.751,4.7h28.5a4.73,4.73,0,0,0,4.75-4.7v-14.8h-38Zm10,1.7v-3.812h3.812V2412Zm9.526,0v-3.811h3.811V2412Zm-4.763,0v-3.811h3.811V2412Zm9.526-4.763v-3.812h3.81v3.812Zm-4.764,0v-3.812h3.811v3.812Zm-4.763,0v-3.812h3.811v3.812Zm-4.764,0v-3.812h3.812v3.812Zm14.29-4.764v-3.811h3.81v3.811Zm-4.764,0v-3.811h3.811v3.811Zm-4.763,0v-3.811h3.811v3.811Z" transform="translate(3233 -2070)"/>
                      <path data-name="Path 53" className="cl-icon-calendar-1" d="M-1438,2389.5v-6a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5v6a1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-1438,2389.5Zm-18,0v-6a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5v6a1.5,1.5,0,0,1-1.5,1.5A1.5,1.5,0,0,1-1456,2389.5Z" transform="translate(3244 -2073)"/>
                      <path data-name="Path 65" className="cl-icon-calendar-1" d="M-1420.9,2417.785a.379.379,0,0,1-.247-.085.3.3,0,0,1-.115-.216l-.282-1.848a6.229,6.229,0,0,1-.9-.372l-1.417,1.074a.361.361,0,0,1-.251.091.346.346,0,0,1-.251-.111,13.232,13.232,0,0,1-1.657-1.687.4.4,0,0,1-.07-.231.387.387,0,0,1,.08-.231q.151-.211.512-.668t.543-.708a4.939,4.939,0,0,1-.412-.995l-1.838-.271a.318.318,0,0,1-.211-.125.385.385,0,0,1-.08-.237v-2.229a.39.39,0,0,1,.08-.231.3.3,0,0,1,.192-.13l1.868-.282a5.005,5.005,0,0,1,.392-.923q-.4-.572-1.075-1.387a.376.376,0,0,1-.1-.24.42.42,0,0,1,.09-.231,9.964,9.964,0,0,1,.99-1.08q.728-.719.949-.718a.426.426,0,0,1,.262.1l1.386,1.074a5.7,5.7,0,0,1,.914-.382,16.352,16.352,0,0,1,.292-1.868.339.339,0,0,1,.362-.282h2.229a.38.38,0,0,1,.247.086.3.3,0,0,1,.115.216l.282,1.849a6.257,6.257,0,0,1,.9.372l1.426-1.075a.328.328,0,0,1,.241-.09.384.384,0,0,1,.251.1,13.662,13.662,0,0,1,1.657,1.707.32.32,0,0,1,.071.221.382.382,0,0,1-.081.23c-.1.14-.271.364-.512.668s-.422.541-.543.708a6.041,6.041,0,0,1,.412.985l1.838.282a.315.315,0,0,1,.211.125.381.381,0,0,1,.08.236v2.23a.391.391,0,0,1-.08.231.307.307,0,0,1-.2.131l-1.859.281a6.564,6.564,0,0,1-.391.914q.351.5,1.075,1.386a.388.388,0,0,1,.1.251.336.336,0,0,1-.09.231,10.182,10.182,0,0,1-.995,1.084q-.723.713-.944.714a.492.492,0,0,1-.261-.091l-1.386-1.084a5.774,5.774,0,0,1-.914.382,16.333,16.333,0,0,1-.292,1.868.338.338,0,0,1-.362.281Zm-.7-9.532a2.474,2.474,0,0,0-.754,1.818,2.476,2.476,0,0,0,.754,1.818,2.477,2.477,0,0,0,1.818.753,2.478,2.478,0,0,0,1.818-.753,2.479,2.479,0,0,0,.753-1.818,2.477,2.477,0,0,0-.753-1.818,2.478,2.478,0,0,0-1.818-.753A2.477,2.477,0,0,0-1421.6,2408.253Zm-4.9-2.753Z" transform="translate(3233.5 -2068.5)"/>
                    </g>
                  </svg>
                  <p>{this.props.p.t('DragAndDropContainer.settings')}</p>
                </a> */}

                    {/* <div className="scheduler-popup-settings" style={{display: this.state.showSettings}}>
                  <div className="scheduler-popup-top-arrow"/>
                  <div className="popupOuter popup9">
                    <div className="calendarSettingsContent head">
                      <h4>Calendar Settings</h4>
                      <a className="cross" onClick={this.handleCalendarSettings}><i className="fa fa-times-circle" aria-hidden="true"/></a>
                    </div>
                    <div className="calendarSettingsContent">
                      <div className="uk-grid">
                        {/* <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2 uk-text-right">
                          <p>Days per week:</p>
                        </div>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2">
                          <select>
                            <option>7</option>
                            <option>8</option>
                          </select>
                        </div>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2"/>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2"/>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2 uk-text-right">
                          <p>Start week on:</p>
                        </div>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2">
                          <select>
                            <option>Monday</option>
                            <option>Tuesday</option>
                          </select>
                        </div>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2"/>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2"/>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2 uk-text-right">
                          <p>Scroll in week view by:</p>
                        </div>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2">
                          <select>
                            <option>Week</option>
                            <option>Week</option>
                          </select>
                        </div>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2"/>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2"/>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2 uk-text-right">
                          <p>Show:</p>
                        </div>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2">
                          <select>
                            <option>9</option>
                            <option>7</option>
                          </select>
                        </div>
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2">
                          <p>Hours at a time </p>
                        </div> /}
                        <div className="uk-width-large-1-4 uk-width-medium-1-2 uk-width-small-1-2"/>
                      </div>
                    </div>
                    <div className="calendarSettingsContent">
                      <div className="uk-grid">
                        <div className="uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-2 uk-text-right">
                          <p className="defaultSessionPara">Default Session</p>
                        </div>
                        <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-small-1-2">

                          <select className="defaultSessionSelector" selected={defaultSession.id} onChange={this.handleDefaultSession}>
                            {
                              this.props.sessions.data.map(session => <option value={session.id}>{session.name}</option>)
                            }
                          </select>

                        </div>
                      </div>
                    </div>
                    <div className="calendarSettingsContent session">
                      <div className="uk-grid">
                        <div className="uk-width-large-4-10 uk-width-medium-4-10 uk-width-small-1-2 "/>
                        <div className="uk-width-large-5-10 uk-width-medium-5-10 uk-width-small-1-2 ">
                          <div className="uk-grid">
                            <div className="uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1">
                              <p>Default Session Lengths</p>
                            </div>
                            <div className="uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1">
                              <p>Buffer Between Sessions</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {
                        this.props.sessions.data.map((session, i) => {
                          const currentIndex = this.handleCurrentEventSearch(session.id);
                          const currentEvent = this.props.events.data[currentIndex];
                          return (
                            <div key={i} className="uk-grid custom-grid">
                              <div className="uk-width-large-4-10 uk-width-medium-4-10 uk-width-small-1-2 ">
                                <div className="sessionInfo">
                                  <span className="sky" style={{backgroundColor: session.color}}/>
                                  <p>{session.name}</p>
                                </div>
                              </div>
                              <div className="uk-width-large-5-10 uk-width-medium-5-10 uk-width-small-1-2 ">
                                <div className="uk-grid">
                                  <div className="uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1">
                                    <select name={session.id} value={parseInt(currentEvent ? currentEvent.overrideSessionLength : session.defaultSessionLength, 10)} onChange={this.handleOverrideSessionLength}>
                                      <option value={0}>Select a length</option>
                                      <option value={60}>60 minutes</option>
                                      <option value={90}>90 mintutes</option>
                                    </select>
                                  </div>
                                  <div className="uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1">
                                    <select name={session.id} value={parseInt(currentEvent ? currentEvent.overrideBufferLength : session.bufferBetweenSession, 10)} onChange={this.handleOverrideBufferLength}>
                                      <option value={0}>Select a length</option>
                                      <option value={10}>10 minutes</option>
                                      <option value={20}>20 mintutes</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        )
                      }
                    </div>
                    <div className="foot">
                      <a className="save" onClick={this.handleCalendarSettings}>Save</a>
                    </div>
                  </div>
                </div> */}

                  </div>

                </div>
              </div>
              <div
                style={{
                  display: 'block'
                }}
              >
                <Toolbar {...this.props}/>
              </div>
            </div>
          )
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}

const mapStateToProps = state => {
  const {sessions, events} = state;
  return {
    sessions,
    events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSessions: profile => dispatch(setSessions(profile)),
    updateDefaultSession: id => dispatch(updateDefaultSession(id)),
    updateOverrideSessionLength: profile => dispatch(updateOverrideSessionLength(profile)),
    updateOverrideBufferLength: profile => dispatch(updateOverrideBufferLength(profile))
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(ContainerClass);
export default translate(Container);
