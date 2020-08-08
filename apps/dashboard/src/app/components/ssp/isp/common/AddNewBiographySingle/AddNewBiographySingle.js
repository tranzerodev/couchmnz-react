import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import Modal from '../../../../common/Modal';
import AddNewAutoSuggetion from '../../../../common/AddNewAutoSuggetion';
function isNull(value) {
  const object = value.trim();
  if (object === undefined || object === null || object === '') {
    return true;
  }
  return false;
}
class AddNewBiographySingle extends Component {
  constructor() {
    super();
    this.state = {submitted: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.setState({submitted: true});
    this.props.handleAdd();
  }
  render() {
    const input = {
      value: this.props.input,
      onChange: this.props.inpuChange,
      placeholder: this.props.p.t(this.props.textKey + '.placeholder1')
    };
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div id="affiliationsModal" className="degreeModal">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h2>{this.props.p.t(this.props.textKey + '.add_subject')}</h2>
              <a className="del uk-modal-close">
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
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className={this.state.submitted && isNull(this.props.element.id) ? 'field-holder error' : 'field-holder'}>
                    <label>{this.props.p.t(this.props.textKey + '.label')}</label>
                    <div className="uk-autocomplete cl-sd-degreeDropdownhead">
                      <AddNewAutoSuggetion inputProps={input} onSelectSuggetion={this.props.handleInputChange} list={this.props.list} cantFind={this.props.cantFind} onSuggestionHighlighted={this.props.onHighlightedInputChange}/>
                    </div>
                    <span className="error-text">{this.props.p.t(this.props.textKey + '.validation_messages.name')}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  <a onClick={this.handleSubmit} className="general_btn">{this.props.p.t(this.props.textKey + '.add')}</a>
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
      input: PropTypes.string.isRequired,
      inpuChange: PropTypes.func.isRequired,
      handleInputChange: PropTypes.func.isRequired,
      list: PropTypes.array,
      cantFind: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
      onHighlightedInputChange: PropTypes.func.isRequired,
      element: PropTypes.object.isRequired
    };
  }
}

AddNewBiographySingle.defaultProps = {
  list: {data: [], status: null}
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

const AddNewBiographySingleModal = connect(mapStateToProps, mapDispatchToProps)(translate(AddNewBiographySingle));
export default AddNewBiographySingleModal;
