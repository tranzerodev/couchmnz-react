import React, {Component} from 'react';
import {connect} from 'react-redux';
import ISPIndividualPricing from '../../registration/Pricing/ISPIndividualPricing';
import ISPTeamPricing from '../../registration/Pricing/ISPTeamPricing';
import ISPGroupPricing from '../../registration/Pricing/ISPGroupPricing';
import translate from 'redux-polyglot/translate';
import config from '../../../../../config';
import individual from '../../../../../validators/ssp/isp/common/pricing/individual';
import multiple from '../../../../../validators/ssp/isp/common/pricing/multiple';
import {PropTypes} from 'prop-types';
import appConstants from '../../../../../constants/appConstants';

const {isPercentFlags, pricingOperators} = appConstants;
const {subtract} = pricingOperators;
const {yes, no} = isPercentFlags;
import {
  updatePrice,
  updateAgesPrice,
  updateSkilllevelsPrice,
  savePrice,
  clearPrices,
  deleteDiscount
} from '../../../../../actions';
import {isNonEmptyArray} from '../../../../../validators/common/util';
import ISPClinicsPricing from '../../registration/Pricing/ISPClinicsPricing';
import {sortByMinPrice} from '../../../../../utils/sort';
import PricingLink from '../../registration/PricingLink/PricingLink';
import RequiredNotFilledModal from '../../registration/RequiredNotFilledModal/RequiredNotFilledModal';
import {DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS} from '../../../../../constants/pathConstants';
import ISPOtherServicesPricing from '../../registration/Pricing/ISPOtherServicesPricing';
/* Import config from '../../config'; */

function getBasePrice(prices) {
  return (prices && prices.length && prices[0].price ? prices[0].price : 0);
}

class DashboardPricing extends Component {
  constructor(props) {
    super(props);
    this.handleTrainingType = this.handleTrainingType.bind(this);
    // This.onSubmitFunction = this.onSubmitFunction.bind(this);
    this.handleSearchTraining = this.handleSearchTraining.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRemoveDiscount = this.handleRemoveDiscount.bind(this);
    this.handleActivateDiscount = this.handleActivateDiscount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAgesOperand = this.handleAgesOperand.bind(this);
    this.handleAgesOperation = this.handleAgesOperation.bind(this);
    this.handleAgesIsPercentage = this.handleAgesIsPercentage.bind(this);
    this.handleSkillLevelOperation = this.handleSkillLevelOperation.bind(this);
    this.handleSkillLevelOperand = this.handleSkillLevelOperand.bind(this);
    this.handleSkilllevelIsPercentage = this.handleSkilllevelIsPercentage.bind(this);
    this.handleSubmitAges = this.handleSubmitAges.bind(this);
    this.handleSubmitSkillLevels = this.handleSubmitSkillLevels.bind(this);
    this.handleMin = this.handleMin.bind(this);
    this.handleMax = this.handleMax.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);

