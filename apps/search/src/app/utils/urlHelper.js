import uriTemplate from 'uri-templates';
import {matchPath} from 'react-router';

import * as RouterPaths from '../constants/RouterPaths';

export const parseUrlTemplate = (urlTemplateString, pathParams, queryParams) => {
  const urlTemplate = uriTemplate(urlTemplateString);
  let url = urlTemplate.fill(pathParams);
  if (queryParams) {
    url += queryParams;
  }
  console.log('Parsed url ', url);
  return url;
};

export const getCurrentSubmenuURL = pathname => {
  let url = null;
  const subMenuMatch = matchPath(pathname, {path: RouterPaths.MESSAGES_GET_SUBMENU_URL, exact: false});
  if (subMenuMatch) {
    const {subMenu} = subMenuMatch.params;
    url = subMenuMatch.url;
    if (subMenu === RouterPaths.MENU_LABELS) {
      const labelsMenuMatch = matchPath(pathname, {path: RouterPaths.MESSAGES_LABEL_ROUTER_PATH, exact: false});
      if (labelsMenuMatch) {
        url = labelsMenuMatch.url;
      }
    }
  }
  return url;
};

export const getCurrentSubmenu = pathname => {
  const subMenuMatch = matchPath(pathname, {path: RouterPaths.MESSAGES_GET_SUBMENU_URL, exact: false});
  let submenu = null;
  if (subMenuMatch) {
    submenu = subMenuMatch.params.subMenu;
  }
  return submenu;
};

