import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

import Modal from '../../../../common/Modal';

import {
  updateSession,
  setSessions,
  removeSession,
  addSession,
  fetchLocations,
  fetchSessions,
  updateOfferTerminology,
  sspSessionNameSubmit,
  postSession
} from '../../../../../actions';
import {
  FULFILLED, PENDING
} from '../../../../../constants/ActionTypes';
import AddEditSession from './AddEditSession';
import config from '../../../../../config';
/* eslint complexity: 0 */

class SessionClass extends Component {
  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleOpenCreateModal = this.handleOpenCreateModal.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.findColorCombination = this.findColorCombination.bind(this);
    this.handleSportFilter = this.handleSportFilter.bind(this);
    this.renderSessions = this.renderSessions.bind(this);
    this.renderAddEditSessionModal = this.renderAddEditSessionModal.bind(this);
    this.state = {
      session: {},
      sessionName: config.offerTerminologies.Session,
      isAddModalOpen: false,
      isEditModalOpen: false,
      editSession: null
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.locations.status !== FULFILLED && this.props.locations.status !== PENDING) {
      // This.props.fetchLocations({profileID: this.props.userIDs.data.id});
    }
    console.log('sessions', this.props.sessions);
    if (this.props.sessions.status !== FULFILLED && this.props.sessions.status !== PENDING) {
      const profileID = this.props.userProfiles.slectedProfile.id;
      const sportID = this.props.currentSport.data.id;
      this.props.fetchSessions({profileID, sportID});
      // This.props.fetchSessions({profileID: this.props.userIDs.data.coachIDs[0], sportID: this.props.sport.id});
    }
    if (this.state.sessionName !== this.props.currentSport.data.offerTerminology.singular) {
      this.setState({sessionName: this.props.currentSport.data.offerTerminology.singular});
    }
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  handleOpenCreateModal() {
    this.setState({
      editSession: null,
      isAddModalOpen: true,
      isEditModalOpen: false
    });
  }
  closeModal() {
    console.log('closeModal()');
    this.setState({
      session: '',
      editSession: null,
      isAddModalOpen: false,
      isEditModalOpen: false
    });
  }
  handleSave(session) {
    if (session) {
      const newSession = session;
      newSession.sportID = this.props.currentSport.data.id;
      this.props.postSession(session, {profileID: this.props.profile.data.profile.id, sportID: this.props.currentSport.data.id});
    }
    this.closeModal();
  }
  componentWillReceiveProps(nextProps) {
    /* Const id = this.state.session ? this.state.session.id : '';
    if (id !== '') {
      const session = nextProps.sessions.data[this.handleSearchSession(nextProps.sessions.data, id)];
      this.setState({
        session
      }, this.forceUpdate());
    } */
    if (this.state.sessionName !== nextProps.currentSport.data.offerTerminology.singular) {
      this.setState({sessionName: nextProps.currentSport.data.offerTerminology.singular});
    }
  }
  handleEdit(e) {
    const id = e.currentTarget.getAttribute('value');
    if (id) {
      const session = this.props.sessions.data.find(session => session.id === id);
      const editSession = Object.assign({}, session, {trainingLocationID: session.trainingLocation.id});
      this.setState({
        session: id,
        editSession,
        isAddModalOpen: false,
        isEditModalOpen: true
      });
    }
  }
  handleSearchSession(sessions, id) {
    return sessions.findIndex(session => session.id === id);
  }
  handleRemove(e) {
    this.props.removeSession({profileID: this.props.profile.data.profile.id, sessionID: e.currentTarget.getAttribute('data-value'), sportID: this.props.sport.id});
    /* This.props.removeSession({
      sessionID: e.currentTarget.getAttribute('data-value'),
      profileID: this.props.profile.data.profile.id
    }); */
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

  renderSessions(session, i) {
    const colorCombination = this.findColorCombination(session && session.color ? session.color : config.colorCombinations[0].color);
    console.log(colorCombination);
    let basePrice = session.overridePricing;
    if (basePrice < 1) {
      const price = this.props.prices.find(priceItem => priceItem.id === session.subSSPTypeID);
      basePrice = price.prices[0].price;
    }
    return (
      <div key={i} className={this.props.sessionInfoUpperClassName}>
        <div className="sessionInfo" style={{backgroundColor: colorCombination.background, borderColor: colorCombination.borderColor, borderTopColor: colorCombination.borderTopColor}}>
          <span onClick={this.handleRemove} data-value={session.id}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1212 -5145 15.714 17.143">
              <g transform="translate(-1473.643 -5761.286)">
                <path data-name="Welcome! What type of profile do you want to set up right now?" className="cl-delete-icon-1" d="M-2.143-8.929V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1h-.714a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H-2.5a.348.348,0,0,1,.257.1A.348.348,0,0,1-2.143-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H-.357a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1H.357a.348.348,0,0,1,.257.1A.348.348,0,0,1,.714-8.929Zm2.857,0V-2.5a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H2.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-8.929a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h.714a.348.348,0,0,1,.257.1A.348.348,0,0,1,3.571-8.929ZM5-.848v-10.58H-5V-.848A1.267,1.267,0,0,0-4.922-.4a1,1,0,0,0,.162.3Q-4.676,0-4.643,0H4.643q.033,0,.117-.095a1,1,0,0,0,.162-.3A1.267,1.267,0,0,0,5-.848ZM-2.5-12.857h5l-.536-1.306a.315.315,0,0,0-.19-.123H-1.763a.315.315,0,0,0-.19.123ZM7.857-12.5v.714a.348.348,0,0,1-.1.257.348.348,0,0,1-.257.1H6.429V-.848A2.534,2.534,0,0,1,5.9.753a1.556,1.556,0,0,1-1.261.675H-4.643A1.571,1.571,0,0,1-5.9.776,2.442,2.442,0,0,1-6.429-.8V-11.429H-7.5a.348.348,0,0,1-.257-.1.348.348,0,0,1-.1-.257V-12.5a.348.348,0,0,1,.1-.257.348.348,0,0,1,.257-.1h3.449l.781-1.864a1.546,1.546,0,0,1,.6-.7,1.576,1.576,0,0,1,.882-.29H1.786a1.576,1.576,0,0,1,.882.29,1.546,1.546,0,0,1,.6.7l.781,1.864H7.5a.348.348,0,0,1,.257.1A.348.348,0,0,1,7.857-12.5Z" transform="translate(269.5 632)"/>
              </g>
            </svg>
          </span>
          <h2>{session.name}</h2>
          <p>{session.ageGroupName}</p>
          <p>{session.subSSPTypeName}</p>
          <p>{session.skillLevelName}</p>
          <p className="mb30">{session.trainingLocation && session.trainingLocation.title ? session.trainingLocation.title : ''}</p>
          <p>{this.props.p.t('Sessions.defaultLength')}: {session.defaultSessionLength} {this.props.p.t('Sessions.minutes')}</p>
          <p className="mb30">{this.props.p.t('Sessions.cost')}: ${basePrice}</p>
          <a onClick={this.handleEdit} value={session.id} data-uk-toggle style={{color: colorCombination.color}}>{this.props.p.t('Sessions.modify')}</a>
        </div>
      </div>
    );
  }

  renderAddEditSessionModal() {
    const {isAddModalOpen, isEditModalOpen, editSession} = this.state;

    const isModalOpen = (isAddModalOpen || isEditModalOpen);
    return (
      <Modal isModalOpen={isModalOpen}>
        <AddEditSession session={editSession} isEdit={isEditModalOpen} closeModal={this.closeModal} onSave={this.handleSave}/>
      </Modal>

    );
  }
  render() {
    const {sessions} = this.props;
    const terminology = this.props.currentSport.data.offerTerminology.singular;
    const pluralTerminology = this.props.currentSport.data.offerTerminology.plural;
    return (

      <div className="defineSession">
        <h1 className="uk-padding-remove">{this.props.p.t('Sessions.define')} {this.props.p.t('Sessions.your')} {terminology}</h1>
        <p className="pd20">{terminology}</p>
        <div className="uk-grid">
          {
            this.props.sessions.data.map(this.renderSessions)
          }
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
            <h4>
              <a onClick={this.handleOpenCreateModal} data-uk-toggle>
                <span>{
                  this.props.p.t('Sessions.create', {
                    terminology,
                    type: (sessions.data.length > 0) ? this.props.p.t('Sessions.another') : this.props.p.t('Sessions.a')
                  })}
                </span>
                {this.props.p.t('Sessions.createLater', {
                  terminology: pluralTerminology
                })}
              </a>
            </h4>
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 "/>
        </div>
        {
          this.renderAddEditSessionModal()
        }
      </div>

    );
  }
  static get propTypes() {
    return {
      sessionName: PropTypes.string,
      sessions: PropTypes.object,
      sessionInfoUpperClassName: PropTypes.string,
      fetchSessions: PropTypes.func,
      locations: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      postSession: PropTypes.func.isRequired,
      profile: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      currentSport: PropTypes.object.isRequired,
      removeSession: PropTypes.func.isRequired,
      prices: PropTypes.array
    };
  }
}

SessionClass.defaultProps = {
  sessionName: 'S',
  sessions: {data: []},
  sessionInfoUpperClassName: 'uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-2  uk-width-small-1-1',
  locations: {data: []},
  fetchSessions: () => {},
  prices: []
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
    prices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSession: profile => dispatch(addSession(profile)),
    updateSession: profile => dispatch(updateSession(profile)),
    setSessions: profile => dispatch(setSessions(profile)),
    removeSession: profile => dispatch(removeSession(profile)),
    fetchLocations: userID => dispatch(fetchLocations(userID)),
    fetchSessions: userID => dispatch(fetchSessions(userID)),
    updateOfferTerminology: data => dispatch(updateOfferTerminology(data)),
    sspSessionNameSubmit: data => dispatch(sspSessionNameSubmit(data)),
    postSession: (data, params) => dispatch(postSession(data, params))
  };
};

const Registration7 = connect(mapStateToProps, mapDispatchToProps)(SessionClass);
export default translate(Registration7);
