import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';
import {AWARDS, ACCOMPLISHMENTS} from '../../../../../constants/ActionTypes';

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
    const {subType, p} = this.props;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className="field-holder">
            <h6>{p.t('Biography.selectType')}</h6>
            <div className="tandc">
              <input type="radio" name="awardType" id="awardType1" checked={subType === AWARDS} value={AWARDS} onChange={this.props.onSelectSubType}/>
              <label htmlFor="awardType1">{p.t('Biography.award')}</label>
              <input type="radio" name="awardType" id="awardType2" checked={subType === ACCOMPLISHMENTS} value={ACCOMPLISHMENTS} onChange={this.props.onSelectSubType}/>
              <label htmlFor="awardType2">{p.t('Biography.accomplishment')}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelectSubType: PropTypes.func.isRequired,
      subType: PropTypes.string.isRequired
    };
  }
}

const mapStateToProps = (/* state */) => {
  return {};
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};
const BiographyPage = connect(mapStateToProps, mapDispatchToProps)(translate(BiographySelector));
export default BiographyPage;
