import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CAQAccord extends Component {
  constructor(props) {
    super(props);
    /* This.defaultProps = {
      headerState: 'open',
      contentBody: '',
      showBody: false
    }; */
    this.state = {
      showBody: false,
      headerState: 'open'
    };
    this.handleHeadBang = this.handleHeadBang.bind(this);
  }

  static get propTypes() {
    return {
      // HeaderState: PropTypes.string,
      contentBody: PropTypes.array,
      coachName: PropTypes.string,
      showBody: PropTypes.bool
    };
  }

  handleHeadBang(event) {
    event.preventDefault();
    if (this.props.showBody === !this.state.showBody) {
      this.setState({headerState: '', showBody: true});
    } else {
      this.setState({headerState: 'open', showBody: false});
    }
  }

  render() {
    let keyVal = 0;
    return (
      <div key={keyVal++} id="commonly-asked-questions" className="profile-general-content custom-accordian-con">
        <div key={keyVal++} className="uk-width-1-1">
          <div key={keyVal++} className="sec-faq">
            <div key={keyVal++} className="sub-heading" onClick={this.handleHeadBang}>
              <h2 key={keyVal++} className={this.state.headerState}>Commonly Asked Questions</h2>
              <div key={keyVal++} className="cta-faq">
                <a href="#">Visit the CoachList knowledge base</a>
              </div>
              <div key={keyVal++} className="clear-both"/>
            </div>
            <div key={keyVal++} className="content-faq" style={(this.props.showBody && this.state.showBody) ? {display: 'block'} : {display: 'none'}}>
              {this.props.contentBody}
              <div key={keyVal++} className="faq-more">
                <span key={keyVal++} className="bold-font-family">Didn’t find what you were looking for?</span>
                <span>
                  <a href="#">Ask a Question to {this.props.coachName}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CAQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: 'Neil McGuire',
      specQs: [{
        Ques: 'What is the best training session for this trainer?',
        Ans: 'All of them.'}],
      commonQs: [{
        Ques: 'What is the best training session?',
        Ans: 'The one offered by this coach. Try it. Book it. Buy a career.'
      }]
    };
  }
  static get propTypes() {
    return {
      displayName: PropTypes.string,
      specQs: PropTypes.array,
      commonQs: PropTypes.array
    };
  }
  handleQAs(qaArray) {
    const qaDispArray = [];
    let keyVal = 0;
    for (let i = 0; i < qaArray.length; i++) {
      qaDispArray.push(
        <h3 key={keyVal++} className="uk-accordion-title">
          {qaArray[i].Ques}
        </h3>);
      qaDispArray.push(
        <div key={keyVal++} className="uk-accordion-content">
          <p key={keyVal++}>{qaArray[i].Ans}
          </p>
        </div>);
    }
    return (qaDispArray);
  }
  render() {
    const bodyText = [];
    let keyVal = 0;
    bodyText.push(
      <div key={keyVal++} className="uk-accordion" data-uk-accordion="{showfirst: true}">
        {(this.props.specQs) ? this.handleQAs(this.props.specQs) : ''}
        {(this.props.commonQs) ? this.handleQAs(this.props.commonQs) : ''}
      </div>
    );
    return (
      <CAQAccord coachName={this.props.displayName} contentBody={bodyText} headerState="open" showBody/>
    );
  }
}

CAQuestions.defaultProps = {
  commonQs: [],
  specQs: []
};

export default CAQuestions;
