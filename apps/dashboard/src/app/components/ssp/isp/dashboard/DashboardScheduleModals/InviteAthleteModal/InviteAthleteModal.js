import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import validateInviteAthlete from '../../../../../../validators/ssp/isp/inviteAthlete';
import appConstants from '../../../../../../constants/appConstants';
import {ispSearchAthelete, ispInviteAthelete} from '../../../../../../actions';
import {isValidEmail} from '../../../../../../validators/common/util';

const InviteAthleteConstants = appConstants.InviteAthlete;

class InviteAthleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      inviteAthleteTags: [],
      tagInputText: '',
      validation: validateInviteAthlete([]),
      showSuggestion: false

    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmitInviteAthlete = this.handleSubmitInviteAthlete.bind(this);

    this.handleInviteAthleteTagAddition = this.handleInviteAthleteTagAddition.bind(this);

    this.handleTagInputTextChange = this.handleTagInputTextChange.bind(this);
    this.handleTagInputKeyPress = this.handleTagInputKeyPress.bind(this);
    this.handleDeleteInviteAthleteTag = this.handleDeleteInviteAthleteTag.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.renderAutoFill = this.renderAutoFill.bind(this);
    this.handleSelectAthleteSuggestion = this.handleSelectAthleteSuggestion.bind(this);
    this.renderAutoFillItem = this.renderAutoFillItem.bind(this);
    this.renderErrorBox = this.renderErrorBox.bind(this);
    this.handleTagInputFocus = this.handleTagInputFocus.bind(this);
    this.handleTagInputBlur = this.handleTagInputBlur.bind(this);
  }

  handleCancelClick() {
    this.props.onCancel();
  }

  handleSubmitInviteAthlete() {
    const {inviteAthleteTags, validation} = this.state;
    const {selectedProfile, scheduledSession} = this.props;
    if (validation.valid === true) {
      const ids = [];
      const emailIds = [];
      inviteAthleteTags.forEach(inviteAthleteTag => {
        const {value, type} = inviteAthleteTag;
        if (type === InviteAthleteConstants.inviteBy.email) {
          emailIds.push(value);
        } else if (type === InviteAthleteConstants.inviteBy.profile) {
          ids.push(value);
        }
      });
      const data = {
        ids,
        emailIds
      };
      this.props.ispInviteAthelete(selectedProfile.id, scheduledSession.id, data);
      this.props.onCancel();
    }
    this.setState({
      submitted: true
    });
  }

  handleDeleteInviteAthleteTag(event) {
    const {index} = event.currentTarget.dataset;
    if (index >= 0) {
      const inviteAthleteTags = [].concat(this.state.inviteAthleteTags);
      inviteAthleteTags.splice(index, 1);
      const validation = validateInviteAthlete(inviteAthleteTags);
      this.setState({inviteAthleteTags, validation});
    }
  }
  handleInviteAthleteTagAddition(tag) {
    const inviteAthleteTags = [].concat(this.state.inviteAthleteTags, tag);
    const validation = validateInviteAthlete(inviteAthleteTags);
    this.setState({inviteAthleteTags, tagInputText: '', validation});
  }

  handleTagInputKeyPress(event) {
    const {value} = event.target;
    if (InviteAthleteConstants.tagDelimiters.includes(event.key)) {
      if (value.trim().length > 0) {
        this.handleInviteAthleteTagAddition({name: value, value, type: InviteAthleteConstants.inviteBy.email});
      }
      event.preventDefault();
    }
  }

  handleTagInputTextChange(event) {
    const {value} = event.target;
    this.setState({
      tagInputText: value
    });
    this.props.ispSearchAthelete(value);
  }

  handleTagInputFocus() {
    this.setState({showSuggestion: true});
  }

  handleTagInputBlur() {
    this.setState({showSuggestion: false});
  }

  renderTag(tag, index) {
    const {p} = this.props;
    const {name, value, type} = tag;

    const invalidEmail = Boolean(type === InviteAthleteConstants.inviteBy.email && (isValidEmail(value) === false));

    return (
      <span key={index} className={'invite-athlete-input ' + (invalidEmail === true ? 'error' : 'normal')} title={invalidEmail === true ? p.t('InviteAthlete.invalidEmailToolTip') : ''}>
        {name}
        <a onClick={this.handleDeleteInviteAthleteTag} data-index={index}>
          <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
            <g transform="translate(-1946.5 -5770.5)">
              <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
              <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
            </g>
          </svg>
        </a>
      </span>
    );
  }

  handleSelectAthleteSuggestion(event) {
    console.log('event target', event.target);
    const {athleteSearchResults} = this.props;
    const {index} = event.currentTarget.dataset;
    const athleteSuggestion = athleteSearchResults[index];
    if (athleteSuggestion) {
      const {displayName, id} = athleteSuggestion;
      this.handleInviteAthleteTagAddition({name: displayName, value: id, type: InviteAthleteConstants.inviteBy.profile});
    }
  }

  renderAutoFillItem(athleteSearchResult, index) {
    const {displayName, nickname} = athleteSearchResult;
    return (
      <li key={athleteSearchResult.id} ><a onMouseDown={this.handleSelectAthleteSuggestion} data-index={index}>{displayName}<br/>{nickname}</a></li>
    );
  }

  renderAutoFill() {
    const {athleteSearchResults} = this.props;
    const {tagInputText, showSuggestion} = this.state;
    if ((showSuggestion === true) && (tagInputText.trim().length > 0) && (athleteSearchResults.length > 0)) {
      return (
        <div className="cl-sd-custom-autofill">
          <ul>
            {
              athleteSearchResults.map(this.renderAutoFillItem)
            }
          </ul>
        </div>
      );
    }
    return null;
  }

  renderErrorBox() {
    const {p} = this.props;
    const {validation, submitted} = this.state;
    if ((validation.valid === false) && (submitted === true)) {
      const errorMsg = (validation.email === false) ? p.t('InviteAthlete.validationMessage.email') : p.t('InviteAthlete.validationMessage.required');
      return (
        <div className="uk-width-large-1-1 mt30">
          <div className="cl-sd-alert-box">
            <p>{errorMsg}</p>
          </div>
        </div>
      );
    }
  }

  render() {
    const {p} = this.props;
    const {tagInputText, inviteAthleteTags} = this.state;

    return (
      <div id="invite-athlete" className="cl-sd-modal-common invite-athlete-Sec">
        <div className="uk-modal-dialog cl-sd-modal-width-one">
          <a className="uk-modal-close uk-close" onClick={this.handleCancelClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
              </g>
            </svg>
          </a>
          <div className="uk-modal-header mb60">
            <h2>{p.t('InviteAthlete.title')}</h2>
          </div>
          <div className="uk-modal-body">
            <div className="uk-grid">
              <div className="uk-width-large-1-1">
                <label className="uk-form-label">{p.t('InviteAthlete.athleteEmails')}</label>
                <div className="invite-athlete-input-outer">
                  {
                    inviteAthleteTags.map(this.renderTag)
                  }
                  <span className="invite-athlete-input">
                    <input type="text" className="cl-sd-input-text" placeholder={p.t('InviteAthlete.inviteAthleteInputPlaceHolder')} autoComplete="off" onKeyPress={this.handleTagInputKeyPress} onChange={this.handleTagInputTextChange} value={tagInputText} onFocus={this.handleTagInputFocus} onBlur={this.handleTagInputBlur}/>
                  </span>
                </div>
                {
                  this.renderAutoFill()
                }
              </div>
              {
                this.renderErrorBox()
              }
            </div>
          </div>
          <div className="uk-modal-footer btn-red">
            <div className="uk-grid">
              <div className="uk-width-5-10 uk-text-left">
                <button type="button" className="uk-modal-close uk-close theme-orange-btn" onClick={this.handleSubmitInviteAthlete}>{p.t('InviteAthlete.ok')}</button>
              </div>
              <div className="uk-width-5-10 uk-text-right">
                <button type="button" className="back" onClick={this.handleCancelClick}>{p.t('CancelSession.cancel')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  static get propTypes() {
    return {
      onCancel: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      athleteSearchResults: PropTypes.array,
      ispSearchAthelete: PropTypes.func.isRequired,
      ispInviteAthelete: PropTypes.func.isRequired,
      selectedProfile: PropTypes.object.isRequired,
      scheduledSession: PropTypes.object.isRequired
    };
  }
}

InviteAthleteModal.defaultProps = {
  athleteSearchResults: []
};

const mapStateToProps = state => {
  const {athleteSearchResults, userProfiles} = state;
  return {
    athleteSearchResults: athleteSearchResults.data,
    selectedProfile: userProfiles.selectedProfile
  };
};

const mapDispatchToState = dispatch => {
  return {
    ispSearchAthelete: searchText => dispatch(ispSearchAthelete(searchText)),
    ispInviteAthelete: (profileID, scheduledSessionId, data) => dispatch(ispInviteAthelete(profileID, scheduledSessionId, data))
  };
};

export default connect(mapStateToProps, mapDispatchToState)(translate(InviteAthleteModal));
