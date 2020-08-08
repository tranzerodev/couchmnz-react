import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {fetchSportsAffiliationsList, fetchAffiliationsList} from '../../../../../actions/index';
import BiographySelector from '../BiographySelector/BiographySelector';
import BiographyRelation from '../BiographyRelation/BiographyRelation';
import BiographyButton from '../BiographyButton/BiographyButton';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';
import BiographyAutoComplete from '../BiographyAutoComplete/BiographyAutoComplete';

class Affiliations extends Component {
  constructor() {
    super();
    this.state = {};
    this.findAffiliationsList = this.findAffiliationsList.bind(this);
    this.handleSelectOrganization = this.handleSelectOrganization.bind(this);
    this.handleHighlightOrganization = this.handleHighlightOrganization.bind(this);
    this.handleOrganizationName = this.handleOrganizationName.bind(this);
  }
  componentDidMount() {
    this.findAffiliationsList(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.findAffiliationsList(nextProps);
  }
  findAffiliationsList(nexProps) {
    if (nexProps.genAffiliationsList.status !== FULFILLED && nexProps.genAffiliationsList.status !== PENDING && nexProps.genAffiliationsList.status !== REJECTED) {
      nexProps.fetchAffiliationsList();
    }
    if (nexProps.currentSport.status === FULFILLED && nexProps.sportsAffiliationsList.status !== FULFILLED && nexProps.sportsAffiliationsList.status !== PENDING && nexProps.sportsAffiliationsList.status !== REJECTED) {
      nexProps.fetchSportsAffiliationsList(nexProps.currentSport.data.id);
    }
  }
  handleSelectOrganization(event, {suggestion}) {
    const {name} = suggestion;
    this.setState({name});
    this.props.onSelectOrganization(suggestion);
  }
  handleHighlightOrganization({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      this.setState({name});
      this.props.onSelectOrganization({id, name});
    }
  }
  handleOrganizationName(e, {newValue}) {
    this.setState({name: newValue});
    this.props.onSelectOrganization({name: newValue});
  }
  render() {
    const {biography, type, isSportRelated, sportName, submit, validation, isModified} = this.props;
    const {name} = biography;
    const {t} = this.props.p;
    const organization = {
      value: (name) ? name : '',
      onChange: this.handleOrganizationName,
      placeholder: t('Biography.typeOrganization')
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

          <BiographyAutoComplete
            list={isSportRelated === appConstants.yes ? this.props.sportsAffiliationsList.data : this.props.genAffiliationsList.data}
            onSelect={this.handleSelectOrganization}
            onHighlight={this.handleHighlightOrganization}
            submit={submit}
            valid={validation.name}
            label={t('Biography.organizationName')}
            inputProps={organization}
            error={t('Biography.validation_messages.organization')}
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
      genAffiliationsList: PropTypes.object,
      isSportRelated: PropTypes.string.isRequired,
      // FetchAffiliationsList: PropTypes.func.isRequired,
      sportsAffiliationsList: PropTypes.object,
      // FetchSportsAffiliationsList: PropTypes.func.isRequired,
      // CurrentSport: PropTypes.object.isRequired,
      onSelectOrganization: PropTypes.func.isRequired,
      onSelectRelation: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      sportName: PropTypes.string.isRequired,
      submit: PropTypes.bool.isRequired,
      validation: PropTypes.object.isRequired,
      isModified: PropTypes.bool
    };
  }
}

Affiliations.defaultProps = {
  genAffiliationsList: {data: []},
  sportsAffiliationsList: {data: [], status: null},
  isModified: false
};

const mapStateToProps = state => {
  const {
    genAffiliationsList,
    sportsAffiliationsList,
    currentSport
  } = state;
  return {
    genAffiliationsList,
    sportsAffiliationsList,
    currentSport
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchAffiliationsList: () => dispatch(fetchAffiliationsList()),
    fetchSportsAffiliationsList: sportID => dispatch(fetchSportsAffiliationsList(sportID))
  };
};
const AffiliationsPage = connect(mapStateToProps, mapDispatchToProps)(translate(Affiliations));
export default AffiliationsPage;
