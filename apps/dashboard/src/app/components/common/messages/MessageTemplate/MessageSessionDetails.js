
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

class MessageSessionDetails extends PureComponent {
  render() {
    const {p, session} = this.props;
    const {sessionName, sessionType, sport, athleteName, sessionDateTime, location, reason, confirmedNumber, capacityNumber, coachName} = session;
    const dateTime = (sessionDateTime) ? (moment(sessionDateTime)).format(p.t('sesionDateTimeFormat')) : undefined;
    return (
      <div>
        <p className="mb10"><strong>{p.t('sessionDetails', {sessionName, sessionType, sport})}</strong></p>
        {(athleteName) ? <p className="mb10">{p.t('with')} <strong>{athleteName}</strong></p> : ''}
        {(coachName) ? <p className="mb10">{p.t('with')} <strong>{coachName}</strong></p> : ''}
        {(dateTime) ? <p className="mb10">{p.t('on')} <strong>{dateTime}</strong></p> : ''}
        {(location) ? <p className="mb10">{p.t('at')} <strong>{location}</strong></p> : undefined}
        {(capacityNumber !== undefined && confirmedNumber !== undefined) ? <p className="mb10">{p.t('noOfParticipants')} <strong>{confirmedNumber}</strong></p> : ''}
        {(reason) ? <p className="mb10">{p.t('reason')} <strong>{reason}</strong></p> : ''}
        <div className="msg-content-border"/>
      </div>
    );
  }
}
MessageSessionDetails.defaultProps = {

};

MessageSessionDetails.propTypes = {
  session: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageSessionDetails')(MessageSessionDetails);

