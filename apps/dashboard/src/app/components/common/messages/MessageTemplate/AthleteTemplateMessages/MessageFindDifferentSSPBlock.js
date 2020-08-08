import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

class MessageFindDifferentSSPBlock extends PureComponent {
  render() {
    const {p} = this.props;
    return (
      <div className="msg_messagesDetail-messageSimple">
        <h4>{p.t('findDifferentSSP')}</h4>
        <p>{p.t('tonsOfOtherSessionWaiting')}</p>
      </div>
    );
  }
}
MessageFindDifferentSSPBlock.defaultProps = {

};

MessageFindDifferentSSPBlock.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageFindDifferentSSPBlock')(MessageFindDifferentSSPBlock);

