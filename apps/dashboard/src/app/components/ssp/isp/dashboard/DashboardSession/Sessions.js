import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import SessionList from './SessionsList';
import {DASHBOARD_MANAGE_SPORT_BIOGRAPHY} from '../../../../../constants/pathConstants';
import appConstants from '../../../../../constants/appConstants';
import NewSportRequiredNotFilledModal from '../NewSportRequiredNotFilledModal';
import ExampleModal from '../ExampleModal/ExampleModal';
import {SAMPLE_SESSION} from '../../../../../constants/assetsPaths';

class DasboardSessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotFilledModalOpen: false,
      isModalOpen: false
    };
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.onHandleNext = this.onHandleNext.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSampleModal = this.handleSampleModal.bind(this);

    this.renderNewSportNextButton = this.renderNewSportNextButton.bind(this);
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  handleSubmit() {
    const {sessions} = this.props;
    const {data} = sessions;
    if (data && data.length > 0) {
      this.onHandleNext();
    } else {
      this.setState({
        isNotFilledModalOpen: true
      });
    }
  }

  onHandleNext() {
    this.props.history.push(DASHBOARD_MANAGE_SPORT_BIOGRAPHY);
  }

  renderNewSportNextButton() {
    const {sportActivationStatus} = this.props;
    if (sportActivationStatus === false) {
      return (
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
            <a className="general_btn" onClick={this.handleSubmit}>{this.props.p.t('SaveButton.continue')}</a>
          </div>
          <NewSportRequiredNotFilledModal
            notFilled={[]}
            isModalOpen={this.state.isNotFilledModalOpen}
            handleClose={this.onNotFilledModalClose}
            saveData={this.onHandleNext}
            data={{}}
            msgBodyKey="Sessions.youHaveNotFilled"
            saveType=""
          />
        </div>
      );
    }
    return null;
  }

  handleSampleModal() {
    const {isModalOpen} = this.state;
    this.setState({isModalOpen: !isModalOpen});
  }

  render() {
    const {sport} = this.props;
    const {isModalOpen} = this.state;
    const {offerTerminology} = this.props;
    const offerTerminologyPlural = offerTerminology.plural;
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="defineSession">
          <div className="uk-grid">
            <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-7-10 uk-width-small-1-1">
              <h1 className="uk-padding-remove">{this.props.p.t('Sessions.define')} {this.props.p.t('Sessions.your')} {offerTerminologyPlural}</h1>
            </div>
            <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-1">
              <div className="viewExpOuter">
                <a onClick={this.handleSampleModal} data-uk-modal>{this.props.p.t('ExampleModal.message')}</a>
              </div>
            </div>
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
              <p className="pd20">{this.props.p.t('Sessions.sessionsMessage', {session: offerTerminology.singular})}</p>
            </div>
          </div>

          <SessionList sport={sport}/>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 "/>
          </div>
        </div>
        {
          this.renderNewSportNextButton()
        }
        <ExampleModal title="ExampleModal.sessionSession" offerTerminology={offerTerminology.singular} isModalOpen={isModalOpen} scroll={appConstants.scroll.session} image={SAMPLE_SESSION} onClose={this.handleSampleModal}/>
      </div>
    );
  }
  static get propTypes() {
    return {
      sport: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      sportActivationStatus: PropTypes.bool.isRequired,
      offerTerminology: PropTypes.object.isRequired,
      sessions: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {sport, currentSport, sessions} = state;
  return {
    sport,
    sessions,
    sportActivationStatus: (currentSport.data.isActive === appConstants.sportsActiveFlages.active),
    offerTerminology: currentSport.data && currentSport.data.offerTerminology ? currentSport.data.offerTerminology : {singular: appConstants.defaultOfferTerminology}
  };
};

export default translate(withRouter(connect(mapStateToProps)(DasboardSessions)));
