import cookies from 'js-cookie'

const TokenKey = 'Language'

export function getLanguage() {
  return cookies.get(TokenKey);
}

export function setLanguage(lan) {
  return cookies.set(TokenKey, lan,  { expires: 365 });
}
