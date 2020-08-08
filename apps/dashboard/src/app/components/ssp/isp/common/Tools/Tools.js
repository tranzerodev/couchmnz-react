import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {fetchGenToolsList, fetchSportsToolsList, fetchGenCertificationList, fetchSportsCertificationsList} from '../../../../../actions/index';
import BiographySelector from '../BiographySelector/BiographySelector';
import BiographyRelation from '../BiographyRelation/BiographyRelation';
import BiographyButton from '../BiographyButton/BiographyButton';
import {FULFILLED, PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {notNull, isNonEmptyArray} from '../../../../../validators/common/util';
import appConstants from '../../../../../constants/appConstants';
import BiographyAutoComplete from '../BiographyAutoComplete/BiographyAutoComplete';

class Tools extends Component {
  constructor() {
    super();
    this.state = {};
    this.findToolsList = this.findToolsList.bind(this);
    this.handleSelectTool = this.handleSelectTool.bind(this);
    this.handleHighlightTool = this.handleHighlightTool.bind(this);
    this.handleToolName = this.handleToolName.bind(this);

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
    this.findToolsList(this.props);
    if (this.props.genToolsList.status !== FULFILLED && this.props.genToolsList.status !== PENDING && this.props.genToolsList.status !== REJECTED) {
      this.props.fetchGenToolsList();
    }
    this.loadSportsCertificationsList(this.props);
    if (this.props.genCertificationsList.status !== FULFILLED && this.props.genCertificationsList.status !== PENDING && this.props.genCertificationsList.status !== REJECTED) {
      this.props.fetchGenCertificationList();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.findToolsList(nextProps);
    this.loadSportsCertificationsList(nextProps);
  }
  findToolsList(nexProps) {
    if (nexProps.currentSport.status === FULFILLED && nexProps.sportsToolsList.status !== FULFILLED && nexProps.sportsToolsList.status !== PENDING && nexProps.sportsToolsList.status !== REJECTED) {
      nexProps.fetchSportsToolsList(nexProps.currentSport.data.id);
    }
  }
  handleSelectTool(event, {suggestion}) {
    this.setState({toolName: suggestion.name});
    this.props.onSelectTool(suggestion);
  }
  handleHighlightTool({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      this.setState({toolName: name});
      this.props.onSelectTool({id, name});
    }
  }
  handleToolName(e, {newValue}) {
    this.setState({toolName: newValue});
    this.props.onSelectTool({id: null, name: newValue});
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
    this.fetchInstitutionChildren(suggestion.institutes);
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
    this.props.onSelectCertification({id: null, name: newValue});
    // This.fetchInstitutionChildren(newValue);
  }
  handleSelectInstitution(event, {suggestion}) {
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
  handleInstitutionName(e, {newValue}) {
    this.setState({certifierName: newValue});
    this.props.onSelectInstitution({id: null, name: newValue});
  }
  fetchInstitutionChildren(institutions) {
    this.setState({institutionsList: isNonEmptyArray(institutions) ? institutions : []});
  }

  render() {
    const {biography, type, isSportRelated, submit, validation, isModified, sportName} = this.props;
    const {t} = this.props.p;
    const {name, isCertified, institutionName, certificateName} = biography;
    const tool = {
      value: (name) ? name : '',
      onChange: this.handleToolName,
      placeholder: t('Biography.typeTool')
    };
    const certification = {
      value: (certificateName) ? certificateName : '',
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
          <BiographySelector type={type} onSelectType={this.props.onSelectType}/>
          <BiographyRelation sportName={sportName} isSportRelated={isSportRelated} onSelectRelation={this.props.onSelectRelation}/>

          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <div className="cl-sd-borderDesign"/>
            </div>
          </div>

          {/* <CertificationSelector isCertified={isCertified} onSelect={this.props.onSelectCertified}/> */}

          <BiographyAutoComplete
            list={isSportRelated === appConstants.yes ? this.props.sportsToolsList.data : this.props.genToolsList.data}
            onSelect={this.handleSelectTool}
            onHighlight={this.handleHighlightTool}
            submit={submit}
            valid={validation.name}
            label={t('Biography.toolName')}
            inputProps={tool}
            error={t('Biography.validation_messages.tool')}
          />

          {isCertified === appConstants.yes &&
            <BiographyAutoComplete
              list={isSportRelated === appConstants.yes ? this.props.sportsCertificationsList.data : this.props.genCertificationsList.data}
              onSelect={this.handleSelectCertification}
              onHighlight={this.handleHighlightCertification}
              submit={submit}
              valid={validation.certificate}
              label={t('Biography.certificationName')}
              inputProps={certification}
              error={t('Biography.validation_messages.certification')}
            />
          }
          {isCertified === appConstants.yes &&
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
          }

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
      genToolsList: PropTypes.object,
      sportsToolsList: PropTypes.object,
      fetchGenToolsList: PropTypes.func.isRequired,
      genCertificationsList: PropTypes.object.isRequired,
      onSelectCertification: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      fetchGenCertificationList: PropTypes.func.isRequired,
      onSelectTool: PropTypes.func.isRequired,
      onSelectInstitution: PropTypes.func.isRequired,
      isSportRelated: PropTypes.string.isRequired,
      sportsCertificationsList: PropTypes.object.isRequired,
      onSelectRelation: PropTypes.func.isRequired,
      submit: PropTypes.bool.isRequired,
      validation: PropTypes.object.isRequired,
      sportName: PropTypes.string.isRequired,
      isModified: PropTypes.bool
      // FetchSportsToolsList: PropTypes.func.isRequired,
      // CurrentSport: PropTypes.object.isRequired
    };
  }
}

Tools.defaultProps = {
  genToolsList: {data: [], status: null},
  sportsToolsList: {data: [], status: null},
  isModified: false
};

const mapStateToProps = state => {
  const {
    currentSport,
    genTools,
    sportsTools,
    sportsToolsList,
    sportsList,
    genCertifications,
    certifications,
    sportsCertificationsList,
    genCertificationsList
  } = state;
  return {
    currentSport,
    genTools,
    sportsTools,
    sportsToolsList,
    sportsList,
    genCertifications,
    certifications,
    sportsCertificationsList,
    genCertificationsList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchGenToolsList: () => dispatch(fetchGenToolsList()),
    fetchSportsToolsList: sportID => dispatch(fetchSportsToolsList(sportID)),
    fetchGenCertificationList: () => dispatch(fetchGenCertificationList()),
    fetchSportsCertificationsList: sportID => dispatch(fetchSportsCertificationsList(sportID))
  };
};
const ToolsPage = connect(mapStateToProps, mapDispatchToProps)(translate(Tools));
export default ToolsPage;
