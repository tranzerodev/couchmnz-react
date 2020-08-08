import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {} from '../../../../../actions/index';
import CertificationDetails from '../CertificationDetails/CertificationDetails';
import AwardDetails from '../AwardDetails/AwardDetails';
import ToolDetails from '../ToolDetails/ToolDetails';
import DegreeDetails from '../DegreeDetails/DegreeDetails';
import AffiliationDetails from '../AffiliationDetails/AffiliationDetails';
import AccomplishmentDetails from '../AccomplishmentDetails/AccomplishmentDetails';

class BiographyDetails extends Component {
  render() {
    const {sportName, playingExperience, coachingExperience} = this.props;
    return (
      <div className="uk-width-xlarge-7-10 uk-width-large-7-10 uk-width-medium-1-1  uk-width-small-1-1 ">
        <div className="cl-sd-biographyInfoInner">
          <CertificationDetails sortByYear={this.sortByYear} playingExperience={playingExperience} coachingExperience={coachingExperience} onPlayingExperience={this.props.onPlayingExperience} onCoachingExperience={this.props.onCoachingExperience} sportName={sportName} onSelectType={this.props.onSelectType} onDeleteBiography={this.props.onDeleteBiography} onLoadBiography={this.props.onLoadBiography}/>
          <AwardDetails sortByYear={this.sortByYear} onSelectType={this.props.onSelectType} onLoadBiography={this.props.onLoadBiography} sportName={sportName} onDeleteBiography={this.props.onDeleteBiography}/>
          <AffiliationDetails onSelectType={this.props.onSelectType} onLoadBiography={this.props.onLoadBiography} sportName={sportName} onDeleteBiography={this.props.onDeleteBiography}/>
          <AccomplishmentDetails sortByYear={this.sortByYear} onSelectType={this.props.onSelectType} onLoadBiography={this.props.onLoadBiography} sportName={sportName} onDeleteBiography={this.props.onDeleteBiography}/>
          <DegreeDetails sortByYear={this.sortByYear} onSelectType={this.props.onSelectType} onLoadBiography={this.props.onLoadBiography} sportName={sportName} onDeleteBiography={this.props.onDeleteBiography}/>
          <ToolDetails onSelectType={this.props.onSelectType} onLoadBiography={this.props.onLoadBiography} sportName={sportName} onDeleteBiography={this.props.onDeleteBiography}/>
        </div>
      </div>
    );
  }

  sortByYear(item) {
    if (item) {
      const itemSorted = item.sort((a, b) => {
        return a.year > b.year ? -1 : 1;
      });
      return itemSorted;
    }
    return [];
  }

  static get propTypes() {
    return {
      // P: PropTypes.shape({t: PropTypes.func}).isRequired
      sportName: PropTypes.string.isRequired,
      onSelectType: PropTypes.func.isRequired,
      onLoadBiography: PropTypes.func.isRequired,
      onDeleteBiography: PropTypes.func.isRequired,
      playingExperience: PropTypes.number,
      coachingExperience: PropTypes.number,
      onPlayingExperience: PropTypes.func.isRequired,
      onCoachingExperience: PropTypes.func.isRequired,
      onPlayingExperienceBlur: PropTypes.func.isRequired,
      onCoachingExperienceBlur: PropTypes.func.isRequired
    };
  }
}

BiographyDetails.defaultProps = {
  playingExperience: 0,
  coachingExperience: 0
};

const mapStateToProps = (/* state */) => {
  return {};
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};
const BiographyPage = connect(mapStateToProps, mapDispatchToProps)(translate(BiographyDetails));
export default BiographyPage;
