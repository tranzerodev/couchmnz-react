import {UPDATE_PRICE, UPDATE_AGES_PRICING, UPDATE_SKILLLEVELS_PRICING, ADD_AGES_PRICING, ADD_SKILLLEVELS_PRICING,
  CLEAR_PRICES, ADD_PRICE, ADD_DISCOUNT, REMOVE_DISCOUNT, SET_PRICING, ACTIVATE_DISCOUNT} from '../constants/ActionTypes';

const initialState = [];
const volumeDiscount = [
  {
    id: null,
    name: 'Trial',
    numberOfSessions: 1,
    discount: 0.0,
    isActive: 'Y'
  },
  {
    id: null,
    name: 'Bronze Package',
    numberOfSessions: 3,
    discount: 4.0,
    isActive: 'N'
  },
  {
    id: null,
    name: 'Silver Package',
    numberOfSessions: 5,
    discount: 7.0,
    isActive: 'N'
  },
  {
    id: null,
    name: 'Gold Package',
    numberOfSessions: 10,
    discount: 12.0,
    isActive: 'N'
  }
];
// Import uuid from '../utils/uuid';
const handlePriceSearch = (prices, id) => {
  console.log('prices', prices, 'id', id);
  const index = prices.findIndex(price => price.id === id);
  return index;
};
/* Const handleAgeSearch = (ages, id) => {
  console.log('ages', ages, 'id', id);
  const index = ages.findIndex(age => age.id === id);
  return index;
}; */
const handleskillLevelsSearch = (skillLevels, id) => {
  console.log('skillLevels', skillLevels, 'length', skillLevels.length, 'id', id);
  return skillLevels.findIndex(skillLevel => {
    console.log('skillLevel', skillLevel, 'skillLevel.skillID', skillLevel.skillID, 'id', id, 'eq', skillLevel.skillID === id);
    return skillLevel.skillID === id;
  });
};
const handleAgesSearch = (ages, id) => {
  console.log('ages', ages, 'length', ages.length, 'id', id);
  return ages.findIndex(age => {
    console.log('age', age, 'age.ageID', age.ageID, 'id', id, 'eq', age.ageID === id);
    return age.ageID === id;
  });
};

