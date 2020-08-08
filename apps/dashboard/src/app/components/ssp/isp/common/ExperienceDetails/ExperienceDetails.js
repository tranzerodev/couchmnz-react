import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import experienceValidator from '../../../../../validators/ssp/isp/common/experience';
import {fetchSportExperience, saveSportExperience} from '../../../../../actions/index';
import appConstants from '../../../../../constants/appConstants';
import {FULFILLED, EXPERIENCE, PENDING, COACHING_EXPERIENCE, PLAYING_EXPERIENCE} from '../../../../../constants/ActionTypes';
import {notNull} from '../../../../../validators/common/util';

class ExperienceDetails extends Component {
  constructor() {
    super();
    this.state = {
      biography: appConstants.biography.initialState.experience,
      experienceType: appConstants.sportExperience.playing,
      playingDescription: '',
      coachingDescription: '',
      isModified: false,
      coachingSubmitted: false,
      playingSubmitted: false,
      isCoachingValid: false,
      isPlayingValid: false,
      isPlayingEdit: false,
      isCoachingEdit: false
    };
    this.handlePlayingBiographyLoad = this.handlePlayingBiographyLoad.bind(this);
    this.handleCoachingBiographyLoad = this.handleCoachingBiographyLoad.bind(this);
    this.handleDeleteSportCoachingExperience = this.handleDeleteSportCoachingExperience.bind(this);
    this.handleDeleteSportPlayingExperience = this.handleDeleteSportPlayingExperience.bind(this);
    this.renderSportsPlayingExperience = this.renderSportsPlayingExperience.bind(this);
    this.renderSportsCoachingExperience = this.renderSportsCoachingExperience.bind(this);
    this.handleCoachingExperience = this.handleCoachingExperience.bind(this);
    this.handlePlayingExperience = this.handlePlayingExperience.bind(this);
    this.handleAddDescription = this.handleAddDescription.bind(this);
  }
  componentDidMount() {
    if (this.props.profile.status === FULFILLED && this.props.currentSport.status === FULFILLED) {
      this.props.fetchSportExperience({profileID: this.props.profile.data.profile.id, sportID: this.props.currentSport.data.id});
    }
  }
  componentWillReceiveProps(nextProps) {
    if (((this.props.currentSport.status === PENDING || this.props.currentSport.status === null) && nextProps.currentSport.status === FULFILLED) ||
      ((this.props.profile.status === PENDING || this.props.profile.status === null) && this.props.profile.status === FULFILLED)) {
      if (nextProps.currentSport.status === FULFILLED && nextProps.profile.status === FULFILLED) {
        this.props.fetchSportExperience({profileID: nextProps.profile.data.profile.id, sportID: nextProps.currentSport.data.id});
      }
    }
  }
  handleCoachingExperience(e) {
    const {value} = e.target;
    const validation = experienceValidator({description: value});
    this.setState({coachingDescription: value, isModified: true, isCoachingValid: validation.valid});
  //  This.handleUpdate({description: value});
  }
  handlePlayingExperience(e) {
    const {value} = e.target;
    const validation = experienceValidator({description: value});
    this.setState({playingDescription: value, isModified: true, isPlayingValid: validation.valid});
  }
  // HandleUpdate(data) {
  //   const {biography} = this.state;
  //   this.setState({
  //     biography: {
  //       ...biography,
  //       ...data
  //     },
  //     isModified: true
  //   });
  // }
  handleAddDescription(event) {
    const {value} = event.target;
    const sportID = this.props.currentSport.status === FULFILLED ? this.props.currentSport.data.id : '';
    const profileID = this.props.profile.status === FULFILLED ? this.props.profile.data.profile.id : '';
    const {biography, isCoachingEdit, isPlayingEdit} = this.state;
    let newBiography;
    if (value === appConstants.sportExperience.coaching) {
      const {coachingDescription} = this.state;
      this.setState({coachingSubmitted: true});
      if (isCoachingEdit) {
        newBiography = Object.assign(biography, {type: appConstants.sportExperience.coaching, description: coachingDescription});
      } else {
        newBiography = Object.assign(biography, {type: appConstants.sportExperience.coaching, description: coachingDescription, id: ''});
      }
      const validation = experienceValidator(newBiography);
      if (validation.valid) {
        this.setState({
          biography: newBiography,
          coachingDescription: '',
          isCoachingEdit: false
        }, this.props.saveSportExperience(newBiography, {profileID, sportID})
        );
      } else {
        this.setState({isCoachingValid: false});
      }
    } else if (value === appConstants.sportExperience.playing) {
      const {playingDescription} = this.state;
      this.setState({playingSubmitted: true});
      if (isPlayingEdit) {
        newBiography = Object.assign(this.state.biography, {type: appConstants.sportExperience.playing, description: playingDescription});
      } else {
        newBiography = Object.assign(this.state.biography, {type: appConstants.sportExperience.playing, description: playingDescription, id: ''});
      }
      const validation = experienceValidator(newBiography);
      if (validation.valid) {
        this.setState({
          biography: newBiography,
          playingDescription: '',
          isPlayingEdit: false
        }, this.props.saveSportExperience(this.state.biography, {profileID, sportID}));
      }
    } else {
      this.setState({isPlayingValid: false});
    }
  }
  handlePlayingBiographyLoad(e) {
    const value = e.currentTarget.getAttribute('value');
    let biography = {};
    const experience = this.props.sportsExperience.data.find(i => i.type === 'playing');
    biography = experience.description.find(i => i.id === parseInt(value, 10));
    if (notNull(biography)) {
      console.log(' ___ BIOGRAPHY PLAYING EXP ___ ', biography);
      const newBiography = Object.assign(biography, {type: appConstants.sportExperience.playing, id: biography.id, description: biography.description});
      this.setState({biography: newBiography, playingDescription: biography.description, isModified: true, isPlayingEdit: true});
    }
  }
  handleCoachingBiographyLoad(e) {
    const value = e.currentTarget.getAttribute('value');
    let biography = {};
    const experience = this.props.sportsExperience.data.find(i => i.type === 'coaching');
    biography = experience.description.find(i => i.id === parseInt(value, 10));
    if (notNull(biography)) {
      console.log(' ___ BIOGRAPHY ___ ', biography);
      const newBiography = Object.assign(biography, {type: appConstants.sportExperience.coaching, id: biography.id, description: biography.description});
      this.setState({biography: newBiography, coachingDescription: biography.description, isModified: true, isCoachingEdit: true});
    }
  }
  handleDeleteSportCoachingExperience(e) {
    const value = e.currentTarget.getAttribute('value');
    console.log('___ ID ___', value);
    this.props.onDeleteBiography(value, EXPERIENCE, null, appConstants.yes, appConstants.sportExperience.coaching);
  }
  handleDeleteSportPlayingExperience(e) {
    const value = e.currentTarget.getAttribute('value');
    console.log('___ ID ___', value);
    this.props.onDeleteBiography(value, EXPERIENCE, null, appConstants.yes, appConstants.sportExperience.playing);
  }
  renderSportsPlayingExperience(experienceElement, i) {
    return (
      [
        <div key={i + 1} className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-7-10  uk-width-small-8-10">
          <div className="tableDiv">
            <div className="lCol">
              <p>
                <svg className="cl-icon-round-star" xmlns="http://www.w3.org/2000/svg" viewBox="-19369 -3075 14 14">
                  <g transform="translate(-19369 -3075)">
                    <g>
                      <circle className="cl-icon-round-star-1" cx="7" cy="7" r="7"/>
                      <path className="cl-icon-round-star-2" d="M7,9.333,4.257,10.775l.524-3.054L2.562,5.558l3.067-.446L7,2.333,8.372,5.112l3.067.446L9.219,7.721l.524,3.054Z"/>
                    </g>
                  </g>
                </svg>
              </p>
            </div>
            <div className="rCol">
              <p>{experienceElement.description}</p>
            </div>
          </div>
        </div>,
        <div key={i + 2} className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-3-10  uk-width-small-2-10 uk-text-right">
          <p>
            <a value={experienceElement.id} onClick={this.handlePlayingBiographyLoad}>
              <svg className="cl-icon-edit" xmlns="http://www.w3.org/2000/svg" viewBox="-18838 -2262 16 16">
                <g data-name="Group 4017" transform="translate(-20346 -3515)">
                  <path className="cl-icon-edit-1" d="M8,16A8,8,0,1,0,0,8,8,8,0,0,0,8,16ZM10.352,3.68,12.32,5.648,11.088,6.88,9.12,4.912Zm-5.9,5.9L8.64,5.392,10.608,7.36,6.416,11.552l-2.464.5Z" transform="translate(1508 1253)"/>
                </g>
              </svg>
            </a>
            <a value={experienceElement.id} onClick={this.handleDeleteSportPlayingExperience}>
              <svg className="cl-icon-del" xmlns="http://www.w3.org/2000/svg" viewBox="-18804 -3075 16 16">
                <path data-name="Path 322" className="cl-icon-del-1" d="M11.969-.646a.641.641,0,0,0-.2-.469L9.885-3l1.885-1.885a.641.641,0,0,0,.2-.469.653.653,0,0,0-.2-.479l-.937-.937a.653.653,0,0,0-.479-.2.641.641,0,0,0-.469.2L8-4.885,6.115-6.771a.641.641,0,0,0-.469-.2.653.653,0,0,0-.479.2l-.937.938a.653.653,0,0,0-.2.479.641.641,0,0,0,.2.469L6.115-3,4.229-1.115a.641.641,0,0,0-.2.469.653.653,0,0,0,.2.479l.938.937a.653.653,0,0,0,.479.2.641.641,0,0,0,.469-.2L8-1.115,9.885.771a.641.641,0,0,0,.469.2.653.653,0,0,0,.479-.2l.937-.937A.653.653,0,0,0,11.969-.646Zm2.958-6.37A7.826,7.826,0,0,1,16-3a7.826,7.826,0,0,1-1.073,4.016,7.964,7.964,0,0,1-2.911,2.911A7.826,7.826,0,0,1,8,5,7.826,7.826,0,0,1,3.984,3.927,7.964,7.964,0,0,1,1.073,1.016,7.826,7.826,0,0,1,0-3,7.826,7.826,0,0,1,1.073-7.016,7.964,7.964,0,0,1,3.984-9.927,7.826,7.826,0,0,1,8-11a7.826,7.826,0,0,1,4.016,1.073A7.964,7.964,0,0,1,14.927-7.016Z" transform="translate(-18804 -3064)"/>
              </svg>
            </a>
          </p>
        </div>
      ]
    );
  }

