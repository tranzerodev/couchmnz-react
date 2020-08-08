import React, {Component} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import config from '../../../../config';

const RECIPIENT_PROFILE_TYPES = config.messagingSystem.messageRecipientProfileTypes;
/* eslint react/jsx-no-bind: 0 */
class RecipientSuggestion extends Component {
  constructor(props) {
    super(props);
    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.renderRecipientTypeTab = this.renderRecipientTypeTab.bind(this);
    this.renderRecipientListForTab = this.renderRecipientListForTab.bind(this);
  }

  handleMouseDown(item, e) {
    // Focus is shifted on mouse down but calling preventDefault prevents this
    e.preventDefault();
    this.props.addTag(item);
  }

  handlePreventBlurEvent(event) {
    event.preventDefault();
  }

  renderSuggestions(suggestion, index) {
    const {listboxId, selectedIndex, classNames} = this.props;
    const key = `${listboxId}-${index}`;
    const itemClassNames = [];

    if (selectedIndex === index) {
      itemClassNames.push(classNames.suggestionActive);
    }

    if (suggestion.disabled) {
      itemClassNames.push(classNames.suggestionDisabled);
    }

    return (
      <li
        key={key}
        id={key}
        onMouseDown={event => this.handleMouseDown(suggestion, event)}
      >
        <a >
          <div className="cl-receiver-avatar"><img src={suggestion.profilePic} alt={suggestion.displayName}/></div>
          <div className="cl-receiver-name">{suggestion.displayName}</div>
        </a>
      </li>
    );
  }
  renderRecipientTypeTab(recipientType, index) {
    const {displayName} = recipientType;
    const {p} = this.props;
    return (
      <li key={index} onMouseDown={this.handlePreventBlurEvent}><a className="cl-receiver-name-tags">{p.t(displayName)}</a></li>
    );
  }

  renderRecipientListForTab(recipientType, index) {
    const {suggestions} = this.props;
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.type === recipientType.type);
    return (
      <li key={index}>
        <ul>
          {
            filteredSuggestions.map(this.renderSuggestions)
          }
        </ul>
      </li>
    );
  }

  render() {
    const {suggestions, expandable, p} = this.props;
    if (!expandable || !suggestions.length) {
      return null;
    }

    return (

      <div className="cl-receiver-suggestion" style={{display: 'block', zIndex: 10}}>
        <ul className="cl-receiver-items" data-uk-switcher="{connect:'#cl-receiver-list'}">
          <li onMouseDown={this.handlePreventBlurEvent}><a >{p.t('typeAll')}</a></li>
          {
            RECIPIENT_PROFILE_TYPES.map(this.renderRecipientTypeTab)
          }
        </ul>
        <ul id="cl-receiver-list" className="cl-receiver-suggestionList uk-switcher">
          <li>
            <ul>
              {
                suggestions.map(this.renderSuggestions)
              }
            </ul>
          </li>
          {
            RECIPIENT_PROFILE_TYPES.map(this.renderRecipientListForTab)
          }
        </ul>
      </div>

    );
  }
}
/* eslint react/jsx-no-bind: 0 */

RecipientSuggestion.defaultProps = {
  suggestions: [],
  expandable: false,
  listboxId: null,
  selectedIndex: null,
  classNames: {}
};

RecipientSuggestion.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.object),
  expandable: PropTypes.bool,
  listboxId: PropTypes.string,
  selectedIndex: PropTypes.number,
  classNames: PropTypes.object,
  addTag: PropTypes.func.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};

export default translate('RecipientSuggestion')(RecipientSuggestion);
