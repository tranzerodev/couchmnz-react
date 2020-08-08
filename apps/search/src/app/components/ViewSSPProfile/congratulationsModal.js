import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';

class CongratulationModal extends Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
  }
  handleOk() {
    this.props.onClose();
  }
  render() {
    return (
      <div id="congratulationModal">
        <div className="uk-modal-dialog">
          <div className="uk-modal-header"/>
          <div className="uk-modal-body">
            <h2>{this.props.p.t('CongratulationModal.h2')}</h2>
            <p>{this.props.p.t('CongratulationModal.p1')}</p>
            <p>{this.props.p.t('CongratulationModal.p2')}</p>
            <p>{this.props.p.t('CongratulationModal.p3')}</p>
          </div>
          <div className="uk-modal-footer">
            <div className="uk-text-center">
              <a className="general_btn" onClick={this.handleOk}>{this.props.p.t('CongratulationModal.ok')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onClose: PropTypes.func.isRequired
    };
  }
}
const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(translate(CongratulationModal));
