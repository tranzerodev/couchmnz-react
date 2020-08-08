import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import translate from 'redux-polyglot/translate';

export class MessageTemplateHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {message, p} = this.props;
    const {from, timestamp} = message;
    const parsedDateString = (moment(timestamp)).format(p.t('messageDateTime'));

    return (
      <div className="msg_messagesDetail-messageHeader uk-clearfix">
        <div className="msg_messagesDetail-senderInfo">
          <div className="msg_messagesAuthorInfo-dropdown uk-button-dropdown" data-uk-dropdown="{mode:'click', pos:'bottom-left'}">
            <a className="cl-icon-profile"><img src={from.profilePic} alt={from.displayName}/></a>
            <div className="uk-dropdown uk-clearfix">
              <div className="msg_flyOutProfilePic">
                <img src={from.profilePic} alt={from.displayName}/>
              </div>
              <div className="msg_flyOutProfileDetail">
                <span><strong>{from.displayName}</strong></span>
                {/* Needs to change  <span>Santa Clara, CA</span>
                <span>M, 25 y <i className="uk-icon-circle"/> Soccer (Intermediate) <i className="uk-icon-circle"/> Tennis (Intermediate)</span> */}
              </div>
            </div>
          </div>

          <div className="msg_messagesDetail-authors">
            <span><a ><strong>{from.displayName}</strong></a></span>
            <span><a >{p.t('toMe')}</a></span>
          </div>
        </div>
        <div className="msg_messagesDetail-headerActions">

          <span className="msg_messagesDetail-headerTimestamps">{parsedDateString}</span>
        </div>
      </div>
    );
  }
}

MessageTemplateHeader.propTypes = {
  message: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};

export default translate('RecievedMessageHeader')(MessageTemplateHeader);
