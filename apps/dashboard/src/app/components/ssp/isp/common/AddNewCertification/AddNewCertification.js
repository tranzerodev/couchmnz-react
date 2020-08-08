import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import Modal from '../../../../common/Modal';
import {addMaterData} from '../../../../../actions/index';
import {REJECTED, FULFILLED} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';

function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
class AddNewCertification extends Component {
  constructor(props) {
    super(props);
    this.state = {certificationName: '', year: '', valid: false, submitted: false, validYear: false, posted: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getYears = this.getYears.bind(this);
    this.handleSelectYear = this.handleSelectYear.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleChange(e) {
    this.setState({certificationName: e.target.value});
    if (notNull(e.target.value.trim())) {
      this.setState({valid: true});
      return;
    }
    this.setState({valid: false});
  }
  handleSubmit() {
    this.setState({submitted: true});
    if (this.state.valid && this.state.validYear) {
      const data = {
        name: this.state.certificationName,
        year: this.state.year,
        sportID: this.props.sportsSpecific ? this.props.currentSport.data.id : null,
        type: appConstants.masterDataTypes.ispCertification,
        countryID: null,
        stateID: null,
        stateName: null,
        cityID: null,
        cityName: null,
        notes: null
      };
      this.props.addMaterData(data, {profileID: this.props.profile.data.profile.id});
      this.setState({posted: true});
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.addNewMasterData.status === FULFILLED && this.state.posted) {
      this.setState({certificationName: '', year: '', valid: false, submitted: false, validYear: false, posted: false, showSuccess: true});
    }
  }
  handleClose() {
    this.props.handleClose();
    this.setState({certificationName: '', valid: false, submitted: false, showSuccess: false});
  }
  getYears() {
    const years = [];
    for (let i = new Date().getFullYear(); i > new Date().getFullYear() - appConstants.numberOfYears; i--) {
      years.push(<option key={i} value={i}>{i}</option>);
    }
    return years;
  }
  handleSelectYear(e) {
    this.setState({year: e.target.value});
    if (notNull(e.target.value.trim())) {
      this.setState({validYear: true});
      return;
    }
    this.setState({validYear: false});
  }
  render() {
    const {p, msgBodyKey} = this.props;
    const type = p.t('Biography.certification');
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div id="adddergreeModal" className="degreeModal">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h2>{this.props.p.t('AddNewCertification.h2')}</h2>
              {!this.state.showSuccess &&
              <p><strong>{this.props.p.t('AddNewCertification.note')}:</strong> {this.props.p.t('AddNewCertification.noteDesc')}</p>
              }
              <a onClick={this.props.handleClose} className="del uk-modal-close">
                <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className="uk-modal-body">
              <div className="uk-grid">
                {this.state.showSuccess &&
                <div className="uk-width-xlarge-1-1 mb25">
                  <p className="cl-alert-text-green">{p.t(msgBodyKey, {type})}</p>
                </div>
                }
                {!this.state.showSuccess &&
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={(this.state.submitted && this.state.valid === false) || (this.props.addNewMasterData.status === REJECTED) ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t('AddNewCertification.name')}</label>
                    <input onChange={this.handleChange} type="text" name="" className="field-required" placeholder={this.props.p.t('AddNewCertification.placeholder')}/>
                    <span className="error-text">{this.props.addNewMasterData.status === REJECTED ? this.props.p.t('AddNewCertification.server_error') : this.props.p.t('AddNewCertification.validation_messages.certification_name')}</span>
                  </div>
                </div>
                }
              </div>
              {!this.state.showSuccess &&
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={this.state.validYear === false && this.state.submitted ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t('AddNewAward.label3')}</label>
                    <select onChange={this.handleSelectYear} selected={this.state.year}>
                      <option value="">{this.props.p.t('AddNewAward.select_year')}</option>
                      {
                        this.getYears()
                      }
                    </select>
                    <span className="error-text">{this.props.p.t('AddNewAward.validation_messages.year')}</span>
                  </div>
                </div>
              </div>
              }
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                {!this.state.showSuccess &&
                <div className="lCol">
                  <a onClick={this.handleSubmit} className="general_btn">{this.props.p.t('AddNewCertification.add')}</a>
                </div>
                }
                {!this.state.showSuccess &&
                <div className="rCol">
                  <a onClick={this.handleClose} className="cancel">{this.props.p.t('AddNewCertification.cancel')}</a>
                </div>
                }
                {this.state.showSuccess &&
                <div className="rCol">
                  <a onClick={this.handleClose} className="general_btn">{this.props.p.t('Biography.close')}</a>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      isModalOpen: PropTypes.bool.isRequired,
      handleClose: PropTypes.func.isRequired,
      addMaterData: PropTypes.func.isRequired,
      sportsSpecific: PropTypes.bool.isRequired,
      currentSport: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,
      addNewMasterData: PropTypes.object.isRequired,
      msgBodyKey: PropTypes.string
    };
  }
}

AddNewCertification.defaultProps = {
  msgBodyKey: 'Biography.master_data_submitted'
};

const mapStateToProps = state => {
  const {
    currentSport,
    addNewMasterData,
    profile
  } = state;
  return {
    currentSport,
    addNewMasterData,
    profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMaterData: (data, params) => dispatch(addMaterData(data, params))
  };
};

const AddNewDegreeModal = connect(mapStateToProps, mapDispatchToProps)(translate(AddNewCertification));
export default AddNewDegreeModal;
