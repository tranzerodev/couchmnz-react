import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';

class DeleteQuaterModal extends Component {
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
      <div id="delete-calender-modal-1" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-two">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb30">
            <h2>Delete Quater 1</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-large-1-1">
                <p>Are you sure you want to delete the calendar <b>Quater 1: January 2018 to March 2018?</b> All the scheduling you have done in this calendar will be lost if you press Yes button</p>
              </div>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" className="uk-modal-close uk-close theme-orange-btn">Yes</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>No</button>
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

export default connect(mapStateToProps)(translate(DeleteQuaterModal));
