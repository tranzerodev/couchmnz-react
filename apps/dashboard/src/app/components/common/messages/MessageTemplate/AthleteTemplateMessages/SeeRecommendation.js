import React, {Component} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';

import {parseUrlTemplate} from '../../../../../utils/urlHelper';
import {getTrimmedQueryParam} from '../../../../../utils/sspSearchUtils.js';
import {SEARCH_URL_WITH_SPORT_LOCATION} from '../../../../../constants/WebConstants';

class SeeRecommendation extends Component {
  render() {
    const {p, sports, location} = this.props;
    const url = parseUrlTemplate(SEARCH_URL_WITH_SPORT_LOCATION, {sportName: getTrimmedQueryParam(sports), location: getTrimmedQueryParam(location)});
    return (
      <div className="msg_messagesDetail-messageBtn">
        <a href={url} target="_blank">{p.t('seeRecommendations')}</a>
      </div>
    );
  }
}
SeeRecommendation.defaultProps = {

};

SeeRecommendation.propTypes = {
  sports: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('SeeRecommendation')(SeeRecommendation);
