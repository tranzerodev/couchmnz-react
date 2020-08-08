import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import Autosuggest from 'react-autosuggest';

function getSuggestionValue(suggestion) {
  return suggestion;
}
function renderSuggestion(suggestion) {
  return (
    <span id={suggestion.id}>{suggestion.name}</span>
  );
}
const getSuggestions = (list, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : list.filter(item =>
    item.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

class AutoSuggetion extends Component {
  constructor(props) {
    super(props);
    this.state = {suggestions: []};
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  handleSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(this.props.list, value)
    });
  };
  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onFocus() {
    return true;
  }

  render() {
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        getSuggestionValue={getSuggestionValue}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestion={renderSuggestion}
        inputProps={{...this.props.inputProps, type: 'search', autoComplete: "none"}}
        shouldRenderSuggestions={this.onFocus}
        onSuggestionSelected={this.props.onSelectSuggetion}
        onSuggestionHighlighted={this.props.onSuggestionHighlighted}
      />
    );
  }
  static get propTypes() {
    return {
      list: PropTypes.array.isRequired,
      inputProps: PropTypes.object.isRequired,
      onSelectSuggetion: PropTypes.func.isRequired,
      onSuggestionHighlighted: PropTypes.func.isRequired
    };
  }
}

const AutoSuggetionBox = connect()(translate(AutoSuggetion));
export default AutoSuggetionBox;
