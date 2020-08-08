import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {fetchGenCertificationList, fetchSportsCertificationsList} from '../../../../../actions/index';
import BiographySelector from '../BiographySelector/BiographySelector';
import BiographyRelation from '../BiographyRelation/BiographyRelation';
import BiographyYear from '../BiographyYear/BiographyYear';
import BiographyButton from '../BiographyButton/BiographyButton';
import {notNull, isNonEmptyArray} from '../../../../../validators/common/util';
import {FULFILLED, REJECTED, PENDING} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';
import BiographyAutoComplete from '../BiographyAutoComplete/BiographyAutoComplete';

class Certifications extends Component {
  constructor() {
    super();
    this.state = {
      institutionsList: []
    };
    this.handleSelectCertification = this.handleSelectCertification.bind(this);
    this.handleHighlightCertification = this.handleHighlightCertification.bind(this);
    this.handleCertificationName = this.handleCertificationName.bind(this);
    this.handleSelectInstitution = this.handleSelectInstitution.bind(this);
    this.handleHighlightInstitution = this.handleHighlightInstitution.bind(this);
    this.handleInstitutionName = this.handleInstitutionName.bind(this);
    this.fetchInstitutionChildren = this.fetchInstitutionChildren.bind(this);
    this.loadSportsCertificationsList = this.loadSportsCertificationsList.bind(this);
  }
  componentDidMount() {
    this.loadSportsCertificationsList(this.props);
    if (this.props.genCertificationsList.status !== FULFILLED && this.props.genCertificationsList.status !== PENDING && this.props.genCertificationsList.status !== REJECTED) {
      this.props.fetchGenCertificationList();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.loadSportsCertificationsList(nextProps);
  }
  loadSportsCertificationsList(props) {
    if (props.currentSport.status === FULFILLED && props.sportsCertificationsList.status !== FULFILLED && props.sportsCertificationsList.status !== PENDING && props.sportsCertificationsList.status !== REJECTED) {
      props.fetchSportsCertificationsList(props.currentSport.data.id);
    }
  }
  handleSelectCertification(event, {suggestion}) {
    console.log('suggestion', suggestion);
    this.setState({certificationName: suggestion.name});
    this.props.onSelectCertification(suggestion);
    this.fetchInstitutionChildren(suggestion);
  }
  handleHighlightCertification({suggestion}) {
    if (suggestion) {
      console.log('suggestion', suggestion);
      const {id, name} = suggestion;
      this.setState({certificationName: suggestion.name});
      this.props.onSelectCertification({id: notNull(id) ? id : null, name});
      // This.fetchInstitutionChildren(suggestion.name);
    }
  }
  handleCertificationName(e, {newValue}) {
    this.setState({certificationName: newValue});
    this.props.onSelectCertification({name: newValue});
    // This.fetchInstitutionChildren(newValue);
  }
  handleSelectInstitution(event, {suggestion}) {
    const {id, name} = suggestion;
    this.setState({institutionName: name});
    this.props.onSelectInstitution({id, name});
  }
  handleHighlightInstitution({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      this.setState({institutionName: suggestion.name});
      this.props.onSelectInstitution({id: notNull(id) ? id : null, name});
    }
  }
  handleInstitutionName(e, {newValue}) {
    this.setState({institutionName: newValue});
    this.props.onSelectInstitution({id: null, name: newValue});
  }
  fetchInstitutionChildren(certification) {
    this.setState({institutionsList: isNonEmptyArray(certification.institutes) ? certification.institutes : []});
  }

  render() {
    const {biography, type, isSportRelated, sportName, submit, validation, isModified} = this.props;
    const {t} = this.props.p;
    const {name, year, institutionName} = biography;
    const certification = {
      value: (name) ? name : '',
      onChange: this.handleCertificationName,
      placeholder: t('Biography.typeCertification')
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
            list={isSportRelated === appConstants.yes ? this.props.sportsCertificationsList.data : this.props.genCertificationsList.data}
            onSelect={this.handleSelectCertification}
            onHighlight={this.handleHighlightCertification}
            submit={submit}
            valid={validation.name}
            label={t('Biography.certificationName')}
            inputProps={certification}
            error={t('Biography.validation_messages.certification')}
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
      sportsCertificationsList: PropTypes.object.isRequired,
      genCertificationsList: PropTypes.object.isRequired,
      fetchGenCertificationList: PropTypes.func.isRequired,
      onSelectCertification: PropTypes.func.isRequired,
      submit: PropTypes.bool.isRequired,
      validation: PropTypes.object.isRequired,
      isModified: PropTypes.bool
    };
  }
}

Certifications.defaultProps = {
  isModified: false
};

const mapStateToProps = state => {
  const {currentSport,
    genCertifications,
    certifications,
    sportsCertificationsList,
    genCertificationsList
  } = state;
  return {
    currentSport,
    genCertifications,
    certifications,
    sportsCertificationsList,
    genCertificationsList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchGenCertificationList: () => dispatch(fetchGenCertificationList()),
    fetchSportsCertificationsList: sportID => dispatch(fetchSportsCertificationsList(sportID))
  };
};
const CertificationsPage = connect(mapStateToProps, mapDispatchToProps)(translate(Certifications));
export default CertificationsPage;
