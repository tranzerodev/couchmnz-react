import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {ispUpdateSessionOverideTotalSlots} from '../../../../../../actions';

class OverrideOpenPositionsModal extends Component {
  constructor(props) {
    super(props);
    const {scheduledSession} = this.props;
    const totalSlots = scheduledSession.totalSlots;
    this.state = {
      submitted: false,
      totalSlots
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmitkButtonClicked = this.handleSubmitkButtonClicked.bind(this);
    this.handleChangeTotalSlots = this.handleChangeTotalSlots.bind(this);
    this.renderOpenSlotsOptions = this.renderOpenSlotsOptions.bind(this);
  }

  handleCancelClick() {
    this.props.onCancel();
  }
  handleSubmitkButtonClicked() {
    const {totalSlots} = this.state;
    const {selectedProfile, scheduledSession} = this.props;
    this.props.ispUpdateSessionOverideTotalSlots(selectedProfile.id, scheduledSession.id, totalSlots);
    this.props.onCancel();
  }

  handleChangeTotalSlots(e) {
    const {value} = e.target;
    this.setState({
      totalSlots: parseInt(value, 10)
    });
  }

  renderOpenSlotsOptions() {
    const optionSlots = [];
    const {maxSize, minSize, bookedSlots} = this.props.scheduledSession;
    const maxMin = Math.max(minSize, bookedSlots);
    for (let index = maxMin; index <= maxSize; index++) {
      optionSlots.push(<option key={index} value={index}>{index}</option>);
    }
    return optionSlots;
  }
  render() {
    const {p} = this.props;
    const {totalSlots} = this.state;
    return (
      <div id="open-position-modal" className="cl-sd-modal-common" >
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb60">
            <h2>{p.t('OverrideOpenPositionsModal.totalOpenPositions')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-1-1">
                <div className="field-holder">
                  <label className="uk-form-label" htmlFor="">{p.t('OverrideOpenPositionsModal.enterNoOfPositions')}</label>
                  <select onChange={this.handleChangeTotalSlots} value={totalSlots}>
                    {
                      this.renderOpenSlotsOptions()
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" className="uk-modal-close uk-close theme-orange-btn" onClick={this.handleSubmitkButtonClicked}>{p.t('OveridePrice.submit')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('OveridePrice.cancel')}</button>
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
      ispUpdateSessionOverideTotalSlots: PropTypes.func.isRequired,
      scheduledSession: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired

    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ispUpdateSessionOverideTotalSlots: (profileID, scheduledSessionId, noOfSlots) => dispatch(ispUpdateSessionOverideTotalSlots(profileID, scheduledSessionId, noOfSlots))
  };
};

const mapStateToProps = state => {
  const {userProfiles} = state;
  return {
    selectedProfile: userProfiles.selectedProfile
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(OverrideOpenPositionsModal));
