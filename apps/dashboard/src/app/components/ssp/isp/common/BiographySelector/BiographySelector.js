import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';
import {AWARDS, CERTIFICATIONS, DEGREES, AFFILIATIONS, EXPERIENCE, TOOLS} from '../../../../../constants/ActionTypes';

class BiographySelector extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleType = this.handleType.bind(this);
  }
  handleType(e) {
    const {value} = e.target;
    this.setState({type: value});
  }
  render() {
    const {type, p} = this.props;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className="field-holder">
            <label>{p.t('Biography.selectType')}</label>
            <select className="field-required" onChange={this.props.onSelectType} value={type}>
              <option value={AWARDS}>{p.t('Biography.awardsAndAccomplishments')}</option>
              <option value={CERTIFICATIONS}>{p.t('Biography.certifications')}</option>
              <option value={DEGREES}>{p.t('Biography.degrees')}</option>
              <option value={AFFILIATIONS}>{p.t('Biography.affiliations')}</option>
              {/*  <option value={EXPERIENCE}>{p.t('Biography.experience')}</option> */}
              <option value={TOOLS}>{p.t('Biography.captionTTT')}</option>
            </select>
            <span className="error-text">{p.t('Biography.error')}</span>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelectType: PropTypes.func.isRequired,
      type: PropTypes.string.isRequired
    };
  }
}

const mapStateToProps = (/* state */) => {
  // Const {} = state;
  return {};
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};
const BiographySelectorComponent = connect(mapStateToProps, mapDispatchToProps)(translate(BiographySelector));
export default BiographySelectorComponent;
