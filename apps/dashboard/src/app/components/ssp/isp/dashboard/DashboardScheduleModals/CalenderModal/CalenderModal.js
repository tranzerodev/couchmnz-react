import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';

class CalenderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  render() {
    return (
      <div id="new-calender-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-two">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb60">
            <h2>Create New Calendar</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-large-5-10 uk-width-medium-5-10">
                <label className="uk-form-label">Label</label>
                <div className="uk-form-row">
                  <input type="text" className="cl-sd-input-text" value="Quarter 1"/>
                </div>
              </div>
              <div className="uk-width-large-5-10 uk-width-medium-5-10">
                <label className="uk-form-label">Date range for this calendar</label>
                <div className="uk-flex uk-flex-middle uk-flex-space-between">
                  <div className="cl-sd-flex-column-large">
                    <div className="uk-button uk-form-select uk-active" data-uk-form-select>
                      <span className="cl-sd-modal-selected-option"/>
                      <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
                        <path
                          fill="none"
                          fillRule="evenodd"
                          stroke="#42B7DB"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M1 1l3 3 3-3"
                        />
                      </svg>
                      <select>
                        <option value="1">January 2018</option>
                        <option value="2">February 2018</option>
                        <option value="2">March 2018</option>
                      </select>
                    </div>
                  </div>
                  <div className="cl-sd-flex-column-small uk-text-center to-text-color">to</div>
                  <div className="cl-sd-flex-column-large">
                    <div className="uk-button uk-form-select uk-active" data-uk-form-select>
                      <span className="cl-sd-modal-selected-option"/>
                      <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
                        <path
                          fill="none"
                          fillRule="evenodd"
                          stroke="#42B7DB"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M1 1l3 3 3-3"
                        />
                      </svg>
                      <select>
                        <option value="1">January 2018</option>
                        <option value="2">February 2018</option>
                        <option value="2">March 2018</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" className="uk-modal-close uk-close theme-orange-btn">Save</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  static get propTypes() {
    return {
      onCancel: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {months} = state;
  return {
    months
  };
};

export default connect(mapStateToProps)(translate(CalenderModal));
