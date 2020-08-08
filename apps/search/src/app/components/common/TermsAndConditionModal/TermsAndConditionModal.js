import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import reactHtmlParser from 'react-html-parser';

import Modal from '../Modal';
import {fetchTOS} from '../../../actions/index';
import {FULFILLED, PENDING} from '../../../constants/ActionTypes';

class TermsAndConditionModal extends Component {
  componentDidMount() {
    const {tos} = this.props;
    if (tos.status !== FULFILLED && tos.status !== PENDING) {
      this.props.fetchTOS();
    }
  }

  render() {
    const {tos} = this.props;
    return (
      <Modal isModalOpen={this.props.isModalOpen} onClose={this.props.onClose}>
        <div id="termsModel">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <h2 className="uk-modal-title">Terms of Use</h2>
                </div>
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-1 ">
                  <p>Back to <a onClick={this.props.onClose} data-uk-modal>Sign Up</a></p>
                </div>
              </div>
            </div>
            <div className="uk-modal-body">
              {reactHtmlParser(tos.data)}
            </div>
            <div className="uk-modal-footer">
              <a onClick={this.props.onClose} className="general_btn uk-modal-close">Ok</a>
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
      onClose: PropTypes.func.isRequired,
      tos: PropTypes.object.isRequired,
      fetchTOS: PropTypes.func.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTOS: () => dispatch(fetchTOS())
  };
};

const mapStateToProps = state => {
  const {tos} = state;
  return {
    tos
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(TermsAndConditionModal));
