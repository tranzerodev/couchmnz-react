import config from '../../config';

const initialState = config.messagingSystem.messageThreadFilters;
const threadFilters = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default threadFilters;
