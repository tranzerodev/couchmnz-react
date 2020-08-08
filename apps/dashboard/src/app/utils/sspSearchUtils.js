const URL_PATH_WORD_SEPERATOR = '-';

export function textToUrlPathString(text) {
  if (text) {
    return (text.trim().toLowerCase().replace(/\s/g, URL_PATH_WORD_SEPERATOR));
  }
}

export function urlPathToText(pathString) {
  if (pathString) {
    return (pathString.trim().replace(/-/g, ' '));
  }
}

export const convertToArray = value => {
  if (value) {
    if (Array.isArray(value)) {
      return (value);
    }
    return ([value]);
  }
  return ([]);
};

export function getTrimmedQueryParam(param) {
  if (param && param.trim().length > 0) {
    return textToUrlPathString(param);
  }
  return undefined;
}
