import React, {Component} from 'react';
import {connect} from 'react-redux';
import ISPIndividualPricing from './ISPIndividualPricing';
import ISPTeamPricing from './ISPTeamPricing';
import ISPGroupPricing from './ISPGroupPricing';
import ISPClinicsPricing from './ISPClinicsPricing';
import translate from 'redux-polyglot/translate';
import config from '../../../../../config';
import {PropTypes} from 'prop-types';
import {savePrice, deleteDiscount} from '../../../../../actions';
import PricingLink from '../PricingLink/PricingLink';
import {REGISTRATION_ISP_PRICING} from '../../../../../constants/pathConstants';
import appConstants from '../../../../../constants/appConstants';
import FinishLaterLink from '../../../../common/FinishLaterLink/FinishLaterLink';
import {notNull, isNonEmptyArray} from '../../../../../validators/common/util';
import individual from '../../../../../validators/ssp/isp/common/pricing/individual';
import multiple from '../../../../../validators/ssp/isp/common/pricing/multiple';
import {sortByMinPrice} from '../../../../../utils/sort';
import RequiredNotFilledModal from '../../registration/RequiredNotFilledModal/RequiredNotFilledModal';
import ISPOtherServicesPricing from './ISPOtherServicesPricing';
/* Import config from '../../config'; */

