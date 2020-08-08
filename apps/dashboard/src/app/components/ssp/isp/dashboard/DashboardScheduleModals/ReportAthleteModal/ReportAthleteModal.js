import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {fetchReasons, ispReportAthlete} from '../../../../../../actions';
import appConstants from '../../../../../../constants/appConstants';
import {FULFILLED, PENDING} from '../../../../../../constants/ActionTypes';

class ReportAthleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        reasonId: null,
        triedToResolveWithAthlete: appConstants.triedToResolveWithAthleteFlags.no,
        comment: ''
      }
    };

    this.handleClose = this.handleClose.bind(this);
    this.renderReasons = this.renderReasons.bind(this);
    this.handleReasonsSelect = this.handleReasonsSelect.bind(this);
    this.renderQuestionDropDown = this.renderQuestionDropDown.bind(this);
    this.handleTriedToResolveChange = this.handleTriedToResolveChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchReasons({event: appConstants.reasons.reportInstructor});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reportAthleteStatus === PENDING && this.props.reportAthleteStatus === FULFILLED) {
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
    data.triedToResolveWithAthlete = e.currentTarget.getAttribute('data-flag');
    this.setState({data});
  }

  handleCommentChange(e) {
    const {data} = this.state;
    data.comment = e.target.value;
    this.setState({data});
  }

  handleSubmit() {
    const {session, selectedProfile} = this.props;
    const {data} = this.state;
    if (data.reasonId) {
      this.props.ispReportAthlete(selectedProfile.id, session.athlete.id, data);
    }
  }

  renderQuestionDropDown() {
    const flags = appConstants.triedToResolveWithAthleteFlags;
    return (
      <div className="uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
        <button className="uk-button">
          {this.props.p.t('ReportAthleteModal.triedToResolveWithAthleteFlags.' + this.state.data.triedToResolveWithAthlete)}
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
                  >{this.props.p.t('ReportAthleteModal.triedToResolveWithAthleteFlags.' + flags[flag])}
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
    const {athlete} = session;
    const {t} = p;
    const selectedReason = reasons.data.find(reason => reason.id === this.state.data.reasonId);
    return (

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
            {t('ReportAthleteModal.report_name',
              {
                name: athlete.name
              }
            )}
          </div>
          <div className="cl-scheduler-modalForm">
            <div className="cl-scheduler-modalFormRow">
              {t('ReportAthleteModal.reason')}:
              <div className="uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
                <button className="uk-button">{selectedReason ? selectedReason.reason : t('ReportAthleteModal.select_reason')} <i className="cl-icon cl-icon-down"/></button>
                <div className="cl-scheduler-modalOptions uk-dropdown cl-arrow-dropdown">
                  {this.renderReasons()}
                </div>
              </div>
            </div>
            <div className="cl-scheduler-modalFormRow">
              {t('ReportAthleteModal.attempted')}
              {this.renderQuestionDropDown()}
            </div>
            <div className="cl-scheduler-modalFormRow">
              <span><strong>{t('ReportAthleteModal.any_additional_comments')}</strong></span>
              <textarea onChange={this.handleCommentChange} value={this.state.data.comment} placeholder={t('ReportAthleteModal.comment_placeholder')} rows="3"/>
            </div>
            <div className="cl-scheduler-modalFormRow">
              <a
                onClick={this.handleSubmit}
                className={(this.state.data.reasonId) ? 'uk-button theme-orange-btn' : 'uk-button theme-orange-btn disabled'}
              >{t('ReportAthleteModal.submit')}
              </a>
            </div>
          </div>
          <div className="cl-scheduler-modalContent">
            <p>
              {t('ReportAthleteModal.description')}
            </p>
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
      ispReportAthlete: PropTypes.func.isRequired,
      reasons: PropTypes.object.isRequired,
      session: PropTypes.object.isRequired,
      reportAthleteStatus: PropTypes.string.isRequired,
      selectedProfile: PropTypes.object.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReasons: type => dispatch(fetchReasons(type)),
    ispReportAthlete: (profileID, athleteId, data) => dispatch(ispReportAthlete(profileID, athleteId, data))
  };
};

const mapStateToProps = state => {
  const {reasons, userProfiles, reportAthleteStatus} = state;
  const {selectedProfile} = userProfiles;

  return {
    reasons,
    selectedProfile,
    reportAthleteStatus
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(ReportAthleteModal));
