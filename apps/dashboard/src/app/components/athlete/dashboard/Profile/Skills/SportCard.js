import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {} from '../../../../../constants/pathConstants';
class SportCard extends Component {
  render() {
    const {t} = this.props.p;
    const {sport} = this.props;
    return (
      <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
        <div className="interest_sec">
          <h3>{sport.name}</h3>
          <h4>{sport.specializations.map(i => i.description).join(', ')}</h4>
          <p>{sport.yearOfExperience} {t('ProfileSkillsSportCard.experience')}<br/>{sport.skillLevel.description}</p>
          <p>{sport.notes}</p>
          <a className="edit" value={sport.id} onClick={this.props.onEdit}>{t('ProfileSkillsSportCard.edit')}</a>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onEdit: PropTypes.func.isRequired,
      sport: PropTypes.object.isRequired
    };
  }
}

export default (translate(SportCard));