export default function prices(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRICE: {
      console.log('state', state, 'action', action);
      const {profile} = action;
      const index = handlePriceSearch(state, profile.id);
      const _state = Object.assign([], state);
      if (index >= 0) {
        _state[index] = Object.assign({}, _state[index], profile);

        if (!_state[index].volumeDiscount || (_state[index].volumeDiscount && !_state[index].volumeDiscount.length)) {
          _state[index].volumeDiscount = volumeDiscount;
        }
      } else {
        const newProfile = Object.assign({}, profile, {
          volumeDiscount
        });
        _state.push(newProfile);
      }
      console.log('index', index);
      return Object.assign([], state, _state);
    }
    case UPDATE_AGES_PRICING: {
      console.log('UPDATE_AGES_PRICING', 'state', state, 'action', action);
      const {profile} = action;
      const {age} = profile;
      const index = handlePriceSearch(state, profile.id);
      const _state = Object.assign([], state);
      if (index >= 0) {
        const {id, name} = profile;
        const price = Object.assign({}, _state[index], {id, name});
        let {ages} = price;
        if (!ages) {
          ages = [];
        }
        const ageIndex = handleAgesSearch(ages, age.ageID);
        console.log('UPDATE_AGES_PRICING', 'ageIndex', ageIndex);
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
        price.ages = Object.assign([], price.ages && price.ages.length ? price.ages : [], ages);
        _state[index] = Object.assign({}, price);
      } else {
        const {id, name} = profile;
        const price = Object.assign({}, {id, name});
        const ages = Object.assign([], price.ages && price.ages.length ? prices.ages : []);
        ages.push(Object.assign({}, {
          id: null,
          ageID: age.ageID,
          operation: age.operation ? age.operation : 'A',
          operand: age.operand ? parseInt(age.operand, 10) : 0.0,
          isPercentage: age.isPercentage ? age.isPercentage : 'Y'
        }, profile.age));
        price.ages = Object.assign([], ages);
        _state.push(price);
      }
      return Object.assign([], state, _state);
    }
    case UPDATE_SKILLLEVELS_PRICING: {
      console.log('UPDATE_SKILLLEVELS_PRICING', 'state', state, 'action', action);
      const {profile} = action;
      const {skillLevel} = profile;
      const index = handlePriceSearch(state, profile.id);
      const _state = Object.assign([], state);
      if (index >= 0) {
        const {id, name} = profile;
        const price = Object.assign({}, _state[index], {id, name});
        let {skillLevels} = price;
        if (!skillLevels) {
          skillLevels = [];
        }
        const skillLevelIndex = handleskillLevelsSearch(skillLevels, skillLevel.skillID);
        console.log('UPDATE_SKILLLEVELS_PRICING', 'skillLevelIndex', skillLevelIndex);
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
        price.skillLevels = Object.assign([], price.skillLevels && price.skillLevels.length ? price.skillLevels : [], skillLevels);
        _state[index] = Object.assign({}, price);
      } else {
        const {id, name} = profile;
        const price = Object.assign({}, {id, name});
        const skillLevels = Object.assign([], price.skillLevels && price.skillLevels.length ? prices.skillLevels : []);
        skillLevels.push(Object.assign({}, {
          id: null,
          skillID: skillLevel.skillID,
          operation: skillLevel.operation ? skillLevel.operation : 'A',
          operand: skillLevel.operand ? parseInt(skillLevel.operand, 10) : 0.0,
          isPercentage: skillLevel.isPercentage ? skillLevel.isPercentage : 'Y'
        }, profile.skillLevel));
        price.skillLevels = Object.assign([], skillLevels);
        _state.push(price);
      }
      return Object.assign([], state, _state);
    }
    case ADD_AGES_PRICING: {
      console.log('ADD_AGES_PRICING', 'state', state, 'action', action);
      const {profile} = action;
      const {age} = profile;
      const index = handlePriceSearch(state, profile.id);
      const _state = Object.assign([], state);
      if (index >= 0) {
        const price = Object.assign({}, _state[index]);
        const ages = Object.assign([], price.ages);
        ages.push(Object.assign({}, age, {id: null}));
        price.ages = Object.assign([], ages);
        _state[index] = Object.assign({}, price);
      }
      console.log('index', index);
      return Object.assign([], state, _state);
    }
    case ADD_DISCOUNT: {
      console.log('state', state, 'action', action);
      const {profile} = action;
      const {discount} = profile;
      const index = handlePriceSearch(state, profile.id);
      const _state = Object.assign([], state);
      if (index >= 0) {
        const price = Object.assign({}, _state[index]);
        let volumeDiscount = Object.assign([], price.volumeDiscount);
        if (!volumeDiscount) {
          volumeDiscount = [];
        }
        volumeDiscount.push(Object.assign({}, discount, {id: null}));
        price.volumeDiscount = Object.assign([], volumeDiscount);
        _state[index] = Object.assign({}, price);
      }
      console.log('index', index);
      return Object.assign([], state, _state);
    }
    case REMOVE_DISCOUNT: {
      console.log('state', state, 'action', action);
      const {profile} = action;
      const index = handlePriceSearch(state, profile.id);
      const {discountID} = profile;
      const _state = Object.assign([], state);
      if (index >= 0) {
        const price = Object.assign({}, _state[index]);
        let volumeDiscount = Object.assign([], price.volumeDiscount);
        if (!volumeDiscount) {
          volumeDiscount = [];
        }
        volumeDiscount = volumeDiscount.filter(discount => discount.isActive === 'Y' ? discount : discount.id !== discountID);
        price.volumeDiscount = Object.assign([], volumeDiscount);
        _state[index] = Object.assign({}, price);
      }
      console.log('index', index);
      return Object.assign([], state, _state);
    }
    case ACTIVATE_DISCOUNT: {
      console.log('state', state, 'action', action);
      const {profile} = action;
      const index = handlePriceSearch(state, profile.id);
      const {discountID} = profile;
      const _state = Object.assign([], state);
      if (index >= 0) {
        const price = Object.assign({}, _state[index]);
        let volumeDiscount = Object.assign([], price.volumeDiscount);
        if (!volumeDiscount) {
          volumeDiscount = [];
        }
        /* VolumeDiscount = volumeDiscount.filter(discount => discount.id !== discountID); */
        volumeDiscount = volumeDiscount.map(discount => {
          console.log('discount.id', discount.id, 'discountID', discountID);
          return {
            ...discount,
            isActive: discount.id === discountID ? 'Y' : 'N'
          };
        });
        price.volumeDiscount = Object.assign([], volumeDiscount);
        _state[index] = Object.assign({}, price);
      }
      console.log('index', index);
      return Object.assign([], state, _state);
    }
    case ADD_SKILLLEVELS_PRICING: {
      console.log('state', state, 'action', action);
      const {profile} = action;
      const {skillLevel} = profile;
      const index = handlePriceSearch(state, profile.id);
      const _state = Object.assign([], state);
      if (index >= 0) {
        const price = Object.assign({}, _state[index]);
        const skillLevels = Object.assign([], price.skillLevels);
        skillLevels.push(skillLevel);
        price.skillLevels = Object.assign([], skillLevels);
        _state[index] = Object.assign({}, price, {id: null});
      }
      console.log('index', index);
      return Object.assign([], state, _state);
    }
    case ADD_PRICE: {
      return Object.assign([], state.concat({
        id: null,
        name: '',
        price: 0,
        volumeDiscount
      }));
    }
    case SET_PRICING: {
      const {pricing} = action;
      return pricing;
    }
    case CLEAR_PRICES:
      return initialState;
    default:
      return state;
  }
}
