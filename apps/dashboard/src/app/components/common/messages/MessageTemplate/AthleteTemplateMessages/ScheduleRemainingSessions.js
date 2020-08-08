import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

class ScheduleRemainingSessions extends PureComponent {
  render() {
    const {p} = this.props;
    return (
      <span>
        <div className="msg_messagesDetail-messageSimple">
          <h4>{p.t('scheduleRemainingSessions')}</h4>
          <p>{p.t('dontForgetToScheduleRemainingSessions', {unScheduledSessionCount: 2})}</p>
        </div>

        <div className="msg_messagesDetail-remainingSession">
          <div className="msg_remainingSession-item">
            <span>{p.t('sessionNameWithUnScheduledInfo', {sessionName: 'Intermediate Soccer for Adults', sessionIndex: 2, totalSession: 3})}</span>
            <span><a href="#">{p.t('btnScheduleNow')}</a></span>
          </div>
          <div className="msg_remainingSession-item">
            <span>{p.t('sessionNameWithUnScheduledInfo', {sessionName: 'Intermediate Soccer for Adults', sessionIndex: 3, totalSession: 3})}</span>
            <span><a href="#">{p.t('btnScheduleNow')}</a></span>
          </div>
        </div>
      </span>
    );
  }
}
ScheduleRemainingSessions.defaultProps = {

};

ScheduleRemainingSessions.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('ScheduleRemainingSessions')(ScheduleRemainingSessions);

