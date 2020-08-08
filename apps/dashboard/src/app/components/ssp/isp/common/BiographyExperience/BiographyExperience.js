import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';

class Experience extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleType = this.handleType.bind(this);
  }
  handleType(e) {
    const {value} = e.target;
    console.log('handleType', 'value', value);
    this.setState({type: value});
  }
  render() {
    const {description, submit, valid} = this.props;
    const {t} = this.props.p;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className={submit && valid === false ? 'field-holder error' : 'field-holder'}>
            <label>{t('Biography.experience')}</label>
            <input type="text" value={description ? description : ''} placeholder={t('Biography.experiencePlaceHolder')} className="field-required" onChange={this.props.onChange}/>
            <span className="error-text">{t('Biography.validation_messages.experience')}</span>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onChange: PropTypes.func.isRequired,
      description: PropTypes.string,
      submit: PropTypes.bool.isRequired,
      valid: PropTypes.bool.isRequired
    };
  }
}

Experience.defaultProps = {
  description: ''
};

const mapStateToProps = (/* state */) => {
  return {
  };
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};

const BiographyExperience = connect(mapStateToProps, mapDispatchToProps)(translate(Experience));
export default BiographyExperience;
