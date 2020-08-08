import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import appConstants from '../../../../../constants/appConstants';

const {complete, intermediate} = appConstants.RegistrationFlowPageStatusFlags;
const {red, green, gray} = appConstants.sportsDataStatusColorCodes;

const renderItem = (name, type) => {
  return (
    <span className="cl-itemRow">
      <span className={'cl-status-dot ' + (type === complete ? green : type === intermediate ? red : gray)}/>
      <span className="cl-moduleText">{name}</span>
    </span>
  );
};

export const renderAllPage = (type, t, offerTerminologyKey) => {
  const offerTerminology = offerTerminologyKey;
  return (
    <span className="cl-module-list">
      {
        renderItem(t('SportPageStatus.service'), type)
      }
      {
        renderItem(t('DashboardProfileSideNav.preference', {offerTerminology: offerTerminology.singular}), type)
      }
      {
        renderItem(t('DashboardSessionSideNav.set_pricing'), type)
      }
      {
        renderItem(t('DashboardSessionSideNav.locations', {offerTerminology: offerTerminology.singular}), type)
      }
      {
        renderItem(t('DashboardSessionSideNav.define', {offerTerminology: offerTerminology.plural}), type)
      }
      {
        renderItem(t('DashboardProfileSideNav.biography'), type)
      }
      {
        renderItem(t('DashboardProfileSideNav.listing_details'), type)
      }
      {
        renderItem(t('DashboardProfileSideNav.photos_and_videos'), type)
      }
    </span>
  );
};

class SportPageStatus extends Component {
  constructor(props) {
    super(props);
    this.renderSport = this.renderSport.bind(this);
  }

  renderSport() {
    const {sport, p} = this.props;
    const {sectionStatus} = sport;
    const {services, sessions, listing, locations, trainingPrefernce, biography, pricing, media, schedules} = appConstants.ispRegFlowPageKeys;
    const {offerTerminology} = sport;
    
    return (
      <span className="cl-module-list">
        {
          renderItem(p.t('SportPageStatus.service'), sectionStatus[services])
        }
        {
          renderItem(p.t('DashboardProfileSideNav.preference', {offerTerminology: offerTerminology.singular}), sectionStatus[trainingPrefernce])
        }
        {
          renderItem(p.t('DashboardSessionSideNav.set_pricing'), sectionStatus[pricing])
        }
        {
          renderItem(p.t('DashboardSessionSideNav.locations', {offerTerminology: offerTerminology.singular}), sectionStatus[locations])
        }
        {
          renderItem(p.t('DashboardSessionSideNav.define', {offerTerminology: offerTerminology.plural}), sectionStatus[sessions])
        }
        {
          renderItem(p.t('DashboardProfileSideNav.biography'), sectionStatus[biography])
        }
        {
          renderItem(p.t('DashboardProfileSideNav.listing_details'), sectionStatus[listing])
        }
        {
          renderItem(p.t('DashboardProfileSideNav.photos_and_videos'), sectionStatus[media])
        }
        {
          renderItem(p.t('DashboardProfileSideNav.schedules'), 
           (sectionStatus.WORKING_HOURS == 'Y' && sectionStatus.DYNAMIC_SESSION == 'N'  && sectionStatus.SCHEDULES == 'Y' ) ||
           sectionStatus.WORKING_HOURS == 'Y' && sectionStatus.DYNAMIC_SESSION == 'Y' ? 'Y' : 'N' 
          )
        }
      </span>
    );
  }

  render() {
    return (
      this.renderSport()
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      sport: PropTypes.object.isRequired
    };
  }
}

export default translate(SportPageStatus);
