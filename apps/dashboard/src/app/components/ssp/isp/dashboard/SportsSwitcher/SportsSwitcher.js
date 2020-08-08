import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {fetchCurrentSport} from '../../../../../actions';
import {FULFILLED} from '../../../../../constants/ActionTypes';

class sportsSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleChangeSport = this.handleChangeSport.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.renderSports = this.renderSports.bind(this);
  }
  sortSportByName(sport, sport2) {
    return sport.name > sport2.name;
  }
  handleChangeSport(e) {
    this.props.fetchCurrentSport({profileID: this.props.profile.data.profile.id, sportID: e.currentTarget.getAttribute('id')});
    // This.props.history.push(DASHBOARD);
    this.handleDropdown();
  }
  handleDropdown() {
    const isOpen = !this.state.isOpen;
    this.setState({isOpen});
  }

  renderSports(sport, i) {
    return (
      <li key={i}>
        <a id={sport.id} type={sport.type} name={sport.name} onClick={this.handleChangeSport}>
          {sport.name}
          <span className="cl-sd-icon">
            <svg className="cl-icon-arrow-right-orange" xmlns="http://www.w3.org/2000/svg" viewBox="-804.53 -5141.531 6.591 11.063">
              <g transform="translate(-1001.605 -5996.5)">
                <path data-name="Path 149" className="cl-icon-arrow-right-orange-1" d="M-17914.895-2197l5,5,5-5" transform="translate(2394.606 -17049.395) rotate(-90)"/>
              </g>
            </svg>
          </span>
        </a>
      </li>
    );
  }
  render() {
    return (
      this.props.currentSport && this.props.currentSport.status === FULFILLED && (
        <span data-uk-dropdown="{mode:'click'}" className={this.state.isOpen ? 'cl-sd-coach-dropdown uk-open' : 'cl-sd-coach-dropdown'} aria-expanded={this.state.isOpen} aria-haspopup="true" aria-expanded="false">
          <h5 onClick={this.handleDropdown} className="cl-sd-speciality-link">
            {' ' + this.props.currentSport.data.name + ' '}
            <svg className="cl-icon-arrow-down-orange" xmlns="http://www.w3.org/2000/svg" viewBox="-759.531 -5139.53 11.063 6.591">
              <g transform="translate(-962.105 -6007)">
                <path data-name="Path 148" className="cl-icon-arrow-down-orange-1" d="M-17914.895-2197l5,5,5-5" transform="translate(18118 3065)"/>
              </g>
            </svg>
          </h5>
          <ul className="uk-dropdown" aria-hidden="true">
            {
              this.props.sports && this.props.sports.length >= 1 && this.props.sports.sort(this.sortSportByName).map(this.renderSports)
            }
          </ul>
        </span>
      )
    );
  }
  static get propTypes() {
    return {
      currentSport: PropTypes.object.isRequired,
      fetchCurrentSport: PropTypes.func.isRequired,
      sports: PropTypes.array,
      profile: PropTypes.object.isRequired
    };
  }
}

sportsSwitcher.defaultProps = {
  sports: []
};

const mapStateToProps = state => {
  const {userProfiles, profile, currentProfile, currentSport, sports} = state;
  return {
    userProfiles,
    profile,
    currentProfile,
    currentSport,
    sports
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentSport: params => dispatch(fetchCurrentSport(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sportsSwitcher);