class PricingClass extends Component {
  constructor(props) {
    super(props);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemoveDiscount = this.handleRemoveDiscount.bind(this);
    this.handleActivateDiscount = this.handleActivateDiscount.bind(this);
    this.handleAgesOperand = this.handleAgesOperand.bind(this);
    this.handleAgesOperation = this.handleAgesOperation.bind(this);
    this.handleAgesIsPercentage = this.handleAgesIsPercentage.bind(this);
    this.handleSkillLevelOperation = this.handleSkillLevelOperation.bind(this);
    this.handleSkillLevelOperand = this.handleSkillLevelOperand.bind(this);
    this.handleSkilllevelIsPercentage = this.handleSkilllevelIsPercentage.bind(this);
    this.handleMin = this.handleMin.bind(this);
    this.handleMax = this.handleMax.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleRemovePrice = this.handleRemovePrice.bind(this);

    this.handleInitialState = this.handleInitialState.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    const {type, prices} = props;
    const {id, name} = type;
    let price = {
      id,
      name,
      prices: [],
      skillLevels: [],
      ages: [],
      volumeDiscount: []
    };
    if (notNull(id) && isNonEmptyArray(prices)) {
      const index = prices.findIndex(price => price.id === id && price.name === name);
      price = index >= 0 ? Object.assign({}, this.props.prices[index]) : price;
    }
    this.state = {
      price: {
        ...price,
        prices: price.prices.sort(sortByMinPrice)
      },
      type,
      submitted: false,
      validation: this.handleValidation(price),
      notFilled: [],
      isNotFilledModalOpen: false
    };
  }
  handleValidation(price) {
    return (price.name === this.props.p.t('ISPRegistration5.subSSPTypes.groupTraining') ||
      price.name === this.props.p.t('ISPRegistration5.subSSPTypes.teamTraining') ||
        price.name === this.props.p.t('ISPRegistration5.subSSPTypes.clinics')) ? multiple(price) : individual(price);
  }
  getNotFilled() {
    const {price} = this.state;
    const {p} = this.props;
    const {prices, volumeDiscount} = price;
    const notFilled = [];
    if (isNonEmptyArray(prices) === false) {
      notFilled.push(p.t('RequiredNotFilledModal.prices'));
    }
    if (isNonEmptyArray(volumeDiscount) === false) {
      notFilled.push(p.t('RequiredNotFilledModal.volumeDiscount'));
    }
    return notFilled;
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleInitialState(this.props);
  }
  handleInitialState(props) {
    const {type, prices} = props;
    const {id, name} = type;
    if (isNonEmptyArray(prices)) {
      const index = prices.findIndex(price => price.id === id && price.name === name);
      const price = index >= 0 ? Object.assign({}, this.props.prices[index]) : {
        id,
        name,
        prices: [],
        skillLevels: [],
        ages: [],
        volumeDiscount: []
      };
      this.setState({
        price: {
          ...price,
          prices: price.prices.sort((p, p2) => parseInt(p.min, 10) > parseInt(p2.min, 10))
        },
        validation: this.handleValidation(price)
      });
    } else {
      const price = {
        id,
        name,
        prices: [],
        skillLevels: [],
        ages: [],
        volumeDiscount: []
      };
      this.setState({
        price: {
          ...price,
          prices: price.prices.sort((p, p2) => parseInt(p.min, 10) > parseInt(p2.min, 10))
        }
      });
    }
  }
  handleSave(discount) {
    const {price} = this.state;
    const {volumeDiscount} = price;
    if (price && volumeDiscount && volumeDiscount.length) {
      this.setState({
        price: {
          ...price,
          volumeDiscount: [
            ...volumeDiscount,
            {
              id: null,
              ...discount
            }
          ]
        }
      });
    } else {
      this.setState({
        price: {
          ...price,
          volumeDiscount: [
            {
              id: null,
              ...discount
            }
          ]
        }
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    // Const {type} = this.props;
    // const type2 = nextProps.type;
    // if (type.id !== type2.id || type.name !== type2.name) {
    this.handleInitialState(nextProps);
    // }
  }
  handlePriceChange(e) {
    const {price} = this.state;
    if (price && price.prices && price.prices.length) {
      const prices = price.prices ? price.prices : [];
      const index = parseInt(e.target.name, 10);
      const currentPrice = Object.assign({}, prices[index]);
      const pricesList = prices.map(price => {
        return price.max;
      });
      const min = Math.max.apply(Math, pricesList) + 1;
      const max = min + 1;
      if (prices[index] === undefined) {
        prices[index] = {
          id: null,
          price: parseFloat(e.target.value, 10),
          min,
          max,
          skillLevelID: null,
          ageGroupID: null
        };
      } else {
        prices[index] = {
          ...currentPrice,
          price: parseFloat(e.target.value, 10)
        };
      }
      this.setState({
        price: {
          ...price,
          prices: price.prices.sort(sortByMinPrice)
        }
      });
    } else {
      this.setState({
        price: {
          ...price,
          volumeDiscount: config.volumeDiscount,
          prices: [
            {
              id: null,
              price: parseFloat(e.target.value, 10),
              min: 0,
              max: 0,
              skillLevelID: null,
              ageGroupID: null
            }
          ]
        }
      });
    }
  }
  onSubmitForm() {
    const {price} = this.state;
    const validation = this.handleValidation(price);
    this.setState({validation, submitted: true});
    if (validation.valid === true && validation.required === false) {
      this.setState({isNotFilledModalOpen: true, notFilled: this.getNotFilled()});
      return false;
    }
    return validation.valid;
  }
  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }
  handleActivateDiscount(e) {
    const {price} = this.state;
    const {volumeDiscount} = price;
    const discountID = e.currentTarget.getAttribute('value');
    if (discountID) {
      const index = volumeDiscount.findIndex(discount => discount.id === discountID);
      const discount = Object.assign(volumeDiscount[index], {isActive: volumeDiscount[index].isActive === 'Y' ? 'N' : 'Y'});
      volumeDiscount[index] = Object.assign({}, discount);
      this.setState({
        price: {
          ...price,
          volumeDiscount
        }
      });
    } else {
      const index = e.currentTarget.getAttribute('name');
      const discount = Object.assign(volumeDiscount[index], {isActive: volumeDiscount[index].isActive === 'Y' ? 'N' : 'Y'});
      volumeDiscount[index] = Object.assign({}, discount);
      this.setState({
        price: {
          ...price,
          volumeDiscount
        }
      });
    }
  }
  handleAgesSearch(ages, id) {
    return ages.findIndex(age => {
      return age.ageID === id;
    });
  }
  handleSkillLevelsSearch(skillLevels, id) {
    return skillLevels.findIndex(skillLevel => {
      return skillLevel.skillID === id;
    });
  }
  handleSkillObjectSearch(skillLevels, id) {
    return skillLevels && typeof (skillLevels) === 'object' ? skillLevels.findIndex(skillLevel => skillLevel.skillID === id) : -1;
  }
  handleAgeObjectSearch(ages, id) {
    return ages && typeof (ages) === 'object' ? ages.findIndex(age => age.ageID === id) : -1;
  }
  updateSkilllevelsPricing(skillLevel) {
    const {price} = this.state;
    const skillLevels = [].concat(price.skillLevels);
    const skillLevelIndex = this.handleSkillLevelsSearch(skillLevels, skillLevel.skillID);
    if (skillLevelIndex >= 0) {
      skillLevels[skillLevelIndex] = Object.assign({}, skillLevels[skillLevelIndex], skillLevel);
    } else {
      skillLevels.push(Object.assign({}, skillLevel, {
        id: null,
        skillID: skillLevel.skillID,
        operation: skillLevel.operation ? skillLevel.operation : 'A',
        operand: skillLevel.operand ? skillLevel.operand : 0.0,
        isPercentage: skillLevel.isPercentage ? skillLevel.isPercentage : 'Y'
      }));
    }
    const newPrice = Object.assign({}, price, {
      skillLevels
    });
    this.setState({price: newPrice});
  }

  handleSkillLevelOperand(e) {
    this.updateSkilllevelsPricing({
      id: e.currentTarget.getAttribute('title'),
      skillID: e.currentTarget.getAttribute('name'),
      operand: parseFloat(e.target.value, 10)
    });
  }
  updateAgesPricing(age) {
    const {price} = this.state;
    const ages = [].concat(price.ages);
    const ageIndex = this.handleAgesSearch(ages, age.ageID);
    if (ageIndex >= 0) {
      ages[ageIndex] = Object.assign({}, ages[ageIndex], age);
    } else {
      ages.push(Object.assign({}, age, {
        id: null,
        ageID: age.ageID,
        operation: age.operation ? age.operation : 'A',
        operand: age.operand ? age.operand : 0.0,
        isPercentage: age.isPercentage ? age.isPercentage : 'Y'
      }));
    }
    const newPrice = Object.assign({}, price, {
      ages
    });
    this.setState({price: newPrice});
  }
  handleAgesOperand(e) {
    this.updateAgesPricing({
      id: e.currentTarget.getAttribute('title'),
      ageID: e.currentTarget.getAttribute('name'),
      operand: parseFloat(e.target.value, 10)
    });
  }
  handleAgesOperation(e) {
    this.updateAgesPricing({
      id: e.currentTarget.getAttribute('title'),
      ageID: e.currentTarget.getAttribute('name'),
      operation: e.target.value
    });
  }
  handleAgesIsPercentage(e) {
    this.updateAgesPricing({
      id: e.currentTarget.getAttribute('title'),
      ageID: e.currentTarget.getAttribute('name'),
      isPercentage: e.target.value
    });
  }
  handleSkillLevelOperation(e) {
    const skillLevelID = e.currentTarget.getAttribute('name');
    const objectID = e.currentTarget.getAttribute('title');
    this.updateSkilllevelsPricing({
      id: objectID,
      skillID: skillLevelID,
      operation: e.target.value
    });
  }
  handleSkilllevelIsPercentage(e) {
    const skillLevelID = e.currentTarget.getAttribute('name');
    const objectID = e.currentTarget.getAttribute('title');
    this.updateSkilllevelsPricing({
      id: objectID,
      skillID: skillLevelID,
      isPercentage: e.target.value
    });
  }
  handleSubmitAges() {
    const {price} = this.state;
    let isSubmitRequired = false;
    if (price.ages && price.ages.length) {
      for (let i = 0; i < price.ages.length; i++) {
        if (price.ages[i].id === null) {
          isSubmitRequired = true;
          break;
        }
      }
    }
    if (isSubmitRequired) {
      const validation = this.handleValidation(price);
      if (validation.valid === true) {
        this.props.savePrice({price}, appConstants.saveType.sportsSpecific);
      }
    }
  }
  handleSubmitSkillLevels() {
    const {price} = this.state;
    let isSubmitRequired = false;
    if (price.skillLevels && price.skillLevels.length) {
      for (let i = 0; i < price.skillLevels.length; i++) {
        if (price.skillLevels[i].id === null) {
          isSubmitRequired = true;
          break;
        }
      }
    }
    if (isSubmitRequired) {
      const validation = this.handleValidation(price);
      if (validation.valid === true) {
        this.props.savePrice({price}, appConstants.saveType.sportsSpecific);
      }
    }
  }
  handleSubmit() {
    const {price} = this.state;
    let isSubmitRequired = false;
    if (price.prices && price.prices.length) {
      for (let i = 0; i < price.prices.length; i++) {
        if (price.prices[i].id === null) {
          isSubmitRequired = true;
          break;
        }
      }
    }
    if (isSubmitRequired) {
      const validation = this.handleValidation(price);
      if (validation.valid === true) {
        this.props.savePrice({price}, appConstants.saveType.sportsSpecific);
      }
    }
  }
  handleRemoveDiscount(e) {
    const {userProfiles, currentSport, type} = this.props;
    const discountID = e.currentTarget.getAttribute('value');
    if (discountID) {
      this.props.deleteDiscount({profileID: userProfiles.selectedProfile.id, sportID: currentSport.data.id, subSSPTypeID: type.id, discountID});
      // This.props.deleteDiscount({profileID: userIDs.data.coachIDs[0], discountID});
    } else {
      const {price} = this.state;
      const {volumeDiscount} = price;
      const index = parseInt(e.currentTarget.getAttribute('name'), 10);
      this.setState({
        price: {
          ...price,
          volumeDiscount: volumeDiscount.filter((d, i) => i !== index)
        }
      });
    }
    // This.props.deleteDiscount({profileID: userIDs.data.coachIDs[0], discountID: e.currentTarget.getAttribute('value'), sportID: currentSport.data.id});
  }
  handleRemovePrice(index) {
    const {price} = this.state;
    const {prices} = price;
    this.setState({
      price: {
        ...price,
        prices: prices.filter((d, i) => i !== index)
      }
    });
  }
  handleMin(e) {
    const {price} = this.state;
    if (price && price.prices && price.prices.length) {
      const prices = price.prices ? price.prices : [];
      const index = parseInt(e.target.name, 10);
      const currentPrice = Object.assign({}, prices[index]);
      if (prices[index] === undefined) {
        prices[index] = {
          id: null,
          price: 0.0,
          min: parseInt(e.target.value, 10),
          max: parseInt(e.target.value, 10) + 1,
          skillLevelID: null,
          ageGroupID: null
        };
      } else {
        prices[index] = {
          ...currentPrice,
          min: parseInt(e.target.value, 10)
        };
      }
      this.setState({
        price: {
          ...price,
          prices: price.prices.sort(sortByMinPrice)
        }
      });
    } else {
      const prices = price.prices ? price.prices : [];
      prices.push({
        id: null,
        price: 0.0,
        min: parseInt(e.target.value, 10),
        max: parseInt(e.target.value, 10) + 1,
        skillLevelID: null,
        ageGroupID: null
      });
      this.setState({
        price: {
          ...price,
          volumeDiscount: config.volumeDiscount,
          prices: price.prices.sort(sortByMinPrice)
        }
      });
    }
  }
  handleMax(e) {
    const {price} = this.state;
    if (price && price.prices && price.prices.length) {
      const prices = price.prices ? price.prices : [];
      const index = parseInt(e.target.name, 10);
      const currentPrice = Object.assign({}, prices[index]);
      if (prices[index] === undefined) {
        prices[index] = {
          id: null,
          price: 0.0,
          min: parseInt(e.target.value, 10) - 1,
          max: parseInt(e.target.value, 10),
          skillLevelID: null,
          ageGroupID: null
        };
      } else {
        prices[index] = {
          ...currentPrice,
          max: parseInt(e.target.value, 10)
        };
      }
      this.setState({
        price: {
          ...price,
          prices: price.prices.sort(sortByMinPrice)
        }
      });
    } else {
      const prices = price.prices ? price.prices : [];
      prices.push({
        id: null,
        price: 0.0,
        min: parseInt(e.target.value, 10) - 1,
        max: parseInt(e.target.value, 10),
        skillLevelID: null,
        ageGroupID: null
      });
      this.setState({
        price: {
          ...price,
          volumeDiscount: config.volumeDiscount,
          prices: price.prices.sort(sortByMinPrice)
        }
      });
    }
  }
  render() {
    const {type, sportActivationStatus} = this.props;
    const {price, submitted} = this.state;
    const validation = this.handleValidation(price);
    const buttonName = this.props.p.t('RegistrationNextLink.next');
    return (

      <div className="uk-container uk-container-center">
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
            {
              type.name === this.props.p.t('ISPRegistration5.subSSPTypes.privateTraining') &&
              <ISPIndividualPricing
                showTitle
                type={type}
                price={price}
                validation={validation}
                submitted={submitted}
                onPriceChange={this.handlePriceChange}
                onActivateDiscount={this.handleActivateDiscount}
                onSkillLevelOperand={this.handleSkillLevelOperand}
                onAgesOperand={this.handleAgesOperand}
                onAgesOperation={this.handleAgesOperation}
                onAgesIsPercentage={this.handleAgesIsPercentage}
                onSkillLevelOperation={this.handleSkillLevelOperation}
                onSkilllevelIsPercentage={this.handleSkilllevelIsPercentage}
                onSave={this.handleSave}
                onRemoveDiscount={this.handleRemoveDiscount}
              />
            }
            {
              type.name === this.props.p.t('ISPRegistration5.subSSPTypes.groupTraining') &&
                <ISPGroupPricing
                  showTitle
                  type={type}
                  price={price}
                  onMin={this.handleMin}
                  onMax={this.handleMax}
                  validation={validation}
                  submitted={submitted}
                  onPriceChange={this.handlePriceChange}
                  onActivateDiscount={this.handleActivateDiscount}
                  onSkillLevelOperand={this.handleSkillLevelOperand}
                  onAgesOperand={this.handleAgesOperand}
                  onAgesOperation={this.handleAgesOperation}
                  onAgesIsPercentage={this.handleAgesIsPercentage}
                  onSkillLevelOperation={this.handleSkillLevelOperation}
                  onSkilllevelIsPercentage={this.handleSkilllevelIsPercentage}
                  onSave={this.handleSave}
                  onRemoveDiscount={this.handleRemoveDiscount}
                  onRemovePrice={this.handleRemovePrice}
                />
            }
            {
              type.name === this.props.p.t('ISPRegistration5.subSSPTypes.teamTraining') &&
                <ISPTeamPricing
                  showTitle
                  type={type}
                  price={price}
                  onMin={this.handleMin}
                  onMax={this.handleMax}
                  validation={validation}
                  submitted={submitted}
                  onPriceChange={this.handlePriceChange}
                  onActivateDiscount={this.handleActivateDiscount}
                  onSkillLevelOperand={this.handleSkillLevelOperand}
                  onAgesOperand={this.handleAgesOperand}
                  onAgesOperation={this.handleAgesOperation}
                  onAgesIsPercentage={this.handleAgesIsPercentage}
                  onSkillLevelOperation={this.handleSkillLevelOperation}
                  onSkilllevelIsPercentage={this.handleSkilllevelIsPercentage}
                  onSave={this.handleSave}
                  onRemoveDiscount={this.handleRemoveDiscount}
                  onRemovePrice={this.handleRemovePrice}
                />
            }
            {
              type.name === this.props.p.t('ISPRegistration5.subSSPTypes.clinics') &&
                <ISPClinicsPricing
                  showTitle
                  type={type}
                  price={price}
                  validation={validation}
                  submitted={submitted}
                  onPriceChange={this.handlePriceChange}
                  onMin={this.handleMin}
                  onMax={this.handleMax}
                  onActivateDiscount={this.handleActivateDiscount}
                  onSkillLevelOperand={this.handleSkillLevelOperand}
                  onAgesOperand={this.handleAgesOperand}
                  onAgesOperation={this.handleAgesOperation}
                  onAgesIsPercentage={this.handleAgesIsPercentage}
                  onSkillLevelOperation={this.handleSkillLevelOperation}
                  onSkilllevelIsPercentage={this.handleSkilllevelIsPercentage}
                  onSave={this.handleSave}
                  onRemoveDiscount={this.handleRemoveDiscount}
                  onRemovePrice={this.handleRemovePrice}
                />
            }
            {
              type.name !== this.props.p.t('ISPRegistration5.subSSPTypes.groupTraining') &&
                type.name !== this.props.p.t('ISPRegistration5.subSSPTypes.teamTraining') &&
                  type.name !== this.props.p.t('ISPRegistration5.subSSPTypes.clinics') &&
                    type.name !== this.props.p.t('ISPRegistration5.subSSPTypes.privateTraining') &&
                      <ISPOtherServicesPricing
                        showTitle
                        type={type}
                        price={price}
                        validation={validation}
                        submitted={submitted}
                        onPriceChange={this.handlePriceChange}
                        onMin={this.handleMin}
                        onMax={this.handleMax}
                        onActivateDiscount={this.handleActivateDiscount}
                        onSkillLevelOperand={this.handleSkillLevelOperand}
                        onAgesOperand={this.handleAgesOperand}
                        onAgesOperation={this.handleAgesOperation}
                        onAgesIsPercentage={this.handleAgesIsPercentage}
                        onSkillLevelOperation={this.handleSkillLevelOperation}
                        onSkilllevelIsPercentage={this.handleSkilllevelIsPercentage}
                        onSave={this.handleSave}
                        onRemoveDiscount={this.handleRemoveDiscount}
                        onRemovePrice={this.handleRemovePrice}
                      />
            }
          </div>
        </div>

        <div className="uk-grid">
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2"/>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2 mnone"/>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2">
            <div className="nxtAlign">
              <PricingLink
                submitForm={this.onSubmitForm}
                submitted={submitted}
                onNext={this.props.onNext}
                saveData={this.props.savePrice}
                data={{price}}
                saveType={appConstants.saveType.sportsSpecific}
                next={REGISTRATION_ISP_PRICING}
                buttonName={buttonName}
                isNewSports={sportActivationStatus}
              />
            </div>
          </div>
          <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1">
            <div className="finishDivSec">
              <FinishLaterLink/>
            </div>
          </div>
        </div>
        <RequiredNotFilledModal
          notFilled={this.state.notFilled}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.props.savePrice}
          data={{price}}
          saveType={appConstants.saveType.sportsSpecific}
        />
      </div>
    );
  }
  static get propTypes() {
    return {
      type: PropTypes.object,
      prices: PropTypes.array.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      deleteDiscount: PropTypes.func.isRequired,
      currentSport: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      onNext: PropTypes.func.isRequired,
      savePrice: PropTypes.func.isRequired,
      sportActivationStatus: PropTypes.bool.isRequired
    };
  }
}

PricingClass.defaultProps = {
  type: {
    id: null,
    name: null
  }
};

const mapStateToProps = state => {
  const {training, prices, userProfiles, service, currentSport} = state;
  return {
    training,
    service,
    prices,
    userProfiles,
    currentSport,
    sportActivationStatus: (currentSport.data.isActive === appConstants.sportsActiveFlages.active)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteDiscount: params => dispatch(deleteDiscount(params)),
    savePrice: (data, updateType) => dispatch(savePrice(data, updateType))
  };
};

const Registration5 = connect(mapStateToProps, mapDispatchToProps)(PricingClass);
export default translate(Registration5);
