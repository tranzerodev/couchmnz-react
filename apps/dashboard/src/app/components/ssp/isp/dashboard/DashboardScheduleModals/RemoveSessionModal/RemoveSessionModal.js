import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {removeScheduledSession} from '../../../../../../actions';

class RemoveSessionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this);
  }

  handleCancelClick() {
    this.props.onCancel();
  }
  handleSubmitButtonClicked() {
    const {scheduledSession} = this.props;
    const eventID = scheduledSession.id;

    this.props.removeScheduledSession(eventID);
    this.props.onCancel();
  }

  render() {
    const {p} = this.props;
    return (
      <div id="remove-buffer-modal" className="cl-sd-modal-common">
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb45">
            <h2>{p.t('RemoveSession.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-large-1-1">
                <p>
                  {p.t('RemoveSession.message')}<br/>{p.t('RemoveSession.clickYesToRemove')}
                </p>
              </div>
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" className="uk-modal-close uk-close theme-orange-btn" onClick={this.handleSubmitButtonClicked} >{p.t('RemoveSession.yes')} </button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="uk-modal-close uk-close theme-white-btn uk-text-right" onClick={this.handleCancelClick}>{p.t('RemoveSession.cancel')}</button>
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
      removeScheduledSession: PropTypes.func.isRequired,
      scheduledSession: PropTypes.object.isRequired
    };
  }
}
const mapDispatchToProps = dispatch => {
  return {
    removeScheduledSession: eventID => dispatch(removeScheduledSession(eventID))
  };
};

const mapStateToProps = state => {
  const {months} = state;
  return {
    months
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(RemoveSessionModal));
