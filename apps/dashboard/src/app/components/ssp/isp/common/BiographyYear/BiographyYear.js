import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import appConstants from '../../../../../constants/appConstants';
import {ACCOMPLISHMENTS} from '../../../../../constants/ActionTypes';

class BiographyForm extends Component {
  render() {
    const {year, submit, valid, subType} = this.props;
    const {t} = this.props.p;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className={submit && valid === false ? 'field-holder error' : 'field-holder'}>
            <label>{t('Biography.year')}</label>
            <input type="number" name placeholder={1990} className={subType === ACCOMPLISHMENTS ? 'uk-form-width-small' : 'field-required uk-form-width-small'} value={year ? year : ''} onChange={this.props.onChangeYear} max={appConstants.maximumYear} min={appConstants.minimumYear}/>
            <span className="error-text">{t('Biography.validation_messages.year')}</span>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      submit: PropTypes.bool.isRequired,
      valid: PropTypes.bool.isRequired,
      onChangeYear: PropTypes.func.isRequired,
      subType: PropTypes.string.isRequired,
      year: PropTypes.number
    };
  }
}

BiographyForm.defaultProps = {
  year: 2000
};

const mapStateToProps = (/* state */) => {
  return {};
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};
const BiographyPage = connect(mapStateToProps, mapDispatchToProps)(translate(BiographyForm));
export default BiographyPage;
