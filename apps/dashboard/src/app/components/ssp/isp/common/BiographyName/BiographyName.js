import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';

class BiographyRelation extends Component {
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
    const {biography} = this.props;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className="field-holder">
            <label>{this.props.name}</label>
            <div className="uk-autocomplete cl-sd-degreeDropdownhead">
              <input type="text" name placeholder={this.props.placeholder} className="field-required" autoComplete="off" value={name} onChange={this.props.onChangeName}/>
              <div className="uk-dropdown" aria-expanded="false"/>
            </div>
            <span className="error-text">{this.props.error}</span>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      // P: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelectType: PropTypes.func.isRequired,
      biography: PropTypes.object.isRequired,
      type: PropTypes.string.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {currentSport,
    degrees,
    sportsDegrees,
    genCertifications,
    certifications,
    genAwards,
    sportsAwards,
    genAffiliations,
    sportsAffiliation,
    genTools,
    sportsTools
  } = state;
  return {
    currentSport,
    degrees,
    sportsDegrees,
    genCertifications,
    certifications,
    genAwards,
    sportsAwards,
    genAffiliations,
    sportsAffiliation,
    genTools,
    sportsTools
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
const BiographyPage = connect(mapStateToProps, mapDispatchToProps)(translate(BiographyRelation));
export default BiographyPage;
