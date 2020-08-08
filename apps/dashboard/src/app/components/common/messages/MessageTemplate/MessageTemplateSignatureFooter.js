
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

class MessageTemplateSignatureFooter extends PureComponent {
  render() {
    const {p} = this.props;
    return (
      <div>
        {/* <div className="msg-bottom-singature">
        <a className="logo"/>
        <p><a href="www.CoachList.com">{p.t('coachListUrl')}</a>{p.t('address')}</p>
    </div> */}
      </div>

    );
  }
}
MessageTemplateSignatureFooter.defaultProps = {

};

MessageTemplateSignatureFooter.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessageTemplateSignatureFooter')(MessageTemplateSignatureFooter);

