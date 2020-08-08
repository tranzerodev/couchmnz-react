import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import AutoSuggetion from '../../../../common/AutoSuggetion/AutoSuggetion';

class BiographyAward extends Component {
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
    const {biography, p, validation, submit} = this.props;
    const {name} = biography;
    const awardInput = {
      value: (name) ? name : '',
      onChange: this.props.onChange,
      placeholder: p.t('Biography.typeAward')
    };
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className={submit && validation.valid === false && validation.name === false ? 'field-holder error' : 'field-holder'}>
            <label>{p.t('Biography.awardName')}</label>
            <div className="uk-autocomplete cl-sd-degreeDropdownhead">
              <AutoSuggetion inputProps={awardInput} list={this.props.list} onSelectSuggetion={this.props.onSelectSuggetion} onSuggestionHighlighted={this.props.onSuggestionHighlighted}/>
              <div className="uk-dropdown" aria-expanded="false"/>
            </div>
            <span className="error-text">{p.t('Biography.validation_messages.award')}</span>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelectSuggetion: PropTypes.func.isRequired,
      onSuggestionHighlighted: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
      list: PropTypes.array.isRequired,
      biography: PropTypes.object.isRequired,
      validation: PropTypes.object.isRequired,
      submit: PropTypes.bool.isRequired
    };
  }
}

const mapStateToProps = (/* state */) => {
  return {
  };
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};

const BiographyAwardComponent = connect(mapStateToProps, mapDispatchToProps)(translate(BiographyAward));
export default BiographyAwardComponent;
