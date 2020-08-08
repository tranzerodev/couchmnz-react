import React, {Component} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import SeeRecommendation from './SeeRecommendation';

class MessageBookingDeclinedProfile extends Component {
  render() {
    const {p, message, name} = this.props;
    const {body} = message;
    const {coachName, sportName, sspType, location} = body;
    return (
      <div className="msg_messagesDetail-messageContent">

        <div className="msg_messagesDetail-headerWrapper">

          <div className="msg_messagesDetail-iconWrapper">
            <i className="cl-icon cl-icon--xlarge cl-icon-message-cross"/>
          </div>

          <div className="msg_messagesDetail-headercContentWrapper">
            <strong>{p.t('bookingDeclined')}</strong>
          </div>

        </div>

        <div className="msg_messagesDetail-messageSimple">

          <p>{p.t('hiWithName', {name})}</p>

          <p>{p.t('msgDetail', {coachName, sportName, sspType})}</p>

          <br/>

          <h4>{p.t('findAnotherSession')}</h4>
          <p>{p.t('tonsOfSessionsOutThere')}</p>

        </div>

        <SeeRecommendation sports={sportName} location={location}/>

      </div>
    );
  }
}
MessageBookingDeclinedProfile.defaultProps = {

};

MessageBookingDeclinedProfile.propTypes = {
  message: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageBookingDeclinedProfile')(MessageBookingDeclinedProfile);
