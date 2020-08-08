import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {ispFetchSessionGroupSize, ispUpdateSessionGroupSize} from '../../../../../../actions';
import {isNumber} from '../../../../../../validators/common/util';

const CREATE_NEW_GROUP_SIZE_OPTION = 'CREATE_NEW_GROUP_SIZE_OPTION';

class OverrideGroupSizeModal extends Component {
  constructor(props) {
    super(props);
    const {scheduledSession} = this.props;
    const subSSPTypeBaseRateID = scheduledSession.subSSPTypeBaseRateID;
    const minSize = 0;
    const maxSize = 0;
    const validation = this.validateOverrideGroupSize({subSSPTypeBaseRateID, minSize, maxSize});
    this.state = {
      submitted: false,
      subSSPTypeBaseRateID,
      minSize,
      maxSize,
      validation
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmitkButtonClicked = this.handleSubmitkButtonClicked.bind(this);
    this.handleChangeMinMaxGroupSize = this.handleChangeMinMaxGroupSize.bind(this);
    this.renderGroupSizeOptions = this.renderGroupSizeOptions.bind(this);
    this.handleSubSSPTypeBaseRateID = this.handleSubSSPTypeBaseRateID.bind(this);
    this.renderMinMaxGroupSize = this.renderMinMaxGroupSize.bind(this);
    this.validateOverrideGroupSize = this.validateOverrideGroupSize.bind(this);
  }

  componentDidMount() {
    const {selectedProfile, scheduledSession} = this.props;
    this.props.ispFetchSessionGroupSize(selectedProfile.id, scheduledSession.id);
  }

  handleCancelClick() {
    this.props.onCancel();
  }
  handleSubmitkButtonClicked() {
    const {validation} = this.state;
    const {selectedProfile, scheduledSession} = this.props;
    if (validation.valid) {
      const {minSize, maxSize, subSSPTypeBaseRateID} = this.state;
      this.props.ispUpdateSessionGroupSize(selectedProfile.id, scheduledSession.id, {minSize, maxSize, subSSPTypeBaseRateID});
      this.props.onCancel();
    } else {
      this.setState({
        submitted: true
      });
    }
  }

  validateOverrideGroupSize(data) {
    const {subSSPTypeBaseRateID, minSize, maxSize} = data;
    const {sessionGroupSizes} = this.props;
    const {bookedSlots} = this.props.scheduledSession;
    const validation = {
      minSize: false,
      maxSize: false,
      minMaxSize: false,
      valid: true
    };
    if (subSSPTypeBaseRateID === null) {
      validation.minSize = isNumber(minSize) && (minSize > 0);
      validation.maxSize = isNumber(maxSize) && (maxSize > 0) && (maxSize >= Math.max(minSize, bookedSlots));
      const oldSessionGroup = sessionGroupSizes.prices.find(groupSize => {
        const min = parseInt(groupSize.min, 10);
        const max = parseInt(groupSize.max, 10);
        return (min === minSize) && (max === maxSize);
      });
      validation.minMaxSize = (oldSessionGroup === null || oldSessionGroup === undefined);
      validation.valid = (validation.minSize === true) && (validation.maxSize === true) && (validation.minMaxSize === true);
    }
    return validation;
  }

  handleOverrideGroupSizeDataChange(newData) {
    const data = Object.assign({}, this.state, newData);
    const validation = this.validateOverrideGroupSize(data);
    this.setState({...newData, validation});
  }

  handleChangeMinMaxGroupSize(event) {
    const {name, value} = event.target;
    const intValue = parseInt(value, 10);
    this.handleOverrideGroupSizeDataChange({
      [name]: (intValue && intValue > 0) ? intValue : 0
    });
  }

  handleSubSSPTypeBaseRateID(event) {
    const {value} = event.target;
    this.handleOverrideGroupSizeDataChange({
      subSSPTypeBaseRateID: (value === CREATE_NEW_GROUP_SIZE_OPTION) ? null : value,
      minSize: 0,
      maxSize: 0
    });
  }

  renderGroupSizeOptions(groupSize) {
    return (
      <option key={groupSize.id} value={groupSize.id}>{groupSize.min}-{groupSize.max}</option>
    );
  }

  renderMinMaxGroupSize() {
    const {subSSPTypeBaseRateID, maxSize, minSize, submitted, validation} = this.state;
    const {p, scheduledSession} = this.props;
    const {bookedSlots} = scheduledSession;
    if (subSSPTypeBaseRateID === null) {
      return (
        <div className="uk-grid">
          <div className="uk-width-1-2">
            <div className={(validation.minSize === false && submitted) ? 'field-holder error' : 'field-holder'}>
              <label className="uk-form-label">{p.t('OverrideGroupSizeModal.minGroupSize')}</label>
              <input type="number" name="minSize" value={minSize} onChange={this.handleChangeMinMaxGroupSize}/>
              <span className="error-text">{p.t('OverrideGroupSizeModal.validation.min')}</span>
            </div>
          </div>
          <div className="uk-width-1-2">
            <div className={((validation.maxSize === false || validation.minMaxSize === false) && submitted) ? 'field-holder error' : 'field-holder'}>
              <label className="uk-form-label">{p.t('OverrideGroupSizeModal.maxGroupSize')}</label>
              <input type="number" name="maxSize" min={bookedSlots} value={maxSize} onChange={this.handleChangeMinMaxGroupSize}/>
              {(validation.maxSize === false) ? <span className="error-text">{p.t('OverrideGroupSizeModal.validation.max')}</span> : <span className="error-text">{p.t('OverrideGroupSizeModal.validation.minMax', {min: minSize, max: maxSize})}</span> }
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
  render() {
    const {p, sessionGroupSizes} = this.props;
    const {subSSPTypeBaseRateID} = this.state;
    return (
      <div id="overide-price-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb30">
            <h2>{p.t('OverrideGroupSizeModal.overrideGroupSize')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-large-1-1">
                {/* <div className="cl-sd-alert-box mb30">
                  <p>
                    {p.t('OverrideGroupSizeModal.alertText')}
                  </p>
                </div> */}
                <div className="uk-grid">
                  <div className="uk-width-1-1">
                    <div className="field-holder">
                      <label className="uk-form-label">{p.t('OverrideGroupSizeModal.selectExistingGroupSize')}</label>
                      <select value={subSSPTypeBaseRateID ? subSSPTypeBaseRateID : CREATE_NEW_GROUP_SIZE_OPTION} onChange={this.handleSubSSPTypeBaseRateID}>
                        {
                          sessionGroupSizes.prices.map(this.renderGroupSizeOptions)
                        }
                        <option value={CREATE_NEW_GROUP_SIZE_OPTION}>{p.t('OverrideGroupSizeModal.createNew')}</option>
                      </select>
                    </div>
                  </div>
                </div>
                {
                  this.renderMinMaxGroupSize()
                }
              </div>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" onClick={this.handleSubmitkButtonClicked} className="uk-modal-close uk-close theme-orange-btn">{p.t('OveridePrice.submit')}</button>
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
      ispFetchSessionGroupSize: PropTypes.func.isRequired,
      ispUpdateSessionGroupSize: PropTypes.func.isRequired,
      scheduledSession: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      sessionGroupSizes: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ispFetchSessionGroupSize: (profileID, scheduledSessionId) => dispatch(ispFetchSessionGroupSize(profileID, scheduledSessionId)),
    ispUpdateSessionGroupSize: (profileID, scheduledSessionId, {minSize, maxSize, subSSPTypeBaseRateID}) => dispatch(ispUpdateSessionGroupSize(profileID, scheduledSessionId, {minSize, maxSize, subSSPTypeBaseRateID}))
  };
};

const mapStateToProps = state => {
  const {userProfiles, sessionGroupSizes} = state;
  return {
    selectedProfile: userProfiles.selectedProfile,
    sessionGroupSizes: sessionGroupSizes.data
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(OverrideGroupSizeModal));
