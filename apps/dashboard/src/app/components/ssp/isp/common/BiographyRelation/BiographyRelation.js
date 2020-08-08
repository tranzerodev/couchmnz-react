import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';
import appConstants from '../../../../../constants/appConstants';

class BiographyRelation extends Component {
  render() {
    const {isSportRelated, sportName, p} = this.props;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className="field-holder">
            <h6>{p.t('Biography.sportRelation', {sportName})}</h6>
            <div className="tandc">
              <input type="radio" name="degreetype" id="degreetype1" onChange={this.props.onSelectRelation} checked={isSportRelated === appConstants.yes} value={appConstants.yes}/>
              <label htmlFor="degreetype1">{p.t('Biography.yes')}</label>
              <input type="radio" name="degreetype" id="degreetype2" onChange={this.props.onSelectRelation} checked={isSportRelated !== appConstants.yes} value={appConstants.no}/>
              <label htmlFor="degreetype2">{p.t('Biography.no')}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelectRelation: PropTypes.func.isRequired,
      isSportRelated: PropTypes.string.isRequired,
      sportName: PropTypes.string
    };
  }
}

BiographyRelation.defaultProps = {
  sportName: 'Sports'
};

const mapStateToProps = (/* state */) => {
  return {
  };
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};

const RelationComponent = connect(mapStateToProps, mapDispatchToProps)(translate(BiographyRelation));
export default RelationComponent;
