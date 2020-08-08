import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import validateOpenPositions from '../../../../../../validators/ssp/isp/overidePositions';
import {ispUpdateOpenPositions} from '../../../../../../actions';
import appConstants from '../../../../../../constants/appConstants';

class OveridePositionsModal extends Component {
  constructor(props) {
    super(props);
    const {scheduledSession} = this.props;
    const totalSlots = (scheduledSession.totalSlots) ? scheduledSession.totalSlots : 0;
    const validation = validateOpenPositions(totalSlots);
    this.state = {
      submitted: false,
      totalSlots,
      validation
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleOveridePositionsChange = this.handleOveridePositionsChange.bind(this);
    this.handleSubmitkButtonClicked = this.handleSubmitkButtonClicked.bind(this);
  }

  handleCancelClick() {
    this.props.onCancel();
  }
  handleSubmitkButtonClicked() {
    const {selectedProfile, scheduledSession} = this.props;
    const {totalSlots, validation} = this.state;
    if (validation.valid) {
      this.props.ispUpdateOpenPositions(selectedProfile.id, scheduledSession.id, totalSlots);
      this.props.onCancel();
    } else {
      this.setState({
        submitted: true
      });
    }
  }

  handleOveridePositionsChange(e) {
    let {value} = e.target;
    value = value >= this.props.scheduledSession.openSlots ? value : this.props.scheduledSession.openSlots;
    const validation = validateOpenPositions(value);
    this.setState({
      totalSlots: parseInt(value, 10),
      validation
    });
  }

  render() {
    const {p} = this.props;
    const {validation, submitted} = this.state;
    return (
      <div id="session-buffer-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb60">
            <h2>{p.t('OveridePositions.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className={validation.totalSlots === false && submitted ? 'field-holder error' : 'field-holder'}>
              <div className="uk-grid">
                <div className="uk-width-large-1-1">
                  <label className="uk-form-label" htmlFor>{p.t('OveridePositions.noOfPositions')}</label>
                  <input onChange={this.handleOveridePositionsChange} type="number" className="cl-sd-input-text-full-width" value={this.state.totalSlots} step={appConstants.profileSession.totalSlots.step}/>
                </div>
              </div>
              <span className="error-text">{this.props.p.t('SessionsCreateModal.session.totalSlots')}</span>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" onClick={this.handleSubmitkButtonClicked} className="uk-modal-close uk-close theme-orange-btn">{p.t('OveridePositions.submit')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('OveridePositions.cancel')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  static get propTypes() {
    return {
      onCancel: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      scheduledSession: PropTypes.object.isRequired,
      ispUpdateOpenPositions: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, sport, userProfiles} = state;
  return {
    profile,
    sport,
    selectedProfile: userProfiles.selectedProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ispUpdateOpenPositions: (profileID, scheduledSessionId, totalSlots) => dispatch(ispUpdateOpenPositions(profileID, scheduledSessionId, totalSlots))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(OveridePositionsModal));