    this.handleInitialState = this.handleInitialState.bind(this);
    this.handleRemovePrice = this.handleRemovePrice.bind(this);
    this.getNotFilled = this.getNotFilled.bind(this);
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.checkService = this.checkService.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    const {training, prices} = props;
    let type = {
      id: null,
      name: null
    };
    let nextTypeName;
    if (isNonEmptyArray(training)) {
      type = {
        id: training[0].id,
        name: training[0].name
      };
      nextTypeName = training[1] ? training[1].name : null;
    }
    const {id, name} = type;
    let price = {
      id,
      name,
      prices: [],
      skillLevels: [],
      ages: [],
      volumeDiscount: []
    };
    if (isNonEmptyArray(prices)) {
      const index = prices.findIndex(price => price.id === id && price.name === name);
      price = index >= 0 ? Object.assign({}, this.props.prices[index]) : price;
    }
    this.state = {
      type,
      nextTypeName,
      price: {
        ...price,
        prices: price.prices.sort(sortByMinPrice)
      },
      validation: this.handleValidation(price),
      submitted: false,
      notFilled: [],
      isNotFilledModalOpen: false,
      item: 0
    };
  }
  getNotFilled() {
    const {price} = this.state;
    const {p} = this.props;
    const {skillLevels, ages, prices, volumeDiscount} = price;
    const notFilled = [];
    if (isNonEmptyArray(prices) === false) {
      notFilled.push(p.t('RequiredNotFilledModal.prices'));
    }
    if (isNonEmptyArray(volumeDiscount) === false) {
      notFilled.push(p.t('RequiredNotFilledModal.volumeDiscount'));
    }
    if (isNonEmptyArray(skillLevels) === false) {
      notFilled.push(p.t('RequiredNotFilledModal.skillsPricing'));
    }
    if (isNonEmptyArray(ages) === false) {
      notFilled.push(p.t('RequiredNotFilledModal.agesPricing'));
    }
    return notFilled;
  }
  handleValidation(price) {
    return (price.name === this.props.p.t('ISPRegistration5.subSSPTypes.groupTraining') ||
      price.name === this.props.p.t('ISPRegistration5.subSSPTypes.teamTraining') ||
        price.name === this.props.p.t('ISPRegistration5.subSSPTypes.clinics')) ? multiple(price) : individual(price);
  }
  handleInitialState() {
    const {prices} = this.props;
    const {type} = this.state;
    const {id, name} = type;
    let price = {
      id,
      name,
      prices: [],
      skillLevels: [],
      ages: [],
      volumeDiscount: []
    };
    if (isNonEmptyArray(prices)) {
      const index = prices.findIndex(price => price.id === id && price.name === name);
      price = index >= 0 ? Object.assign({}, this.props.prices[index]) : price;
    }
    this.setState({
      price: {
        ...price,
        prices: price.prices.sort((p, p2) => parseInt(p.min, 10) > parseInt(p2.min, 10))
      },
      validation: price.name === this.props.p.t('Pricing.privateTraining') ? individual(price) : multiple(price)
    });
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
  componentWillReceiveProps() {
    // Const {type} = this.props;
    // const type2 = nextProps.type;
    // if (type.id !== type2.id || type.name !== type2.name) {
    this.handleInitialState();
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
  // HandleNext() {
  //   const {item} = this.state;
  //   const {training, prices} = this.props;
  //   console.log('training', training, 'oldItem', item);

  //   if (training && training.length) {
  //     if (item === training.length - 1) {
  //       console.log('training', training, 'oldItem', item);
  //       this.props.history.push(DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS);
  //     } else {
  //       const newItem = item + 1;
  //       const {id, name} = training[newItem];
  //       console.log('training', training, 'newItem', newItem);
  //       let price = {};
  //       if (isNonEmptyArray(prices)) {
  //         const index = prices.findIndex(price => price.id === id && price.name === name);
  //         price = index >= 0 ? Object.assign({}, this.props.prices[index]) : price;
  //       }
  //       this.setState({
  //         type: {
  //           id,
  //           name
  //         },
  //         item: newItem,
  //         price,
  //         validation: this.handleValidation(price),
  //         submitted: false
  //       });
  //     }
  //   }
  // }
  handleNext() {
    const {item} = this.state;
    const {training, prices} = this.props;
    console.log('training', training, 'oldItem', item);
    if (training && training.length) {
      if (item >= training.length - 1) {
        console.log('training', training, 'oldItem', item);
        this.checkService();
      } else {
        const newItem = item + 1;
        console.log('training', training, 'newItem', newItem);
        const {id, name} = training[newItem];
        let price = {};
        if (isNonEmptyArray(prices)) {
          const index = prices.findIndex(price => price.id === id && price.name === name);
          price = index >= 0 ? Object.assign({}, this.props.prices[index]) : price;
        }
        this.setState({
          type: {
            id: training[newItem].id,
            name: training[newItem].name
          },
          nextTypeName: training[newItem + 1] ? training[newItem + 1].name : null,
          price,
          validation: this.handleValidation(price),
          item: newItem,
          submitted: false
        });
      }
    }
  }
  checkService() {
    console.log('services method');
    const {item} = this.state;
    const {training, services, prices} = this.props;
    if (services && services.length) {
      if (item === training.length + services.length - 1) {
        console.log('services', services, 'oldItem', item);
        this.props.history.push(DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS);
      } else {
        const newItem = item + 1;
        console.log('services', services, 'newItem', newItem - training.length);
        const {id, name} = services[newItem - training.length];
        let price = {};
        if (isNonEmptyArray(prices)) {
          const index = prices.findIndex(price => price.id === id && price.name === name);
          price = index >= 0 ? Object.assign({}, this.props.prices[index]) : price;
        }
        this.setState({
          type: {
            id: services[newItem - training.length].id,
            name: services[newItem - training.length].name
          },
          price,
          validation: this.handleValidation(price),
          item: newItem,
          submitted: false
        });
      }
    } else {
      console.log('services', services, 'oldItem', item);
      this.props.history.push(DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS);
    }
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
    const value = parseFloat(e.target.value, 10);
    const id = e.currentTarget.getAttribute('title');
    const skillID = e.currentTarget.getAttribute('name');
    const basePrice = getBasePrice(this.state.price.prices);
    const {price} = this.state;
    const skillLevels = [].concat(price.skillLevels);
    const skillLevelIndex = this.handleSkillLevelsSearch(skillLevels, skillID);
    if (skillLevelIndex >= 0) {
      const skillLevel = skillLevels[skillLevelIndex];
      if (skillLevel && skillLevel.operation === subtract) {
        if (skillLevel.isPercentage === yes && value > 100) {
          return;
        } else if (skillLevel.isPercentage === no && value > basePrice) {
          return;
        }
      }
    }
    this.updateSkilllevelsPricing({id, skillID, operand: value});
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
    const value = parseFloat(e.target.value, 10);
    const id = e.currentTarget.getAttribute('title');
    const ageID = e.currentTarget.getAttribute('name');
    const basePrice = getBasePrice(this.state.price.prices);
    const {price} = this.state;
    const ages = [].concat(price.ages);
    const ageIndex = this.handleAgesSearch(ages, ageID);
    if (ageIndex >= 0) {
      const ageGroup = ages[ageIndex];
      if (ageGroup && ageGroup.operation === subtract) {
        if (ageGroup.isPercentage === yes && value > 100) {
          return;
        } else if (ageGroup.isPercentage === no && value > basePrice) {
          return;
        }
      }
    }
    this.updateAgesPricing({
      id,
      ageID,
      operand: value
    });
  }
  handleAgesOperation(e) {
    this.updateAgesPricing({
      id: e.currentTarget.getAttribute('title'),
      ageID: e.currentTarget.getAttribute('name'),
      operation: e.target.value,
      operand: 0
    });
  }
  handleAgesIsPercentage(e) {
    this.updateAgesPricing({
      id: e.currentTarget.getAttribute('title'),
      ageID: e.currentTarget.getAttribute('name'),
      isPercentage: e.target.value,
      operand: 0
    });
  }
  handleSkillLevelOperation(e) {
    const skillLevelID = e.currentTarget.getAttribute('name');
    const objectID = e.currentTarget.getAttribute('title');
    this.updateSkilllevelsPricing({
      id: objectID,
      skillID: skillLevelID,
      operation: e.target.value,
      operand: 0
    });
  }
  handleSkilllevelIsPercentage(e) {
    const skillLevelID = e.currentTarget.getAttribute('name');
    const objectID = e.currentTarget.getAttribute('title');
    this.updateSkilllevelsPricing({
      id: objectID,
      skillID: skillLevelID,
      isPercentage: e.target.value,
      operand: 0
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
    e.stopPropagation();
    const {userProfiles, currentSport} = this.props;
    const {type} = this.state;
    const discountID = e.currentTarget.getAttribute('value');
    if (discountID) {
      // This.props.deleteDiscount({profileID: userIDs.data.coachIDs[0], discountID});
      this.props.deleteDiscount({profileID: userProfiles.selectedProfile.id, sportID: currentSport.data.id, subSSPTypeID: type.id, discountID});
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
  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleInitialState();
    // If (this.props.training && this.props.training.length) {
    //   console.log('this.state.type', this.state.type);
    //   if (!this.state.type) {
    //     const {training} = this.props;
    //     const type = {
    //       id: training[0].id,
    //       name: training[0].name
    //     };
    //     console.log('type', type);
    //     let pricing;
    //     switch (training[0].name) {
    //       case 'Private Training': {
    //         pricing = <ISPIndividualPricing type={type} packageItemClassName={this.props.packageItemClassName}/>;
    //         break;
    //       }
    //       case 'Group Training':
    //       case 'Clinics': {
    //         pricing = <ISPGroupPricing type={type} packageItemClassName={this.props.packageItemClassName}/>;
    //         break;
    //       }
    //       case 'Team Training': {
    //         pricing = <ISPTeamPricing type={type} packageItemClassName={this.props.packageItemClassName}/>;
    //         break;
    //       }
    //       default: {
    //         pricing = <ISPIndividualPricing type={type} packageItemClassName={this.props.packageItemClassName}/>;
    //         break;
    //       }
    //     }
    //     this.setState({
    //       type,
    //       pricing
    //     }, this.forceUpdate());
    //   }
    // }
  }
  handleSearchTraining(trainings, id) {
    return trainings.findIndex(training => training.id === id);
  }
  // OnSubmitFunction() {
  //   for (let i = 0; i < this.props.prices.length; i++) {
  //     const subSSPType = this.props.training[this.handleSearchTraining(this.props.training, this.props.prices[i].id)];
  //     this.props.sspPricingSubmit({status: true, type: subSSPType});
  //     if (this.props.sspValidation.pricing.valid === false) {
  //       break;
  //     }
  //   }
  // }
  handleTrainingType(e) {
    const id = e.target.getAttribute('id');
    const name = e.target.getAttribute('value');
    let price = {
      id,
      name,
      prices: [],
      skillLevels: [],
      ages: [],
      volumeDiscount: []
    };
    const type = {
      id,
      name
    };
    const {training, prices} = this.props;
    if (isNonEmptyArray(prices)) {
      const index = prices.findIndex(price => price.id === id && price.name === name);
      price = index >= 0 ? Object.assign({}, this.props.prices[index]) : price;
    }
    this.setState({
      price,
      validation: this.handleValidation(price),
      type,
      item: training.findIndex(t => t.id === price.id),
      submitted: false
    });
  }
  render() {
    const {type, price, submitted, nextTypeName} = this.state;
    const {sportActivationStatus, p, currentSport} = this.props;
    const validation = this.handleValidation(price);
    const buttonName = sportActivationStatus ? p.t('SaveButton.save') : p.t('RegistrationNextLink.save_and_continue');
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="trainingPrice">
          <h1 className="uk-padding-remove">{this.props.p.t('Pricing.title2', {type: type.name, sport: currentSport.data.name})}</h1>
          <p className="pd20">{this.props.p.t('Pricing.message')}:</p>
          {/* <ul className="cl-sd-pricingInfo uk-tab">
            {this.props.training.concat(this.props.services).map(t => {
              return (
                <li key={t.id} onClick={this.handleTrainingType} aria-expanded={t.id === type.id} className={t.id === type.id ? 'uk-active' : ''}><a id={t.id} value={t.name}>{t.name}</a></li>
              );
            })
            }
          </ul> */}

          {/* <p className="pd50">We'll start you off by defining your {this.state.type && this.state.type.name && this.state.type.name !== '' ? this.state.type.name : ''}  price on this page, and let you set team and group training on the next set of pages.</p> */}
          {
            type.name === this.props.p.t('ISPRegistration5.subSSPTypes.privateTraining') &&
            <ISPIndividualPricing
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
              showTitle={false}
            />
          }
          {
            type.name === this.props.p.t('ISPRegistration5.subSSPTypes.groupTraining') &&
            <ISPGroupPricing
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
              onSubmitAges={this.handleSubmitAges}
              onSubmitSkillLevels={this.handleSubmitSkillLevels}
              onSubmit={this.handleSubmit}
              onSave={this.handleSave}
              onRemoveDiscount={this.handleRemoveDiscount}
              onRemovePrice={this.handleRemovePrice}
              showTitle={false}
            />
          }
          {
            type.name === this.props.p.t('ISPRegistration5.subSSPTypes.teamTraining') &&
            <ISPTeamPricing
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
              onSubmitAges={this.handleSubmitAges}
              onSubmitSkillLevels={this.handleSubmitSkillLevels}
              onSubmit={this.handleSubmit}
              onSave={this.handleSave}
              onRemoveDiscount={this.handleRemoveDiscount}
              onRemovePrice={this.handleRemovePrice}
              showTitle={false}
            />
          }
          {
            type.name === this.props.p.t('ISPRegistration5.subSSPTypes.clinics') &&
            <ISPClinicsPricing
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
              onSubmitAges={this.handleSubmitAges}
              onSubmitSkillLevels={this.handleSubmitSkillLevels}
              onSubmit={this.handleSubmit}
              onSave={this.handleSave}
              onRemoveDiscount={this.handleRemoveDiscount}
              onRemovePrice={this.handleRemovePrice}
              showTitle={false}
            />
          }
          {
            type.name !== this.props.p.t('ISPRegistration5.subSSPTypes.groupTraining') &&
                type.name !== this.props.p.t('ISPRegistration5.subSSPTypes.teamTraining') &&
                  type.name !== this.props.p.t('ISPRegistration5.subSSPTypes.clinics') &&
                    type.name !== this.props.p.t('ISPRegistration5.subSSPTypes.privateTraining') &&
                      <ISPOtherServicesPricing
                        showTitle={false}
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
          <div className="uk-grid">
            <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1">

              <PricingLink
                submitForm={this.onSubmitForm}
                submitted={submitted}
                onNext={this.handleNext}
                saveData={this.props.savePrice}
                data={{price}}
                saveType={appConstants.saveType.sportsSpecific}
                next={DASHBOARD_MANAGE_SPORT_TRAINING_LOCATIONS}
                buttonName={buttonName}
                isNewSports={sportActivationStatus}
              />
              {
                nextTypeName ? <p className="cl-sd-nextscreen-note">{this.props.p.t('ISPRegistration5.nextInfo')}<br/>{this.props.p.t('ISPRegistration5.nextInfoSetPrice')} <span>{nextTypeName}</span></p> : null
              }
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
      training: PropTypes.array,
      prices: PropTypes.array,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      // UserIDs: PropTypes.object.isRequired,
      userProfiles: PropTypes.object.isRequired,
      deleteDiscount: PropTypes.func.isRequired,
      savePrice: PropTypes.func.isRequired,
      services: PropTypes.array,
      currentSport: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      sportActivationStatus: PropTypes.bool.isRequired
    };
  }
}

DashboardPricing.defaultProps = {
  training: [],
  services: [],
  prices: []
};

const mapStateToProps = state => {
  const {training, prices, currentSport, services, userProfiles} = state;
  return {
    training,
    prices,
    services,
    sportActivationStatus: (currentSport.data.isActive === appConstants.sportsActiveFlages.active),
    userProfiles,
    currentSport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePrice: profile => dispatch(updatePrice(profile)),
    updateAgesPrice: profile => dispatch(updateAgesPrice(profile)),
    updateSkilllevelsPrice: profile => dispatch(updateSkilllevelsPrice(profile)),
    clearPrices: () => dispatch(clearPrices()),
    deleteDiscount: params => dispatch(deleteDiscount(params)),
    savePrice: (data, updateType) => dispatch(savePrice(data, updateType))
  };
};

const Registration4 = connect(mapStateToProps, mapDispatchToProps)(DashboardPricing);
export default translate(Registration4);
