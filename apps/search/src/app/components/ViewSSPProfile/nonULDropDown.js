import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import appConstants from '../../constants/appConstants';

class NonULDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDD: false,
      toggleHead: ''
    };
    this.handleHeadBang = this.handleHeadBang.bind(this);
    this.handleSportDropDown = this.handleSportDropDown.bind(this);
  }
  static get propTypes() {
    return {
      containerClassName: PropTypes.string.isRequired,
      preHeadDisplay: PropTypes.array,
      headClassName: PropTypes.string.isRequired,
      headSpanText: PropTypes.string.isRequired,
      dropdownClassName: PropTypes.string.isRequired,
      router: PropTypes.object.isRequired,
      dropDownList: PropTypes.array.isRequired,
      headAlteredState: PropTypes.string.isRequired,
      dropDownAlteredState: PropTypes.string.isRequired,
      sports: PropTypes.array,
      nickname: PropTypes.string
    };
  }
  handleHeadBang(event) {
    event.preventDefault();
    if (this.state.showDD === false) {
      this.setState({toggleHead: this.props.headAlteredState, showDD: true});
    } else {
      this.setState({toggleHead: '', showDD: false});
    }
  }

  handleSportDropDown() {
    const sportList = this.props.sports;
    const {query} = this.props.router;
    const p = query && query.p && query.p === appConstants.profilePreviewParameter ? query.p : null;
    const dropdownArray = [];
    if (sportList) {
      const location = window.location.href;
      let keyArr = 0;
      for (let count = 0; count <= sportList.length - 1; count++) {
      // If (sportList[count].name === this.state.presentSport) {
      //   dropdownArray.push(<li key={keyArr++}><a>{sportList[count].name}</a></li>);
      // } else {
        const targetPath = '/ssp/' + this.props.nickname + '/' + sportList[count].sportID + (p ? '?p=' + p : '');
        /* Window.location.hostname + '/#/' + this.props.data.nickname + '/' + sportList[count].sportsID */
        dropdownArray.push(<li key={keyArr++}><NavLink to={targetPath}>{sportList[count].name}</NavLink></li>);
      // }
      }
    }
    return (dropdownArray);
  }

  render() {
    let keyVal = 0;
    const sportList = this.props.sports;
    if (sportList && sportList.length > 1) {
      return (
        <div key={keyVal++} className={this.props.containerClassName}>
          {this.props.preHeadDisplay}
          <div key={keyVal++} className={this.props.headClassName + ' ' + this.state.toggleHead} onClick={this.handleHeadBang} aria-haspopup="true" aria-expanded={this.state.showDD}>{this.props.headSpanText}
            <div key={keyVal++} className={this.props.dropdownClassName} aria-hidden={!this.state.showDD} style={{top: '20px', left: '-146px'}}>
              <ul key={keyVal++}>
                {this.handleSportDropDown()}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={this.props.containerClassName}/>
    );
  }
}

NonULDropDown.defaultProps = {
  preHeadDisplay: ''
};

export default NonULDropDown;
