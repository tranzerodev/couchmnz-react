import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {fetchGenAwardsList, fetchSportsList, setSportsAwardsList, fetchGenAwards, fetchSportAwards, fetchGenAccomplishments, fetchSportAccomplishments, fetchSportsAwardsList} from '../../../../../actions/index';
import {AWARDS, ACCOMPLISHMENTS, FULFILLED, REJECTED, PENDING} from '../../../../../constants/ActionTypes';
import BiographySelector from '../BiographySelector/BiographySelector';
import BiographyRelation from '../BiographyRelation/BiographyRelation';
import AwardsAndAccomplishmentsSelector from '../AwardsAndAccomplishmentsSelector/AwardsAndAccomplishmentsSelector';
import BiographyYear from '../BiographyYear/BiographyYear';
import BiographyDescription from '../BiographyDescription/BiographyDescription';
import BiographyButton from '../BiographyButton/BiographyButton';
import notNull, {isNonEmptyArray} from '../../../../../validators/common/util';
import BiographyAutoComplete from '../BiographyAutoComplete';
import appConstants from '../../../../../constants/appConstants';

class AwardsAndAccomplishments extends Component {
  constructor() {
    super();
    this.state = {
      institutionsList: []
    };
    this.handleSelectInstitution = this.handleSelectInstitution.bind(this);
    this.handleHighlightInstitution = this.handleHighlightInstitution.bind(this);
    this.handleInstitutionName = this.handleInstitutionName.bind(this);
    this.findAwardList = this.findAwardList.bind(this);

    this.handleSelectAward = this.handleSelectAward.bind(this);
    this.handleHighlightAward = this.handleHighlightAward.bind(this);
    this.handleAwardName = this.handleAwardName.bind(this);
    this.fetchInstitutionChildren = this.fetchInstitutionChildren.bind(this);
  }
  componentDidMount() {
    this.findAwardList(this.props);
    if (this.props.genAwardsList.status !== FULFILLED && this.props.genAwardsList.status !== PENDING && this.props.genAwardsList.status !== REJECTED) {
      this.props.fetchGenAwardsList();
    }
    if (this.props.genAwards.status !== FULFILLED && this.props.genAwards.status !== PENDING && this.props.genAwards.status !== REJECTED) {
      if (this.props.profile.status === FULFILLED) {
        this.props.fetchGenAwards({profileID: this.props.profile.data.profile.id});
      }
    }
    if (this.props.currentSport.status === FULFILLED && this.props.sportsAwards.status !== FULFILLED && this.props.sportsAwards.status !== PENDING && this.props.sportsAwards.status !== REJECTED) {
      this.props.fetchSportAwards({profileID: this.props.profile.data.profile.id, sportID: this.props.currentSport.data.id});
    }
    if (this.props.genAccomplishments.status !== FULFILLED && this.props.genAwards.status !== PENDING && this.props.genAccomplishments.status !== REJECTED) {
      if (this.props.profile.status === FULFILLED) {
        this.props.fetchGenAccomplishments({profileID: this.props.profile.data.profile.id});
      }
    }
    if (this.props.currentSport.status === FULFILLED && this.props.sportsAccomplishment.status !== FULFILLED && this.props.sportsAccomplishment.status !== PENDING && this.props.sportsAccomplishment.status !== REJECTED) {
      this.props.fetchSportAccomplishments({profileID: this.props.profile.data.profile.id, sportID: this.props.currentSport.data.id});
    }
  }
  findAwardList(nexProps) {
    if (nexProps.sportsAwardsList.status !== FULFILLED && nexProps.sportsAwardsList.status !== PENDING && nexProps.sportsAwardsList.status !== REJECTED) {
      if (nexProps.sportsList.status !== FULFILLED && nexProps.sportsList.status !== PENDING && nexProps.sportsList.status !== REJECTED) {
        this.props.fetchSportsList();
      } else {
        const index = this.props.sportsList.data.findIndex(sport => sport.id === nexProps.currentSport.data.id);
        if (index >= 0) {
          this.props.fetchSportsAwardsList({sportID: nexProps.currentSport.data.id});
        }
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.findAwardList(nextProps);
    if (this.props.profile.status === PENDING && nextProps.profile.status === FULFILLED) {
      this.props.fetchGenAwards({profileID: nextProps.profile.data.profile.id});
      this.props.fetchGenAccomplishments({profileID: nextProps.profile.data.profile.id});
    }
    if (this.props.currentSport.status === PENDING && nextProps.currentSport.status === FULFILLED) {
      this.props.fetchSportAwards({profileID: nextProps.profile.data.profile.id, sportID: nextProps.currentSport.data.id});
      this.props.fetchSportAccomplishments({profileID: nextProps.profile.data.profile.id, sportID: nextProps.currentSport.data.id});
    }
  }
  handleSelectAward(event, {suggestion}) {
    this.setState({awardName: suggestion.name});
    this.props.onSelectAward(suggestion);
    this.fetchInstitutionChildren(suggestion.institutes);
  }
  handleHighlightAward({suggestion}) {
    if (suggestion) {
      const {id, name} = suggestion;
      this.setState({awardName: name});
      this.props.onSelectAward({id: notNull(id) ? id : null, name: suggestion.name});
      // This.fetchInstitutionChildren(name);
    }
  }
  handleAwardName(e, {newValue}) {
    this.setState({awardName: newValue});
    this.props.onSelectAward({id: null, name: newValue});
    // This.fetchInstitutionChildren(newValue);
  }
  handleSelectInstitution(event, {suggestion}) {
    const {id, name} = suggestion;
    this.setState({institutionName: suggestion.name});
    this.props.onSelectInstitution({id: notNull(id) ? id : null, name});
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

  fetchInstitutionChildren(institutes) {
    this.setState({institutionsList: isNonEmptyArray(institutes) ? institutes : []});
  }

  render() {
    const {biography, type, subType, isSportRelated, submit, validation, sportName, isModified} = this.props;
    const {t} = this.props.p;
    const {name, year, description, institutionName} = biography;
    const institute = {
      value: (institutionName) ? institutionName : '',
      onChange: this.handleInstitutionName,
      placeholder: t('Biography.typeInstitution')
    };
    const award = {
      value: (name) ? name : '',
      onChange: this.handleAwardName,
      placeholder: t('Biography.typeAward')
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

          <AwardsAndAccomplishmentsSelector subType={subType} onSelectSubType={this.props.onSelectSubType}/>

          {subType && <BiographyYear subType={subType} year={year} onChangeYear={this.props.onChangeYear} submit={submit} valid={validation.year}/>}

          {subType === ACCOMPLISHMENTS && <BiographyDescription description={description} onChangeDescription={this.props.onChangeDescription} submit={submit} valid={validation.description}/>}

          {subType === AWARDS && (
            <BiographyAutoComplete
              list={isSportRelated === appConstants.yes ? this.props.sportsAwardsList.data : this.props.genAwardsList.data}
              onSelect={this.handleSelectAward}
              onHighlight={this.handleHighlightAward}
              submit={submit}
              valid={validation.name}
              label={t('Biography.awardName')}
              inputProps={award}
              error={t('Biography.validation_messages.award')}
            />
          )
          }
          {subType === AWARDS && (
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
          )}
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
      subType: PropTypes.string.isRequired,
      isSportRelated: PropTypes.string.isRequired,
      genAwardsList: PropTypes.object,
      fetchGenAwardsList: PropTypes.func.isRequired,
      sportsAwardsList: PropTypes.object,
      fetchSportsList: PropTypes.func.isRequired,
      currentSport: PropTypes.object.isRequired,
      sportsList: PropTypes.object.isRequired,
      fetchSportsAwardsList: PropTypes.func.isRequired,
      onSelectAward: PropTypes.func.isRequired,
      onSelectInstitution: PropTypes.func.isRequired,
      onSelectSubType: PropTypes.func.isRequired,
      onChangeDescription: PropTypes.func.isRequired,
      onSelectRelation: PropTypes.func.isRequired,
      onChangeYear: PropTypes.func.isRequired,
      genAwards: PropTypes.object.isRequired,
      sportsAwards: PropTypes.object.isRequired,
      genAccomplishments: PropTypes.object.isRequired,
      sportsAccomplishment: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,
      fetchGenAwards: PropTypes.func.isRequired,
      fetchGenAccomplishments: PropTypes.func.isRequired,
      fetchSportAwards: PropTypes.func.isRequired,
      fetchSportAccomplishments: PropTypes.func.isRequired,
      submit: PropTypes.bool.isRequired,
      validation: PropTypes.object.isRequired,
      onSubmit: PropTypes.func.isRequired,
      sportName: PropTypes.string.isRequired,
      isModified: PropTypes.bool
    };
  }
}

AwardsAndAccomplishments.defaultProps = {
  genAwardsList: {data: []},
  sportsAwardsList: {data: []},
  isModified: false
};

const mapStateToProps = state => {
  const {
    currentSport,
    genAwards,
    genAccomplishments,
    sportsAwards,
    sportsAccomplishment,
    genAwardsList,
    sportsAwardsList,
    sportsList,
    profile
  } = state;
  return {
    currentSport,
    genAwards,
    genAccomplishments,
    sportsAwards,
    sportsAccomplishment,
    genAwardsList,
    sportsAwardsList,
    sportsList,
    profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchGenAwardsList: () => dispatch(fetchGenAwardsList()),
    fetchGenAwards: ({profileID}) => dispatch(fetchGenAwards({profileID})),
    fetchSportAwards: ({profileID, sportID}) => dispatch(fetchSportAwards({profileID, sportID})),
    fetchGenAccomplishments: ({profileID}) => dispatch(fetchGenAccomplishments({profileID})),
    fetchSportAccomplishments: ({profileID, sportID}) => dispatch(fetchSportAccomplishments({profileID, sportID})),
    fetchSportsList: () => dispatch(fetchSportsList()),
    setSportsAwardsList: data => dispatch(setSportsAwardsList(data)),
    fetchSportsAwardsList: data => dispatch(fetchSportsAwardsList(data))
  };
};
const AwardsAndAccomplishmentsComponent = connect(mapStateToProps, mapDispatchToProps)(translate(AwardsAndAccomplishments));
export default AwardsAndAccomplishmentsComponent;
