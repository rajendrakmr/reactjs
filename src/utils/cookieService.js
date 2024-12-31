import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getCookie(name) { 
  return cookies.get(name);
}

export function setCookie(name, value, options) {
  cookies.set(name, value, options); 
}

export function removeCookie(name, options) {
  cookies.remove(name, options);
}

export const clearCookie = () => {
  const cookies = new Cookies(); 
  const allCookies = cookies.getAll(); 
  Object.keys(allCookies).forEach((cookieName) => {
    cookies.remove(cookieName, { path: '/' });  
  });
};
