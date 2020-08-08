import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import SportCard from './SportCard';

class SportsRow extends Component {
  render() {
    // Const {t} = this.props.p;
    const {sports} = this.props;
    return (
      <div className="uk-grid">
        {sports.map(sport => sport ? <SportCard key={sport.id} onEdit={this.props.onEdit} history={this.props.history} sport={sport}/> : null)}
      </div>
    );
  }
  static get propTypes() {
    return {
      // P: PropTypes.shape({t: PropTypes.func}).isRequired,
      sports: PropTypes.array.isRequired,
      onEdit: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    };
  }
}

export default (translate(SportsRow));
