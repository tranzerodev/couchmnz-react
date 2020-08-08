import {
  ADD_USER,
  UPDATE_USER,
  UPDATE_COACH_IDS,
  UPDATE_CAMP_IDS,
  UPDATE_FITNESS_BUSINESS_IDS,
  UPDATE_OTHER_IDS,
  UPDATE_ATHLETE_IDS,
  UPDATE_PARENT_IDS,
  CLEAR_USER
} from '../constants/ActionTypes';

const initialState = {
  id: '',
  coachIDs: [],
  campIDs: [],
  fitnessBusinessIDs: [],
  otherIDs: [],
  athleteIDs: [],
  parentIDs: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, {
        id: action.user.id,
        coachIDs: [...action.user.coachIDs],
        campIDs: [...action.user.campIDs],
        fitnessBusinessIDs: [...action.user.fitnessBusinessIDs],
        otherIDs: [...action.user.otherIDs],
        athleteIDs: [...action.user.athleteIDs],
        parentIDs: [...action.user.parentIDs]
      });

    case UPDATE_USER:
      return Object.assign({}, state, {
        id: action.user.id,
        coachIDs: [...action.user.coachIDs],
        campIDs: [...action.user.campIDs],
        fitnessBusinessIDs: [...action.user.fitnessBusinessIDs],
        otherIDs: [...action.user.otherIDs],
        athleteIDs: [...action.user.athleteIDs],
        parentIDs: [...action.user.parentIDs]
      });

    case UPDATE_COACH_IDS:
      return Object.assign({}, state, {
        coachIDs: [action.coachID, ...state.coachIDs]
      });

    case UPDATE_CAMP_IDS:
      return Object.assign({}, state, {
        coachIDs: [action.campID, ...state.campIDs]
      });

    case UPDATE_FITNESS_BUSINESS_IDS:
      return Object.assign({}, state, {
        coachIDs: [action.fitnessBusinessID, ...state.fitnessBusinessIDs]
      });

    case UPDATE_OTHER_IDS:
      return Object.assign({}, state, {
        otherIDs: [action.otherID, ...state.otherIDs]
      });

    case UPDATE_ATHLETE_IDS:
      return Object.assign({}, state, {
        athleteIDs: [action.athleteID, ...state.athleteIDs]
      });

    case UPDATE_PARENT_IDS:
      return Object.assign({}, state, {
        parentIDs: [action.parentID, ...state.parentIDs]
      });

    case CLEAR_USER:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};

export default user;
