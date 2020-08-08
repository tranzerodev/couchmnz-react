import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import SeeRecommendation from './SeeRecommendation';

class MessageSSPNoLongerPartOfServices extends PureComponent {
  render() {
    const {p, message, name} = this.props;
    const {coachName, sportName, SSPType, location} = message.body;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-iconWrapper">
            <i className="cl-icon cl-icon--xlarge cl-icon-no-service"/>
          </div>

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('msgHeaderLine')}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-messageSimple">

          <p>{p.t('msgGreeting', {name})}</p>

          <p>{p.t('msgCoachNoLongerPartOfService', {coachName, sportName, SSPType})}</p>

          <br/>

          <h4>{p.t('findAnotherInstructor', {sportName})}</h4>

          <p>{p.t('tonsOfOtherSessions')}</p>

        </div>

        <SeeRecommendation sports={sportName} location={location}/>
      </div>
    );
  }
}
MessageSSPNoLongerPartOfServices.defaultProps = {

};

MessageSSPNoLongerPartOfServices.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageSSPNoLongerPartOfServices')(MessageSSPNoLongerPartOfServices);
