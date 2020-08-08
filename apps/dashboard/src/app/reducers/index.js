import {combineReducers} from 'redux';
import user from './user';
import countries from './countries';
import profilePicture from './profilePicture';
import events from './events';
import messages from './messages';
import states from './states';
import profile from './profile';
import {polyglotReducer} from 'redux-polyglot';
import userProfiles from './userProfiles';
import router from './router';
import sportsList from './sportsList';
import certificationsList from './certificationsList';
import degreesList from './degreesList';
import institutionsList from './institutionsList';
import skillsList from './skillsList';
import agesList from './agesList';
import trainingList from './trainingList';
import inviteUsers from './inviteEmails';
import userIDs from './userIDs';
import months from './months';
import timezones from './timezones';
import newProfile from './newProfile';
import profileUpdateStatus from './profileUpdateStatus';
import cities from './cities';
import newDegree from './newDegree';
import servicesList from './servicesList';
import profileActivationStatus from './profileActivationStatus';
import changePassword from './changePassword';
import genCertificationsList from './genCertificationsList';
import newCertification from './newCertification';
import genAwardsList from './genAwardsList';
import newAward from './newAward';
import sportsAwardsList from './sportsAwardsList';
import newAffiliation from './newAffiliation';
import newTool from './newTool';
import newSportsTool from './newSportsTool';
import addNewMasterData from './addNewMasterData';
import genToolsList from './genToolsList';
import sportsToolsList from './sportsToolsList';
import sportsDegreesList from './sportsDegreesList';
import sportsCertificationsList from './sportsCertificationsList';
import genAffiliationsList from './genAffiliationsList';
import sportsAffiliationsList from './sportsAffiliationsList';
import ssp from './ssp';
import parent from './parent';
import validation from './validation';
import sportsMapping from './ssp/isp/common/sportsMapping';
import athlete from './athlete';
import reasons from './reasons';
import shoppingCart from './shoppingCart';
import volumeDiscounts from './volumeDiscounts';
import daysOfWeek from './daysOfWeek';
import walletSummary from './walletSummary';
import payment from './payment';
import { reducer as responsiveReducer } from 'react-responsive-redux'

const rootReducer = combineReducers({
  ...ssp,
  ...validation,
  athlete,
  agesList,
  countries,
  events,
  profile,
  profilePicture,
  skillsList,
  trainingList,
  user,
  messages,
  states,
  userProfiles,
  router,
  sportsList,
  degreesList,
  institutionsList,
  certificationsList,
  inviteUsers,
  userIDs,
  months,
  timezones,
  newProfile,
  profileUpdateStatus,
  profileActivationStatus,
  cities,
  polyglot: polyglotReducer,
  newDegree,
  servicesList,
  changePassword,
  genCertificationsList,
  newCertification,
  genAwardsList,
  newAward,
  sportsAwardsList,
  newAffiliation,
  newTool,
  newSportsTool,
  addNewMasterData,
  genToolsList,
  sportsToolsList,
  sportsDegreesList,
  sportsMapping,
  parent,
  sportsCertificationsList,
  genAffiliationsList,
  sportsAffiliationsList,
  reasons,
  shoppingCart,
  volumeDiscounts,
  daysOfWeek,
  walletSummary,
  payment,
  responsive: responsiveReducer
});

export default rootReducer;
