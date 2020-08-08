import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {
  ispFetchLocations,
  ispChangeScheduledSessionLocation
} from '../../../../../../actions';
import {FULFILLED, PENDING} from '../../../../../../constants/ActionTypes';

class ChangeLocationModal extends Component {
  constructor(props) {
    super(props);
    const {scheduledSession} = this.props;
    const trainingLocationId = scheduledSession.trainingLocation.id;
    const trainingLocationName = scheduledSession.trainingLocation.address;
    this.state = {
      trainingLocationId,
      trainingLocationName
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.renderLocations = this.renderLocations.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentDidMount() {
    if (this.props.locationsNew.status !== FULFILLED && this.props.locationsNew.status !== PENDING) {
      this.props.ispFetchLocations(this.props.selectedProfile.id);
    }
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  handleSave() {
    const {trainingLocationId} = this.state;
    const {selectedProfile, scheduledSession} = this.props;
    this.props.ispChangeScheduledSessionLocation(selectedProfile.id, scheduledSession.id, trainingLocationId);
    this.props.onCancel();
  }

  handleChangeLocation(e) {
    const trainingLocationId = e.currentTarget.dataset.id;
    const trainingLocationName = e.currentTarget.dataset.value;

    this.setState({
      trainingLocationId: parseInt(trainingLocationId, 10),
      trainingLocationName
    });
  }

  renderLocations(location) {
    return (
      <li key={location.id} onClick={this.handleChangeLocation} data-id={location.id} data-value={location.label}>
        <a >
          <div className="btn-text">
            <h3>{location.label}</h3>
            <p>{location.fullAddress}</p>
          </div>
          <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg>
        </a>
      </li>
    );
  }

  render() {
    const {p, locationsNew} = this.props;
    const {trainingLocationName} = this.state;
    return (
      <div id="change-location-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb30">
            <h2>{p.t('ChangeLocationModal.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-large-1-1">
                <div className="cl-sd-alert-box mb30">
                  <p>
                    {p.t('ChangeLocationModal.message')}
                  </p>
                </div>
                <label className="uk-form-label">{p.t('ChangeLocationModal.location')}</label>
                <div className="uk-button-dropdown theme-dropdown cl-sd-change-loaction-dp" data-uk-dropdown="{mode:'click',pos:'bottom-right'}" aria-haspopup="true" aria-expanded="true">
                  <button className="uk-button">
                    <span className="btn-text">
                      {trainingLocationName}
                    </span>
                    <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width={8} height={5} viewBox="0 0 8 5">
                      <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                    </svg>
                  </button>
                  <div className="uk-dropdown width-300 uk-dropdown-bottom" aria-hidden="false" style={{top: 30, left: '-71px'}} tabIndex>
                    <ul className="uk-nav uk-nav-dropdown uk-text-left">
                      {locationsNew.data.map(this.renderLocations)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" onClick={this.handleSave} className="uk-modal-close uk-close theme-orange-btn">{p.t('ChangeLocationModal.submit')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('ChangeLocationModal.cancel')}</button>
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
      scheduledSession: PropTypes.object,
      locationsNew: PropTypes.object,
      selectedProfile: PropTypes.object.isRequired,
      ispFetchLocations: PropTypes.func,
      ispChangeScheduledSessionLocation: PropTypes.func
    };
  }
}

ChangeLocationModal.defaultProps = {
  scheduledSession: {},
  locationsNew: {data: []},
  ispFetchLocations: () => {},
  ispChangeScheduledSessionLocation: () => {}
};

const mapStateToProps = state => {
  const {locationsNew, userProfiles} = state;
  return {
    locationsNew,
    selectedProfile: userProfiles.selectedProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ispFetchLocations: profileID => dispatch(ispFetchLocations(profileID)),
    ispChangeScheduledSessionLocation: (profileID, scheduledSessionId, trainingLocationId) => dispatch(ispChangeScheduledSessionLocation(profileID, scheduledSessionId, trainingLocationId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(ChangeLocationModal));
