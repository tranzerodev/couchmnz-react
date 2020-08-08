import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import AutoSuggetion from '../../../../common/AutoSuggetion/AutoSuggetion';

class BiographyAutoComplete extends Component {
  render() {
    const {valid, submit, inputProps, label, error} = this.props;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className={submit && valid === false ? 'field-holder error' : 'field-holder'}>
            <label>{label}</label>
            <div className="uk-autocomplete cl-sd-degreeDropdownhead">
              <AutoSuggetion inputProps={inputProps} list={this.props.list} onSelectSuggetion={this.props.onSelect}/>
              <div className="uk-dropdown" aria-expanded="false"/>
            </div>
            <span className="error-text">{error}</span>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      onSelect: PropTypes.func.isRequired,
      // OnHighlight: PropTypes.func.isRequired,
      list: PropTypes.array,
      submit: PropTypes.bool.isRequired,
      valid: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      inputProps: PropTypes.object.isRequired,
      error: PropTypes.string.isRequired
    };
  }
}

BiographyAutoComplete.defaultProps = {
  list: []
};

const mapStateToProps = (/* state */) => {
  return {
  };
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};

const AutoCompleteComponent = connect(mapStateToProps, mapDispatchToProps)(translate(BiographyAutoComplete));
export default AutoCompleteComponent;
