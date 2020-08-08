import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class BiographyList extends Component {
  constructor(props) {
    super(props);
    this.renderBiography = this.renderBiography.bind(this);
  }

  renderBiography(item) {
    const hideLogo = {display: 'none'};
    const secondLine = item[this.props.institutionKeyName];
    return (
      <li key={item.id}>
        <div className="cl-sd-achievementInfo">
          <div className="lCol" style={(item.logo) ? {} : hideLogo}>
            <img src={item.logo} alt={item.name}/>
          </div>
          <div className="rCol">
            <h5>{item.name}</h5>
            {(secondLine) ? <p>{secondLine}</p> : null}
            <span className="cl-sd-achievementInfoCross" data-value={item.id} onClick={this.props.handleDelete}>
              <svg className="cl-icon-cross-blue" xmlns="http://www.w3.org/2000/svg" viewBox="-1322 -5229 12 12" >
                <g transform="translate(-1899 -5702)">
                  <path data-name="Path 161" className="cl-icon-cross-blue-1" d="M8.977-3.234a.481.481,0,0,0-.148-.352L7.414-5,8.828-6.414a.481.481,0,0,0,.148-.352.489.489,0,0,0-.148-.359l-.7-.7a.489.489,0,0,0-.359-.148.481.481,0,0,0-.352.148L6-6.414,4.586-7.828a.481.481,0,0,0-.352-.148.489.489,0,0,0-.359.148l-.7.7a.489.489,0,0,0-.148.359.481.481,0,0,0,.148.352L4.586-5,3.172-3.586a.481.481,0,0,0-.148.352.489.489,0,0,0,.148.359l.7.7a.489.489,0,0,0,.359.148.481.481,0,0,0,.352-.148L6-3.586,7.414-2.172a.481.481,0,0,0,.352.148.489.489,0,0,0,.359-.148l.7-.7A.489.489,0,0,0,8.977-3.234ZM11.2-8.012A5.869,5.869,0,0,1,12-5a5.869,5.869,0,0,1-.8,3.012A5.973,5.973,0,0,1,9.012.2,5.869,5.869,0,0,1,6,1,5.869,5.869,0,0,1,2.988.2,5.973,5.973,0,0,1,.8-1.988,5.869,5.869,0,0,1,0-5,5.869,5.869,0,0,1,.8-8.012,5.973,5.973,0,0,1,2.988-10.2,5.869,5.869,0,0,1,6-11a5.869,5.869,0,0,1,3.012.8A5.973,5.973,0,0,1,11.2-8.012Z" transform="translate(577 484)"/>
                </g>
              </svg>
            </span>
          </div>
        </div>
      </li>
    );
  }

  render() {
    return (
      <ul className="cl-sd-achievementOuter">
        {
          this.props.list.length && this.props.list.map(this.renderBiography)
        }
      </ul>
    );
  }
  static get propTypes() {
    return {
      list: PropTypes.array.isRequired,
      institutionKeyName: PropTypes.string.isRequired,
      handleDelete: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {} = state;
  return {

  };
};
const mapDispatchToProps = dispatch => {
  return {
  };
};
const BiographyListCommon = translate(connect(mapStateToProps, mapDispatchToProps)(BiographyList));
export default BiographyListCommon;