  renderSportsCoachingExperience(experienceElement, i) {
    return (
      [
        <div key={i + 1} className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-7-10  uk-width-small-8-10">
          <div key={i} className="tableDiv">
            <div className="lCol">
              <p>
                <svg className="cl-icon-round-star" xmlns="http://www.w3.org/2000/svg" viewBox="-19369 -3075 14 14">
                  <g transform="translate(-19369 -3075)">
                    <g>
                      <circle className="cl-icon-round-star-1" cx="7" cy="7" r="7"/>
                      <path className="cl-icon-round-star-2" d="M7,9.333,4.257,10.775l.524-3.054L2.562,5.558l3.067-.446L7,2.333,8.372,5.112l3.067.446L9.219,7.721l.524,3.054Z"/>
                    </g>
                  </g>
                </svg>
              </p>
            </div>
            <div className="rCol">
              <p>{experienceElement.description}</p>
            </div>
          </div>
        </div>,
        <div key={i + 2} className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10  uk-width-small-2-10 uk-text-right">
          <p>
            <a value={experienceElement.id} onClick={this.handleCoachingBiographyLoad}>
              <svg className="cl-icon-edit" xmlns="http://www.w3.org/2000/svg" viewBox="-18838 -2262 16 16">
                <g data-name="Group 4017" transform="translate(-20346 -3515)">
                  <path className="cl-icon-edit-1" d="M8,16A8,8,0,1,0,0,8,8,8,0,0,0,8,16ZM10.352,3.68,12.32,5.648,11.088,6.88,9.12,4.912Zm-5.9,5.9L8.64,5.392,10.608,7.36,6.416,11.552l-2.464.5Z" transform="translate(1508 1253)"/>
                </g>
              </svg>
            </a>
            <a value={experienceElement.id} onClick={this.handleDeleteSportCoachingExperience}>
              <svg className="cl-icon-del" xmlns="http://www.w3.org/2000/svg" viewBox="-18804 -3075 16 16">
                <path data-name="Path 322" className="cl-icon-del-1" d="M11.969-.646a.641.641,0,0,0-.2-.469L9.885-3l1.885-1.885a.641.641,0,0,0,.2-.469.653.653,0,0,0-.2-.479l-.937-.937a.653.653,0,0,0-.479-.2.641.641,0,0,0-.469.2L8-4.885,6.115-6.771a.641.641,0,0,0-.469-.2.653.653,0,0,0-.479.2l-.937.938a.653.653,0,0,0-.2.479.641.641,0,0,0,.2.469L6.115-3,4.229-1.115a.641.641,0,0,0-.2.469.653.653,0,0,0,.2.479l.938.937a.653.653,0,0,0,.479.2.641.641,0,0,0,.469-.2L8-1.115,9.885.771a.641.641,0,0,0,.469.2.653.653,0,0,0,.479-.2l.937-.937A.653.653,0,0,0,11.969-.646Zm2.958-6.37A7.826,7.826,0,0,1,16-3a7.826,7.826,0,0,1-1.073,4.016,7.964,7.964,0,0,1-2.911,2.911A7.826,7.826,0,0,1,8,5,7.826,7.826,0,0,1,3.984,3.927,7.964,7.964,0,0,1,1.073,1.016,7.826,7.826,0,0,1,0-3,7.826,7.826,0,0,1,1.073-7.016,7.964,7.964,0,0,1,3.984-9.927,7.826,7.826,0,0,1,8-11a7.826,7.826,0,0,1,4.016,1.073A7.964,7.964,0,0,1,14.927-7.016Z" transform="translate(-18804 -3064)"/>
              </svg>
            </a>
          </p>
        </div>
      ]
    );
  }

