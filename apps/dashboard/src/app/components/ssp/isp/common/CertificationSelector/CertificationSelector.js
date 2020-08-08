
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';
import appConstants from '../../../../../constants/appConstants';

class CertificationSelector extends Component {
  render() {
    const {isCertified} = this.props;
    const {t} = this.props.p;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className="field-holder">
            <h6>{t('Biography.areYouCertified')}</h6>
            <div className="tandc">
              <input type="radio" name="awardType" id="awardType3" value={appConstants.yes} checked={isCertified === appConstants.yes} onChange={this.props.onSelect}/>
              <label htmlFor="awardType3">{t('Biography.yes')}</label>
              <input type="radio" name="awardType" id="awardType4" value={appConstants.no} checked={isCertified === appConstants.no} onChange={this.props.onSelect}/>
              <label htmlFor="awardType4">{t('Biography.no')}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelect: PropTypes.func.isRequired,
      isCertified: PropTypes.string.isRequired
    };
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
const CertificationSelectorComponent = connect(mapStateToProps, mapDispatchToProps)(translate(CertificationSelector));
export default CertificationSelectorComponent;
