import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';
import {Set as immutableSet} from 'immutable';

import appConstants from '../../../../../../constants/appConstants';
import {fetchReasons, fetchIspOrderFutureSessions, sspCancelFutureSessions} from '../../../../../../actions/index';
import {FULFILLED, PENDING, REJECTED} from '../../../../../../constants/ActionTypes';
import validateCancelFutureSession from '../../../../../../validators/ssp/isp/cancelFutureSession';
import {getFormattedTrainingDateTime} from '../../SessionTimeLines/ispSessionTemplates';
/* eslint react/no-deprecated:0 */
class SSPCancelFutureSessions extends Component {
  constructor(props) {
    super(props);
    const data = {
      reasonId: null,
      sessions: []
    };
    const validation = validateCancelFutureSession(data);
    this.state = {
      data,
      error: false,
      validation
    };

    this.renderReasons = this.renderReasons.bind(this);
    this.handleReasonsSelect = this.handleReasonsSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderFutureSessions = this.renderFutureSessions.bind(this);
    this.renderTemplate = this.renderTemplate.bind(this);
    this.handleSessionSelectChange = this.handleSessionSelectChange.bind(this);
    this.isSelected = this.isSelected.bind(this);

    this.handleChangeCancelFutureSessiondata = this.handleChangeCancelFutureSessiondata.bind(this);
  }

  componentDidMount() {
    this.props.fetchReasons({event: appConstants.reasons.cancelFutureSessions});
    const {selectedProfile, session} = this.props;
    this.props.fetchIspOrderFutureSessions(selectedProfile.id, session.order.id, session.athlete.id);
  }

  componentWillReceiveProps(nextProps) {
    const {sspCancelFutureSessionStatus} = nextProps;
    if (this.props.sspCancelFutureSessionStatus === PENDING) {
      if (sspCancelFutureSessionStatus === FULFILLED) {
        this.handleCloseModal();
      } else if (sspCancelFutureSessionStatus === REJECTED) {
        this.setState({
          error: true
        });
      }
    }
  }

  handleChangeCancelFutureSessiondata(cancelFutureSessionData) {
    const {data} = this.state;
    const newData = Object.assign({}, data, cancelFutureSessionData);
    const validation = validateCancelFutureSession(newData);
    this.setState({
      data: newData,
      validation
    });
  }

  handleReasonsSelect(e) {
    const reasonId = e.currentTarget.getAttribute('data-id');

    this.handleChangeCancelFutureSessiondata({
      reasonId
    });
  }

  handleSubmit() {
    const {validation, data} = this.state;
    if (validation.valid === true) {
      const {selectedProfile} = this.props;
      this.props.sspCancelFutureSessions(selectedProfile.id,
        {
          reasonId: data.reasonId,
          bookingIds: data.sessions
        });
    }
  }

  handleCloseModal() {
    this.setState({
      error: false
    });
    this.props.onClose();
  }

  handleSessionSelectChange(e) {
    const {data} = this.state;
    const value = e.target.value;
    let sessionsSet = immutableSet(data.sessions);

    if (e.target.checked === true) {
      sessionsSet = sessionsSet.add(value);
    } else {
      sessionsSet = sessionsSet.delete(value);
    }
    this.handleChangeCancelFutureSessiondata(
      {
        sessions: sessionsSet.toJS()
      }
    );
  }

