import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import AutoSuggetion from '../../../../common/AutoSuggetion/AutoSuggetion';

class BiographyCertification extends Component {
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
    const {biography, p, submit, validation} = this.props;
    const {certificateName} = biography;
    const certificationInput = {
      value: (certificateName) ? certificateName : '',
      onChange: this.props.onChange,
      placeholder: p.t('Biography.typeCertification')
    };
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className={submit && validation.valid === false && validation.name === false ? 'field-holder error' : 'field-holder'}>
            <label>{p.t('Biography.certificationName')}</label>
            <div className="uk-autocomplete cl-sd-degreeDropdownhead">
              <AutoSuggetion inputProps={certificationInput} list={this.props.list} onSelectSuggetion={this.props.onSelectSuggetion} onSuggestionHighlighted={this.props.onSuggestionHighlighted}/>
              <div className="uk-dropdown" aria-expanded="false"/>
            </div>
            <span className="error-text">{p.t('Biography.validation_messages.certification')}</span>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelectSuggetion: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
      onSuggestionHighlighted: PropTypes.func.isRequired,
      list: PropTypes.array.isRequired,
      biography: PropTypes.object.isRequired,
      submit: PropTypes.bool.isRequired,
      validation: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = (/* state */) => {
  return {};
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};
const BiographyCertificationComponent = connect(mapStateToProps, mapDispatchToProps)(translate(BiographyCertification));
export default BiographyCertificationComponent;
