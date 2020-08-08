import {combineReducers} from 'redux';
import signUp from './signUp';
import login from './login';
import otp from './otp';
import emailAvailability from './email';
import userInfo from './userInfo';

const auth = combineReducers({
  signUp,
  login,
  otp,
  emailAvailability,
  userInfo
});

export default auth;