  isSelected(list, id) {
    const index = list.findIndex(item => item === id);
    if (index > -1) {
      return true;
    }
    return false;
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

  renderFutureSessions() {
    const {orderUpcommingSessions} = this.props;
    const {data} = this.state;
    return (
      orderUpcommingSessions.data.map(session =>
        (
          <span key={session.id}>
            <input
              type="checkbox"
              value={session.id}
              checked={this.isSelected(data.sessions, session.id)}
              onChange={this.handleSessionSelectChange}
              name="session"
              id={session.id}
            />
            <label htmlFor={session.id}>{session.name}: {this.renderTemplate(session.lastEvent)}</label>
          </span>
        )
      )
    );
  }

  renderTemplate(lastEvent) {
    const {p} = this.props;
    const {t} = p;
    const type = lastEvent.type;
    const {startTime, endTime} = lastEvent;
    if (startTime && endTime) {
      return t('SSPCancelFutureSessions.sessionStatus.' + type, {
        dateTime: getFormattedTrainingDateTime(t, lastEvent.startTime, lastEvent.endTime)
      });
    }
    return t('SSPCancelFutureSessions.sessionStatus.' + type);
  }

  render() {
    const {p, reasons, session} = this.props;
    const {t} = p;
    const {validation} = this.state;
    const selectedReason = reasons.data.find(reason => reason.id === this.state.data.reasonId);
    return (

      <div className="degreeModal" id="cl-cencel-future-session">
        <div className="uk-modal-dialog uk-modal-dialog-medium">
          <a onClick={this.handleCloseModal} className="del uk-modal-close">
            <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
              <g transform="translate(-1946.5 -5770.5)">
                <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
              </g>
            </svg>
          </a>
          <div className="cl-scheduler-modalHeader">
            {t('CancelFutureSessionsModal.cancel_future_session', {offerTerminology: 'Sessions'})}
          </div>
          <div className="cl-scheduler-modalForm">
            <div className="cl-scheduler-modalFormRow">
              {t('CancelFutureSessionsModal.reason')}:
              <div className="uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
                <button className="uk-button">{selectedReason ? selectedReason.reason : t('CancelFutureSessionsModal.select_reason')}<i className="cl-icon cl-icon-down"/>
                </button>
                <div className="cl-scheduler-modalOptions uk-dropdown cl-arrow-dropdown">
                  {this.renderReasons()}
                </div>
              </div>
            </div>
            <div className="cl-scheduler-modalFormRow">
              <p>
                {t('SSPCancelFutureSessions.heading',
                  {
                    noOfPurchase: session.noOfPurchase,
                    offerTerminology: 'Sessions',
                    athleteName: session.athlete.name,
                    date: moment(session.order.date).format('DD[-]MMM[,] YYYY')
                  }
                )}
              </p>
            </div>
            <div className="cl-scheduler-modalFormRow">
              <h6>
                {t('CancelFutureSessionsModal.select',
                  {
                    offerTerminology: 'Sessions'
                  }
                )}:
              </h6>
              {this.renderFutureSessions()}
            </div>
            <div className="cl-scheduler-modalFormRow">
              <a onClick={this.handleSubmit} className={'uk-button theme-orange-btn' + (validation.valid === true ? '' : ' disabled')}>
                {t('CancelFutureSessionsModal.cancel_sessions')}
              </a>
            </div>
          </div>

        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onClose: PropTypes.func.isRequired,
      fetchReasons: PropTypes.func.isRequired,
      reasons: PropTypes.object.isRequired,
      session: PropTypes.object.isRequired,
      orderUpcommingSessions: PropTypes.object.isRequired,
      sspCancelFutureSessions: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      fetchIspOrderFutureSessions: PropTypes.func.isRequired,
      sspCancelFutureSessionStatus: PropTypes.string
    };
  }
}

SSPCancelFutureSessions.defaultProps = {
  sspCancelFutureSessionStatus: ''
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReasons: type => dispatch(fetchReasons(type)),
    fetchIspOrderFutureSessions: (profileID, orderId, athleteId) => dispatch(fetchIspOrderFutureSessions(profileID, orderId, athleteId)),
    sspCancelFutureSessions: (profileID, data) => dispatch(sspCancelFutureSessions(profileID, data))
  };
};

const mapStateToProps = state => {
  const {reasons, userProfiles, orderUpcommingSessions, sspCancelFutureSessionStatus} = state;
  const {selectedProfile} = userProfiles;
  return {
    reasons,
    orderUpcommingSessions,
    selectedProfile,
    sspCancelFutureSessionStatus
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(SSPCancelFutureSessions));
