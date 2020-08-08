import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import Modal from '../../../../common/Modal';
import appConstants from '../../../../../constants/appConstants';
import AddNewAutoSuggetion from '../../../../common/AddNewAutoSuggetion';

class AddNewBiographyModal extends Component {
  constructor(props) {
    super(props);
    this.getYears = this.getYears.bind(this);
  }
  getYears() {
    const years = [];
    for (let i = new Date().getFullYear(); i > new Date().getFullYear() - appConstants.numberOfYears; i--) {
      years.push(<option key={i} value={i}>{i}</option>);
    }
    return years;
  }
  componentDidMount() {
  }
  render() {
    const input = {
      value: this.props.input,
      onChange: this.props.inpuChange,
      placeholder: this.props.p.t(this.props.textKey + '.placeholder2')
    };
    const institutionInput = {
      value: this.props.institutionName,
      onChange: this.props.handleInstitutionNameChange,
      placeholder: this.props.p.t(this.props.textKey + '.placeholder1')
    };
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div id="degreeModal" className="degreeModal">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h2>{this.props.p.t(this.props.textKey + '.h2')}</h2>
              <a onClick={this.props.handleCloseModal} className="del uk-modal-close">
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
                <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-2-3  uk-width-small-1-1">
                <div className={this.props.element.submitted === true && this.props.element.id === false ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t(this.props.textKey + '.label2')}</label>
                    <div className="uk-autocomplete cl-sd-degreeDropdownhead" data-uk-autocomplete="{source:'../../resources/assets/jsons/degree.json'}">
                      <AddNewAutoSuggetion inputProps={input} onSelectSuggetion={this.props.handleInputChange} list={this.props.list} cantFind={this.props.cantFind} onSuggestionHighlighted={this.props.onHighlightedInputChange}/>
                    </div>
                    <span className="error-text">{this.props.p.t(this.props.textKey + '.validation_messages.input')}</span>
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-2-3  uk-width-small-1-1">
                <div className={this.props.element.submitted === true && this.props.element.institution === false ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t(this.props.textKey + '.label1')}</label>
                    <div className="uk-autocomplete cl-sd-degreeDropdownhead">
                      <AddNewAutoSuggetion inputProps={institutionInput} onSelectSuggetion={this.props.handleInstitutionChange} list={this.props.institutionsList} cantFind={this.props.cantFindInstitution} onSuggestionHighlighted={this.props.onHighlightedInstitutionChange}/>
                    </div>
                    <span className="error-text">{this.props.p.t(this.props.textKey + '.validation_messages.institution')}</span>
                  </div>
                </div>
                <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-3  uk-width-small-1-1">
                  <div className={this.props.element.submitted === true && this.props.element.year === false ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t(this.props.textKey + '.label3')}</label>
                    <select onChange={this.props.handleSelectYear} selected={this.props.year}>
                      <option value="">{this.props.p.t(this.props.textKey + '.select_year')}</option>
                      {
                        this.getYears()
                      }
                    </select>
                    <span className="error-text">{this.props.p.t(this.props.textKey + '.validation_messages.year')}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  <a onClick={this.props.handleAdd} className="general_btn">{this.props.p.t(this.props.textKey + '.add')}</a>
                </div>
                <div className="rCol">
                  <a onClick={this.props.handleCloseModal} className="cancel">{this.props.p.t(this.props.textKey + '.cancel')}</a>
                </div>
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
      handleCloseModal: PropTypes.func.isRequired,
      handleAdd: PropTypes.func.isRequired,
      textKey: PropTypes.string.isRequired,
      handleSelectYear: PropTypes.func.isRequired,
      input: PropTypes.string.isRequired,
      inpuChange: PropTypes.func.isRequired,
      handleInputChange: PropTypes.func.isRequired,
      list: PropTypes.array.isRequired,
      institutionName: PropTypes.string.isRequired,
      handleInstitutionNameChange: PropTypes.func.isRequired,
      institutionsList: PropTypes.array,
      handleInstitutionChange: PropTypes.func.isRequired,
      year: PropTypes.string.isRequired,
      element: PropTypes.object.isRequired,
      cantFind: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
      cantFindInstitution: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
      onHighlightedInputChange: PropTypes.func.isRequired,
      onHighlightedInstitutionChange: PropTypes.func.isRequired
    };
  }
}

AddNewBiographyModal.defaultProps = {
  institutionsList: []
};

const mapStateToProps = state => {
  const {
  } = state;
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {    
  };
};

const CommonAddNewBiographyModal = connect(mapStateToProps, mapDispatchToProps)(translate(AddNewBiographyModal));
export default CommonAddNewBiographyModal;
