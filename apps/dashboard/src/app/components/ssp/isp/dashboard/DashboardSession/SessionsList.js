import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import {ClipLoader} from 'react-spinners';
import {
  updateSession,
  setSessions,
  removeSession,
  addSession,
  fetchSessions,
  postSession
} from '../../../../../actions';
import {
  FULFILLED, PENDING
} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';
import config from '../../../../../config';
import {DASHBOARD_MANAGE_SPORT_SESSIONS_EDIT, DASHBOARD_MANAGE_SPORT_SESSIONS_ADD} from '../../../../../constants/pathConstants';

class SessionsList extends Component {
  constructor() {
    super();
    this.handleNav = this.handleNav.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.findColorCombination = this.findColorCombination.bind(this);
    this.handleSportFilter = this.handleSportFilter.bind(this);
    this.renderSession = this.renderSession.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSearchPrice = this.handleSearchPrice.bind(this);
    this.handleHexToRGBa = this.handleHexToRGBa.bind(this);

    this.state = {
      session: {},
      sessionName: config.offerTerminologies.Session
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log('sessions', this.props.sessions);
    if (this.props.sessions.status !== FULFILLED && this.props.sessions.status !== PENDING) {
      this.props.fetchSessions({profileID: this.props.userProfiles.selectedProfile.id, sportID: this.props.currentSport.data.id});
      // This.props.fetchSessions({profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
    }
    if (this.state.sessionName !== this.props.currentSport.data.offerTerminology.singular) {
      this.setState({sessionName: this.props.currentSport.data.offerTerminology.singular});
    }
  }
  handleNav() {
    this.props.history.push('reg8');
  }
  handleBack() {
    this.props.history.push('reg6');
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    console.log('closeModal()');
    this.setState({
      session: '',
      editModal: <div/>,
      createModal: <div/>
    }, this.forceUpdate());
  }
  handleSave(session) {
    if (session) {
      const newSession = session;
      newSession.sportID = this.props.currentSport.data.id;
      this.props.postSession(session, {profileID: this.props.profile.data.profile.id, sportID: this.props.sport.id});
    }
    this.closeModal();
  }
  componentWillReceiveProps(nextProps) {
    const id = this.state.session ? this.state.session.id : '';
    if (id !== '') {
      const session = nextProps.sessions.data[this.handleSearchSession(nextProps.sessions.data, id)];
      this.setState({
        session
      }, this.forceUpdate());
    }
    if (this.state.sessionName !== nextProps.currentSport.data.offerTerminology.singular) {
      this.setState({sessionName: nextProps.currentSport.data.offerTerminology.singular});
    }
  }
  handleEdit(e) {
    const id = e.currentTarget.getAttribute('value');
    const index = this.props.sessions.data.findIndex(session => session.id == id);
    if (index >= 0) {
      const session = this.props.sessions.data[index];
      const editPath = {
        pathname: DASHBOARD_MANAGE_SPORT_SESSIONS_EDIT,
        state: {session}
      };
      this.props.history.push(editPath);
    }
  }
  handleSearchSession(sessions, id) {
    return sessions.findIndex(session => session.id === id);
  }
  handleRemove(e) {
    this.props.removeSession({profileID: this.props.profile.data.profile.id, sessionID: e.currentTarget.getAttribute('data-value'), sportID: this.props.sport.id});
  }

  findColorCombination(color) {
    for (let i = 0; i < config.colorCombinations.length; i++) {
      if (config.colorCombinations[i].color.toLowerCase() === color.toLowerCase()) {
        return config.colorCombinations[i];
      }
    }
  }
  handleSportFilter(session) {
    const {currentSport} = this.props;
    return session.sportID === currentSport.id;
  }

  handleSearchPrice(prices, id) {
    return prices.findIndex(price => (price.id === id));
  }

  getPrice(prices, subSSPTypeBaseRateID) {
    return prices.find(price => (price.id === subSSPTypeBaseRateID));
  }

  handleCreate() {
    this.props.history.push(DASHBOARD_MANAGE_SPORT_SESSIONS_ADD);
  }

  renderSession(session) {
    let priceVal = {};
    const price = this.props.prices && this.props.prices.length ? this.props.prices[this.handleSearchPrice(this.props.prices, session.subSSPTypeID, session.subSSPTypeBaseRateID)] : {};
    if (price && price.prices && price.prices.length) {
      priceVal = this.getPrice(price.prices, session.subSSPTypeBaseRateID);
    }
    let basePrice = session.overridePricing;
    if (basePrice < 1) {
      const price = this.props.prices.find(priceItem => priceItem.id === session.subSSPTypeID);
      basePrice = price && price.prices[0] ? price.prices[0].price : '';
    }
    const {color} = session;
    const colorAlpha = this.handleHexToRGBa(color);
    return (
      <div key={session.id} className="uk-width-xlarge-1-3 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
        <div className="sessionInfo" style={{borderColor: color, borderTopColor: color, background: colorAlpha}}>
          <span onClick={this.handleRemove} data-value={session.id}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1212 -5145 15.714 17.143">
              <g transform="translate(-1473.643 -5761.286)">
                <path data-name="Welcome! What type of profile do you want to set up right now?" className="cl-delete-icon-1" d="M-2.143-8.929V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1h-.714a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H-2.5a.348.348,0,0,1,.257.1A.348.348,0,0,1-2.143-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H-.357a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H.357a.348.348,0,0,1,.257.1A.348.348,0,0,1,.714-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H2.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h.714a.348.348,0,0,1,.257.1A.348.348,0,0,1,3.571-8.929ZM5-.848v-10.58H-5V-.848A1.267,1.267,0,0,0-4.922-.4a1,1,0,0,0,.162.3Q-4.676,0-4.643,0H4.643q.033,0,.117-.095a1,1,0,0,0,.162-.3A1.267,1.267,0,0,0,5-.848ZM-2.5-12.857h5l-.536-1.306a.315.315,0,0,0-.19-.123H-1.763a.315.315,0,0,0-.19.123ZM7.857-12.5v.714a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H6.429V-.848A2.534,2.534,0,0,1,5.9.753a1.556,1.556,0,0,1-1.261.675H-4.643A1.571,1.571,0,0,1-5.9.776,2.442,2.442,0,0,1-6.429-.8V-11.429H-7.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-12.5a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h3.449l.781-1.864a1.546,1.546,0,0,1,.6-.7,1.576,1.576,0,0,1,.882-.29H1.786a1.576,1.576,0,0,1,.882.29,1.546,1.546,0,0,1,.6.7l.781,1.864H7.5a.348.348,0,0,1,.257.1A.348.348,0,0,1,7.857-12.5Z" transform="translate(269.5 632)"/>
              </g>
            </svg>
          </span>
          <h2>{session.name}</h2>
          <p>{session.ageGroupName}</p>
          <p>{session.subSSPTypeName}
            {
              (priceVal && priceVal.min && priceVal.max) ?
                this.props.p.t('SessionsCreateModal.participantsList', {min: priceVal.min, max: priceVal.max}) : null
            }
          </p>

          <p>{session.skillLevelName}</p>
          <p className="mb30">{session.trainingLocation && session.trainingLocation.title ? session.trainingLocation.title : ''}</p>
          <p>{this.props.p.t('Sessions.defaultLength')}: {session.defaultSessionLength} {this.props.p.t('Sessions.minutes')}</p>
          <p className="mb30">{this.props.p.t('Sessions.cost')}: ${basePrice}</p>
          <a onClick={this.handleEdit} value={session.id} data-uk-toggle style={{color}}>
            {this.props.p.t('Sessions.modify')}
          </a>
        </div>
      </div>
    );
  }
  handleHexToDecimal(hex) {
    const prefix = '0x';
    if (!isNaN(prefix + hex)) {
      return parseInt(hex, 16);
    }
  }
  handleHexToRGBa(hex) {
    const {t} = this.props.p;
    if (hex && hex.length === 7) {
      const r = this.handleHexToDecimal(hex.slice(1, 3));
      const g = this.handleHexToDecimal(hex.slice(3, 5));
      const b = this.handleHexToDecimal(hex.slice(5, 7));
      const a = 0.2;
      return t('Sessions.colorAlpha', {r, g, b, a});
    }
    return t('Sessions.colorAlpha', {r: 255, g: 255, b: 255, a: 255});
  }
  render() {
    const {sessions, p, offerTerminology} = this.props;
    const sessionLoading = Boolean(sessions.status === PENDING);
    return (
      <div className="uk-grid">
        {this.props.sessions.data.map(this.renderSession)}
        <div className="uk-width-xlarge-1-3 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
          <a onClick={this.handleCreate} className="sessionInfo cl-sd-addsessionlocation1-2">
            <svg className="cl-icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="-21149.75 -6552.75 24.129 24.127">
              <g data-name="Symbol 27 – 2" transform="translate(-22854.186 -7086.772)">
                <g data-name="Group 2726" transform="translate(945.047 -998.235) rotate(45)">
                  <line data-name="Line 230" className="cl-icon-plus-1" x2="16" y2="16" transform="translate(1629.5 538.5)"/>
                  <line data-name="Line 231" className="cl-icon-plus-1" x1="16" y2="16" transform="translate(1629.5 538.5)"/>
                </g>
              </g>
            </svg>
            <span className="add-text"> {
              p.t('Sessions.create', {
                terminology: offerTerminology.singular,
                type: (sessions.data.length > 0) ? p.t('Sessions.another') : p.t('Sessions.a')
              })}
            </span>
          </a>
        </div>
        <div className={sessionLoading ? 'overlayLoader' : ''}>
          <ClipLoader loading={sessionLoading} size={30}/>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      history: PropTypes.object,
      sessionName: PropTypes.string,
      sessions: PropTypes.object,
      fetchSessions: PropTypes.func,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      postSession: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      currentSport: PropTypes.object.isRequired,
      removeSession: PropTypes.func.isRequired,
      prices: PropTypes.array,
      sport: PropTypes.object.isRequired,
      offerTerminology: PropTypes.object
    };
  }
}

SessionsList.defaultProps = {
  history: {},
  sessionName: 'S',
  sessions: {data: []},
  fetchSessions: () => {},
  prices: [],
  offerTerminology: {singular: appConstants.defaultOfferTerminology}
};

const mapStateToProps = state => {
  const {sessions, locations, userIDs, userProfiles, sport, currentSport, profile, prices} = state;
  return {
    sessions,
    locations,
    userIDs,
    userProfiles,
    profile,
    sport,
    currentSport,
    prices,
    offerTerminology: currentSport.data && currentSport.data.offerTerminology ?
      currentSport.data.offerTerminology : {singular: appConstants.defaultOfferTerminology}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSession: profile => dispatch(addSession(profile)),
    updateSession: profile => dispatch(updateSession(profile)),
    setSessions: profile => dispatch(setSessions(profile)),
    removeSession: profile => dispatch(removeSession(profile)),
    fetchSessions: userID => dispatch(fetchSessions(userID)),
    postSession: (data, params) => dispatch(postSession(data, params))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(translate(withRouter(SessionsList)));
/* eslint react/no-deprecated: 0 */
