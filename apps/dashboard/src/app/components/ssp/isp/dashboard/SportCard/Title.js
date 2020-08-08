import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Switch, withRouter, Route} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import appConstants from '../../../../../constants/appConstants';
import {deactivateSport, deleteSport} from '../../../../../actions/index';
class SportCardTitle extends Component {
  constructor(props) {
    super(props);
    this.renderDropDown = this.renderDropDown.bind(this);
    this.handleDeactive = this.handleDeactive.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDeactive() {
    const {profileId, id} = this.props;
    this.props.deactivateSport(profileId, id);
  }
  handleDelete() {
    const {profileId, id} = this.props;
    this.props.deleteSport({profileID: profileId, sportID: id});
  }
  renderDropDown() {
    const {name} = this.props;
    const isActive = (this.props.isActive === appConstants.sportsActiveFlages.active);
    return (
      <ul className="uk-dropdown">
        { isActive &&
        <li>
          <a onClick={this.handleDeactive}>
            {this.props.p.t('SportCardTitle.deactivate')}
            <span className="cl-sd-icon">
              <svg className="cl-icon-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-804.53 -5141.531 6.591 11.063">
                <g transform="translate(-1001.605 -5996.5)">
                  <path data-name="Path 149" className="cl-icon-arrow-right-1" d="M-17914.895-2197l5,5,5-5" transform="translate(2394.606 -17049.395) rotate(-90)"/>
                </g>
              </svg>
            </span>
          </a>
        </li>
        }
        {/*  <li>
          <a onClick={this.handleDelete}>
            {this.props.p.t('SportCardTitle.delete_sport', {sportName: name})}
            <span className="cl-sd-icon">
              <svg className="cl-icon-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-804.53 -5141.531 6.591 11.063">
                <g transform="translate(-1001.605 -5996.5)">
                  <path data-name="Path 149" className="cl-icon-arrow-right-1" d="M-17914.895-2197l5,5,5-5" transform="translate(2394.606 -17049.395) rotate(-90)"/>
                </g>
              </svg>
            </span>
          </a>
        </li> */}
      </ul>
    );
  }
  render() {
    const {name, specializations, experience} = this.props;
    const isActive = (this.props.isActive === appConstants.sportsActiveFlages.active);
    return (
      <div className="cl-sd-manageSports-title">
        <div className="uk-grid">
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-8-10 uk-width-small-6-10">
            <h4>{name}</h4>
            <p>
              <span>
                {
                  specializations.map(elem => elem.name).join(', ')
                }
              </span>
            </p>
            <p>{this.props.p.t('SportCardTitle.experience', {coaching: experience.coachingExperience.numberOfYears, playing: experience.playingExperience.numberOfYears})}</p>
          </div>
          { isActive &&
          <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10 uk-width-small-4-10">
            <span data-uk-dropdown="{mode:'click'}" className="cl-sd-sportsAcc-settings">
              <a href="#" className="">
                <svg className="cl-icon-msg-more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 3">
                  <g fill="#666" fillRule="evenodd">
                    <circle cx="1.5" cy="1.5" r="1.5"/>
                    <circle cx="6.5" cy="1.5" r="1.5"/>
                    <circle cx="11.5" cy="1.5" r="1.5"/>
                  </g>
                </svg>
              </a>
              {this.renderDropDown()}
            </span>
          </div> }
        </div>
      </div>

    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      name: PropTypes.string.isRequired,
      specializations: PropTypes.array.isRequired,
      experience: PropTypes.object.isRequired,
      isActive: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      profileId: PropTypes.string.isRequired,
      deactivateSport: PropTypes.func.isRequired,
      deleteSport: PropTypes.func.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deactivateSport: (profileId, sportId) => dispatch(deactivateSport(profileId, sportId)),
    deleteSport: params => dispatch(deleteSport(params))
  };
};

const mapStateToProps = state => {
  const {profile} = state;
  return {
    profileId: profile.data.profile.id
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(SportCardTitle)));
