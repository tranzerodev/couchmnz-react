import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import CantFind from '../CantFind/CantFind';
import AutoSuggetion from '../../../../common/AutoSuggetion/AutoSuggetion';

class AwardsAndAccomplishments extends Component {
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
  renderCantFindInstitution() {
    return (
      <CantFind handleAddNewModal={this.onCantFindInstitutionClick}/>
    );
  }
  onCantFindInstitutionClick() {
    this.setState({isAddNewInstitutionModalOpen: true});
    this.onModalClose();
  }
  onAddNewInstitutionModalClose() {
    this.setState({isAddNewInstitutionModalOpen: false});
  }
  render() {
    const {biography, p, validation, submit} = this.props;
    const {institutionName} = biography;
    const institutionInput = {
      value: (institutionName) ? institutionName : '',
      onChange: this.props.onChange,
      placeholder: p.t('Biography.typeInstitution')
    };
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <div className={submit && validation.valid === false && validation.institution === false ? 'field-holder error' : 'field-holder'}>
            <label>{p.t('Biography.institutionName')}</label>
            <div className="uk-autocomplete cl-sd-degreeDropdownhead">
              <AutoSuggetion inputProps={institutionInput} list={this.props.list} onSelectSuggetion={this.props.onSelectSuggetion} onSuggestionHighlighted={this.props.onSuggestionHighlighted}/>
            </div>
            <span className="error-text">{p.t('Biography.validation_messages.institution')}</span>
          </div>
        </div>
        {/* <AddNewInstitution textKey="AddNewInstitution" handleClose={this.onAddNewInstitutionModalClose} isModalOpen={this.state.isAddNewInstitutionModalOpen} sportsSpecific={false}/> */}
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
const BiographyPage = connect(mapStateToProps, mapDispatchToProps)(translate(AwardsAndAccomplishments));
export default BiographyPage;
