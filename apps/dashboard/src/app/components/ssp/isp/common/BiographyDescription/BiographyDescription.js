import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';

class BiographyDescription extends Component {
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
    const {description, p, valid, submit} = this.props;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className={submit && valid === false ? 'field-holder error' : 'field-holder'}>
            <label>{p.t('Biography.description')}</label>
            <textarea rows={4} className="field-required" placeholder={p.t('Biography.descriptionPlaceHolder')} defaultValue={''} value={description ? description : ''} onChange={this.props.onChangeDescription}/>
            <span className="error-text">{p.t('Biography.validation_messages.description')}</span>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      valid: PropTypes.bool.isRequired,
      submit: PropTypes.bool.isRequired,
      onChangeDescription: PropTypes.func.isRequired,
      description: PropTypes.string
    };
  }
}

BiographyDescription.defaultProps = {
  description: ''
};

const mapStateToProps = (/* state */) => {
  return {
  };
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};
const DescriptionComponent = connect(mapStateToProps, mapDispatchToProps)(translate(BiographyDescription));
export default DescriptionComponent;
