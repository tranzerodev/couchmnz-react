import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import BiographyForm from '../BiographyForm';
import {saveSportAward, saveGenAward, saveSportAccomplishment, saveGenAccomplishment, saveGenDegree, saveSportDegree, saveSportCertification, saveGenCertification, saveSportAffiliation, saveGenAffiliation, saveSportExperience, saveGenExperience, saveSportTool, saveGenTool, deleteSportAward, deleteGenAward, deleteSportAccomplishment, deleteGenAccomplishment, deleteSportDegree, deleteGenDegree, deleteSportCertification, deleteGenCertification, deleteSportAffiliation, deleteGenAffiliation, deleteSportExperience, deleteGenExperience, deleteSportTool, deleteGenTool, fetchSportExperienceYear, saveSportExperienceYear} from '../../../../../actions/index';
import BiographyDetails from '../BiographyDetails/BiographyDetails';
import {AWARDS, ACCOMPLISHMENTS, CERTIFICATIONS, DEGREES, AFFILIATIONS, EXPERIENCE, TOOLS, FULFILLED, PENDING, PLAYING_EXPERIENCE, COACHING_EXPERIENCE} from '../../../../../constants/ActionTypes';
import Modal from '../../../../common/Modal';
import accomplishment from '../../../../../validators/ssp/isp/common/accomplishment';
import affiliation from '../../../../../validators/ssp/isp/common/affiliation';
import award from '../../../../../validators/ssp/isp/common/award';
import certification from '../../../../../validators/ssp/isp/common/certification';
import degree from '../../../../../validators/ssp/isp/common/degree';
import experience from '../../../../../validators/ssp/isp/common/experience';
// Import experienceYear from '../../../../../validators/ssp/isp/common/experienceYear';
import tool from '../../../../../validators/ssp/isp/common/tool';
import {notNull, isNonEmptyArray, notEmpty} from '../../../../../validators/common/util';
import appConstants from '../../../../../constants/appConstants';
import ExampleModal from '../../dashboard/ExampleModal/ExampleModal';
import {SAMPLE_BIOGRAPHY} from '../../../../../constants/assetsPaths';
import ExperienceDetails from '../ExperienceDetails/ExperienceDetails';

const {experienceLimit} = appConstants;

