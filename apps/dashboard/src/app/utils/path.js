import pathToRegExp from 'path-to-regexp';
import {DASHBOARD} from '../constants/pathConstants';

export function getUrlWithProfileType(url, profileType) {
  if (profileType) {
    const toPath = pathToRegExp.compile(url);
    return toPath({profileType});
  }
  return DASHBOARD;
}
