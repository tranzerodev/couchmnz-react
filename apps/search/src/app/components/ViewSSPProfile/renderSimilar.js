import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CoachCard from './coachCard';
import translate from 'redux-polyglot/translate';

class RenderSims extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySport: 'Golf',
      profile:
      [
        {
          displayName: 'Simon Burton',
          profileImage: 'http://hoopgroup.com/wp-content/uploads/2013/08/James-Cormier-e1376411577167.jpg',
          rating: 4.3,
          isVerified: true,
          trainerType: 'Individual Trainer',
          otherSportsCoachedIn: 2,
          coachesAt: {
            Place: 'Danvers',
            State: 'Massachussetts',
            Country: 'USA'
          },
          expertTag: '20 years of Coaching experience in sports I spent 15 years training for and playing.',
          rateMin: '160',
          rateCurr: 'INR',
          rateUnit: 'Session'
        },
        {
          displayName: 'Sharon Douglas',
          profileImage: 'http://lifechanging.fitness/wp-content/uploads/2014/03/LEIGH-Coaches-PROFILE.jpg',
          rating: 3.5,
          isVerified: false,
          trainerType: 'Individual Trainer',
          otherSportsCoachedIn: 0,
          coachesAt: {
            Place: 'Seattle',
            State: 'Washington',
            Country: 'USA'
          },
          expertTag: '18 years training the next generation of Football players.',
          rateMin: '120',
          rateCurr: '$',
          rateUnit: 'Day'
        },
        {
          displayName: 'Tanya Roberts',
          profileImage: 'http://lifechanging.fitness/wp-content/uploads/2014/03/LEIGH-Coaches-PROFILE.jpg',
          rating: 2.4,
          isVerified: false,
          trainerType: 'Individual Trainer',
          otherSportsCoachedIn: 1,
          coachesAt: {
            Place: 'New York City',
            State: 'New York',
            Country: 'USA'
          },
          expertTag: '18 years training the next generation of Football players.',
          rateMin: '80',
          rateCurr: '$',
          rateUnit: 'Day'
        }
      ]
    };
  }
  static get propTypes() {
    return {
      displaySport: PropTypes.string,
      city: PropTypes.string,
      similars: PropTypes.array,
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }

  handleTrainer(e) {
    const DisplayArray = [];
    let keyVal = 0;
    for (let counter = 0; counter <= e - 1; counter++) {
      DisplayArray.push(
        <CoachCard
          key={keyVal++}
          displayName={this.props.similars[counter].displayName}
          nickname={this.props.similars[counter].nickname}
          displaySport={this.props.displaySport}
          displaySportID={this.props.displaySportID}
          profileImage={this.props.similars[counter].profileSSImage}
          rating={this.props.similars[counter].rating}
          isVerified={this.props.similars[counter].isVerified}
          rateMin={this.props.similars[counter].rateMin}
          otherSportsCoachedIn={this.props.similars[counter].otherSportsCoachedIn}
          coachesAt={this.props.similars[counter].coachesAt}
        />);
    }
    return (DisplayArray);
  }

  render() {
    return (
      <div className="section-similar-trainers">
        <div className="similar-trainers">
          <div className="sub-heading">
            <div className="booking-wrapper">
              <h2>{this.props.p.t('SSPProfile.similarSSP', {city: this.props.city})}</h2>
            </div>
          </div>
          <div className="booking-wrapper">
            <div className="trainer-slider">
              <div className="uk-slidenav-position" data-uk-slider="{infinite:false}">
                <div className="uk-slider-container">
                  <ul className="uk-slider uk-grid uk-grid-width-medium-1-6">
                    {this.handleTrainer(this.props.similars.length)}
                  </ul>
                </div>
                <a className="uk-slidenav uk-slidenav-contrast uk-slidenav-previous" data-uk-slider-item="previous" draggable="false"/>
                <a className="uk-slidenav uk-slidenav-contrast uk-slidenav-next" data-uk-slider-item="next" draggable="false"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate(RenderSims);
