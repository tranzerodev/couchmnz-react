import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import Modal from '../../../../common/Modal';
import {fetchReasons, athleteCancelSession} from '../../../../../actions/index';
import appConstants from '../../../../../constants/appConstants';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import {getProfileId} from '../../../../../middlewares/athlete/schedulerUtils';

class AthleteCancelSessionModal extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.renderReasons = this.renderReasons.bind(this);
    this.handleReasonsSelect = this.handleReasonsSelect.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: {
        reasonId: null,
        comment: ''
      }
    };
  }

  componentDidMount() {
    this.props.fetchReasons({event: appConstants.reasons.cancelSession});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cancelSession.status !== FULFILLED && this.props.cancelSession.status === FULFILLED) {
      this.handleClose();
    }
  }

  handleClose() {
    this.props.onClose();
  }

  handleReasonsSelect(e) {
    const {data} = this.state;
    data.reasonId = e.currentTarget.getAttribute('data-id');
    this.setState({data});
  }

  handleCommentChange(e) {
    const {data} = this.state;
    data.comment = e.target.value;
    this.setState({data});
  }

  handleSubmit() {
    const {selectedProfile, session} = this.props;
    const {data} = this.state;
    if (data.reasonId) {
      const profileId = getProfileId(selectedProfile);
      this.props.athleteCancelSession({profileId, profileType: selectedProfile.type, sessionId: session.sessionId}, data);
    }
  }

  renderReasons() {
    const {reasons} = this.props;
    if (reasons.data.length) {
      return (
        <ul>
          {
            reasons.data.map(reason =>
              <li key={reason.id} ><a data-id={reason.id} onClick={this.handleReasonsSelect}>{reason.reason}</a></li>
            )
          }
        </ul>
      );
    }
  }

  render() {
    const {p, reasons, session} = this.props;
    const {t} = p;
    const selectedReason = reasons.data.find(reason => reason.id === this.state.data.reasonId);
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div className="degreeModal" id="cl-report-instructor">
          <div className="uk-modal-dialog uk-modal-dialog-medium">
            <a onClick={this.handleClose} className="del uk-modal-close">
              <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                <g transform="translate(-1946.5  -5770.5)">
                  <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                  <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                </g>
              </svg>
            </a>
            <div className="cl-scheduler-modalHeader">
              {t('AthleteCancelSessionModal.cancel_session',
                {
                  offerTerminology: t('offerTerminology.' + session.offerTerminology)
                }
              )}
            </div>
            <div className="cl-scheduler-modalForm">
              <div className="cl-scheduler-modalFormRow">
                {t('AthleteCancelSessionModal.reason')}:
                <div className="uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
                  <button className="uk-button">{selectedReason ? selectedReason.name : t('AthleteCancelSessionModal.select_reason')} <i className="cl-icon cl-icon-down"/></button>
                  <div className="cl-scheduler-modalOptions uk-dropdown cl-arrow-dropdown">
                    {this.renderReasons()}
                  </div>
                </div>
              </div>
              <div className="cl-scheduler-modalFormRow">
                <span><strong>{t('AthleteCancelSessionModal.any_additional_comments')}</strong></span>
                <textarea onChange={this.handleCommentChange} value={this.state.data.comment} placeholder={t('AthleteCancelSessionModal.comment_placeholder')} rows="3"/>
              </div>
              <div className="cl-scheduler-modalFormRow">
                <a
                  onClick={this.handleSubmit}
                  className={(this.state.data.reasonId) ? 'uk-button theme-orange-btn' : 'uk-button theme-orange-btn disabled'}
                >{t('AthleteCancelSessionModal.submit')}
                </a>
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
      onClose: PropTypes.func.isRequired,
      fetchReasons: PropTypes.func.isRequired,
      athleteCancelSession: PropTypes.func.isRequired,
      reasons: PropTypes.object.isRequired,
      session: PropTypes.object.isRequired,
      cancelSession: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReasons: type => dispatch(fetchReasons(type)),
    athleteCancelSession: (params, data) => dispatch(athleteCancelSession(params, data))
  };
};

const mapStateToProps = state => {
  const {reasons, userProfiles, athlete} = state;
  const {selectedProfile} = userProfiles;
  const {cancelSession} = athlete;
  return {
    reasons,
    selectedProfile,
    cancelSession
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(AthleteCancelSessionModal));
