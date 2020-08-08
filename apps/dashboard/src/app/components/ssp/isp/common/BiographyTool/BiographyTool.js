import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import AutoSuggetion from '../../../../common/AutoSuggetion/AutoSuggetion';

class BiographyTool extends Component {
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
    const {name} = biography;
    const toolInput = {
      value: (name) ? name : '',
      onChange: this.props.onChange,
      placeholder: 'Type Tool'
    };
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className="field-holder">
            <label>Tool Name</label>
            <div className="uk-autocomplete cl-sd-degreeDropdownhead" data-uk-autocomplete="{source:'../../resources/assets/jsons/autocomplete1.1.json'}">
              <AutoSuggetion inputProps={toolInput} list={this.props.list} onSelectSuggetion={this.props.onSelectSuggetion} onSuggestionHighlighted={this.props.onSuggestionHighlighted}/>
              <div className="uk-dropdown" aria-expanded="false"/>
            </div>
            <span className="error-text">Enter an tool</span>
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
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
const BiographyToolComponent = connect(mapStateToProps, mapDispatchToProps)(translate(BiographyTool));
export default BiographyToolComponent;
