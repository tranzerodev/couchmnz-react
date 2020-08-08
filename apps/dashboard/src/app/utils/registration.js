import config from '../config';
import appConstants from '../constants/appConstants';
const {auth} = config;
const {keys} = auth.localStorage;

import {parseUrlTemplate} from './urlHelper';
import moment from 'moment';
import QueryString from 'query-string';
import {SEARCH_SPORT_URL} from '../constants/WebConstants';

export const setupShortRegistrationFlow = () => {
  localStorage.setItem(keys.registration, auth.localStorage.registration.short);
  localStorage.setItem(keys.shortRegRedirectUrl, 'http://localhost:8001/#/search/sports');
};

export const isShortRegFlow = () => {
  const regType = localStorage.getItem(keys.registration);
  if (regType) {
    return regType === auth.localStorage.registration.short;
  }
  return false;
};

export const getShortRegRedirectUrl = () => {
  return localStorage.getItem(keys.shortRegRedirectUrl);
};

export const removeShortRegFlow = () => {
  localStorage.removeItem(keys.registration);
  localStorage.removeItem(keys.shortRegRedirectUrl);
};

const getAthleteAge = age => {
  switch (age) {
    case 0: case 1: case 2: case 3: case 4: return appConstants.searchParams.ages.toddler;
    case 5: case 6: case 7: case 8: case 9: return appConstants.searchParams.ages.child;
    case 10: case 11: case 12: return appConstants.searchParams.ages.preteen;
    case 13: case 14: case 15: case 16: case 17: return appConstants.searchParams.ages.adolescent;
    case 18: case 19: case 20: case 21: case 22: return appConstants.searchParams.ages.collegiate;
    case 23: return appConstants.searchParams.ages.adult;
    default: return appConstants.searchParams.ages.adult;
  }
};

export const searchFilter = data => {
  const profile = JSON.parse(data);
  const {athleteGender, athleteAgeGroups, athleteSkillLevels, yearOfPlayingExperienceParam} = appConstants.filterQueries;
  const {gender, dob, skillLevel, yearOfExperience, sport} = profile;
  const url = parseUrlTemplate(SEARCH_SPORT_URL, {sport: sport.name.toLowerCase()});
  const updatedFilters = Object.assign({},
    {
      [yearOfPlayingExperienceParam]: yearOfExperience ? yearOfExperience : undefined,
      [athleteAgeGroups]: getAthleteAge(moment().diff(dob, 'years')),
      [athleteGender]: gender && gender !== appConstants.gender.any ? gender : undefined,
      [athleteSkillLevels]: (skillLevel && skillLevel.name) ? (skillLevel.name) : undefined
    }
  );
  const search = QueryString.stringify(updatedFilters);
  const searchUrl = url + '?' + search;
  return searchUrl;
};
