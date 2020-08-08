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
  const temp = inputLength === 0 ? [] : list.filter(item =>
    item.name.toLowerCase().slice(0, inputLength) === inputValue
  );
  if (temp.length) {
    return temp;
  } else if (list.length) {
    return list;
  }
  return [{id: '', name: ''}];
};

class AddNewAutoSuggetion extends Component {
  constructor(props) {
    super(props);
    this.state = {suggestions: []};
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
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
  renderSuggestionsContainer({containerProps, children, query}) {
    return (
      <div {... containerProps}>
        {children}
        <div className="addOne">
          {this.props.cantFind}
        </div>
      </div>
    );
  }

  render() {
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        getSuggestionValue={getSuggestionValue}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestion={renderSuggestion}
        inputProps={this.props.inputProps}
        shouldRenderSuggestions={this.onFocus}
        onSuggestionSelected={this.props.onSelectSuggetion}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        onSuggestionHighlighted={this.props.onSuggestionHighlighted}
      />
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      list: PropTypes.array.isRequired,
      inputProps: PropTypes.object.isRequired,
      onSelectSuggetion: PropTypes.func.isRequired,
      cantFind: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
      onSuggestionHighlighted: PropTypes.func.isRequired
    };
  }
}

AddNewAutoSuggetion.defaultProps = {
};

const mapStateToProps = state => {
  const {
  } = state;
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const AddNewAutoSuggetionInputBox = connect(mapStateToProps, mapDispatchToProps)(translate(AddNewAutoSuggetion));
export default AddNewAutoSuggetionInputBox;
