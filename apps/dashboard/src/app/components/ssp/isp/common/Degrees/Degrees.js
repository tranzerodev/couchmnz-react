import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {fetchDegreesList, fetchSportsDegreesList} from '../../../../../actions/index';
import BiographySelector from '../BiographySelector/BiographySelector';
import BiographyRelation from '../BiographyRelation/BiographyRelation';
import BiographyYear from '../BiographyYear/BiographyYear';
import BiographyButton from '../BiographyButton/BiographyButton';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {notNull, isNonEmptyArray} from '../../../../../validators/common/util';
import appConstants from '../../../../../constants/appConstants';
import BiographyAutoComplete from '../BiographyAutoComplete/BiographyAutoComplete';

class Degrees extends Component {
  constructor() {
    super();
    this.state = {
      institutionsList: []
    };
    this.loadSportsDegreesList = this.loadSportsDegreesList.bind(this);
    this.handleSelectDegree = this.handleSelectDegree.bind(this);
    this.handleSelectInstitution = this.handleSelectInstitution.bind(this);
    this.handleHighlightDegree = this.handleHighlightDegree.bind(this);
    this.handleDegreeName = this.handleDegreeName.bind(this);
    this.onInstitutionChange = this.onInstitutionChange.bind(this);
    this.handleHighlightInstitution = this.handleHighlightInstitution.bind(this);
    this.handleInstitutionName = this.handleInstitutionName.bind(this);
    this.fetchInstitutionChildren = this.fetchInstitutionChildren.bind(this);
  }
  componentDidMount() {
    this.loadSportsDegreesList(this.props);
    if (this.props.degreesList.status !== FULFILLED && this.props.degreesList.status !== PENDING && this.props.degreesList.status !== REJECTED) {
      this.props.fetchDegreesList();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.loadSportsDegreesList(nextProps);
  }
  loadSportsDegreesList(props) {
    if (props.currentSport.status === FULFILLED && props.sportsDegreesList.status !== FULFILLED && props.sportsDegreesList.status !== PENDING && props.sportsDegreesList.status !== REJECTED) {
      props.fetchSportsDegreesList(props.currentSport.data.id);
    }
  }
  handleSelectDegree(event, {suggestion}) {
    console.log('suggestion', suggestion);
    this.setState({degreeName: suggestion.name});
    this.props.onSelectDegree(suggestion);
    this.fetchInstitutionChildren(suggestion.institutes);
  }
  handleHighlightDegree({suggestion}) {
    if (suggestion) {
      console.log('suggestion', suggestion);
      const {id, name} = suggestion;
      this.setState({degreeName: name});
      this.props.onSelectDegree({id: notNull(id) ? id : null, name});
      // This.fetchInstitutionChildren(suggestion.name);
    }
  }
  handleDegreeName(e, {newValue}) {
    this.setState({degreeName: newValue});
    this.props.onSelectDegree({id: null, name: newValue});
    // This.fetchInstitutionChildren(newValue);
  }
  onInstitutionChange(event, {suggestion}) {
    const {id, name} = suggestion;
    this.setState({certifierName: name});
    this.props.onSelectInstitution({id, name});
  }
  handleHighlightInstitution({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      this.setState({institutionName: suggestion.name});
      this.props.onSelectInstitution({id: notNull(id) ? id : null, name});
    }
  }
  handleSelectInstitution(event, {suggestion}) {
    const {id, name} = suggestion;
    this.setState({institutionName: suggestion.name});
    this.props.onSelectInstitution({id: notNull(id) ? id : null, name});
  }
  handleInstitutionName(e, {newValue}) {
    this.setState({certifierName: newValue});
    this.props.onSelectInstitution({id: null, name: newValue});
  }
  fetchInstitutionChildren(institutes) {
    this.setState({institutionsList: isNonEmptyArray(institutes) ? institutes : []});
  }
  render() {
    const {biography, type, isSportRelated, sportName, submit, validation, isModified} = this.props;
    const {t} = this.props.p;
    const {name, year, institutionName} = biography;
    const degree = {
      value: (name) ? name : '',
      onChange: this.handleDegreeName,
      placeholder: t('Biography.typeDegree')
    };
    const institute = {
      value: (institutionName) ? institutionName : '',
      onChange: this.handleInstitutionName,
      placeholder: t('Biography.typeInstitution')
    };
    return (
      <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-1-1  uk-width-small-1-1 ">
        <div className="cl-sd-biographyOuter">
          <BiographySelector type={type} biography={biography} onSelectType={this.props.onSelectType}/>
          <BiographyRelation sportName={sportName} isSportRelated={isSportRelated} onSelectRelation={this.props.onSelectRelation}/>

          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div className="cl-sd-borderDesign"/>
            </div>
          </div>

          <BiographyYear year={year} onChangeYear={this.props.onChangeYear} submit={submit} valid={validation.year}/>

          <BiographyAutoComplete
            list={isSportRelated === appConstants.yes ? this.props.sportsDegreesList.data : this.props.degreesList.data}
            onSelect={this.handleSelectDegree}
            onHighlight={this.handleHighlightDegree}
            submit={submit}
            valid={validation.name}
            label={t('Biography.degreeName')}
            inputProps={degree}
            error={t('Biography.validation_messages.degree')}
          />
          <BiographyAutoComplete
            list={this.state.institutionsList}
            onSelect={this.handleSelectInstitution}
            onHighlight={this.handleHighlightInstitution}
            submit={submit}
            valid={validation.institution}
            label={t('Biography.institutionName')}
            inputProps={institute}
            error={t('Biography.validation_messages.institution')}
          />
          <BiographyButton isModified={isModified} onSubmit={this.props.onSubmit}/>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSelectType: PropTypes.func.isRequired,
      biography: PropTypes.object.isRequired,
      type: PropTypes.string.isRequired,
      isSportRelated: PropTypes.string.isRequired,
      onSelectRelation: PropTypes.func.isRequired,
      onChangeYear: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      onSelectInstitution: PropTypes.func.isRequired,
      sportName: PropTypes.string.isRequired,
      sportsDegreesList: PropTypes.object.isRequired,
      degreesList: PropTypes.object.isRequired,
      fetchDegreesList: PropTypes.func.isRequired,
      onSelectDegree: PropTypes.func.isRequired,
      submit: PropTypes.bool.isRequired,
      validation: PropTypes.object.isRequired,
      isModified: PropTypes.bool
    };
  }
}

Degrees.defaultProps = {
  isModified: false
};

const mapStateToProps = state => {
  const {
    sportsList,
    currentSport,
    sportsDegreesList,
    degreesList
  } = state;
  return {
    sportsList,
    currentSport,
    sportsDegreesList,
    degreesList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchDegreesList: () => dispatch(fetchDegreesList()),
    fetchSportsDegreesList: sportID => dispatch(fetchSportsDegreesList(sportID))
  };
};
const DegreesPage = connect(mapStateToProps, mapDispatchToProps)(translate(Degrees));
export default DegreesPage;
