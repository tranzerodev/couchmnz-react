import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

import TopContent from '../ISPRegFlowTopContent';
import {REGISTRATION_ISP_MEDIA, REGISTRATION_ISP_TRAINING_LOCATIONS} from '../../../../../constants/pathConstants';
import Pricing from '../Pricing';
import {isNonEmptyArray} from '../../../../../validators/common/util';

class ISPRegistration5Class extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.checkService = this.checkService.bind(this);
    const {training} = props;
    let type = {
      id: null,
      name: null
    };
    if (isNonEmptyArray(training)) {
      type = {
        id: training[0].id,
        name: training[0].name
      };
    }
    this.state = {
      type,
      item: 0,
      submitted: false
    };
  }
  componentDidMount() {}
  handleSearchPrice(prices, name) {
    return prices.findIndex(price => price.name === name);
  }
  handleSearchTraining(trainings, id) {
    return trainings.findIndex(training => training.id === id);
  }
  handleBack() {
    const {item} = this.state;
    if (item) {
      const nextItem = item - 1;
      const {id, name} = nextItem > this.props.training.length - 1 ? this.props.services[nextItem - this.props.training.length] : this.props.training[nextItem];
      this.setState({
        item: nextItem,
        type: {
          id,
          name
        }
      });
    } else {
      this.props.history.push(REGISTRATION_ISP_MEDIA);
    }
  }
  handleNext() {
    const {item} = this.state;
    const {training} = this.props;
    console.log('training', training, 'oldItem', item);
    if (training && training.length) {
      if (item >= training.length - 1) {
        console.log('training', training, 'oldItem', item);
        this.checkService();
      } else {
        const newItem = item + 1;
        console.log('training', training, 'newItem', newItem);
        this.setState({
          type: {
            id: training[newItem].id,
            name: training[newItem].name
          },
          item: newItem,
          submitted: true
        });
      }
    }
  }
  checkService() {
    console.log('services method');
    const {item} = this.state;
    const {training, services} = this.props;
    if (services && services.length) {
      if (item === training.length + services.length - 1) {
        console.log('services', services, 'oldItem', item);
        this.props.history.push(REGISTRATION_ISP_TRAINING_LOCATIONS);
      } else {
        const newItem = item + 1;
        console.log('services', services, 'newItem', newItem);
        this.setState({
          type: {
            id: services[newItem - training.length].id,
            name: services[newItem - training.length].name
          },
          item: newItem,
          submitted: true
        });
      }
    } else {
      console.log('services', services, 'oldItem', item);
      this.props.history.push(REGISTRATION_ISP_TRAINING_LOCATIONS);
    }
  }
  render() {
    const {type, submitted, item} = this.state;
    console.log('currentItem', item);
    return (
      <div>
        <TopContent step={5}/>
        <div className="top-back-sec">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <a onClick={this.handleBack} className="back">
                    <svg className="cl-icon-back-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="7348.966 -314.516 17.534 11.033">
                      <g data-name="Group 118" transform="translate(7302 -512.5)">
                        <path data-name="Path 35" className="cl-icon-back-arrow-1" d="M0,0,4.749,5,3.795,6,0,10" transform="translate(52.749 208.5) rotate(180)"/>
                        <line data-name="Line 9" className="cl-icon-back-arrow-1" x2={16} transform="translate(48.5 203.5)"/>
                      </g>
                    </svg>
                    {' ' + this.props.p.t('BackButton.back')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <Pricing type={type} submitted={submitted} onNext={this.handleNext}/>
        </section>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      history: PropTypes.object.isRequired,
      training: PropTypes.array.isRequired,
      services: PropTypes.array.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {prices, training, sspValidation, services} = state;
  return {
    prices,
    training,
    sspValidation,
    services
  };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {

  };
};

const Registration5 = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration5Class);
export default translate(Registration5);
