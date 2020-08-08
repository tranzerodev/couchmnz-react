import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import Modal from '../../../../common/Modal';
import {fetchReasons, athleteRequestRefund} from '../../../../../actions/index';
import appConstants from '../../../../../constants/appConstants';
import {FULFILLED} from '../../../../../constants/ActionTypes';
import {getProfileId} from '../../../../../middlewares/athlete/schedulerUtils';

function isValid({reasonId}) {
  return Boolean(reasonId);
}

class RequestRefundModal extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.renderReasons = this.renderReasons.bind(this);
    this.handleReasonsSelect = this.handleReasonsSelect.bind(this);
    this.renderQuestionDropDown = this.renderQuestionDropDown.bind(this);
    this.handleTriedToResolveChange = this.handleTriedToResolveChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: {
        reasonId: null,
        canResolve: appConstants.triedToResolveWithAthleteFlags.no,
        additionalComments: ''
      }
    };
  }

  componentDidMount() {
    this.props.fetchReasons({event: appConstants.reasons.requestToRefund});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.requestRefund.status !== FULFILLED && this.props.requestRefund.status === FULFILLED) {
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

  handleTriedToResolveChange(e) {
    const {data} = this.state;
    data.canResolve = e.currentTarget.getAttribute('data-flag');
    this.setState({data});
  }

  handleCommentChange(e) {
    const {data} = this.state;
    data.additionalComments = e.target.value;
    this.setState({data});
  }

  handleSubmit() {
    const {selectedProfile, session} = this.props;
    const {data} = this.state;
    if (isValid(data)) {
      const profileId = getProfileId(selectedProfile);
      this.props.athleteRequestRefund(
        {
          profileId,
          sessionId: session.sessionId,
          profileType: selectedProfile.type
        },
        data
      );
    }
  }

  renderReasons() {
    const {reasons} = this.props;
    if (reasons.data.length) {
      return (
        <ul>
          {
            reasons.data.map(reason =>
              (
                <li key={reason.id} >
                  <a data-id={reason.id} onClick={this.handleReasonsSelect}>
                    {reason.reason}
                    <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293"><path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/></svg>
                  </a>
                </li>
              )

            )
          }
        </ul>
      );
    }
  }

  renderQuestionDropDown() {
    const flags = appConstants.triedToResolveWithAthleteFlags;
    return (
      <div className="uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
        <button className="uk-button">
          {this.props.p.t('AthleteReportInstructorModal.triedToResolveWithAthleteFlags.' + this.state.data.canResolve)}
          <i className="cl-icon cl-icon-down"/>
        </button>
        <div className="cl-scheduler-modalOptions uk-dropdown cl-arrow-dropdown">
          <ul>
            { Object.keys(flags).map(flag =>
              (
                <li key={flags[flag]}>
                  <a
                    data-flag={flags[flag]}
                    onClick={this.handleTriedToResolveChange}
                  >{this.props.p.t('AthleteReportInstructorModal.triedToResolveWithAthleteFlags.' + flags[flag])}
                  </a>
                </li>
              )
            )
            }
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const {session, p, reasons} = this.props;
    const {t} = p;
    const selectedReason = reasons.data.find(reason => reason.id === this.state.data.reasonId);
    return (
      <Modal isModalOpen={this.props.isModalOpen}>
        <div className="degreeModal" id="cl-request-refund" >
          <div className="uk-modal-dialog uk-modal-dialog-medium">
            <a onClick={this.handleClose} className="del uk-modal-close">
              <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                <g transform="translate(-1946.5 -5770.5)">
                  <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                  <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                </g>
              </svg>
            </a>
            <div className="cl-scheduler-modalHeader">
              {t('RequestRefundModal.heading', {offerTerminology: session.offerTerminology.plural})}
            </div>
            <div className="cl-scheduler-modalContent cl-scheduler-modalContent--intro">
              <p>
                {t('RequestRefundModal.description',
                  {
                    offerTerminology: session.offerTerminology.plural,
                    noOfSessions: session.orderItem.noOfPurchase,
                    coachName: session.ssp.name,
                    date: moment(session.order.date).format('DD[-]MMM[,] YYYY')
                  })}
                <br/>
                {t('RequestRefundModal.session_Info',
                  {
                    sessionLabel: session.sessionLabel,
                    time: moment(session.completedOn).format('hh:mm A'),
                    date: moment(session.completedOn).format('DD[-]MMM[-]YYYY')
                  })}
              </p>
            </div>
            <div className="cl-scheduler-modalForm">
              <div className="cl-scheduler-modalFormRow">
                { t('RequestRefundModal.reason_for_refund')}:
                <div className="uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
                  <button className="uk-button">{selectedReason ? selectedReason.reason : t('RequestRefundModal.select_reason')} <i className="cl-icon cl-icon-down"/></button>
                  <div className="cl-scheduler-modalOptions uk-dropdown cl-arrow-dropdown">
                    {this.renderReasons()}
                  </div>
                </div>
              </div>
              <div className="cl-scheduler-modalFormRow">
                { t('RequestRefundModal.attempted')}
                {this.renderQuestionDropDown()}
              </div>
              <div className="cl-scheduler-modalFormRow">
                <span><strong>{t('RequestRefundModal.result_of_attempt')}</strong></span>
                <textarea onChange={this.handleCommentChange} value={this.state.data.additionalComments} placeholder={t('RequestRefundModal.comment_placeholder')} rows="3"/>
              </div>
              <div className="cl-scheduler-modalFormRow">
                <a onClick={this.handleSubmit} className={'uk-button theme-orange-btn' + (isValid(this.state.data) ? '' : ' disabled')}>{t('RequestRefundModal.submit')}</a>
              </div>
            </div>
            <div className="cl-scheduler-modalContent">
              <p>
                {t('RequestRefundModal.footer_description')}
              </p>
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
      session: PropTypes.object.isRequired,
      reasons: PropTypes.object.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      requestRefund: PropTypes.object.isRequired,
      athleteRequestRefund: PropTypes.func.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReasons: type => dispatch(fetchReasons(type)),
    athleteRequestRefund: (params, data) => dispatch(athleteRequestRefund(params, data))
  };
};

const mapStateToProps = state => {
  const {reasons, athlete, userProfiles} = state;
  const {requestRefund} = athlete;
  const {selectedProfile} = userProfiles;
  return {
    reasons,
    selectedProfile,
    requestRefund
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(RequestRefundModal));
