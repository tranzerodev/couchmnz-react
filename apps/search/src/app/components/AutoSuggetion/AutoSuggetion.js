import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Autosuggest from 'react-autosuggest';

import {DebounceInput} from 'react-debounce-input';
import appConstants from '../../constants/appConstants';

const renderInputComponent = inputProps =>
  (
    <DebounceInput
      {...inputProps}
      ref={null}
      debounceTimeout={appConstants.sportTextDebounceTimeout}
      inputRef={inputProps.ref}
      minLength={1}
    />
  );

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
      suggestions: this.props.list
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
        suggestions={this.props.list}
        getSuggestionValue={this.props.getSuggestionValue}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestion={this.props.renderSuggestion}
        inputProps={this.props.inputProps}
        shouldRenderSuggestions={this.onFocus}
        renderInputComponent={renderInputComponent}
        onSuggestionSelected={this.props.onSuggestionSelected}
      />
    );
  }
  static get propTypes() {
    return {
      list: PropTypes.array.isRequired,
      inputProps: PropTypes.object.isRequired,
      renderSuggestion: PropTypes.func.isRequired,
      onSuggestionSelected: PropTypes.func,
      getSuggestionValue: PropTypes.func.isRequired
    };
  }
}

AutoSuggetion.defaultProps = {
  onSuggestionSelected: () => {}
};

export default AutoSuggetion;
