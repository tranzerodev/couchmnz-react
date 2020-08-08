import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import config from '../../../../../config';

const {pointPerFriendInvite} = config;
class InviteFriend extends PureComponent {
  render() {
    const {p} = this.props;
    return (
      <span>
        <div className="msg_messagesDetail-messageSimple">
          <h4>{p.t('inviteFriendTxt')}<span>{p.t('numPoints', {pointCount: pointPerFriendInvite})}</span></h4>
          <p>{p.t('description')}</p>
        </div>

        <div className="msg_messagesDetail-messageBtn">
          <a href="#">{p.t('btnInviteFriends')}</a>
        </div>
      </span>
    );
  }
}
InviteFriend.defaultProps = {

};

InviteFriend.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('InviteFriend')(InviteFriend);