class Biography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: AWARDS,
      subType: AWARDS,
      biography: appConstants.biography.initialState.award,
      isSportRelated: appConstants.yes,
      sportName: props.currentSport.status === FULFILLED ? props.currentSport.data.name : 'Sports',
      isModified: false,
      showModal: false,
      newType: AWARDS,
      submit: false,
      playingExperience: 0,
      coachingExperience: 0,
      experienceType: appConstants.sportExperience.coaching,
      isPlayingExperienceUpdated: false,
      isCoachingExperienceUpdated: false,
      itemToDelete: {},
      itemToEdit: {},
      showDeleteModal: false,
      showEditModal: false,
      dataType: '',
      isModalOpen: false
    };
    this.handleType = this.handleType.bind(this);
    this.handleSubType = this.handleSubType.bind(this);
    this.handleRelation = this.handleRelation.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleInstitution = this.handleInstitution.bind(this);
    this.handleCertification = this.handleCertification.bind(this);
    this.handleDegree = this.handleDegree.bind(this);
    this.handleExperience = this.handleExperience.bind(this);
    this.handleExperienceType = this.handleExperienceType.bind(this);
    this.handleAward = this.handleAward.bind(this);
    this.handleTool = this.handleTool.bind(this);
    this.handleOrganization = this.handleOrganization.bind(this);
    this.handleBiographyType = this.handleBiographyType.bind(this);

    this.handleEditPopup = this.handleEditPopup.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleLoadBiography = this.handleLoadBiography.bind(this);

    this.handleCertified = this.handleCertified.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveBiography = this.handleSaveBiography.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleContentType = this.handleContentType.bind(this);
    this.handleObject = this.handleObject.bind(this);
    this.handleDeleteBiography = this.handleDeleteBiography.bind(this);
    this.handlePlayingExperience = this.handlePlayingExperience.bind(this);
    this.handleCoachingExperience = this.handleCoachingExperience.bind(this);
    this.handlePlayingExperienceBlur = this.handlePlayingExperienceBlur.bind(this);
    this.handleCoachingExperienceBlur = this.handleCoachingExperienceBlur.bind(this);

    this.handleDeletePopup = this.handleDeletePopup.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleDataType = this.handleDataType.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSampleModal = this.handleSampleModal.bind(this);
    this.checkModified = this.checkModified.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.currentSport.status === FULFILLED) {
      this.setState({sportName: this.props.currentSport.data.name});
      this.props.fetchSportExperienceYear({profileID: this.props.profile.data.profile.id, sportID: this.props.currentSport.data.id});
    }
  }
  componentWillUnmount() {
    // Console.log('===========state========', this.state);
    // const {coachingExperience, playingExperience} = this.state;
    // const profileID = this.props.profile.data.profile.id;
    // const sportID = this.props.currentSport.data.id;
    // if (this.state.isPlayingExperienceUpdated) {
    //   this.props.saveSportExperienceYear({type: appConstants.sportExperience.playing, year: playingExperience}, {profileID, sportID});
    // }
    // if (this.state.isCoachingExperienceUpdated) {
    //   this.props.saveSportExperienceYear({type: appConstants.sportExperience.coaching, year: coachingExperience}, {profileID, sportID});
    // }
  }
  componentWillReceiveProps(nextProps) {
    if (((this.props.currentSport.status === PENDING || this.props.currentSport.status === null) && nextProps.currentSport.status === FULFILLED) ||
      ((this.props.profile.status === PENDING || this.props.profile.status === null) && this.props.profile.status === FULFILLED)) {
      if (nextProps.currentSport.status === FULFILLED && nextProps.profile.status === FULFILLED) {
        this.props.fetchSportExperienceYear({profileID: this.props.profile.data.profile.id, sportID: nextProps.currentSport.data.id});
      }
    }
    if ((this.props.currentSport.status === PENDING || this.props.currentSport.status === null) && nextProps.currentSport.status === FULFILLED) {
      this.setState({sportName: nextProps.currentSport.data.name});
    }
    if (this.props.sportsExperienceYear.status === PENDING && nextProps.sportsExperienceYear.status === FULFILLED) {
      const playingExperience = nextProps.sportsExperienceYear.data.find(e => e.type === appConstants.sportExperience.playing);
      const coachingExperience = nextProps.sportsExperienceYear.data.find(e => e.type === appConstants.sportExperience.coaching);
      this.setState({playingExperience: notNull(playingExperience) ? playingExperience.year : 0, coachingExperience: notNull(coachingExperience) ? coachingExperience.year : 0, isPlayingExperienceUpdated: false, isCoachingExperienceUpdated: false});
    }
  }
  handleUpdate(data) {
    const {biography} = this.state;
    this.setState({
      biography: {
        ...biography,
        ...data
      },
      isModified: true
    });
  }
  handleType(e) {
    const {value} = e.target;
    const {isModified} = this.state;
    if (isModified) {
      this.setState({showModal: true, newType: value});
      return;
    }
    let biography;
    switch (value) {
      case AWARDS: {
        biography = {...appConstants.biography.initialState.award};
        break;
      }
      case ACCOMPLISHMENTS: {
        biography = {...appConstants.biography.initialState.accomplishment};
        break;
      }
      case CERTIFICATIONS: {
        biography = {...appConstants.biography.initialState.certification};
        break;
      }
      case DEGREES: {
        biography = {...appConstants.biography.initialState.degree};
        break;
      }
      case AFFILIATIONS: {
        biography = {...appConstants.biography.initialState.affiliation};
        break;
      }
      case EXPERIENCE: {
        biography = {...appConstants.biography.initialState.experience};
        break;
      }
      case TOOLS: {
        biography = {...appConstants.biography.initialState.tool};
        break;
      }
      default: biography = {...appConstants.biography.initialState.award};
    }
    this.setState({type: value, biography, subType: (value === ACCOMPLISHMENTS || value === AWARDS) ? value : null, submit: false, isModified: false});
    window.scrollTo(0, 0);
  }
  handleContentType(type) {
    let biography;
    switch (type) {
      case AWARDS: {
        biography = {...appConstants.biography.initialState.award};
        break;
      }
      case ACCOMPLISHMENTS: {
        biography = {...appConstants.biography.initialState.accomplishment};
        break;
      }
      case CERTIFICATIONS: {
        biography = {...appConstants.biography.initialState.certification};
        break;
      }
      case DEGREES: {
        biography = {...appConstants.biography.initialState.degree};
        break;
      }
      case AFFILIATIONS: {
        biography = {...appConstants.biography.initialState.affiliation};
        break;
      }
      case EXPERIENCE: {
        biography = {...appConstants.biography.initialState.experience};
        break;
      }
      case PLAYING_EXPERIENCE: {
        biography = {...appConstants.biography.initialState.experience, type: appConstants.sportExperience.playing};
        break;
      }
      case COACHING_EXPERIENCE: {
        biography = {...appConstants.biography.initialState.experience, type: appConstants.sportExperience.coaching};
        break;
      }
      case TOOLS: {
        biography = {...appConstants.biography.initialState.tool};
        break;
      }
      default: biography = {...appConstants.biography.initialState.award};
    }
    this.setState({type: (type === COACHING_EXPERIENCE || type === PLAYING_EXPERIENCE ? EXPERIENCE : type), biography, subType: (type === ACCOMPLISHMENTS || type === AWARDS) ? type : null, submit: false, isModified: false, newType: AWARDS, showModal: false, experienceType: (type === EXPERIENCE || type === PLAYING_EXPERIENCE || type === COACHING_EXPERIENCE ? biography.type : appConstants.sportExperience.playing)});
  }

  checkModified() {
    const {type, biography} = this.state;
    let canShowModal = false;
    switch (type) {
      case AWARDS: {
        canShowModal = this.checkObjectCompare(appConstants.biography.initialState.award, biography);
        break;
      }
      case ACCOMPLISHMENTS: {
        canShowModal = this.checkObjectCompare(appConstants.biography.initialState.accomplishment, biography);
        break;
      }
      case CERTIFICATIONS: {
        canShowModal = this.checkObjectCompare(appConstants.biography.initialState.certification, biography);
        break;
      }
      case DEGREES: {
        canShowModal = this.checkObjectCompare(appConstants.biography.initialState.degree, biography);
        break;
      }
      case AFFILIATIONS: {
        canShowModal = this.checkObjectCompare(appConstants.biography.initialState.affiliation, biography);
        break;
      }
      case EXPERIENCE: {
        canShowModal = this.checkObjectCompare(appConstants.biography.initialState.experience, biography);
        break;
      }
      case PLAYING_EXPERIENCE: {
        canShowModal = this.checkObjectCompare(appConstants.biography.initialState.experience, biography);
        break;
      }
      case COACHING_EXPERIENCE: {
        canShowModal = this.checkObjectCompare(appConstants.biography.initialState.experience, biography);
        break;
      }
      case TOOLS: {
        canShowModal = this.checkObjectCompare(appConstants.biography.initialState.tool, biography);
        break;
      }
      default: canShowModal = false;
    }

    return canShowModal;
  }

  checkObjectCompare(obj1, obj2) {
    const canShowModal = false;
    console.log(Object.keys(obj1));
    for (const key in obj1) {
      if (key) {
        if (obj1[key] !== notEmpty(obj2[key])) {
          return true;
        }
      }
    }
    return canShowModal;
  }

  handleBiographyType(e) {
    const value = e.currentTarget.getAttribute('value');
    const canShowModal = this.checkModified();
    if (canShowModal) {
      this.setState({showModal: true, newType: value});
      return;
    }
    let biography;
    switch (value) {
      case AWARDS: {
        biography = {...appConstants.biography.initialState.award};
        break;
      }
      case ACCOMPLISHMENTS: {
        biography = {...appConstants.biography.initialState.accomplishment};
        break;
      }
      case CERTIFICATIONS: {
        biography = {...appConstants.biography.initialState.certification};
        break;
      }
      case DEGREES: {
        biography = {...appConstants.biography.initialState.degree};
        break;
      }
      case AFFILIATIONS: {
        biography = {...appConstants.biography.initialState.affiliation};
        break;
      }
      case EXPERIENCE: {
        biography = {...appConstants.biography.initialState.experience};
        break;
      }
      case PLAYING_EXPERIENCE: {
        biography = {...appConstants.biography.initialState.experience, type: appConstants.sportExperience.playing};
        break;
      }
      case COACHING_EXPERIENCE: {
        biography = {...appConstants.biography.initialState.experience, type: appConstants.sportExperience.coaching};
        break;
      }
      case TOOLS: {
        biography = {...appConstants.biography.initialState.tool};
        break;
      }
      default: biography = {...appConstants.biography.initialState.award};
    }
    this.setState({type: (value === COACHING_EXPERIENCE || value === PLAYING_EXPERIENCE ? EXPERIENCE : value), biography, subType: (value === ACCOMPLISHMENTS || value === AWARDS) ? value : null, submit: false, isModified: false, experienceType: (value === PLAYING_EXPERIENCE || value === COACHING_EXPERIENCE ? biography.type : null)});
  }
  handleLoadBiography(biography, type, subType, isSportRelated, experienceType) {
    this.setState({biography: experienceType ? {...biography, type: experienceType} : biography, submit: false, type, subType, isModified: false, isSportRelated: isSportRelated ? isSportRelated : appConstants.yes, experienceType: experienceType ? experienceType : appConstants.sportExperience.coachingExperience});
    window.scrollTo(10, 200);
  }
  handleRelation(e) {
    const {value} = e.target;
    const {type, subType} = this.state;
    const {isModified} = this.state;
    if (isModified) {
      this.setState({showModal: true, newType: type, newRelation: value, newSubType: subType});
      return;
    }
    this.setState({isSportRelated: value});
    this.handleContentType(type);
  }
  handleSubType(e) {
    const {value} = e.target;
    let biography;
    const {isModified} = this.state;
    if (isModified) {
      this.setState({showModal: true, newType: value, newSubType: value});
      return;
    }
    switch (value) {
      case AWARDS: {
        biography = {...appConstants.biography.initialState.award};
        break;
      }
      case ACCOMPLISHMENTS: {
        biography = {...appConstants.biography.initialState.accomplishment};
        break;
      }
      default: biography = {...appConstants.biography.initialState.award};
    }
    this.setState({subType: value, biography, submit: false});
  }
  handleYear(e) {
    const {value} = e.target;
    this.handleUpdate({year: parseInt(value, 10)});
  }
  handleDescription(e) {
    const {value} = e.target;
    this.handleUpdate({description: value});
  }
  handleInstitution(institution) {
    // This.handleUpdate({institution});
    const strRegex = '[0-9a-fA-F]+';
    const regEx = new RegExp(strRegex);
    const {id, name} = institution;
    if (institution && institution.id && institution.id.length === 24 && regEx.test(institution.id)) {
      // TODO We should be deleting the old ID
      this.handleUpdate({id: id ? id : null, institutionID: id, institutionName: name});
    } else {
      this.handleUpdate({id: id ? id : null, institutionID: id ? id : null, institutionName: name});
    }
  }
  handleCertification(certification) {
    // This.handleUpdate({certification});
    if (isNonEmptyArray(certification.institutes)) {
      const {id, name} = certification.institutes[0];
      this.handleUpdate({certificateName: certification.name, certificateID: id, institutionID: id, institutionName: name});
    } else {
      this.handleUpdate({certificateName: certification.name, certificateID: null, institutionID: null, institutionName: name});
    }
  }
  handleDegree(degree) {
    // This.handleUpdate({degree});
    this.handleUpdate({name: degree.name});
  }
  handleExperience(e) {
    const {value} = e.target;
    this.handleUpdate({description: value});
  }
  handleExperienceType(e) {
    const {value} = e.target;
    switch (value) {
      case appConstants.sportExperience.playing: {
        this.handleContentType(PLAYING_EXPERIENCE);
        break;
      }
      case appConstants.sportExperience.coaching: {
        this.handleContentType(COACHING_EXPERIENCE);
        break;
      }
      default: this.handleContentType(EXPERIENCE);
    }
    this.setState({experienceType: value});
  }
  handleAward(award) {
    // This.handleUpdate({award});
    this.handleUpdate({name: award.name});
  }
  handleTool(tool) {
    // This.handleUpdate({tool});
    this.handleUpdate({name: tool.name});
  }
  handleOrganization(organization) {
    // This.handleUpdate({organization});
    const {id, name} = organization;
    this.handleUpdate(notNull(id) ? {id, organizationID: id, name} : {name});
  }
  handleCertified(e) {
    const {value} = e.target;
    this.handleUpdate({isCertified: value, certificateID: null, certificateName: null, institutionID: null, institutionName: null});
  }
  handleValidation() {
    const {biography, type, subType} = this.state;
    switch (type) {
      case AWARDS: {
        switch (subType) {
          case AWARDS: {
            return award(biography);
          }
          case ACCOMPLISHMENTS: {
            return accomplishment(biography);
          }
          default: return award(biography);
        }
      }
      case ACCOMPLISHMENTS: {
        return accomplishment(biography);
      }
      case CERTIFICATIONS: {
        return certification(biography);
      }
      case DEGREES: {
        return degree(biography);
      }
      case AFFILIATIONS: {
        return affiliation(biography);
      }
      case EXPERIENCE: {
        return experience(biography);
      }
      case TOOLS: {
        return tool(biography);
      }
      default: break;
    }
  }
  handleSubmit() {
    console.log('----SUBMITTED----');
    const validation = this.handleValidation();
    this.setState({submit: true, validation});
    if (notNull(validation) && validation.valid) {
      const {type} = this.state;
      this.handleSaveBiography();
      this.handleContentType(type);
    }
  }
  handleSaveBiography() {
    const {biography, type, subType, isSportRelated} = this.state;
    const profileID = this.props.profile.status === FULFILLED ? this.props.profile.data.profile.id : '';
    const sportID = this.props.currentSport.status === FULFILLED ? this.props.currentSport.data.id : '';
    switch (type) {
      case AWARDS: {
        switch (subType) {
          case AWARDS: {
            if (isSportRelated === appConstants.yes) {
              this.props.saveSportAward(biography, {profileID, sportID});
            } else {
              this.props.saveGenAward(biography, {profileID});
            }
            break;
          }
          case ACCOMPLISHMENTS: {
            if (isSportRelated === appConstants.yes) {
              this.props.saveSportAccomplishment(biography, {profileID, sportID});
            } else {
              this.props.saveGenAccomplishment(biography, {profileID});
            }
            break;
          }
          default: break;
        }
        break;
      }
      case ACCOMPLISHMENTS: {
        if (isSportRelated === appConstants.yes) {
          this.props.saveSportAccomplishment(biography, {profileID, sportID});
        } else {
          this.props.saveGenAccomplishment(biography, {profileID});
        }
        break;
      }
      case CERTIFICATIONS: {
        if (isSportRelated === appConstants.yes) {
          this.props.saveSportCertification(biography, {profileID, sportID});
        } else {
          this.props.saveGenCertification(biography, {profileID});
        }
        break;
      }
      case DEGREES: {
        if (isSportRelated === appConstants.yes) {
          this.props.saveSportDegree(biography, {profileID, sportID});
        } else {
          this.props.saveGenDegree(biography, {profileID});
        }
        break;
      }
      case AFFILIATIONS: {
        if (isSportRelated === appConstants.yes) {
          this.props.saveSportAffiliation(biography, {profileID, sportID});
        } else {
          this.props.saveGenAffiliation(biography, {profileID});
        }
        break;
      }
      case EXPERIENCE: {
        // If (isSportRelated === appConstants.yes) {
        this.props.saveSportExperience(biography, {profileID, sportID});
        // } else {
        //   this.props.saveGenAward(biography, {profileID});
        // }
        break;
      }
      case TOOLS: {
        if (isSportRelated === appConstants.yes) {
          this.props.saveSportTool(biography, {profileID, sportID});
        } else {
          this.props.saveGenTool(biography, {profileID});
        }
        break;
      }
      default: break;
    }
  }
  handleDeletePopup(id, type, subType, isSportRelated, experienceType) {
    this.setState({itemToDelete: {id, type, subType, isSportRelated, experienceType: experienceType ? experienceType : appConstants.sportExperience.playing}, showDeleteModal: true, dataType: this.handleDataType(id, type, subType, isSportRelated)});
  }
  handleEditPopup(biography, type, subType, isSportRelated, experienceType) {
    const {isModified} = this.state;
    if (isModified) {
      this.setState({itemToEdit: {biography, type, subType, isSportRelated, experienceType}, showEditModal: true, dataType: this.handleDataType(null, type, subType, isSportRelated)});
    } else {
      this.handleLoadBiography(biography, type, subType, isSportRelated, experienceType);
    }
  }
  handleEditTask() {
    const {itemToEdit} = this.state;
    const {biography, type, subType, isSportRelated, experienceType} = itemToEdit;
    this.handleLoadBiography(biography, type, subType, isSportRelated, experienceType);
    this.setState({itemToEdit: {}, showEditModal: false, dataType: ''});
  }
  handleDeleteTask() {
    const {itemToDelete} = this.state;
    const {id, type, subType, isSportRelated, experienceType} = itemToDelete;
    this.handleDeleteBiography(id, type, subType, isSportRelated, experienceType);
    this.setState({itemToDelete: {}, showDeleteModal: false, dataType: ''});
  }
  handleDeleteBiography(id, type, subType, isSportRelated, experienceType) {
    const profileID = this.props.profile.status === FULFILLED ? this.props.profile.data.profile.id : '';
    const sportID = this.props.currentSport.status === FULFILLED ? this.props.currentSport.data.id : '';
    switch (type) {
      case AWARDS: {
        switch (subType) {
          case AWARDS: {
            if (isSportRelated === appConstants.yes) {
              this.props.deleteSportAward({id}, {profileID, sportID});
            } else {
              this.props.deleteGenAward({id}, {profileID});
            }
            break;
          }
          case ACCOMPLISHMENTS: {
            if (isSportRelated === appConstants.yes) {
              this.props.deleteSportAccomplishment({id}, {profileID, sportID});
            } else {
              this.props.deleteGenAccomplishment({id}, {profileID});
            }
            break;
          }
          default: break;
        }
        break;
      }
      case CERTIFICATIONS: {
        if (isSportRelated === appConstants.yes) {
          this.props.deleteSportCertification({id}, {profileID, sportID});
        } else {
          this.props.deleteGenCertification({id}, {profileID});
        }
        break;
      }
      case DEGREES: {
        if (isSportRelated === appConstants.yes) {
          this.props.deleteSportDegree({id}, {profileID, sportID});
        } else {
          this.props.deleteGenDegree({id}, {profileID});
        }
        break;
      }
      case AFFILIATIONS: {
        if (isSportRelated === appConstants.yes) {
          this.props.deleteSportAffiliation({id}, {profileID, sportID});
        } else {
          this.props.deleteGenAffiliation({id}, {profileID});
        }
        break;
      }
      case EXPERIENCE: {
        // If (isSportRelated === appConstants.yes) {
        this.props.deleteSportExperience({id, type: experienceType ? experienceType : appConstants.sportExperience.coaching}, {profileID, sportID});
        // } else {
        // this.props.deleteGenExperience(biography, {profileID});
        //   this.props.saveGenAward(biography, {profileID});
        // }
        break;
      }
      case TOOLS: {
        if (isSportRelated === appConstants.yes) {
          this.props.deleteSportTool({id}, {profileID, sportID});
        } else {
          this.props.deleteGenTool({id}, {profileID});
        }
        break;
      }
      default: break;
    }
  }
  handleDataType(id, type, subType, isSportRelated) {
    const {t} = this.props.p;
    switch (type) {
      case AWARDS: {
        switch (subType) {
          case AWARDS: {
            if (isSportRelated === appConstants.yes) {
              return t('Biography.sportsAward');
            }
            return t('Biography.generalAward');
          }
          case ACCOMPLISHMENTS: {
            if (isSportRelated === appConstants.yes) {
              return t('Biography.sportsAccomplishment');
            }
            return t('Biography.generalAccomplishment');
          }
          default: break;
        }
        break;
      }
      case CERTIFICATIONS: {
        if (isSportRelated === appConstants.yes) {
          return t('Biography.sportsCertification');
        }
        return t('Biography.generalCertification');
      }
      case DEGREES: {
        if (isSportRelated === appConstants.yes) {
          return t('Biography.sportsDegree');
        }
        return t('Biography.generalDegree');
      }
      case AFFILIATIONS: {
        if (isSportRelated === appConstants.yes) {
          return t('Biography.sportsAffiliation');
        }
        return t('Biography.generalAffiliation');
      }
      case EXPERIENCE: return t('Biography.sportsExperience');
      case TOOLS: {
        if (isSportRelated === appConstants.yes) {
          return t('Biography.sportsTool');
        }
        return t('Biography.generalTool');
      }
      default: break;
    }
  }
  handleObject(object) {
    this.handleUpdate({...object});
  }
  handleClose() {
    this.setState({showModal: false, showDeleteModal: false, itemToDelete: {}, dataType: '', showEditModal: false, itemToEdit: {}});
  }
  handleNext() {
    const {newType, newRelation, isSportRelated, newSubType, subType} = this.state;
    this.handleContentType(newType);
    this.setState({newRelation: newRelation ? newRelation : isSportRelated, subType: newSubType ? newSubType : subType});
  }
  handleName(data) {
    if (isNonEmptyArray(data.institutes)) {
      const {id, name} = data.institutes[0];
      this.handleUpdate({name: data.name, id, institutionID: id, institutionName: name});
    } else {
      this.handleUpdate({name: data.name, id: null, institutionID: null, institutionName: null});
    }
  }
  handleCoachingExperience(e) {
    const {value} = e.target;
    if (value > experienceLimit) {
      return false;
    }
    this.setState({coachingExperience: parseInt(value, 10), isCoachingExperienceUpdated: true});
  }
  handlePlayingExperience(e) {
    const {value} = e.target;
    if (value > experienceLimit) {
      return false;
    }
    this.setState({playingExperience: parseInt(value, 10), isPlayingExperienceUpdated: true});
  }
  handleCoachingExperienceBlur(e) {
    const {value} = e.target;
    this.props.saveSportExperienceYear({type: appConstants.sportExperience.coaching, year: parseInt(value, 10)}, {profileID: this.props.profile.data.profile.id, sportID: this.props.currentSport.data.id});
  }
  handlePlayingExperienceBlur(e) {
    const {value} = e.target;
    this.props.saveSportExperienceYear({type: appConstants.sportExperience.playing, year: parseInt(value, 10)}, {profileID: this.props.profile.data.profile.id, sportID: this.props.currentSport.data.id});
  }
  handleSampleModal() {
    const {isModalOpen} = this.state;
    this.setState({isModalOpen: !isModalOpen});
  }
  handleAddCoachingDes(e) {
    const {value} = e.target;
    console.log('Value :: ', value);
  }
  render() {
    const {biography, type, subType, isSportRelated, submit, sportName, playingExperience, coachingExperience, dataType, experienceType, isModified, isModalOpen} = this.state;
    const validation = this.handleValidation();
    return (
      <div className="buildProfile ssp-buildProfile-1-2">
        <div className="uk-grid">
          <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-7-10 uk-width-small-1-1">
            <h1 className="uk-padding-remove">{this.props.p.t('Biography.h1')}</h1>
          </div>
          <div className="uk-width-xlarge-3-10 uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-1">
            <div className="viewExpOuter">
              <a onClick={this.handleSampleModal} data-uk-modal>{this.props.p.t('ExampleModal.message')}</a>
            </div>
          </div>
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
            <p>{this.props.p.t('Biography.p')}</p>
          </div>
        </div>
        <div className="uk-grid">
          <ExperienceDetails
            playingExperience={playingExperience}
            coachingExperience={coachingExperience}
            onPlayingExperience={this.handlePlayingExperience}
            onCoachingExperience={this.handleCoachingExperience}
            onPlayingExperienceBlur={this.handlePlayingExperienceBlur}
            onCoachingExperienceBlur={this.handleCoachingExperienceBlur}
            sportName={sportName}
            onSelectType={this.handleBiographyType}
            onDeleteBiography={this.handleDeletePopup}
            onLoadBiography={this.handleEditPopup}
          />
        </div>
        <div className="uk-grid">
          <BiographyForm
            type={type}
            submit={submit}
            validation={notNull(validation) ? validation : {}}
            subType={subType}
            biography={biography}
            onSelectType={this.handleType}
            onSelectSubType={this.handleSubType}
            isSportRelated={isSportRelated}
            onSelectRelation={this.handleRelation}
            onChangeYear={this.handleYear}
            onChangeDescription={this.handleDescription}
            onChangeExperience={this.handleExperience}
            onSelectExperienceType={this.handleExperienceType}
            onSelectAward={this.handleAward}
            onSelectInstitution={this.handleInstitution}
            onSelectCertification={this.handleCertification}
            onSelectDegree={this.handleName}
            onSelectTool={this.handleName}
            onSelectOrganization={this.handleOrganization}
            onSelectCertified={this.handleCertified}
            onSelectName={this.handleName}
            sportName={sportName}
            experienceType={experienceType}
            onSubmit={this.handleSubmit}
            isModified={isModified}
          />
          <BiographyDetails
            type={type}
            subType={subType}
            biography={biography}
            isSportRelated={isSportRelated}
            onSelectRelation={this.handleRelation}
            onSelectType={this.handleBiographyType}
            onSelectSubType={this.handleSubType}
            onLoadBiography={this.handleEditPopup}
            onDeleteBiography={this.handleDeletePopup}
            sportName={sportName}
            playingExperience={playingExperience}
            coachingExperience={coachingExperience}
            onPlayingExperience={this.handlePlayingExperience}
            onCoachingExperience={this.handleCoachingExperience}
            onPlayingExperienceBlur={this.handlePlayingExperienceBlur}
            onCoachingExperienceBlur={this.handleCoachingExperienceBlur}
          />
        </div>
        <Modal isModalOpen={this.state.showModal}>
          <div id="notDefineModal" className="custom_modal">
            <div className="uk-modal-dialog uk-modal-dialog-medium">
              <div className="uk-modal-header">
                <h2 className="uk-modal-title">{this.props.p.t('RequiredNotFilledModal.oops')}</h2>
                <a onClick={this.handleClose} className="del uk-modal-close">
                  <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                    <g transform="translate(-1946.5 -5770.5)">
                      <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                      <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                    </g>
                  </svg>
                </a>
              </div>
              <div className="uk-modal-body">
                <p>{this.props.p.t('Biography.notSaved')}</p>
              </div>
              <div className="uk-modal-footer uk-margin-top">
                <div className="tableDiv">
                  <div className="lCol">
                    <a onClick={this.handleNext} className="general_btn">{this.props.p.t('Biography.yes')}</a>
                  </div>
                  <div className="rCol">
                    <a onClick={this.handleClose} className="back">{this.props.p.t('Biography.no')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal isModalOpen={this.state.showDeleteModal}>
          <div id="notDefineModal" className="custom_modal">
            <div className="uk-modal-dialog uk-modal-dialog-medium">
              <div className="uk-modal-header">
                <h2 className="uk-modal-title">{this.props.p.t('RequiredNotFilledModal.oops')}</h2>
                <a onClick={this.handleClose} className="del uk-modal-close">
                  <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                    <g transform="translate(-1946.5 -5770.5)">
                      <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                      <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                    </g>
                  </svg>
                </a>
              </div>
              <div className="uk-modal-body">
                <p>{this.props.p.t('Biography.deleteMessage', {type: dataType})}</p>
              </div>
              <div className="uk-modal-footer">
                <div className="tableDiv">
                  <div className="lCol">
                    <a onClick={this.handleDeleteTask} className="general_btn">{this.props.p.t('Biography.yes')}</a>
                  </div>
                  <div className="rCol">
                    <a onClick={this.handleClose} className="back">{this.props.p.t('Biography.no')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal isModalOpen={this.state.showEditModal}>
          <div id="notDefineModal" className="custom_modal">
            <div className="uk-modal-dialog uk-modal-dialog-medium">
              <div className="uk-modal-header">
                <h2 className="uk-modal-title">{this.props.p.t('RequiredNotFilledModal.oops')}</h2>
                <a onClick={this.handleClose} className="del uk-modal-close">
                  <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                    <g transform="translate(-1946.5 -5770.5)">
                      <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                      <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                    </g>
                  </svg>
                </a>
              </div>
              <div className="uk-modal-body">
                <p>{this.props.p.t('Biography.notSaved', {type: dataType})}</p>
              </div>
              <div className="uk-modal-footer">
                <div className="tableDiv">
                  <div className="lCol">
                    <a onClick={this.handleEditTask} className="general_btn">{this.props.p.t('Biography.yes')}</a>
                  </div>
                  <div className="rCol">
                    <a onClick={this.handleClose} className="back">{this.props.p.t('Biography.no')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <ExampleModal title="ExampleModal.biography" isModalOpen={isModalOpen} scroll={appConstants.scroll.biography} image={SAMPLE_BIOGRAPHY} onClose={this.handleSampleModal}/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      currentSport: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,

      saveSportAward: PropTypes.func.isRequired,
      saveGenAward: PropTypes.func.isRequired,
      saveSportAccomplishment: PropTypes.func.isRequired,
      saveGenAccomplishment: PropTypes.func.isRequired,
      saveSportDegree: PropTypes.func.isRequired,
      saveGenDegree: PropTypes.func.isRequired,
      saveSportCertification: PropTypes.func.isRequired,
      saveGenCertification: PropTypes.func.isRequired,
      saveSportAffiliation: PropTypes.func.isRequired,
      saveGenAffiliation: PropTypes.func.isRequired,
      saveSportExperience: PropTypes.func.isRequired,
      // SaveGenExperience: PropTypes.func.isRequired,
      saveSportTool: PropTypes.func.isRequired,
      saveGenTool: PropTypes.func.isRequired,

      deleteSportAward: PropTypes.func.isRequired,
      deleteGenAward: PropTypes.func.isRequired,
      deleteSportAccomplishment: PropTypes.func.isRequired,
      deleteGenAccomplishment: PropTypes.func.isRequired,
      deleteSportDegree: PropTypes.func.isRequired,
      deleteGenDegree: PropTypes.func.isRequired,
      deleteSportCertification: PropTypes.func.isRequired,
      deleteGenCertification: PropTypes.func.isRequired,
      deleteSportAffiliation: PropTypes.func.isRequired,
      deleteGenAffiliation: PropTypes.func.isRequired,
      deleteSportExperience: PropTypes.func.isRequired,
      // DeleteGenExperience: PropTypes.func.isRequired,
      deleteSportTool: PropTypes.func.isRequired,
      deleteGenTool: PropTypes.func.isRequired,
      fetchSportExperienceYear: PropTypes.func.isRequired,
      sportsExperienceYear: PropTypes.object.isRequired,
      saveSportExperienceYear: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {
    currentSport,
    profile,
    sportsExperienceYear
  } = state;

  return {
    currentSport,
    profile,
    sportsExperienceYear
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveSportAward: (data, params) => dispatch(saveSportAward(data, params)),
    saveGenAward: (data, params) => dispatch(saveGenAward(data, params)),
    saveSportAccomplishment: (data, params) => dispatch(saveSportAccomplishment(data, params)),
    saveGenAccomplishment: (data, params) => dispatch(saveGenAccomplishment(data, params)),
    saveSportDegree: (data, params) => dispatch(saveSportDegree(data, params)),
    saveGenDegree: (data, params) => dispatch(saveGenDegree(data, params)),
    saveSportCertification: (data, params) => dispatch(saveSportCertification(data, params)),
    saveGenCertification: (data, params) => dispatch(saveGenCertification(data, params)),
    saveSportAffiliation: (data, params) => dispatch(saveSportAffiliation(data, params)),
    saveGenAffiliation: (data, params) => dispatch(saveGenAffiliation(data, params)),
    saveSportExperience: (data, params) => dispatch(saveSportExperience(data, params)),
    saveSportExperienceYear: (data, params) => dispatch(saveSportExperienceYear(data, params)),
    saveGenExperience: (data, params) => dispatch(saveGenExperience(data, params)),
    saveSportTool: (data, params) => dispatch(saveSportTool(data, params)),
    saveGenTool: (data, params) => dispatch(saveGenTool(data, params)),

    deleteSportAward: (data, params) => dispatch(deleteSportAward(data, params)),
    deleteGenAward: (data, params) => dispatch(deleteGenAward(data, params)),
    deleteSportAccomplishment: (data, params) => dispatch(deleteSportAccomplishment(data, params)),
    deleteGenAccomplishment: (data, params) => dispatch(deleteGenAccomplishment(data, params)),
    deleteSportDegree: (data, params) => dispatch(deleteSportDegree(data, params)),
    deleteGenDegree: (data, params) => dispatch(deleteGenDegree(data, params)),
    deleteSportCertification: (data, params) => dispatch(deleteSportCertification(data, params)),
    deleteGenCertification: (data, params) => dispatch(deleteGenCertification(data, params)),
    deleteSportAffiliation: (data, params) => dispatch(deleteSportAffiliation(data, params)),
    deleteGenAffiliation: (data, params) => dispatch(deleteGenAffiliation(data, params)),
    deleteSportExperience: (data, params) => dispatch(deleteSportExperience(data, params)),
    deleteGenExperience: (data, params) => dispatch(deleteGenExperience(data, params)),
    deleteSportTool: (data, params) => dispatch(deleteSportTool(data, params)),
    deleteGenTool: (data, params) => dispatch(deleteGenTool(data, params)),

    fetchSportExperienceYear: params => dispatch(fetchSportExperienceYear(params))
  };
};
const BiographyComponent = connect(mapStateToProps, mapDispatchToProps)(translate(Biography));
export default BiographyComponent;