  render() {
    const {p, sportsExperience, playingExperience, coachingExperience, sportName} = this.props;
    const {coachingDescription, playingDescription, coachingSubmitted, isCoachingValid, isPlayingValid, playingSubmitted, isPlayingEdit, isCoachingEdit} = this.state;

    const sportCoachingExperience = sportsExperience.data.find(item => item.type === appConstants.biography.sportExperienceType.coaching);
    const sportPlayingExperience = sportsExperience.data.find(item => item.type === appConstants.biography.sportExperienceType.playing);
    console.log('sportCoachingExperience', sportCoachingExperience, 'sportPlayingExperience', sportPlayingExperience);

    return (
      <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
        <div className="cl-sd-experienceOuter">
          <div className="cl-sd-coachingExp">
            <input type="number" name className="field-required" min={0} placeholder={0} value={coachingExperience} onChange={this.props.onCoachingExperience} onBlur={this.props.onCoachingExperienceBlur}/>
            <h4>{p.t('Biography.captionCoaching')}</h4>
            <div className="uk-grid">
              {
                sportCoachingExperience.description.map(this.renderSportsCoachingExperience)
              }
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1  uk-width-small-1-1 ">
                <div className={coachingSubmitted && isCoachingValid === false ? 'field-holder error' : 'field-holder'}>
                  <div className="cl-sd-expInputDiv">
                    <input type="text" name="" placeholder={p.t('Biography.coachingExperiencePlaceHolder')} value={coachingDescription} onChange={this.handleCoachingExperience}/>
                    <button type="button" value={appConstants.sportExperience.coaching} onClick={this.handleAddDescription}>{isCoachingEdit ? p.t('Biography.edit') : p.t('Biography.add')}</button>
                  </div>
                  <span className="error-text">{p.t('Biography.validation_messages.description')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cl-sd-playingExp">
            <input type="number" name className="field-required" min={0} placeholder={0} value={playingExperience} onChange={this.props.onPlayingExperience} onBlur={this.props.onPlayingExperienceBlur}/>
            <h4>{p.t('Biography.captionPlaying')}</h4>
            <div className="uk-grid">
              {
                sportPlayingExperience.description.map(this.renderSportsPlayingExperience)
              }
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1  uk-width-small-1-1 ">
                <div className={playingSubmitted && isPlayingValid === false ? 'field-holder error' : 'field-holder'}>
                  <div className="cl-sd-expInputDiv">
                    <input type="text" name="" placeholder={p.t('Biography.playingExperiencePlaceHolder')} value={playingDescription} onChange={this.handlePlayingExperience}/>
                    <button type="button" value={appConstants.sportExperience.playing} onClick={this.handleAddDescription}>{isPlayingEdit ? p.t('Biography.edit') : p.t('Biography.add')}</button>
                  </div>
                  <span className="error-text">{p.t('Biography.validation_messages.description')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sportsExperience: PropTypes.object.isRequired,
      fetchSportExperience: PropTypes.func.isRequired,
      playingExperience: PropTypes.number,
      coachingExperience: PropTypes.number,
      sportName: PropTypes.string,
      profile: PropTypes.object.isRequired,
      currentSport: PropTypes.object.isRequired,
      onLoadBiography: PropTypes.func.isRequired,
      onDeleteBiography: PropTypes.func.isRequired,
      onPlayingExperience: PropTypes.func.isRequired,
      onCoachingExperience: PropTypes.func.isRequired,
      onPlayingExperienceBlur: PropTypes.func.isRequired,
      saveSportExperience: PropTypes.func.isRequired,
      onCoachingExperienceBlur: PropTypes.func.isRequired
    };
  }
}

ExperienceDetails.defaultProps = {
  playingExperience: 0,
  coachingExperience: 0,
  sportName: 'Sports'
};

const mapStateToProps = state => {
  const {
    currentSport,
    profile,
    sportsExperience,
    sportsExperienceYear
  } = state;
  return {
    currentSport,
    profile,
    sportsExperience,
    sportsExperienceYear
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSportExperience: params => dispatch(fetchSportExperience(params)),
    saveSportExperience: (data, params) => dispatch(saveSportExperience(data, params))
  };
};
const ExperienceDetailsComponent = connect(mapStateToProps, mapDispatchToProps)(translate(ExperienceDetails));
export default ExperienceDetailsComponent;
